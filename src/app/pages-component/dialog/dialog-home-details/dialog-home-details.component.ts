import { isNgTemplate } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogAddAppointmentComponent } from '../dialog-add-appointment/dialog-add-appointment.component';
import { DialogChangeStatusComponent } from '../dialog-change-status/dialog-change-status.component';
import { DialogHistoryStatusComponent } from '../dialog-history-status/dialog-history-status.component';
import { DialogPropertyReportComponent } from '../dialog-property-report/dialog-property-report.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogInspectionrepairsComponent } from '../dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogLeaseSummaryComponent } from '../dialog-lease-summary/dialog-lease-summary.component';

@Component({
  selector: 'app-dialog-home-details',
  templateUrl: './dialog-home-details.component.html',
  styleUrls: ['./dialog-home-details.component.css']
})

export class DialogHomeDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _services: ServiceGeneralService,
              public _dialog: MatDialog) {}

  public __loader__: LoaderComponent = new LoaderComponent();

  encabezado:any;
  caAmenity:             any[] = [];
  caStatus:              any[] = [];
  caPropertyTypeHousing: any[] = [];
  caNumbers:             any[] = [];
  caCurrency:            any[] = [];
  Home_Details:          any;
  user:                  any   = {};
  aux_amenitis          :any[] = [];
  SupplierCompany       :any[] = [];
  Supplier              :any[] = [];
  housingList:           any;
  propertyReports:       any = {};
  temporalDocument:      any[] = [];
  cr: string = "Reply";
  newEstatus: boolean = false;
  wos: any[] = [];
  services: any[] = [];
  statusSent: any = {};
  //***********************************************************************************************************//
  ngOnInit() {
    this.__loader__.showLoader();
    console.log("data recibida del modal: ", this.data);
    this.encabezado = this.data;
    this.SupplierCompany = [];
    this.Supplier = [];
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.housingList = this.data.id;
    this.newEstatus = false;
    if(this.data.id != 0){
      this._services.service_general_get("HousingList/GetHousing?key="+this.data.id).subscribe((data => {
        console.log("REGISTRO A EDITAR: ",data);
        if(data.success){
          let aux = this.data;
          this.data = data.result;
          this.data.sr = aux.sr;
          this.data.workOrderServicesId = aux.workOrderServicesId;
          this.data.supplierType = aux.supplierType;
          console.log(this.data);
          this.aux_amenitis = this.data.amenitiesHousingLists;
           if(this.data.commentHousings.length == 0){
             this.addreply(2);
           }

          this._services.service_general_get('PropertyReport/GetPropertyReportByHosuing?id='+this.data.id).subscribe(r=>{
            if(r.success){
              console.log(r);
              this.propertyReports = r.result;
            }
          })
          this.catalogos();
          this.supplierPartner();
          this._supplier();
        }
      }))
    }else{
      this.data.commentHousings = [];
      this.__loader__.hideLoader();
      this.catalogos();
      this.supplierPartner();
      this._supplier();
      this.addreply(1);
    }

  }

  viewHistory(){
    const dialog = this._dialog.open(DialogHistoryStatusComponent, {
      data: this.data,
      width: "90%"
    });

    dialog.beforeClosed().subscribe(r=>{
    })
  }

  ChangeStatus(item){
    this.newEstatus = true;
    this.statusSent = {
      "id": 0,
      "status": item.id,
      "housingId": this.data.id,
      "comment": "",
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      name: item.status
    }
  }
  //***********************************************************************************************************//
  checkAllSelected(event, data_, i){
    console.log("entra",event.checked);
    console.log("data", data_);
    if(event.checked){
      this.aux_amenitis.push({
        "housingList": this.data.id,
        "amenitie": data_.id
      });
    }else{
       this.aux_amenitis.splice(i,1);
    }
    console.log(this.aux_amenitis);
  }
  //***********************************************************************************************************//
  async catalogos() {
    this.caAmenity             = await this._services.getCatalogueFrom('GetAmenity');
    this.caStatus              = await this._services.getCatalogueFrom('GetStatusHousing');
    this.caPropertyTypeHousing = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.caCurrency            = await this._services.getCatalogueFrom('GetCurrency');

     for (let i = 0; i < 11; i++) {
       this.caNumbers.push(i);
     }

     this.caAmenity.forEach(E => {
      E.checked = false;
     });

     this.caAmenity.forEach(E => {
       E.checked = false;
       for(let i = 0; i < this.aux_amenitis.length; i++){
         if(E.id == this.aux_amenitis[i].amenitie){
            E.checked = true;
         }
       }
     });

     /*
     this._services.service_general_get('SupplierPartnerProfile/GetAdministrativeContactsServiceBySupplierPartner?workOrderService='+this.encabezado.workOderServicesId+'&supplierPartner=1').subscribe(r =>{
        if(r.success){
          console.log("Respuesta de supplier partner: ", r);
          //this.SupplierCompany = r.result.value;
        }
      })

      this._services.service_general_get('SupplierPartnerProfile/GetConsultantContactsService?supplierPartner=1&supplierType=3').subscribe(r =>{
        if(r.success){
          console.log("Respuesta de supplier: ", r);
          //this.Supplier = r.result.value;
        }
      })
      */
     /*
     this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r=>{
       if(r.success){
          for (let i = 0; i < r.result.length; i++) {
            const element = r.result[i];
            this.SupplierCompany.push(element)
          }
       }
     })

     this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r=>{
      if(r.success){
         for (let i = 0; i < r.result.length; i++) {
           const element = r.result[i];
           this.SupplierCompany.push(element)
         }
      }
    })

    this._services.service_general_get('Catalogue/GetSupplierBySupplierType?key=2').subscribe(r =>{
      if(r.success){
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.Supplier.push(element)
        }
      }
    })

    this._services.service_general_get('Catalogue/GetSupplierBySupplierType?key=5').subscribe(r =>{
      if(r.success){
        for (let i = 0; i < r.result.length; i++) {
          const element = r.result[i];
          this.Supplier.push(element)
        }
      }
    })
    */
    this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id='+this.data.sr+'&service_line_id=2').subscribe(r =>{
      if(r.success){
        this.wos = r.result.value;
      }
    })
    this.__loader__.hideLoader();
    this.getServices();
  }

  supplierPartner(){
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ',data.result.value);
        this.SupplierCompany = data.result.value;
       }
    }), (err)=>{
      console.log("no se realizo la consulta por falta de parametro");
    });
  }


  _supplier(){
    this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierPartner="+this.data.supplierPartner+"&supplierType="+this.data.supplierType).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER: ',data.result.value);
        this.Supplier = data.result.value;
       }
    }),(err)=>{
      console.log("No se realizo la consulta por falta de parametros");
    });
  }

  getServices(){
    console.log("entra a traer servicios: ===>");
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo='+this.data.workOrder).subscribe(r =>{
      if(r.success){
        this.services = r.result.value;
      }
    })
  }

  getPropertyname(id){
    for (let i = 0; i < this.caPropertyTypeHousing.length; i++) {
      const element = this.caPropertyTypeHousing[i];
      if(element.id == id){
        return element.propertyType;
      }

    }
  }

   getCurrencyName(currency){
    for (let i = 0; i < this.caCurrency.length; i++) {
      const element = this.caCurrency[i];
      if(element.id == currency){
        return element.currency;
      }
    }
  }
  //***********************************************************************************************************//
  addPropertyReport(){
    const dialogRef = this._dialog.open(DialogPropertyReportComponent, {
      data: {serviceOrder: this.data.sr, id: 0, propertyAddress: this.data.address, zipCode: this.data.zip, housingList: this.housingList},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  viewPropertyReport(){
    const dialogRef = this._dialog.open(DialogPropertyReportComponent, {
      data: {serviceOrder: this.data.sr, id: this.propertyReports.id, propertyAddress: this.data.address, zipCode: this.data.zip, housingList: this.housingList},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  temporalComment = [];
  addreply(type){
    if(type == 2){
      this.temporalComment.push({
        "id": 0,
        "housingId": this.data.id,
        "comment": '',
        "creationBy": this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "updatedDate": new Date(),
        "user": this.user
      })
    }else{
      this.data.commentHousings.push({
        "id": 0,
        "housingId": this.data.id,
        "comment": '',
        "creationBy": this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "updatedDate": new Date(),
        "user": this.user
      })
    }
    if(this.data.commentHousings.length == 1){
      this.cr = "Comment";
    }else{
      this.cr = "Reply";
    }
  }
  //***********************************************************************************************************//
  addDocument(){
    document.getElementById('docUpload').click();
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
              this.temporalDocument.push({
                "id": 0,
                "housingId": this.data.id,
                "fileName": droppedFile.relativePath,
                "filePath": encoded,
                "fileExtension": ext[1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date()
              })
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
  //***********************************************************************************************************//
  save(){
    this.data.housingReports = [];
    if(!this.data.paymentHousings){
      this.data.paymentHousings = [];
    }
    if(!this.data.costSavingHomes){
      this.data.costSavingHomes = [];
    }
    if(!this.data.contractDetail){
      this.data.contractDetail = {};
    }
    if(!this.data.departureDetailsHome){
      this.data.departureDetailsHome = {};
    }
    if(!this.data.landlordDetailsHome){
      this.data.landlordDetailsHome = {};
    }
    if(!this.data.renewalDetailHome){
      this.data.renewalDetailHome = {};
    }
    if(!this.data.repairs){
      this.data.repairs = [];
    }
    if(!this.data.inspections){
      this.data.inspections = [];
    }
    if(!this.data.propertyReports){
      this.data.propertyReports = [];
    }
    this.post_new();
  }

  post_new(){

    console.log(this.data);

    this.__loader__.showLoader();
    let data_comment_aux = this.data.commentHousings;
    this.data.commentHousings = [];
    for(let i = 0; i < data_comment_aux.length; i++){
      if(data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != ''){
        this.data.commentHousings.push(data_comment_aux[i]);
      }
    }

    if(this.data.id === 0){
      this.data.createdBy   = this.user.id;
      this.data.createdDate = new Date();
      this.data.updateBy    = this.user.id;
      this.data.updatedDate = new Date();
      this.data.amenitiesHousingLists = this.aux_amenitis;
      this.data.documentHousings = this.temporalDocument;

      let property_report = this.data;
      let reports = property_report.propertyReports;
      let aux_report = [];
      this.data = {};
      for (let i = 0; i < reports.length; i++) {
        if(reports[i].id == 0 ){
          aux_report.push(reports[i]);
        }
      }
      property_report.propertyReports =  aux_report;
      this.data = property_report;
      console.log("Data a guardar: ", this.data);

      this._services.service_general_post_with_url('HousingList/PostHousing',this.data).subscribe((r =>{
        if(r.success){
          console.log(r)
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Insert Data"
            },
            width: "350px"
          });
          this.ngOnInit();
          this.temporalDocument = [];
          this.dialogRef.close();
          this.__loader__.hideLoader();
        }
      }),(err)=>{
        this.__loader__.hideLoader();
        console.log("error: ", err);
      })
    }
  }
  //***********************************************************************************************************//
  inspection(){
    console.log("ABRE MODAL inspection: ", this.data);
    if(this.data.id == 0){
      this.data.status_ = 'nuevo';
    }
    const dialog = this._dialog.open(DialogInspectionrepairsComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(r=>{
      console.log(r);
      this.data.propertyReports = [];
      if(r.repairs){
        this.data.repairs = r.repairs;
      }else{
        this.data.repairs = [];
      }

      if(r.inspection){
        this.data.inspections = r.inspection;
      }else{
        this.data.inspections = [];
      }

      if(r.propertyReportSections){
        this.data.propertyReports.push(r.propertyReportSections);
      }else{
        this.data.propertyReports = [];
      }

      if(r.propertyReportSectionsOut){
        this.data.propertyReports.push(r.propertyReportSectionsOut);
      }else{
        this.data.propertyReports = [];
      }

    })
  }
  //***********************************************************************************************************//
  lease(){
    console.log("ABRE MODAL LEASE: ", this.data);
    if(this.data.id == 0){
       this.data.nuevo = true;
    }
    const dialog = this._dialog.open(DialogLeaseSummaryComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(r=>{
      console.log(r);
      if(r.contractDetails){
        r.contractDetails.contractDetailId = 0;
        r.contractDetails.createdBy = this.user.id;
        r.contractDetails.createdDate = new Date();
        r.contractDetails.updateBy = this.user.id;
        r.contractDetails.updatedDate = new Date();
        this.data.contractDetail = r.contractDetails;
      }else{
        this.data.contractDetail = {};
      }

      if(r.departureDetails){
        r.departureDetails.id = 0;
        r.departureDetails.createdBy = this.user.id;
        r.departureDetails.createdDate = new Date();
        this.data.departureDetailsHome = r.departureDetails;
      }else{
        this.data.departureDetailsHome = {}
      }

      if(r.landLord){
        r.landLord.id = 0;
        r.landLord.createdBy = this.user.id;
        r.landLord.createdDate = new Date();
        this.data.landlordDetailsHome = r.landLord;
      }else{
        this.data.landlordDetailsHome = {};
      }

      if(r.renewalDetail){
        r.renewalDetail.id = 0;
        r.renewalDetail.createdBy = this.user.id;
        r.renewalDetail.createdDate = new Date();
        this.data.renewalDetailHome = r.renewalDetail;
      }else{
        this.data.renewalDetailHome = {};
      }

      if(r.costSavings){
        this.data.costSavingHomes = r.costSavings;
      }else{
        this.data.costSavingHomes = [];
      }

      if(r.paymentType){
        this.data.paymentHousings = r.paymentType;
      }else{
        this.data.paymentHousings = [];
      }
    })
  }
  //***********************************************************************************************************//
  modalNewStatus(){
    const dialog = this._dialog.open(DialogChangeStatusComponent, {
      data: this.statusSent,
      width: "90%"
    });

    dialog.beforeClosed().subscribe(r=>{
      console.log(r);
      this.data.housingStatusHistories.push({
        "id": 0,
        "status": r.status,
        "housingId": this.data.id,
        "comment": r.comment,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updatedBy": this.user.id,
        "updatedDate": new Date()
      })
      this.save_edit();
    })
  }
  //***************************************************************************************//
  //FUNCION PARA ACTUALIZAR REGISTRO//
  save_edit(){
    this.data.housingReports = [];
    if(!this.data.paymentHousings){
      this.data.paymentHousings = [];
    }
    if(!this.data.costSavingHomes){
      this.data.costSavingHomes = [];
    }
    if(!this.data.contractDetail){
      this.data.contractDetail = {};
    }
    if(!this.data.departureDetailsHome){
      this.data.departureDetailsHome = {};
    }
    if(!this.data.landlordDetailsHome){
      this.data.landlordDetailsHome = {};
    }
    if(!this.data.renewalDetailHome){
      this.data.renewalDetailHome = {};
    }
    if(!this.data.repairs){
      this.data.repairs = [];
    }
    if(!this.data.inspections){
      this.data.inspections = [];
    }
    if(!this.data.propertyReports){
      this.data.propertyReports = [];
    }
    this.put_registro();
  }
  //***************************************************************************************//
  //FUNCION PARA ACTUALIZAR REGISTRO EN BASE DE DATOS//
  put_registro(){
    this.__loader__.showLoader();
    console.log("data edit: ", this.data);
    this.data.amenitiesHousingLists = this.aux_amenitis;
    //let data_comment_aux = this.data.commentHousings;
    let data_comment_aux = this.temporalComment;
    this.data.commentHousings = [];
    for(let i = 0; i < data_comment_aux.length; i++){
      if(data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != ''){
        this.data.commentHousings.push(data_comment_aux[i]);
      }
    }
    this.data.documentHousings = this.temporalDocument;

    console.log("data a editar: ", this.data);
    debugger
    this._services.service_general_put("HousingList/PutHousing", this.data).subscribe((data => {
      console.log("guardar db: ", data);
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        this.__loader__.hideLoader();
        this.dialogRef.close();
        this.ngOnInit();
      }
    }),(err)=>{
      this.__loader__.hideLoader();
      console.log("error: ", err);
    })
  }
  //***************************************************************************************//
  //FUNCION PARA VER DOCUMENTO//
  showDocumentDialogDetails(url_in){
    const server_url:string = this._services.url_images + url_in;
    window.open( server_url );
  }
}
