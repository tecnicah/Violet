import { Component, OnInit, Inject} from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';


@Component({
  selector: 'app-dialog-visa-deregistration',
  templateUrl: './dialog-visa-deregistration.component.html',
  styleUrls: ['./dialog-visa-deregistration.component.css']
})
export class DialogVisaDeregistrationComponent implements OnInit {

  yesterday_today = new Date();
  calculo : any = {};
  show:boolean = false;
  VisaForm: FormGroup;

  entryVisa: any = {};
  user: any;

  //Catalogos
  cestatus: any[] = [];
  ccountry: any[] = [];
  ccity: any[] = [];
  cappicant: any[] = [];
  cvisatype: any[] = [];
  dataSource: any[] = [];
  payments: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cRequestType: any[] = [];
  serviceScope : any[] = [];


  cr: string = "Reply";

  displayedColumns: string[] = ['Payment','Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence','action'];

  temporalDocument: any[] = [];

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

  ngOnInit() {
    this.__loader__.showLoader();
    console.log(this.data);

    this.user = JSON.parse(localStorage.getItem("userData"));

    this.documentoscatalogos();
    this.getcatalogos();
    this.getdata();

  }

  public cCity = [];
  async documentoscatalogos(){
    //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/2').subscribe((data => {
      if (data.success) {
        this.caDocumentType = data.result;
        console.log(this.caDocumentType);
      }
    }))
    this.caCountry      = await this._services.getCatalogueFrom('GetCountry');
    this.cCity   = await this._services.getCatalogueFrom('GetCity');
    this.cRequestType   = await this._services.getCatalogueFrom('GetRequestType');
  }
   // get service scope
   getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.entryVisa.workOrderServicesId}&client=${this.data.partnerId }`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__:string = this._services.url_images;
  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }
  getcatalogos() {

    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=3").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.cestatus = data.result;
      }
    }))

    this._services.service_general_get("Catalogue/GetCountry").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.ccountry = data.result;
      }
    }))


    this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
      console.log(data);
      if (data.success) {
        this.cappicant = data.applicant.value;
      }
    }))

    this._services.service_general_get("Catalogue/GetVisaCategory").subscribe((data => {
      if (data.success) {
        this.cvisatype = data.result;
      }
    }))
  }

  getdata() {
    this._services.service_general_get("ImmigrationServices/GetVisaDeregistrationById?id=" + this.data.service[0].id).subscribe((data => {
      if (data.success) {
        console.log(data);
        this.getcity(data.result);
      }
    }))
  }

  getcity(visa) {
    console.log(visa);
    this._services.service_general_get("Catalogue/GetState?country=" + visa.hostCountryId).subscribe((data => {
      if (data.success) {
        this.ccity = data.result;
        this.entryVisa = visa;
        this.show = true;
        this.request();
        this.getServiceScope();
        this.__loader__.hideLoader();
        if(this.entryVisa.commentVisaDeregistrations.length == 0){
          this.addReply();
        }
      }
    }))

  }

  request(){
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.entryVisa.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.payments = data.result.value.payments;
        console.log(this.payments);
      }
      console.log(this.payments);
    }))
  }

  ///Documents catalogos

  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {



    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service"
      }
    });

  }

  documentType(id){
    for(let i = 0; i < this.caDocumentType.length; i++){
      if(this.caDocumentType[i].id == id){
         return this.caDocumentType[i].documentType;
      }
    }
   }

   countryOrigin(id){
     for(let i = 0; i < this.caCountry.length; i++){
       if(this.caCountry[i].id == id){
          return this.caCountry[i].name;
       }
     }
   }


  getAppName(applicantId){
      for (let i = 0; i < this.cappicant.length; i++) {
          const element = this.cappicant[i];
          if(element.dependentId = applicantId){
            return element.name;
          }
      }
  }

  doc() {
    document.getElementById("doc").click();
  }
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);
          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = file.type.split("/");
              console.log(imageUrl);
              this.temporalDocument.push({
                "id": 0,
                "fileName": droppedFile.relativePath,
                "fileRequest": encoded,
                "visaDeregistrationId": this.entryVisa.id,
                "createdDate": new Date(),
                "createdBy": this.user.id,
                "fileExtension": ext[1]
              });
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  addReminders() {
    this.entryVisa.reminderVisaDeregistrations.push({
      id: 0,
      visaDeregistrationId: this.entryVisa.id,
      reminderDate: null,
      reminderComments: "",
      createdBy: this.user.id,
      createdDate: new Date()
    })
  }

  removeReminder(i, id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Reminder?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id == 0) {
          this.entryVisa.reminderVisaDeregistrations.splice(i, 1);
        } else {
          this._services.service_general_delete("ImmigrationServices/DeleteReminderVD?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: data.result
                },
                width: "350px"
              });
              this.getdata();
            }
          }))
        }
      }
    })
  }

  DeleteOnline(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {

        this._services.service_general_delete("ImmigrationServices/DeleteDocumentVD?id=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: data.result
              },
              width: "350px"
            });
            this.getdata();
          }
        }))
      }
    })


  }
  DeleteOnlineof(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Reminder?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.temporalDocument.splice(i, 1);
      }
    })
  }

  addDocument() {
    this.data.typeDocument = 2;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      result.visaDeregistrationId = this.entryVisa.id;
      console.log(result);
      if(result.success){
         this.temporalDocument.push(result);
      }
    });
  }


  requestPayment(data) {
    if(data == null){
      data = {
        serviceRecord: this.data.serviceRecordId,
        sr: this.data.serviceRecordId,
        workOrderServices: this.entryVisa.workOrderServicesId,
        workOrder: this.data.workOrderId,
        service: this.data.id_server,
        id: 0,
        type: 1,
        supplierType: 3
      }
    }else{
      data.type = 1;
      data.supplierType = 3;
      data.id = data.requestPaymentId;
      data.serviceRecord = this.data.serviceRecordId;
      data.sr = this.data.serviceRecordId;
      data.service = this.data.id_server;
    }
   console.log("Data al abrir modal de payment concept: ", data);
   const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.request();
    });
  }


  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
          this._services.service_general_delete("RequestPayment/DeletePaymentConcept/"+data.id+"/"+result.type).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: data.message
                },
                width: "350px"
              });
              this.request();;
            }
          }))
      }
    })
  }

  addReply() {
    console.log(this.user);
    this.entryVisa.commentVisaDeregistrations.push({
      "id": 0,
      "visaDeregistrationId": this.entryVisa.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if(this.entryVisa.commentVisaDeregistrations.length == 1){
      this.cr = "Comment";
    }else{
      this.cr = "Reply";
    }
  }


  save() {
    this.__loader__.showLoader();
    this.entryVisa.updatedBy = this.user.id;
    this.entryVisa.updatedDate = new Date();

    this.entryVisa.documentVisaDeregistrations = this.temporalDocument;

    let data_comment_aux = this.entryVisa.commentVisaDeregistrations;
    this.entryVisa.commentVisaDeregistrations = [];
    for(let i = 0; i < data_comment_aux.length; i++){
      if(data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != ''){
        data_comment_aux[i].user.profileUsers = [];
        this.entryVisa.commentVisaDeregistrations.push(data_comment_aux[i]);
      }
    }

    if(this.entryVisa.statusId == 4 || this.entryVisa.statusId == 5){
      this.entryVisa.serviceCompletionDate = new Date().toISOString();
    }
    console.log(JSON.stringify(this.entryVisa));

    this._services.service_general_put("ImmigrationServices/PutVisaDeregistration", this.entryVisa).subscribe((data => {
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.temporalDocument = [];
        this.ngOnInit();
        this.__loader__.hideLoader();
      }
    }))
  }

}
