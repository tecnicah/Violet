import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogPaymentRentalComponent } from '../dialog-payment-rental/dialog-payment-rental.component';


@Component({
  selector: 'app-dialog-rental-furniture',
  templateUrl: './dialog-rental-furniture.component.html',
  styleUrls: ['./dialog-rental-furniture.component.scss']
})
export class DialogRentalFurnitureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

  info:any[] = [];
  infomain:any[] = [];
  main:any[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = ['Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  showPanelSchooling: boolean = false;
  user: any = {};
  cestatus: any[] = [];
  cacontractType: any[] = [];
  caSize: any[] = [];
  caMetric: any[] = [];
  caRelationship: any[] = [];
  caLanguages: any[] = [];
  caCountry: any[] = [];
  caAmenity: any[] = [];
  caCurrency: any[] = [];
  caNumbers: any[] = [];
  caPaymentType: any[] = [];
  caSupplier: any[] = [];
  caDuration: any[] = [];
  table_payments: any[] = [];
  ca_requestType: any[] = [];
  nacionality: any;
  ca_document: any;
  supplier_get:any[]=[];
  temporalDocument: any[] = [];
  allUser: any[] = [];
  payments: any[] = [];
  calculo : any = {};
  cr: string = "Reply";
  rentalData: any = {};
  extensionToggle: boolean = false;
  minDate: Date = new Date();
  public __loader__: LoaderComponent= new LoaderComponent();
  show: boolean = false;
  serviceScope = null;


  ngOnInit(): void {
    //console.log(this.data);
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    for (let i = 1; i < 11; i++) {
      this.caNumbers.push(i)
    }

    this._services.service_general_get('RelocationServices/GetRentalFurnitureCoordinationById?id=' + this.data.data.service[0].id).subscribe(r => {
      if (r.success) {
        this.rentalData = r.result;
        console.log("GetRentalFurnitureCoordinationById ===========",this.rentalData);
        if (this.rentalData.stayExtensionRentalFurnitureCoordinations.length > 0) {
          this.rentalData.extensionToggle = true;
          this.showPanelSchooling = true;
        }else{
          this.showPanelSchooling = false;
          this.rentalData.extensionToggle = false;
        }

        if (this.rentalData.commentRentalFurnitureCoordinations.length == 0) {
          this.addReply();
        }

        this._services.service_general_get('User').subscribe(r => {
          this.allUser = r.result;
        })
       // this.get_payment();
        this.getServiceScope();
        

      }
      this.get_SupplierType();
      this._supplier();
      this.show = true;
      this.__loader__.hideLoader();

    })

    this.catalogos();

  }
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.rentalData.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
      if (resp.success) {
        //console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }
  public __serverPath__:string = this._services.url_images;
  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }

   //Responsable//
   getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }

  ca_currency = [];
  //CURRENCY//
  getCurrency(id) {
    this.ca_currency = this.caCurrency;
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  }

  get_SupplierType(){
    //debugger;
      //this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=' + this.rentalData.workOrderServicesId+'&supplierType='+12+'&serviceLine=2').subscribe(r => {
      this._services.service_general_get("SupplierPartnerProfile/GetServiceProviderByServiceId?workOrderService="+ this.rentalData.workOrderServicesId).subscribe(r => {
       //debugger;
        if (r.success) {
        this.supplier_get = r.result.value;
        //console.log("this.supplier_get ===================",this.supplier_get);
        this.getInfo();
        this.getMain();
      }
    })
  }

  // get_supplierPartner(){
  //   //   //console.log(" datos a enviar supplier ============", this.housing_model.workOrderServicesId, this.data)
  //      this._services.service_general_get("SupplierPartnerProfile/GetServiceProviderByServiceId?workOrderService="+ this.housing_model.workOrderServicesId).subscribe((data => {
  //     // this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
  //        if (data.success) {
  //          //console.log('DATA CONSULTA SUPPLIER PARTNER: ',data.result.value);
  //          this.services_catalogue = data.result.value;
  //         }
  //      }), (err)=>{
  //        //console.log("no se realizo la consulta por falta de parametro");
  //      });
  //    }
  ca_payment= [];
  ca_responsible = [];
  public ca_privacy = [];
  async catalogos() {
    //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=18").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.cestatus = data.result;
      }
    }));
    this.ca_payment = await this._services.getCatalogueFrom('GetPaymentMethod');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
    this.caPaymentType = await this._services.getCatalogueFrom('GetPaymentType');
    this.caSupplier = await this._services.getCatalogueFrom('GetSupplier');
    this.caDuration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_requestType = await this._services.getCatalogueFrom('GetRequestType');
    this.nacionality = await this._services.getCatalogueFrom('GetCountry');
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get("Catalogue/GetDocumentType/1").subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.ca_document = data.result;
      }
    }))
    this._services.service_general_get("ServiceRecord/GetApplicant/" + this.data.sr).subscribe((data => {
      //console.log(data);
      if (data.success) {
        this.caRelationship = data.applicant.value;
      }

    }))
  }

  addPaymentType() {
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'insertar';
    this.data.id = 0;
    this.data.idRentalFurniture = this.rentalData.id;
    const dialog = this._dialog.open(DialogPaymentRentalComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      
      console.log("elemento guardado de payment: ", result);
      setTimeout(() => {
        this.ngOnInit();
      }, 1000);
      
    });
  }

  //EDICION//

  paymentSchooling = [];
  editPaymentType(element, i) {
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'edicion';
    this.data.i = i;
    this.data.pago = element;
    const dialog = this._dialog.open(DialogPaymentRentalComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento guardado de payment: ", result);
      this.ngOnInit();
    });
  }


  displayPanel($event) {
    this.rentalData.extensionToggle = $event.checked;
    if (this.rentalData.extensionToggle) {
      this.showPanelSchooling = true;
      //console.log(this.showPanelSchooling);
      if(this.rentalData.stayExtensionRentalFurnitureCoordinations.length == 0){
        this.addExtencion();
      }
    } else {
      this.showPanelSchooling = false;
      //console.log(this.showPanelSchooling);
    }
  }


  addExtencion() {
    this.rentalData.stayExtensionRentalFurnitureCoordinations.push({
      id: 0,
      rentalFurnitureCoordinationId: this.rentalData.id,
      initialDate: "",
      finalDate: "",
      comment: "",
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date()
    })
  }

  addReply() {
    this.rentalData.commentRentalFurnitureCoordinations.push({
      "id": 0,
      "rentalFurnitureCoordinationId": this.rentalData.id,
      "reply": "",
      "userId": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.rentalData.commentRentalFurnitureCoordinations.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }

  addReminder() {
    this.rentalData.reminderRentalFurnitureCoordinations.push({
      "id": 0,
      "rentalFurnitureCoordinationId": this.rentalData.id,
      "reminderDate": "",
      "reminderComments": "",
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date()
    })
  }

  //**DELETE REMINDER**//
  removeReminder(i, id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Reminder?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        if (id == 0) {
          this.rentalData.reminderRentalFurnitureCoordinations.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderRFC?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Reminder deleted"
                },
                width: "350px"
              });
              this.ngOnInit();
            }
          }))
        }
      }
    })
  }


  addDocument() {
    this.data.typeDocument = 1;
    this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogDocumentsRelocationComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result.success) {
        result.rentalFurnitureCoordinationId = this.rentalData.id;
        this.temporalDocument.push(result);
      }
    });
  }

  deleteDocument_DB(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        this._services.service_general_delete("RelocationServices/DeleteDocumentRFC?id=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: data.result
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    });
  }

  deleteDocument_LOCAL(position){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result) {
        this.temporalDocument.splice(position, 1);
      }
    })
  }

  //DOCUMENT TYPE//
  getDocument(id) {
    for (let i = 0; i < this.ca_document.length; i++) {
      if (this.ca_document[i].id == id) {
        return this.ca_document[i].documentType;
      }
    }
  }
  //NACIONALITY//
  getNacionality(id) {
    for (let i = 0; i < this.nacionality.length; i++) {
      if (this.nacionality[i].id == id) {
        return this.nacionality[i].name;
      }
    }
  }

  getInfo(){
    for (let i = 0; i < this.supplier_get.length; i++) {
      if(this.supplier_get[i].id == this.rentalData.supplierPartner){
        this.info = this.supplier_get[i];
        //console.log(this.info);
      }
    }
  }

  Supplier:any[] = [];

  _supplier(){
    if(this.rentalData.supplierPartner != null && this.rentalData.supplierPartner != 0)
    {
   //console.log("Entre a _supplier ==========",this.rentalData.supplierPartner, +this.rentalData.workOrderServicesId)
     this._services.service_general_get("SupplierPartnerProfile/GetAdmintContactsServiceProv?supplierPartner="+ this.rentalData.supplierPartner+"&workOrderService="+this.rentalData.workOrderServicesId).subscribe((data => {
       // this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierPartner="+this.data.supplierPartner+"&supplierType="+this.data.supplierType).subscribe((data => {
          if (data.success) {
            //console.log('DATA CONSULTA SUPPLIER: ',data.result.value);
            this.Supplier = data.result.value;
           }
        }),(err)=>{
          //console.log("No se realizo la consulta por falta de parametros");
        });
    }
 }

  getInfoMain(){
    for (let i = 0; i < this.main.length; i++) {
      if(this.main[i].id == this.rentalData.mainContact){
        this.infomain = this.main[i];
        //console.log(this.infomain);
      }
    }
  }

  getMain(){
    //debugger;
    // this._services.service_general_get("SupplierPartnerProfile/GetAdministrativeContactsServiceBySupplierPartner?workOrderService=" + this.rentalData.workOrderServicesId + "&supplierPartner=" + this.rentalData.supplierPartner).subscribe((data => {
    //   if (data.success) {
    //     this.main = data.result.value;
    //     this.getInfoMain();
    //   }
    // }))
  }

  public showDocumentDialogDetails( document:any, service_line:number = undefined ):void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        name_section: "only_one_service",
        sl: 1
      }
    });
  }

  save() {
    //console.log("SAVE INFORMATION: ", this.rentalData);
    this.__loader__.showLoader();
    this.rentalData.documentRentalFurnitureCoordinations = this.temporalDocument;
    this.rentalData.updateBy = this.user.id;
    this.rentalData.updatedDate = new Date();
    this.rentalData.createdBy = this.user.id;
    this.rentalData.createdDate = new Date();

    let data_comment_aux =  this.rentalData.commentRentalFurnitureCoordinations;
    this.rentalData.commentRentalFurnitureCoordinations = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.rentalData.commentRentalFurnitureCoordinations.push(data_comment_aux[i]);
      }
    }

    this.rentalData.serviceCompletionDate = this.rentalData.statusId == "4"
      ? this.rentalData.serviceCompletionDate != null? this.rentalData.serviceCompletionDate :  new Date() 
      : "" ;

    //console.log(this.rentalData);
    this.temporalDocument = [];
    this.__loader__.showLoader();
    this._services.service_general_put("RelocationServices/PutRentalFurnitureCoordinaton", this.rentalData).subscribe((data => {
      if (data.success) {
        //console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close();
        this.__loader__.hideLoader();
        this.ngOnInit();
      }
    }))
    this.__loader__.hideLoader();
  }

   //PRIVACY//
   getPrivacyName(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
        // return this.applicant[i].name + ' / ' + this.applicant[i].relationship;
      }
    }
  }
}
