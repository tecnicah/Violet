import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';

@Component({
  selector: 'app-settling-in',
  templateUrl: './settling-in.component.html',
  styleUrls: ['./settling-in.component.scss']
})
export class SettlingInComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }

  calculo: any = {};
  vista: boolean = false;
  settlingin: any = {};
  user: any = {};
  cestatus: any[] = [];
  temporalDocument: any[] = [];
  table_payments: any[] = [];
  ca_requestType: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cRequestType: any[] = [];
  allUser: any[] = [];
  CleaningCompanySupplier: any[] = [];
  ChildCareCompanySupplier: any[] = [];
  ChildCareSupplier: any[] = [];
  ChildPArtner: any[] = [];
  CleaningCompanyPartner: any[] = [];
  cr: string = "Reply";
  dataSource: any[] = [];
  displayedColumns: string[] = ['Requested By', 'Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];
  serviceScope: any[] = [];
  public today = new Date();


  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('datat user', this.user)
    this.catalogos();

  }
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.settlingin.workOrderServicesId}&client=${this.data.data.partnerId }`).subscribe(resp => {
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
  ca_privacy = [];
  async catalogos() {
    this.__loader__.showLoader();
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=14").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.cestatus = data.result;
      }
    }))


    this._services.service_general_get('User').subscribe(r => {
      this.allUser = r.result;
    })

    this._services.service_general_get('RelocationServices/GetSettlingInById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.settlingin = data.result;
        this.get_supplierPartner();
        this.get_supplierPartnerClean();

        this.vista = true;
        if (this.settlingin.commentSettlingIns.length == 0) {
          this.addReply();
        }
        console.log('data settling', this.settlingin);
        this.__loader__.hideLoader();
        this.get_payment();
        this.getServiceScope();

      }
    }))

    /*
    this._services.service_general_get('Catalogue/GetSupplierCompany?id=15').subscribe(r => {
      if (r.success) {
        this.CleaningCompanySupplier = r.result;
      }
    })

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=15').subscribe(r => {
      if (r.success) {
        this.ChildCareSupplier = r.result;
      }
    })
    */


    this.documentoscatalogos();

  }
  async documentoscatalogos() {
    //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.caDocumentType = data.result;
        console.log(this.caDocumentType);
      }
    }))
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');

  }

  //**CONSULTA SUPPLIER PARTNER**//

  // select child care
  get_supplierPartner() {
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.settlingin.workOrderServicesId + "&supplierType=22&serviceLine=2").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.CleaningCompanySupplier = data.result.value;
      }
    }))
  }
  // select cleaning services
  get_supplierPartnerClean() {
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService=" + this.settlingin.workOrderServicesId + "&supplierType=15&serviceLine=2").subscribe((data => {
      console.log('supplier partner',data);
      if (data.success) {
        this.ChildCareCompanySupplier = data.result.value;
      }
    }))
  }

  ///Documents catalogos

  documentType(id) {
    for (let i = 0; i < this.caDocumentType.length; i++) {
      if (this.caDocumentType[i].id == id) {
        return this.caDocumentType[i].documentType;
      }
    }
  }

  countryOrigin(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].name;
      }
    }
  }

  getChildPArtner(supplierTypeId) {
    this._services.service_general_get('Catalogue/GetSupplierBySupplierType?key=' + supplierTypeId).subscribe(r => {
      if (r.success) {
        this.ChildPArtner = r.result;
      }
    })
  }

  getCleaningCompanyPartner(supplierTypeId) {
    this._services.service_general_get('Catalogue/GetSupplierBySupplierType?key=' + supplierTypeId).subscribe(r => {
      if (r.success) {
        this.CleaningCompanyPartner = r.result;
      }
    })
  }

  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServicesId).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        this.calculo = data.result.value;
        this.calculo.total = this.calculo.ammountSubTotal + this.calculo.managementFeeSubTotal + this.calculo.wireFeeSubTotal + this.calculo.advanceFeeSubTotal;
        this.table_payments = data.result.value.payments;
        console.log(this.table_payments);
      }
      console.log(this.table_payments);
    }))
  }
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.settlingin.commentSettlingIns.push({
      "id": 0,
      "settlingInId": this.settlingin.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.settlingin.commentSettlingIns.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }

  //**********************************************************************************//
  //**METHODS PAYMENTS (NEW PAYMENT)**//
  addPayment() {
    let data = {
      serviceRecord: this.data.data.serviceRecordId,
      sr: this.data.data.serviceRecordId,
      workOrderServices: this.settlingin.workOrderServicesId,
      workOrder: this.data.data.workOrderId,
      service: this.data.data.id_server,
      id: 0,
      type: 2,
      supplierType: 3
    }
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_payment();
    });
  }
  //**EDIT REQUEST PAYMENT**//
  editPayment(data) {
    data.type = 2;
    data.supplierType = 3;
    data.id = data.requestPaymentId;
    data.serviceRecord = this.data.data.serviceRecordId;
    data.sr = this.data.data.serviceRecordId;
    data.service = this.data.data.id_server;
    const dialogRef = this._dialog.open(DialogRequestPaymentNewComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_payment();
    });
  }

  deletePaymentConcept(data) {
    const dialogRef = this._dialog.open(DialogDeletepaymentconceptComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result.success) {
        this._services.service_general_delete("RequestPayment/DeletePaymentConcept/" + data.id + "/" + result.type).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: data.message
              },
              width: "350px"
            });
            this.get_payment();
          }
        }))
      }
    })
  }
  //**********************************************************************************//
  //documents
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

              const dialogRef = this._dialog.open(DialogDocumentsComponent, {
                data: {
                  sr: this.data.sr
                },
                width: "95%"
              });

              dialogRef.afterClosed().subscribe(result => {
                if (result.success) {
                  this.temporalDocument.push({
                    "id": 0,
                    "fileRequest": encoded,
                    "fileExtension": ext[1],
                    "documentType": result.documentType,
                    "relationship": result.relationship,
                    "issueDate": result.issueDate,
                    "expirationDate": result.expirationDate,
                    "issuingAuthority": result.issuingAuthority,
                    "countryOrigin": result.countryOrigin,
                    "comment": result.comment,
                    "settlingInId": this.settlingin.id,
                    "createdBy": this.user.id,
                    "createdDate": new Date()
                  })
                }
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

  //reminders

  addRemminder() {
    if (this.settlingin.reminderSettlingIns) { } else {
      this.settlingin.reminderSettlingIns = [];
    }
    this.settlingin.reminderSettlingIns.push({
      "id": 0,
      "settlingInId": this.settlingin.id,
      "reminderDate": "",
      "reminderComments": "",
      "createdBy": this.user.id,
      "createdDate": new Date()
    })
  }

  deletereminder(i, item) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Reminder?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (item.id == 0) {
          this.settlingin.reminderSettlingIns.splice(i, 1);
        } else {
          this._services.service_general_delete("RelocationServices/DeleteReminderSI?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Reminder delete"
                },
                width: "350px"
              });
            }
            this.ngOnInit();
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
        this._services.service_general_delete("RelocationServices/DeleteDocumentSI?id=" + id).subscribe((data => {
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

  DeleteOnlineof(i) {
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
        this.temporalDocument.splice(i, 1);
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
      console.log(result);
      if (result.success) {
        result.settlingInId = this.settlingin.id;
        this.temporalDocument.push(result);
      }
    });
  }


  save() {
    this.settlingin.updateBy = this.user.id;
    this.settlingin.updatedDate = new Date();
    this.settlingin.documentSettlingIns = this.temporalDocument;
    this.__loader__.showLoader();

    let data_comment_aux = this.settlingin.commentSettlingIns;
    this.settlingin.commentSettlingIns = [];

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].reply != null && data_comment_aux[i].reply != undefined && data_comment_aux[i].reply.trim() != '') {
        this.settlingin.commentSettlingIns.push(data_comment_aux[i]);
      }
    }
    // si el estatus cambia a complete la fecha se guarda
    if (this.settlingin.statusId == 4 || this.settlingin.statusId == 5) {
      this.settlingin.serviceCompletionDate = new Date().toISOString();
    }
    else {
      this.settlingin.serviceCompletionDate = '';
    }

    console.log(this.settlingin);
    this.temporalDocument = [];
    this._services.service_general_put("RelocationServices/PutSettlingIn", this.settlingin).subscribe((data => {
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
        this.ngOnInit();
        this.__loader__.hideLoader();
      }
    }), (err) => {
      console.log("error: ", err);
      this.__loader__.hideLoader();
    })
  }

  public showDocumentDialogDetails(document: any, service_line: number = undefined): void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        sl: 1 ,
        name_section: "only_one_service"
      }
    });
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
