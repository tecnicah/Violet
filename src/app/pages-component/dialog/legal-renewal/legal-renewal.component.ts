import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';

@Component({
  selector: 'app-legal-renewal',
  templateUrl: './legal-renewal.component.html',
  styleUrls: ['./legal-renewal.component.scss']
})
export class LegalRenewalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  calculo: any = {};
  settlingin: any = { documentLeaseRenewals: [] };
  user: any = {};
  cestatus: any[] = [];
  temporalDocument: any[] = [];
  table_payments: any[] = [];
  caDocumentType: any[] = [];
  caCountry: any[] = [];
  cr: string = "Reply";
  dataSourcePayment: any[] = [];
  displayedColumnsPayment: string[] = ['Payment', 'Amount', 'ManagementFee', 'WireFee', "AdvanceFee", 'Service', 'Recurrence', 'action'];

  mostrarTarjeta : any = {
    contractDetails: false,
    paymenType: false,
    costSaving: false,
    renewalDetails: false,
    departureDetails: false,
    landLord: false,
    repairs: false,
    move_in: false,
    move_out: false
  };
  //VARIABLES PARA LEASER SUMMARY//
  data_contracts:any = {};
  paymentHousings = [];
  costSavingHomes = [];
  data_renewal:any ={}
  data_departure:any = {}
  data_land:any = {
    creditCardLandLordDetails:[]
  };
  //VARIABLES PARA INSECTIONS & REPAIRS//
  data_move_in:any= {
    propertyReportSections: [],
      keyInventories: [],
      attendees: []
  };
  data_move_out:any= {
    propertyReportSections: [],
      keyInventories: [],
      attendees: []
  };
  serviceScope : any[] = [];


  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('data user', this.user);
    console.log("data que recibe modal: ", this.data);
    this._services.service_general_get('Catalogue/GetDocumentType/1').subscribe((data => {
      if (data.success) {
        this.caDocumentType = data.result;
        console.log(this.caDocumentType);
        this.__loader__.hideLoader();
      }
    }))
    this.catalogos();
  }
  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.settlingin.workOrderServices}&client=${this.data.data.partnerId }`).subscribe(resp => {
      if (resp.success) {
        debugger;
        console.log('Data ScopeService: ', resp);
        this.serviceScope = resp.result;
      }
    });
  }

  public ca_creditCard = [];
  public ca_property = [];
  public ca_currency = [];
  public ca_recurrence = [];
  public ca_payment_Type = [];
  public ca_responsible = [];
  public ca_accountType = [];
  public ca_propertySection = [];
  public ca_statuspropertySection = [];
  public ca_repair = [];
  public ca_relation = [];
  public SupplierCompany = [];
  public ca_privacy = [];
  async catalogos() {
    this.caCountry      = await this._services.getCatalogueFrom('GetCountry');
    this.ca_repair=await this._services.getCatalogueFrom('GetRepairType');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_statuspropertySection=await this._services.getCatalogueFrom('GetStatusPropertySection');
    //this.cestatus = await this._services.getCatalogueFrom('GetStatus');
    this._services.service_general_get("Catalogue/GetStatusWorkOrder?category=22").subscribe((data => {
      console.log(data);
      if (data.success) {
        this.cestatus = data.result;
      }
    }));
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_propertySection=await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_recurrence = duration.filter(function(E){
      if(E.recurrence != null){
         return true;
      }
    });
    this._services.service_general_get('RelocationServices/GetLeaseRenewalById?id=' + this.data.data.service[0].id).subscribe((data => {
      if (data.success) {
        this.settlingin = data.result;
        if (this.settlingin.commentLeaseRenewals.length == 0) {
          this.addReply();
        }
        console.log(this.settlingin);
        this.__loader__.hideLoader();
        this.get_payment();
        this.getDataDependent();
        this.getDataHousing();
        debugger;
        this.getServiceScope();
      }
    }))

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r=> {
      if(r.success) {
        for (let i=0; i < r.result.length; i++) {
          const element=r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r=> {
      if(r.success) {
        for (let i=0; i < r.result.length; i++) {
          const element=r.result[i];
          this.SupplierCompany.push(element)
        }
      }
    })
  }
  //***************************************************************//
  //CONSULTA DE REQUEST PAYMENT//
  get_payment() {
    this._services.service_general_get("RequestPayment/GetRequestedPayments?WorkOrderServicesId=" + this.settlingin.workOrderServices).subscribe((data => {
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
  //METODO PARA AGREGAR NUEVO PAYMENT//
  addPayment() {
    let data = {
      serviceRecord: this.data.data.serviceRecordId,
      sr: this.data.data.serviceRecordId,
      workOrderServices: this.settlingin.workOrderServices,
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
  //METODO PARA EDICION DE PAYMENT//
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
  //METODO PARA ELIMINAR PAYMENT//
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
  //***************************************************************//
  //FUNCION PARA AGREGAR COMENTARIOS//
  addReply() {
    console.log(this.user);
    this.settlingin.commentLeaseRenewals.push({
      "id": 0,
      "leaseRenewal": this.settlingin.id,
      "comment": null,
      "userId": this.user.id,
      "creationBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.settlingin.commentLeaseRenewals.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //***************************************************************//
  //METODOS PARA CARGA DE DOCUMENTOS//
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
                    "leaseRenewal": this.settlingin.id,
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
  //METODO PARA ELIMINAR DOCUMENTOS DE BASE DE DATOS//
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
        this._services.service_general_delete("RelocationServices/DeleteDocumentLeaseRenewal?id=" + id).subscribe((data => {
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
  //METODO PARA ELIMINAR DOCUMENTOS EN VARIABLE TEMPORAR//
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
  //METODO PARA AGREGAR DOCUMENTOS//
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
        result.leaseRenewal = this.settlingin.id;
        this.temporalDocument.push(result);
      }
    });
  }
  //METODO PARA OBTENER EL NOMBRE DEL DOCUMENTO//
  documentType(id) {
    for (let i = 0; i < this.caDocumentType.length; i++) {
      if (this.caDocumentType[i].id == id) {
        return this.caDocumentType[i].documentType;
      }
    }
  }
  //METODO PARA OBTENER EL NOMBRE DEL PAIS//
  countryOrigin(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].name;
      }
    }
  }
  //GET DATA DEPENDENT//
  public data_dependent:any = { name: '' };
  getDataDependent(){
    this._services.service_general_get('ServiceOrder/GetDeliverTo?wos=' + this.settlingin.workOrderServices).subscribe(r => {
      if (r.success) {
        this.data_dependent = r.result.value;
        console.log(this.data_dependent);
      }
    })
  }
  //***************************************************************//
  //METODOS PARA REMINDER//
  addRemminder() {
    if (this.settlingin.reminderLeaseRenewals) { } else {
      this.settlingin.reminderLeaseRenewals = [];
    }
    this.settlingin.reminderLeaseRenewals.push({
      "id": 0,
      "leaseRenewal": this.settlingin.id,
      "reminderDate": "",
      "reminderComments": "",
      "createdBy": this.user.id,
      "createdDate": new Date()
    })
  }
  //METODO PARA ELIMINAR REMINDER//
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
          this._services.service_general_delete("RelocationServices/DeleteReminderLeaseRenewal?id=" + item.id).subscribe((data => {
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
  //**************************************************************//
  //CONSULTA LA CASA PERMANENTE//
  public dataSourceHousing : any;
  getDataHousing() {
    this._services.service_general_get('HousingList/GetAllHousing/7?key=' + Number(this.data.data.workOrderId)).subscribe((data_housing) => {
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        this.permanent_homet(this.dataSourceHousing);
      }
    });
  }
  //**************************************************************//
  //CONSULTA DE CASA PERMANENTE//
  //**PERMANENT HOME**//
  permanentHome:any;
  data_inspection=[];
  data_repairs=[];
  data_home = [];
  permanent_homet(data){
      let permanentHome  = data.filter(function(E)  {
          if(E.status == "Permanent Home"){
             return true;
          }
      })
      console.log(permanentHome);
      this.data_home = permanentHome;
      for (let i = 0; i < permanentHome.length; i++) {
        this._services.service_general_get("HousingList/GetHousing?key="+permanentHome[i].id).subscribe((data => {
          this.permanentHome = data.result;
          console.log('esta es la casa permanente: ', this.permanentHome);
          this.data_contracts = this.permanentHome.contractDetail;
          this.paymentHousings = this.permanentHome.paymentHousings;
          this.costSavingHomes = this.permanentHome.costSavingHomes;
          this.data_renewal = this.permanentHome.renewalDetailHome;
          this.data_departure = this.permanentHome.departureDetailsHome;
          this.data_land = this.permanentHome.landlordDetailsHome;

          if(this.data_land.creditCardLandLordDetails){
            this.ca_creditCard.forEach(E => {
            for (let i = 0; i < this.data_land.creditCardLandLordDetails.length; i++) {
                if(this.data_land.creditCardLandLordDetails[i].creditCard == E.id){
                  E.checked = true;
                }
              }
            })
          }

          if(this.permanentHome.propertyReports) {
            for(let i=0; i < this.permanentHome.propertyReports.length; i++) {
              if(this.permanentHome.propertyReports[i].propertyInspection==1) {
                this.data_move_in=this.permanentHome.propertyReports[i];
              }
              if(this.permanentHome.propertyReports[i].propertyInspection==2) {
                this.data_move_out=this.permanentHome.propertyReports[i];
              }
            }
            console.log(this.data_move_in);
          }
          this.data_inspection = this.permanentHome.inspections;
          this.data_repairs = this.permanentHome.repairs;
        }))
      }
  }
  //**************************************************************//
  //DEPENDENT//
  public ca_dependent = [];
  get_dependent(){
    this._services.service_general_get('Catalogue/GetDependents?sr=' + Number(this.data.sr)).subscribe(data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_dependent = data.result;
      }
    });
  }
  //**************************************************************//
  getProperty_(id){
    for (let i = 0; i < this.ca_property.length; i++) {
      if(this.ca_property[i].id == id){
         return this.ca_property[i].propertyType;
      }
    }
  }
  //**************************************************************//
  //Currency//
  getCurrency(id){
    for (let i = 0; i < this.ca_currency.length; i++) {
      if(this.ca_currency[i].id == id){
         return this.ca_currency[i].currency;
      }
    }
  }
  //**************************************************************//
  //Recurrencia//
  getRecurrence(id){
    for (let i = 0; i < this.ca_recurrence.length; i++) {
      if(this.ca_recurrence[i].id == id){
         return this.ca_recurrence[i].recurrence;
      }
    }
  }
  //**************************************************************//
  //Payment//
  getPayment(id){
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if(this.ca_payment_Type[i].id == id){
         return this.ca_payment_Type[i].paymentType;
      }
    }
  }
  //**************************************************************//
  //Responsable//
  getResponsable(id){
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if(this.ca_responsible[i].id == id){
         return this.ca_responsible[i].responsable;
      }
    }
  }
  //**************************************************************//
  //DEPENDENT//
   getDependent(id){
    for (let i = 0; i < this.ca_dependent.length; i++) {
      if(this.ca_dependent[i].id == id){
         return this.ca_dependent[i].name;
      }
    }
  }
  //**************************************************************//
  //ACCOUNT//
  getAccount(id){
    for (let i = 0; i < this.ca_accountType.length; i++) {
      if(this.ca_accountType[i].id == id){
         return this.ca_accountType[i].accountType;
      }
    }
  }
  //**************************************************************//
  //Seccion property//
  getProperty(id){
    for (let i = 0; i < this.ca_propertySection.length; i++) {
      if(this.ca_propertySection[i].id == id){
         return this.ca_propertySection[i].propertySection;
      }
    }
  }
  //Seccion property//
  getCondicion(id){
      for (let i = 0; i < this.ca_statuspropertySection.length; i++) {
        if(this.ca_statuspropertySection[i].id == id){
           return this.ca_statuspropertySection[i].status;
        }
      }
  }
  //RELATION SHIP//
  getReltion(id){
    for (let i = 0; i < this.ca_relation.length; i++) {
      if(this.ca_relation[i].id == id){
         return this.ca_relation[i].relationship;
      }
    }
  }
  //Repair//
  getRepair(id){
    for (let i = 0; i < this.ca_repair.length; i++) {
      if(this.ca_repair[i].id == id){
         return this.ca_repair[i].repairType;
      }
    }
  }
  //Supplier//
  getSupplier(id){
    for (let i = 0; i < this.SupplierCompany.length; i++) {
      if(this.SupplierCompany[i].int == id){
         return this.SupplierCompany[i].supplierCompany;
      }
    }
  }
  //**************************************************************//
  //METODO PARA AGREGAR HOUSING//
  HomeDetailsnew() {
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.data.data.workOrderId,
        workOrderServicesId: this.settlingin.workOrderServices,
        numberWorkOrder: this.data.data.numberWorkOrder,
        serviceID: this.data.data.number_server,
        serviceName: this.data.data.service_name,
        service: this.data.data.serviceRecordId,
        serviceTypeId: this.data.data.serviceTypeId,
        sr: this.data.sr,
        supplierType: 3,
        supplierPartner: null
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }
  //METODO PAR EDICION DE HOUSING//
  editHousing() {
    this.data_propiedad.supplierType = 3
    this.data_propiedad.workOrderServicesId = this.settlingin.workOrderServices,
    this.data_propiedad.sr = this.data.sr;
    this.data_propiedad.numberWorkOrder = this.data.data.numberWorkOrder;
    this.data_propiedad.serviceID = this.data.data.number_server;
    this.data_propiedad.serviceName = this.data.data.service_name;
    console.log("Editar Housing: ", this.data_propiedad);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: this.data_propiedad,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }

  public data_propiedad : any;
  dataHousing(item){
     this.data_propiedad = item;
  }
  //**************************************************************//
  //METODO PARA GUARDAR INFORMACION//
  save() {
    this.settlingin.updateBy = this.user.id;
    this.settlingin.updatedDate = new Date();
    this.settlingin.documentLeaseRenewals = this.temporalDocument;
    this.__loader__.showLoader();

    let data_comment_aux = this.settlingin.commentLeaseRenewals;
    this.settlingin.commentLeaseRenewals = [];

    this.settlingin.serviceCompletionDate = this.settlingin.statusId == "4"
      ? this.settlingin.serviceCompletionDate != null ? this.settlingin.serviceCompletionDate : new Date() 
      : "" ;

    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.settlingin.commentLeaseRenewals.push(data_comment_aux[i]);
      }
    }


    console.log(this.settlingin);
    debugger;
    this.temporalDocument = [];
    this._services.service_general_put("RelocationServices/PutLeaseRenewal", this.settlingin).subscribe((data => {
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
        sl:1,
        name_section: "only_one_service"
      }
    });
  }

  editHousing_(permanentHome){
    console.log(permanentHome);
    permanentHome.supplierType = 3
    permanentHome.workOrderServicesId = this.settlingin.workOrderServices,
    permanentHome.sr = this.data.sr;
    permanentHome.numberWorkOrder = this.data.data.numberWorkOrder;
    permanentHome.serviceID = this.data.data.number_server;
    permanentHome.serviceName = this.data.data.service_name;
    console.log("Editar Housing: ", permanentHome);
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: permanentHome,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
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

  setProperty(event: any){
    console.log("setProperty",event);
  }

}
