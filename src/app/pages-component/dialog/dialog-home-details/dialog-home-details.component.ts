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
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-dialog-home-details',
  templateUrl: './dialog-home-details.component.html',
  styleUrls: ['./dialog-home-details.component.css']
})

export class DialogHomeDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog,
    public _router: Router) { }

  public __loader__: LoaderComponent = new LoaderComponent();

  caAmenity: any[] = [];
  caStatus: any[] = [];
  caPropertyTypeHousing: any[] = [];
  caNumbers: any[] = [];
  caCurrency: any[] = [];
  Home_Details: any;
  user: any = {};
  aux_amenitis: any[] = [];
  SupplierCompany: any[] = [];
  Supplier: any[] = [];
  housingList: any;
  propertyReports: any = {};
  temporalDocument: any[] = [];
  cr: string = "Reply";
  newEstatus: boolean = false;
  wos: any[] = [];
  services: any[] = [];
  statusSent: any = {};
  idServiceDetail = 0;
  data_ = null;
  _cat_service_id = null;
  info = { photo: "", luxuryVip: false, serviceLineId: 2, comercialName: "", legalName: "", supplierSince: "", id: 0 }

  updateUSAmount(event) {
    this.data.price = event.target.value;
  }

  //***********************************************************************************************************//

  old_price = 0;
  old_bedroom = 0;
  old_currency = 0;
  old_type = 0;
  caHours: any[] = [];
  caNumbersMin: any[] = [];
  current_status = 0;
  _catCategoryId = null;
  _catCategoryText = null;

  ngOnInit() {

    this.data_ = this.data;
    if (this.data.idServiceDetail == null || !this.data.idServiceDetail)
      this.idServiceDetail = 0;
    else
      this.idServiceDetail = this.data.idServiceDetail;


    if (this.data.catCategoryId)
       this._catCategoryId = this.data.catCategoryId;

    if (this.data.catCategoryId){
      if (this.data.catCategoryId == 21) 
          this._catCategoryText = "Home Finding | " + this.data.serviceID  ;
      if (this.data.catCategoryId == 16) 
          this._catCategoryText = "Departure | " + this.data.serviceID  ;
      if (this.data.catCategoryId == 22) 
          this._catCategoryText = "Lease Renewal | " + this.data.serviceID  ;
    }
       
      

    this._cat_service_id = this.data.cat_service_id;
    this.__loader__.showLoader();

    console.log("data recibida del modal ================================ : ", this.data_);

    this.SupplierCompany = [];
    this.Supplier = [];
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.housingList = this.data.id;
    this.newEstatus = false;
    debugger;
    if (this.data.id != 0) {

      this._services.service_general_get("HousingList/GetOnlyHomeDetail?key=" + this.data.id).subscribe((data => {

        debugger;
        if (data.success) {
          let aux = this.data;
          // this.data = data.result;
          this.data = data.result.value;
          this.current_status = this.data.housingStatus;

          this.old_price = this.data.price;
          this.old_bedroom = this.data.bedrooms;
          this.old_currency = this.data.currency;
          this.old_type = this.data.propertyType;
          this.temporalDocument = this.data.documentHousings

          this.data.sr = aux.sr;
          this.data.workOrderServicesId = aux.workOrderServicesId;
          this.data.supplierType = aux.supplierType;
          if (this.data.supplierPartner == null) this.data.supplierPartner = 0;
          
          this.aux_amenitis = this.data.amenitiesHousingLists;
          if (this.data.commentHousings.length == 0) {
            this.addreply(2);
          }

          this._services.service_general_get('PropertyReport/GetPropertyReportByHosuing?id=' + this.data.id).subscribe(r => {
            if (r.success) {
              console.log(r);
              this.propertyReports = r.result;
            }
          })
          this.catalogos();
          this.supplierPartner();
          this._supplier();
          this.get_specs();
        }
      }))
    } else {
      this.data.commentHousings = [];
      this.__loader__.hideLoader();
      this.catalogos();
      this.supplierPartner();
      this._supplier();
      this.addreply(1);
      this.get_specs();
    }
    this.establecer_status();
  }

  validate_status() {
    debugger;
    let perm_change = false;
    if (this.current_status == 7 && this.data.housingStatus != 7)
      perm_change = true;
    if (this.current_status != 7 && this.data.housingStatus == 7)
      perm_change = true;

    if (perm_change) {

      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "Home Finding information will be affected. Are you sure ? "
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
        }
        else {
          this.data.housingStatus = this.current_status;
        }
      });

    }

  }

  housing_specs: any = {
    "relHousingAmenities": [],
    "typeService": null,
    "workOrderServices": null,
    "desiredCommuteTime": null,
    "intendedStartDate": new Date(),
    "parkingSpace": 0,
    "areaInterest": "",
    "contractTypeId": null,
    "propertyTypeId": null,
    "bedroom": 0,
    "bathroom": 0,
    "budget": 0,
    "currencyId": null,
    "size": "0",
    "metricId": null,
    "additionalComments": ""
  };

  amenitis = [];
  caAmenity_specs = [];

  get_specs() {
    debugger;
    this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/' + Number(this.data.workOrderServicesId) + '/2').subscribe((data => {
      debugger;
      if (data.success) {
        console.log('DATA GetHousingSpecitifcationByServiceRecord: ', data);
        if (data.result != null) {
          this.housing_specs = data.result;
        }
      }
      else {
        console.log("Error al consultar el HSPECS");
      }
    }), (err) => {
      console.log("Error al consultar housing specifications ", err);
    });
  }

  validate_values(campo) {
    debugger;
    let _msj = "";
    let value1 = 0;
    let value2 = 0;
    let valido_ = true;

    if (campo == "price") {
      _msj = "This price is higher than the budget.";
      value1 = this.housing_specs.budget;
      value2 = this.data.price;
      if ((value1 < value2) && (value1 > 0))
        valido_ = false
      else
        valido_ = true
    }

    if (campo == "currency") {
      _msj = "This currency is different from the budget.";
      value1 = this.housing_specs.currencyId;
      value2 = this.data.currency;
      if ((value1 != value2) && (value1  > 0))
        valido_ = false
      else
        valido_ = true
    }

    if (campo == "rooms") {
      _msj = "This property does not have the requested number of rooms.";
      value2 = this.housing_specs.bedroom;
      value1 = this.data.bedrooms;
      if ((value1 != value2) && (value2 > 0))
        valido_ = false
      else
        valido_ = true
    }

    if (!valido_) {

      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: _msj + " Are you sure you keep this information?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {

        if (result) {
          if (campo == "price")
            this.old_price = this.data.price;
          if (campo == "rooms")
            this.old_bedroom = this.data.bedrooms;
          if(campo == "currency")
           this.old_currency = this.data.currency;
        }
        else {
          if (campo == "price")
            this.data.price = this.old_price;
          if (campo == "rooms")
            this.data.bedrooms = this.old_bedroom;
          if(campo == "currency")
          this.data.currency =  this.old_currency;
        }
      });
    }
  }

  validate_type() {

    if ((this.housing_specs.propertyTypeId != this.data.propertyType) && this.housing_specs.propertyTypeId != null) {

      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Confirmation",
          body: "This type of property is not requested. Are you sure you want to add this property?"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {
        debugger;
        if (result) {
          this.old_type = this.data.propertyType;
        }
        else {
          this.data.propertyType = this.old_type;
        }
      });
    }
  }

  mostrar_campo = true;

  acciones_portipo_servicio() {
    if (this.data.id == 0) { }

    if (this._cat_service_id == 12 || this._cat_service_id == 13) { // pre decision y area orientation no tienen permanent
      this.caStatus = this.caStatus.filter(x => {
        return x.id != 7; // solo permanent home 
      });
    }

    if (this._cat_service_id == 16  || this._cat_service_id == 22) { // departure
      this.caStatus = this.caStatus.filter(x => { return x.id == 7; }); // solo permanent home 
      this.data.housingStatus = 7;
      //if (this.data.id == 0) {
      this.mostrar_campo = false;
      // }
    }

  }

  establecer_status() {
    console.log("El dato del id de la propiedad es: ========================", this.data.id)
    if (this.data.id == 0) {
      this.data.housingStatus = 10;
      this.data.propertyType = 1;
    }
  }

  viewHistory() {
    const dialog = this._dialog.open(DialogHistoryStatusComponent, {
      data: this.data,
      width: "90%"
    });

    dialog.beforeClosed().subscribe(r => {
    })
  }

  ChangeStatus(item) {
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
  checkAllSelected(event, data_, i) {
    console.log("entra", event.checked);
    console.log("data", data_);
    if (event.checked) {
      this.aux_amenitis.push({
        "housingList": this.data.id,
        "amenitie": data_.id
      });
    } else {
      this.aux_amenitis.splice(i, 1);
    }
    console.log(this.aux_amenitis);
  }
  //***********************************************************************************************************//
  ca_metric = [];

  async catalogos() {
    this.caAmenity = await this._services.getCatalogueFrom('GetAmenity');
    this.caStatus = await this._services.getCatalogueFrom('GetStatusHousing');
    this.caPropertyTypeHousing = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_metric = await this._services.getCatalogueFrom('GetMetric');

    for (let i = 0; i < 11; i++) {
      this.caNumbers.push(i);
    }

    this.caAmenity.forEach(E => { E.checked = false; });

    this.caAmenity.forEach(E => {
      E.checked = false;
      for (let i = 0; i < this.aux_amenitis.length; i++) {
        if (E.id == this.aux_amenitis[i].amenitie) {
          E.checked = true;
        }
      }
    });

    this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + this.data.sr + '&service_line_id=2').subscribe(r => {
      if (r.success) {
        this.wos = r.result.value;
      }
    })

    this.acciones_portipo_servicio(); //para que no inserten propiedaddes ph de una vez solo en la edicion 
    this.__loader__.hideLoader();
    // this.getServices();
  }

  supplierPartner() {
    console.log(" datos a enviar supplier ============", this.data.workOrderServicesId, this.data)
    this._services.service_general_get("SupplierPartnerProfile/GetServiceProviderByServiceId?workOrderService=" + this.data.workOrderServicesId).subscribe((data => {
      // this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ', data.result.value);
        this.SupplierCompany = data.result.value;
        this.getInfo();
      }
    }), (err) => {
      console.log("no se realizo la consulta por falta de parametro");
    });
  }


  _supplier() {
    if (this.data.supplierPartner != null && this.data.supplierPartner != 0) {
      this._services.service_general_get("SupplierPartnerProfile/GetAdmintContactsServiceProv?supplierPartner=" + this.data.supplierPartner + "&workOrderService=" + this.data.workOrderServicesId).subscribe((data => {
        // this._services.service_general_get("SupplierPartnerProfile/GetConsultantContactsService?supplierPartner="+this.data.supplierPartner+"&supplierType="+this.data.supplierType).subscribe((data => {
        if (data.success) {
          console.log('DATA CONSULTA SUPPLIER: ', data.result.value);
          this.Supplier = data.result.value;
          this.getInfo();
        }
      }), (err) => {
        console.log("No se realizo la consulta por falta de parametros");
      });
      this.data.othersupplier = '';
      this.data.suppliertelephone = '';
      this.data.supplieremai = '';
    }
    else {
      this.data.supplier = null;
    }
  }

  getServices() {
    console.log("entra a traer servicios: ===>");
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo=' + this.data.workOrder).subscribe(r => {
      if (r.success) {
        this.services = r.result.value;
      }
    })
  }

  getPropertyname(id) {
    for (let i = 0; i < this.caPropertyTypeHousing.length; i++) {
      const element = this.caPropertyTypeHousing[i];
      if (element.id == id) {
        return element.propertyType;
      }

    }
  }

  getCurrencyName(currency) {
    for (let i = 0; i < this.caCurrency.length; i++) {
      const element = this.caCurrency[i];
      if (element.id == currency) {
        return element.currency;
      }
    }
  }
  //***********************************************************************************************************//
  addPropertyReport() {
    const dialogRef = this._dialog.open(DialogPropertyReportComponent, {
      data: { serviceOrder: this.data.sr, id: 0, propertyAddress: this.data.address, zipCode: this.data.zip, housingList: this.data_.id },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  viewPropertyReport() {
    const dialogRef = this._dialog.open(DialogPropertyReportComponent, {
      data: { serviceOrder: this.data.sr, id: this.propertyReports.id, propertyAddress: this.data.address, zipCode: this.data.zip, housingList: this.data_.id },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  temporalComment = [];
  addreply(type) {
    if (type == 2) {
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
    } else {
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
    if (this.data.commentHousings.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }

    document.getElementById("idfocus").focus();
  }

  
  //***********************************************************************************************************//
  addDocument() {
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

  validate_form(): boolean {
    let valido = true;

    return valido;
  }

  save() {

    if (this.validate_form()) {
      this.data.housingReports = [];

      if (!this.data.paymentHousings) {
        this.data.paymentHousings = [];
      }

      if (!this.data.costSavingHomes) {
        this.data.costSavingHomes = [];
      }

      if (!this.data.contractDetails) {
        this.data.contractDetails = [];
      }

      if (!this.data.departureDetailsHomes) {
        this.data.departureDetailsHomes = [];
      }

      if (!this.data.landlordHeaderDetailsHomes) {
        this.data.landlordHeaderDetailsHomes = [];
      }

      if (!this.data.renewalDetailHome) {
        this.data.renewalDetailHomes = [];

      }

      if (!this.data.groupPaymnetsHousings) {
        this.data.groupPaymnetsHousings = [];
      }

      if (!this.data.groupCostSavings) {
        this.data.groupCostSavings = [];
      }

      // if (!this.data.repairs) {
      //   this.data.repairs = [];
      // }

      // if (!this.data.inspections) {
      //   this.data.inspections = [];
      // }

      if (!this.data.groupIrs) {
        this.data.groupIrs = [];
      }

      if (!this.data.propertyReports) {
        this.data.propertyReports = [];
      }

      this.post_new();
    }
    else {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "Complete the requiered fields."
        },
        width: "350px"
      });
    }

  }
  //***************************************************************************************//
  //FUNCION PARA ACTUALIZAR REGISTRO//
  save_edit() {
    debugger;
    this.data.housingReports = [];
    if (!this.data.paymentHousings) {
      this.data.paymentHousings = [];
    }
    if (!this.data.costSavingHomes) {
      this.data.costSavingHomes = [];
    }

    if (!this.data.contractDetails) {
      this.data.contractDetails = [];
    }

    if (!this.data.groupPaymnetsHousings) {
      this.data.groupPaymnetsHousings = [];
    }

    if (!this.data.groupCostSavings) {
      this.data.groupCostSavings = [];
    }

    if (!this.data.departureDetailsHomes) {
      this.data.departureDetailsHomes = [];
    }
    if (!this.data.landlordHeaderDetailsHomes) {
      this.data.landlordHeaderDetailsHomes = [];
    }
    if (!this.data.renewalDetailHomes) {
      this.data.renewalDetailHomes = [];
    }
    if (!this.data.repairs) {
      this.data.repairs = [];
    }
    if (!this.data.inspections) {
      this.data.inspections = [];
    }
    if (!this.data.propertyReports) {
      this.data.propertyReports = [];
    }
    this.put_registro();
  }
  //***************************************************************************************//
  //FUNCION PARA ACTUALIZAR REGISTRO EN BASE DE DATOS//

  post_new() {
    if (this.data.supplierPartner == 0) this.data.supplierPartner = null;
    console.log(this.data);

    this.__loader__.showLoader();
    let data_comment_aux = this.data.commentHousings;
    this.data.commentHousings = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.data.commentHousings.push(data_comment_aux[i]);
      }
    }

    if (this.data.id === 0) {
      this.data.createdBy = this.user.id;
      this.data.createdDate = new Date();
      this.data.updateBy = this.user.id;
      this.data.updatedDate = new Date();
      this.data.amenitiesHousingLists = this.aux_amenitis;
      this.data.documentHousings = this.temporalDocument;

      let property_report = this.data;
      let reports = property_report.propertyReports;
      let aux_report = [];
      this.data = {};
      for (let i = 0; i < reports.length; i++) {
        if (reports[i].id == 0) {
          aux_report.push(reports[i]);
        }
      }
      property_report.propertyReports = aux_report;
      this.data = property_report;
      this.data.othersupplier = this._cat_service_id;

      debugger; 
      if (this._catCategoryId)
        this.data.catCategoryId = this._catCategoryId;

      if (this._catCategoryText)
         this.data.catCategoryText = this._catCategoryText;

      this._services.service_general_post_with_url('HousingList/PostHousing', this.data).subscribe((r => {
        if (r.success) {
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
          this.dialogRef.close(r.result.id);
          console.log("Valor regresado de la nueva casa pop up house pop up: ======================", r.result.id)
          this.__loader__.hideLoader();
          //notificacion desde el front 

          var notificationfront = 
          {  workOrder: this.data.workOrder,
            createdBy: this.user.id,
            detail: this.data.address,
            notificationType: 32,
            To:1 // 1: Coordiandor de la SL , 2: Coordinadores de ambas SL , 3: Coordiandores y Manager  
           }
          
        }
      }), (err) => {
        this.__loader__.hideLoader();
        console.log("error: ", err);
      })
    }
  }



  //***********************************************************************************************************//
  inspection() {
    debugger;
    this.data.idServiceDetail_current = this.idServiceDetail; // esto es para que guarde el detalle 
    console.log("ABRE MODAL inspection: ", this.data);
    if (this.data.id == 0) {
      this.data.status_ = 'nuevo';
    }

    if (this._cat_service_id == 21) {
      this.data.movein = false;
      this.data.moveout = true;
      this.data.moveinspect = true;
    }
    if (this._cat_service_id == 26) {
      this.data.movein = true;
      this.data.moveout = false;
      this.data.moveinspect = true;
    }


/*     const dialog = this._dialog.open(DialogInspectionrepairsComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(r => {
      console.log(r);
      this.data.propertyReports = [];
      if (r.repairs) {
        this.data.repairs = r.repairs;
      } else {
        this.data.repairs = [];
      }

      if (r.inspection) {
        this.data.inspections = r.inspection;
      } else {
        this.data.inspections = [];
      }

      if (r.propertyReportSections) {
        this.data.propertyReports.push(r.propertyReportSections);
      } else {
        this.data.propertyReports = [];
      }

      if (r.propertyReportSectionsOut) {
        this.data.propertyReports.push(r.propertyReportSectionsOut);
      } else {
        this.data.propertyReports = [];
      }

    }) */
  }
  //***********************************************************************************************************//
  lease() {

    this.data.idServiceDetail_current = this.idServiceDetail; // esto es para que guarde el detalle 
    if (this.data.id == 0) {
      this.data.nuevo = true;
    }
    console.log("ABRE MODAL LEASE =====================================: ", this.data);
    /* const dialog = this._dialog.open(DialogLeaseSummaryComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(r => {
      console.log(r);
      if (r.contractDetails) {
        r.contractDetails.contractDetailId = 0;
        r.contractDetails.createdBy = this.user.id;
        r.contractDetails.createdDate = new Date();
        r.contractDetails.updateBy = this.user.id;
        r.contractDetails.updatedDate = new Date();
        this.data.contractDetail = r.contractDetails;
      } else {
        this.data.contractDetail = {};
      }

      if (r.departureDetails) {
        r.departureDetails.id = 0;
        r.departureDetails.createdBy = this.user.id;
        r.departureDetails.createdDate = new Date();
        this.data.departureDetailsHome = r.departureDetails;
      } else {
        this.data.departureDetailsHome = {}
      }

      if (r.landLord) {
        r.landLord.id = 0;
        r.landLord.createdBy = this.user.id;
        r.landLord.createdDate = new Date();
        this.data.landlordDetailsHome = r.landLord;
      } else {
        this.data.landlordDetailsHome = {};
      }

      if (r.renewalDetail) {
        r.renewalDetail.id = 0;
        r.renewalDetail.createdBy = this.user.id;
        r.renewalDetail.createdDate = new Date();
        this.data.renewalDetailHome = r.renewalDetail;
      } else {
        this.data.renewalDetailHome = {};
      }

      if (r.costSavings) {
        this.data.costSavingHomes = r.costSavings;
      } else {
        this.data.costSavingHomes = [];
      }

      if (r.paymentType) {
        this.data.paymentHousings = r.paymentType;
      } else {
        this.data.paymentHousings = [];
      }
    }) */
  }


  //***********************************************************************************************************//
  modalNewStatus() {
    const dialog = this._dialog.open(DialogChangeStatusComponent, {
      data: this.statusSent,
      width: "90%"
    });

    dialog.beforeClosed().subscribe(r => {
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

  put_registro() {
    this.__loader__.showLoader();
    this.data.createdBy = this.user.id;
    this.data.updateBy = this.user.id;
    if (this.data.supplierPartner == 0) this.data.supplierPartner = null;
    this.data.amenitiesHousingLists = this.aux_amenitis;
    //let data_comment_aux = this.data.commentHousings;
    let data_comment_aux = this.temporalComment;
   // this.data.commentHousings = [];
    for (let i = 0; i < data_comment_aux.length; i++) {
      if (data_comment_aux[i].comment != null && data_comment_aux[i].comment != undefined && data_comment_aux[i].comment.trim() != '') {
        this.data.commentHousings.push(data_comment_aux[i]);
      }
    }
    this.data.documentHousings = this.temporalDocument;

    console.log("data a editar: ", this.data);
    //debugger
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
    }), (err) => {
      this.__loader__.hideLoader();
      console.log("error: ", err);
    })
  }
  //***************************************************************************************//
  //FUNCION PARA VER DOCUMENTO//
  showDocumentDialogDetails(url_in) {
    const server_url: string = this._services.url_images + url_in;
    window.open(server_url);
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
      //console.log(result);
      if (result) {
        this._services.service_general_delete("RelocationServices/DeleteDocumentHousing?id=" + id).subscribe((data => {
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

  public dshowDocumentDialogDetails(document: any, service_line: number = undefined): void {
    const dialogRef = this._dialog.open(DialogDocumentsView, {
      width: "95%",
      data: {
        sr_id: this.data.sr,
        document: document,
        sl: 1,
        name_section: "only_one_service"
      }
    });
  };

  ///////////////////////tare información par ala tarjeta 

  //CONSULTA DE INFORMACION PARA MODAL//
  getInfo() {
    for (let i = 0; i < this.SupplierCompany.length; i++) {
      if (this.SupplierCompany[i].id == this.data.supplierPartner) {
        this.info = this.SupplierCompany[i];
        ////console.log(this.info);
      }
    }
  }

  goto_profile() {
    var url_api = `${environment.URL_EXPORT}`;
    window.open(url_api+'/supplierServices/' + this.info.id, '_blank');
    // this._router.navigateByUrl('supplierServices/' + this.info.id);
  }

  set_contact(value) {
    debugger;
    var __sup = this.Supplier.filter(function (E) { if (E.id == value) { return true; } });
    this.data.suppliertelephone = __sup[0].phoneNumber;
    this.data.supplieremail = __sup[0].email;

  }

}
