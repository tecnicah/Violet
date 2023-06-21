import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsComponent } from '../../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../../general-message/general-message.component';
import { DialogHomeDetailsComponent } from '../../dialog-home-details/dialog-home-details.component';
import { DialogHousingSpecificationsComponent } from '../../dialog-housing-specifications/dialog-housing-specifications.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogLeaseSummaryComponent } from '../../dialog-lease-summary/dialog-lease-summary.component';
import { DialogInspectionrepairsComponent } from '../../dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogStatusDetailComponent } from '../../dialog-status-detail/dialog-status-detail.component';
import { DialogPropertyExpensesComponent } from '../../dialog-property-expenses/dialog-property-expenses.component';
import { DialoglLandlordBankDetailComponent } from '../../dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { DialogPaymentTypeComponent } from '../../dialog-payment-type/dialog-payment-type.component';
import { DialogCostSavingsComponent } from '../../dialog-cost-savings/dialog-cost-savings.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { json } from '@angular-devkit/core';
import { stringify } from 'querystring';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAttendeesComponent } from '../../dialog-attendees/dialog-attendees.component';
import { DialogKeyComponent } from '../../dialog-key/dialog-key.component';
import { DialogInventoryComponent } from '../../dialog-inventory/dialog-inventory.component';
import { DialogAttendeesInspecComponent } from '../../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-ir',
  templateUrl: './ir.component.html',
  styleUrls: ['./ir.component.scss']
})
export class IrComponent implements OnInit {

  @Input() _hf_id: number;
  @Input() _ph_id: number;
  @Input() _workOrderServicesId: number;
  @Input() _type_housing: number;
  @Input() _deliveredTo: string;
  @Input() _city_name: string;
  @Input() _country_name: string;
  @Input() _catCategoryId: number;

  @ViewChild('sortrole') sortrole: MatSort;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }


  loader: LoaderComponent = new LoaderComponent();
  versions_lsf = [];
  lsf_service_detail_id;
    // Inspection Type 

    ca_inspec_type = [{ id: 1, type: "Pre Inspection" }, { id: 2, type: "Property Delivery" }]

  ///////////////////////////////////////////////// VAIABLES //////////////////////

  permanentHome;
  home_finding: any = {};
  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }
  SupplierCompany_repairs = [];
  hf_id;
  ph_id;
  workOrderServicesId;
  type_housing;
  url_api = `${environment.URL_EXPORT}`;
  show_hide_all_ = false;
  ca_currency: any[] = [];

  permanentHome_LSF;

  mostrarTarjeta: any = {
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

  user: any = {};
  ca_payment_Type = [];
  ca_responsible = [];
  ca_recurrence = [];
  ca_accountType = [];
  ca_creditCard: any[] = [];

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

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userData'));
    this.ph_id = this._ph_id;
    this.hf_id = this._hf_id;
    this.workOrderServicesId = this._workOrderServicesId;
    this.type_housing = this._type_housing;
    
    this.get_catalogs();
    
    //this.GetOnlyPropertyDetails(1);
  }

  ngOnChanges() {
    this.ngOnInit();
  }


  /////////////////Property Detail 

  ca_propertySection =  [];

  async get_catalogs() {

    //contract details 
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');

    //Paymentsa 
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus'); //= await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function (E) { if (E.recurrence != null) { return true; } });
  
    //LandLord 
    this.ca_accountType = await this._services.getCatalogueFrom('GetBankAccountType');
    this.ca_creditCard = await this._services.getCatalogueFrom('GetCreditCard');

    

    // I&R 
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this._services.service_general_get('PropertyReport/get_status_report').subscribe(r => {
      if (r.success) {
        this.ca_status_report  = r.result;
      }
    });

    this._services.service_general_post_with_url('HousingList/GetPaymentRepairResponsability', 1).subscribe(r => {
      this.ca_resppayrep = r.hl;
    });

    this.get_items_section(0);
    this.get_attendees_list_all(this.ph_id);
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');

    //versions 
    this.get_lsf_versions();
  };
  
  ca_leaseTemplate = [];

  GetHomeFindingById(hf_id) {

    this._services.service_general_get('RelocationServices/GetHomeFindingById?id=' + hf_id).subscribe(data => {
      if (data.success) {
        console.log('DATA GetHomeFindingById ===========================: ', data, "id :", hf_id);
        this.home_finding = data.result;
        this.payment_rocess.securityDepositId = this.home_finding.securityDepositId;
        this.payment_rocess.initialRentPaymentId = this.home_finding.initialRentPaymentId;
        this.payment_rocess.ongoingRentPaymentId = this.home_finding.ongoingRentPaymentId;
        this.payment_rocess.realtorCommissionId = this.home_finding.realtorCommissionId;
        this.GetOnlyPropertyDetails(this.ph_id);
        
        this.get_housing_specs();
        this.supplierPartner_repairs();
      }
      else {
        alert('error al cargar los datos de la propiedad en componente LSF id: ' + hf_id)
      }
    });
  }

  GetOnlyPropertyLSF(id_ph) {
    //debugger;
    this._services.service_general_get("HousingList/GetOnlyPropertyLSF?key=" + id_ph + "&servide_detail_id=" + this.lsf_service_detail_id).subscribe((data => {
      this.permanentHome_LSF = data.result.value;
      console.log('ONLY LEASE SUMARY FORM : ', this.permanentHome_LSF);
      this.GetOnlyPropertyInspRep(id_ph);
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }


  get_lsf_versions(){

    this._services.service_general_get('HousingList/GetLeaseInspectionsVersions?id_service_detail=' + this.hf_id+"&id_catCategoryId="+this._catCategoryId+"&housing_list_id="+this.ph_id).subscribe(data => {
      if (data.success) {
       
        this.versions_lsf = data.result.lease_versions;
        if(!this.lsf_service_detail_id){
          this.lsf_service_detail_id = this.hf_id;
        }

        console.log('DATA GetLeaseInspectionsVersions ===========================: ', this.versions_lsf); 
        this.GetHomeFindingById(this.hf_id);
      }
      else {
        alert('error las versiones')
      }
    });
  }

  refresh_component(){
    alert("change in this.lsf_service_detail_id : " + this.lsf_service_detail_id)
  }


  GetOnlyPropertyDetails(id_ph) {

    this._services.service_general_get("HousingList/GetOnlyPropertyDetails?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id).subscribe((data => {
      this.permanentHome = data.result.value;
      console.log('DETALLES DE LA CASA PERMANENTE : ', this.permanentHome);
     
      this.GetOnlyPropertyLSF(id_ph);
      // this.llenarJSON();
      //  this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }



  permanentHome_IR;
  GetOnlyPropertyInspRep(id_ph) {
    this.loader.showLoader();
    // this.loader.showLoader();
    this._services.service_general_get("HousingList/GetOnlyPropertyInspRep?key=" + id_ph + "&servide_detail_id=" + this.home_finding.id).subscribe((data => {
      this.permanentHome_IR = data.result.value;
      console.log('ONLY LEASE INSPECTION & REPAIRS : ', this.permanentHome_IR);
      this.llenarJSON();
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("ERROR -------------- ONLY LEASE INSPECTION & REPAIRS: ", err);
    })
  }

  get_housing_specs() {

    this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/' + Number(this.workOrderServicesId) + '/' + this.type_housing).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log('DATA GetHousingSpecitifcationByServiceRecord: ', data);
        if (data.result != null) {

          this.housing_specs = data.result;
          if (!this.housing_specs.propertyTypeId) {
            this.housing_specs.propertyTypeId = 0;
          }
        }

        this.loader.hideLoader();
      }
    }), (err) => {
      console.log("Error al consultar housing specifications ", err);
    });
  }


  inspection() {
    ////debugger;
    //window.open("printir/" + this.permanentHome.id + "/" + this.home_finding.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/26" , '_blank');

    var url_lsf = this.url_api + "printir/" + this.permanentHome.id + "/" + this.home_finding.id + "/" + this._deliveredTo + "/" + this._city_name + "/" + this._country_name + "/26";
    this.loader.showLoader();
    this._services.service_general_get('Appointment/GetPDF?xURL=' + url_lsf + "&miliseconds=20000")
      .subscribe((data => {
        this.loader.hideLoader();
        if (data.success) {
          const linkSource =
            'data:application/octet-stream;base64,' + data.message;
          const downloadLink = document.createElement('a');
          const fileName = 'i_and_r.pdf';
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      }));

    // let data_ = this.permanentHome;
    // data_.idServiceDetail_current = this.home_finding.id; // esto es para que guarde el detalle 
    // console.log("ABRE MODAL inspection: ", this.data);

    // data_.movein = true;
    // data_.moveout = false;
    // data_.moveinspect = true;

    // const dialog = this._dialog.open(DialogInspectionrepairsComponent, {
    //   data: data_,
    //   width: "95%"
    // });

    // dialog.beforeClosed().subscribe(r => {
    //   console.log("close Inspects: ", r);
    // })
  }

  //////////////////////////////////// FUNCIONES Y VARIABLES  NUEVO LSF //////////////////////////////////

  payments_due = [];
  payments_not_due = [];
  data_land_historic = [];
  data_group_saving: any = { costSavingHomes: [] };
  data_group_paymnets: any = { paymentHousings: [] };
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  data_contracts_historic = [];
  data_renewal_historic = [];
  data_departure_historic = [];
  data_landlord_historic = [];
  data_cost_saving_historic = [];
  data_paym_saving_historic = [];
  lapsos_dias = [{ id: 10 }, { id: 15 }, { id: 30 }, { id: 45 }, { id: 60 }, { id: 90 }, { id: 120 }]
  data_land_list = [];
  dataData_land_list = new MatTableDataSource(null);
  groupIrhistoric = [];
  ca_resppayrep = [];
  move_out_visible = false;
  ca_status_report = [];

  //VARIABLES PARA INSECTIONS & REPAIRS//
data_move_in: any = {
  propertyReportSections: [],
  keyInventories: [],
  attendees: []
};
data_move_out: any = {
  propertyReportSections: [],
  keyInventories: [],
  attendees: []
};

data_inspection;
data_repairs = [];

data_land: any = {
  creditCardLandLordDetails: []
};

  llenarJSON() {
    debugger;

    //////////////////////////// SET PERMANENT HOME /////////////////////////////////////////

    this.permanentHome.contractDetails = this.permanentHome_LSF.contractDetails;
    this.permanentHome.contractHistoricDetails = this.permanentHome_LSF.contractHistoricDetails;
    this.permanentHome.groupPaymnetsHousings = this.permanentHome_LSF.groupPaymnetsHousings;
    this.permanentHome.groupHistoricPaymnetsHousings = this.permanentHome_LSF.groupHistoricPaymnetsHousings;
    this.permanentHome.groupCostSavings = this.permanentHome_LSF.groupCostSavings;
    this.permanentHome.groupHistoricCostSavings = this.permanentHome_LSF.groupHistoricCostSavings;
    this.permanentHome.renewalDetailHomes = this.permanentHome_LSF.renewalDetailHomes;
    this.permanentHome.renewalHistoricDetailHomes = this.permanentHome_LSF.renewalHistoricDetailHomes;
    this.permanentHome.departureDetailsHomes = this.permanentHome_LSF.departureDetailsHomes;
    this.permanentHome.departureHistoricDetailsHomes = this.permanentHome_LSF.departureHistoricDetailsHomes;
    this.permanentHome.landlordHeaderDetailsHomes = this.permanentHome_LSF.landlordHeaderDetailsHomes;
    this.permanentHome.landlor_HistoricHeaderDetailsHomes = this.permanentHome_LSF.landlor_HistoricHeaderDetailsHomes;


    this.permanentHome.propertyReports = this.permanentHome_IR.propertyReports;
    this.permanentHome.groupIr = this.permanentHome_IR.groupIr;
    this.permanentHome.groupIrhistoric = this.permanentHome_IR.groupIrhistoric;


    if (this.permanentHome.landlordHeaderDetailsHomes) {
      this.data_land = this.permanentHome.landlordHeaderDetailsHomes[0];

      this.data_land_list = this.data_land.landlordDetailsHomes;
      this.dataData_land_list = new MatTableDataSource(this.data_land_list);
      this.dataData_land_list.sort = this.sortrole;

    }

    ////////////////////////////////////// INSPECTIONS & REPAIRS //////////////////////////////////
    ////debugger;
    if (this.permanentHome.propertyReports) {
      for (let i = 0; i < this.permanentHome.propertyReports.length; i++) {
        if (this.permanentHome.propertyReports[i].propertyInspection == 1) {
          this.data_move_in = this.permanentHome.propertyReports[i];
        }

        if (this.permanentHome.propertyReports[i].propertyInspection == 2) {
          this.data_move_out = this.permanentHome.propertyReports[i];
        }
      }

      console.log("move inn: ============================", this.data_move_in);
      console.log("move out: ============================", this.data_move_out);
    }

    ////debugger;
    if (this.permanentHome.groupIr[0].repairs) {
      this.data_repairs = this.permanentHome.groupIr[0].repairs;
      //this.data_final.repairs = this.data_repairs;
    }

    if (this.permanentHome.groupIr[0].inspections) {
      this.data_inspection = this.permanentHome.groupIr[0].inspections;
      //  this.data_final.inspection = this.data_inspection;
    }

    if (this.permanentHome.groupIrhistoric) {
      this.groupIrhistoric = this.permanentHome.groupIrhistoric;
      //  this.data_final.inspection = this.data_inspection;
    }

    console.log("data_repairs: ============================", this.data_repairs);
    console.log("data_inspection: ============================", this.data_inspection);
    console.log("groupIrhistoric: ============================", this.groupIrhistoric);
    //this.move_out_visible = false; // home finding 

  };

  
  ////////////////////////////////////////////// INSPECTIONS & REPAIRS //////////////////////////////////

  //GUARDAR TARJETA ITERABLE DE MOVE OUT//
  save_PropertyReport(propertyInspection) {
    //////debugger;
    this.loader.showLoader();
    var _pr;
    if (propertyInspection == 1) {
      //ACTUALIZACION DEL REGISTROS//
      this.data_move_in.propertyInspection = 1; //move in
      this.data_move_in.createdBy = this.user.id;
      this.data_move_in.createdDate = new Date();
      this.data_move_in.updatedBy = this.user.id;
      this.data_move_in.updatedDate = new Date();
      _pr = this.data_move_in;
    }
    else {
      this.data_move_out.propertyInspection = 2; //move out
      this.data_move_out.createdBy = this.user.id;
      this.data_move_out.createdDate = new Date();
      this.data_move_out.updatedBy = this.user.id;
      this.data_move_out.updatedDate = new Date();
      _pr = this.data_move_out;
    }


    //  this.data_move_in.idServiceDetail = this.data.idServiceDetail_current;
    console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION PROPERTY REPORT: ", _pr);

    console.log("data_move_in", this.data_move_in);
    this._services.service_general_put("PropertyReport/PutPropertyReport", _pr).subscribe((respondepr => {
      //////debugger;
      this.loader.hideLoader();
      if (respondepr.success) {
        console.log(respondepr);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated Data"
          },
          width: "350px"
        });

      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }))
  }

  //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveInOut(data_move_id, propertyInspection) {

    var section = {
      "id": 0,
      "propertyReport": data_move_id,//this.data_move_in.id,
      "propertySection": null,
      "status": null,
      "needRepair": false,
      "reportDate": null,
      "reportDetails": null,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "photosPropertyReportSections": [],
      "sectionInventories": [],
      "propertyInspection": propertyInspection
    }

    this.loader.showLoader();
    this._services.service_general_put("HousingList/AddPropertyReportSection", section).subscribe((response_bd => {
      this.loader.hideLoader();
      ////debugger;
      if (response_bd.success) {
        console.log("HousingList/AddPropertyReportSection ==============================", response_bd);
        if (propertyInspection == 1)
          this.data_move_in.propertyReportSections = response_bd.result.value;
        else
          this.data_move_out.propertyReportSections = response_bd.result.value;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }

  //************************************************//
  //FUNCION PARA ELIMINAR REPAIR//
  deleteRepair(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this repair?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_repairs.splice(i, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE IN//
  deletePhoto(r, p) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_in.propertyReportSections[r].photosPropertyReportSections.splice(p, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deletePhotoOut(o, p) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_out.propertyReportSections[o].photosPropertyReportSections.splice(p, 1);
      }
    })
  }

  deletePhoto_ins(r, p) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_inspection[r].photosInspecs.splice(p, 1);
      }
    })
  }

  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveInOut(property_rs, i, propertyInspection) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move In?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.deletePropertyReport(property_rs, i, propertyInspection)
      }
    })
  }

  deletePropertyReport(property_rs, i, propertyInspection) {
    ////debugger;
    if (property_rs.id > 0) {
      this.loader.showLoader();
      this._services.service_general_put("HousingList/deletePropertyReportSection", property_rs.id).subscribe((response_bd => {
        this.loader.hideLoader();
        ////debugger;
        if (response_bd.success) {
          console.log("HousingList/deletePropertyReportSection ==============================", response_bd);
          if (propertyInspection == 1)
            this.data_move_in.propertyReportSections = response_bd.result.value;
          else
            this.data_move_out.propertyReportSections = response_bd.result.value;

          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data"
            },
            width: "350px"
          });

        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
    }
    else {
      if (propertyInspection == 1)
        this.data_move_in.propertyReportSections.splice(i, 1);
      else
        this.data_move_out.propertyReportSections.splice(i, 1);
    }
  }

  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveOut(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move Out?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_out.propertyReportSections.splice(i, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
  addInventoriModal(r, section, propertyInspection, report) {

    if (section > 0) {
      console.log("entra a abrir modal inventori");

      const dialog = this._dialog.open(DialogInventoryComponent, {
        data: {
          id: 0,
          operacion: 'insertar',
          propertyReportSectionId: report.id,
          section: section,
        },
        width: "95%"
      });

      dialog.beforeClosed().subscribe(result => {
        ////debugger;
        console.log("resultado inventario por seccion =================================", result);
        ////debugger;
        if (result.success == true) {
          if (propertyInspection == 1) {
            // result.propertyReportSectionId = this.data_move_in.propertyReportSections[r].id;
            this.data_move_in.propertyReportSections[r].sectionInventories = result;
          }
          else {
            result.propertyReportSectionId = this.data_move_out.propertyReportSections[r].id;
            this.data_move_out.propertyReportSections[r].sectionInventories = result;
          }
        }
      })
    }
    else {

      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Data Required",
          body: "Select a Section Please"
        },
        width: "350px"
      });
    }
  };




  save_PropertyReportSection(section){
    console.log("SECCION A EDICION", section);
    this.loader.showLoader();
      this._services.service_general_put("PropertyReport/PutPropertyReportSection", section).subscribe((response_bd => {
        this.loader.hideLoader();
        ////debugger;
        if (response_bd.success) {
          console.log("PropertyReport/PutPropertyReportSection ==============================", section);

          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Updated Seccion Data"
            },
            width: "350px"
          });

        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al editar la seccion : ", err);
      });
  }

  //************************************************//
  //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
  addFotosMove(r) {
    ////debugger;
    document.getElementById('doc' + r).click();
  }

  addFotosMove_o(r) {
    ////debugger;
    document.getElementById('doc_o' + r).click();
  }
  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotos(files: NgxFileDropEntry[], r, propertyInspection) {
    ////debugger;
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("droppedFile.relativePath: ", droppedFile.relativePath);
          console.log("file: ", file, "this.files: ", this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }
              ////debugger;

              let ext = droppedFile.relativePath.split(".");
              let _pRid = 0;
              if (propertyInspection == 1)
                _pRid = this.data_move_in.propertyReportSections[r].id;
              else
                _pRid = this.data_move_out.propertyReportSections[r].id;

              var _photosPRS_ = {
                "id": 0,
                "propertyReportId": _pRid,
                "base64": imageUrl,
                "photo": encoded,
                "photoExtension": ext[ext.length - 1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date(),
              };

              if (propertyInspection == 1) {
                this.data_move_in.propertyReportSections[r].photosPropertyReportSections.push(_photosPRS_);
              } else {
                this.data_move_out.propertyReportSections[r].photosPropertyReportSections.push(_photosPRS_);
              }

            };
          });
        });
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //***************** *******************************//
  //CARGA DE DOCUMENTOS PARA SECCION REPAIRS MOVE IN//
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[], i) {
    ////debugger;
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


              let ext = droppedFile.relativePath.split(".");

              this.data_repairs[i].documentRepairs.push({
                "id": 0,
                "fileRequest": encoded,
                "fileExtension": ext[ext.length - 1],
                "fileName": droppedFile.relativePath,
                "repairId": 0,
                "createdBy": this.user.id,
                "createdDate": new Date(),
              }

              )
            }

              ;
          }

          );


        }

        );
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  get_name_section(id) {
    //////debugger;
    var result = [];
    var result = this.ca_propertySection.filter(function (E) { if (E.id == id) { return true; } });
    // console.log(result);
    return result[0].propertySection

  }

  //==================================== INSPECS 

  // data_inspection=[];
  //AGREGAR NUEVO INSPECTION//
  addInspectionDate(inspectType) {
    /*  this.data_inspection.push({
        id: 0,
        inspectType: inspectType,
        housingList: this.permanentHome.id,
        initialInspectionDate: new Date(),
        finalInspectionDate: null,
        createdBy: this.user.id,
        createdDate: new Date(),
        updateBy: this.user.id,
        updatedDate: new Date(),
        propertySection: null,
        attendeeInspecs: [],
        photosInspecs: [],
        idServiceDetail: this.home_finding.id,//.data.idServiceDetail_current.
        groupIrId: this.permanentHome.groupIr[0].id
      }) */

    var _obj_add_inspection = {
      id: 0,
      inspectType: inspectType,
      housingList: this.permanentHome.id,
      initialInspectionDate: new Date(),
      finalInspectionDate: null,
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date(),
      propertySection: null,
      attendeeInspecs: [],
      photosInspecs: [],
      idServiceDetail: this.home_finding.id,//.data.idServiceDetail_current.
      groupIrId: this.permanentHome.groupIr[0].id
    };

    this.insert_ispection(_obj_add_inspection)

  }

  //DELETE INSPECTION//
  deleteInspection(k) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this inspection?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_inspection.splice(k, 1);
      }
    })

  }
  //************************************************//
  // data_repairs=[];
  //REPAIRS//
  addRepairs() {
    /* this.data_repairs.push({
      id: 0,
      housingList: this.permanentHome.id,
      repairType: null,
      supplierPartner: null,
      repairStartDate: null,
      repairEndDate: null,
      totalDays: 0,
      totalCostRepair: 0,
      currency: null,
      comments: null,
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date(),
      documentRepairs: [],
      idServiceDetail: this.home_finding.id,//this.data.idServiceDetail_current
      groupIrId: this.permanentHome.groupIr[0].id,
      paymentResponsibility: null
    }

    ) */

    var obj_repair = {
      id: 0,
      housingList: this.permanentHome.id,
      repairType: null,
      supplierPartner: null,
      repairStartDate: null,
      repairEndDate: null,
      totalDays: 0,
      totalCostRepair: 0,
      currency: null,
      comments: null,
      createdBy: this.user.id,
      createdDate: new Date(),
      updateBy: this.user.id,
      updatedDate: new Date(),
      documentRepairs: [],
      idServiceDetail: this.home_finding.id,//this.data.idServiceDetail_current
      groupIrId: this.permanentHome.groupIr[0].id,
      paymentResponsibility: null
    }

    this.insert_repair(obj_repair);
  }

  data_final: any = {};

  pasar_Informacion() {
    this.data_final = {
      "inspection": this.data_inspection,
      "repairs": this.data_repairs,
      "propertyReportSections": this.data_move_in,
      "propertyReportSectionsOut": this.data_move_out
    }
  }
  //************************************************//
  close_Modal() {
    this.pasar_Informacion();
    this.dialogRef.close(this.data_final);
  }
  //************************************************//
  public fileOver(event) {
    ////debugger;
    console.log(event);
  }
  //************************************************//
  public fileLeave(event) {
    ////debugger;
    console.log(event);
  }
  //FUNCION PARA AGREGAR MAS DOCUMENTOS//
  addDocument_1(i) {
    document.getElementById('doc' + i).click();
  }

  //************************************************//
  //FUNCION PARA ACTUALIAZAR LA SECCION REPAIRS//
  guardar_inspectionAndRepairs() {
    this.loader.showLoader();
    console.log("DATA A GUARDAR RERPAIS: ", this.data_repairs);

    for (let i = 0; i < this.data_repairs.length; i++) {
      if (this.data_repairs[i].id != 0) {
        this._services.service_general_put("HousingList/PutRepair", this.data_repairs[i]).subscribe((data => {
          if (data.success) {
            console.log(data);
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }

      else {
        this._services.service_general_post_with_url("HousingList/PostRepair", this.data_repairs[i]).subscribe((data => {
          if (data.success) {
            console.log(data);
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }
    }

    for (let i = 0; i < this.data_inspection.length; i++) {
      if (this.data_inspection[i].id != 0) {
        this._services.service_general_put("HousingList/PutInspection", this.data_inspection[i]).subscribe((data => {
          if (data.success) {
            console.log("HousingList/PutInspection - Request: ", this.data_inspection[i], " response: ", data);
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }

      else {
        //////debugger;
        this._services.service_general_post_with_url("HousingList/PostInspection", this.data_inspection[i]).subscribe((data => {
          //////debugger;
          if (data.success) {
            console.log("HousingList/PostRepair - Request: ", this.data_inspection[i], " response: ", data);
            this.data_inspection[i] = data.result;
            this.loader.hideLoader();
          }
        }

        ), (err) => {
          this.loader.hideLoader();
          console.log("error al guardar los repairs: ", err);
        }

        )
      }
    }

    const dialog = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Success",
        body: "Saved Data"
      }

      ,
      width: "350px"
    }

    );
  }

  all_items = [];
  get_items_section(section) {
    this.loader.showLoader();

    this._services.service_general_post_with_url('HousingList/GetItemsSectionInventory', section).subscribe(r => {
      this.loader.hideLoader();
      if (r.success) {
        console.log("HousingList/GetItemsSectionInventory", r);
        this.all_items = r.result.value;
      }
    })
  }

  get_names_items(id) {
 
    var name = "";
    if (id > 0) {
      var att_ = this.all_items.filter(function (E) { if (E.id == id) { return true; } });
      name = att_[0].item;
    }

    return name;
  }
  //FUNCION EDITAR ATTENDEES DENTRO DE INSPEC//
  addAttendeesInspec(item) {
    console.log("entra a abrir modal attendees Inspec");

    const dialog = this._dialog.open(DialogAttendeesInspecComponent, {
      data: {
        id: 0,
        sr: this.data.sr,
        operacion: 'insertar',
        inspection: item.id
        , housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      ////debugger;
      console.log("info recibidia del po pup attendis inspection: ", result);

      if (result.success) {
        // result.propertyReport = this.data_move_in.id;
        item.attendeeInspecs.push(result);
        console.log("Data data_inspection despues del push: ", this.data_inspection)
      }
    })
  }

  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttendInspec(data_inv, pos,) {
    console.log("entra a abrir modal attend EDICION");
    let data_ = {
      data: data_inv,
      sr: this.data.sr,
      housingListId: this.data_land.housingListId,
      idServiceDetail: this.data_land.idServiceDetail
    }

    const dialog = this._dialog.open(DialogAttendeesInspecComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_move_in.attendees[pos] = result;
      }
    })
  }

  ///////////////////// PHOTOS INSPECT 

  addFotosMoveInspec(r) {
    ////debugger;
    document.getElementById('doc_i' + r).click();
  }

  //========== CARGA DE FOTOS INSPEC//
  public droppedFotosInspec(files: NgxFileDropEntry[], r, item) {
    ////debugger;
    this.files = files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("droppedFile.relativePath: ", droppedFile.relativePath);
          console.log("file: ", file, "this.files: ", this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");
              ////debugger;
              item.photosInspecs.push({
                "id": 0,
                "Inspection": item.id,
                "base64": imageUrl,
                "photo": encoded,
                "photoExtension": ext[ext.length - 1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date(),
              })
            };
          });
        });
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  supplierPartner_repairs() {
    console.log(" datos a enviar SupplierCompany_repairs ============", this.home_finding.workOrderServicesId, this.data)
    this._services.service_general_get("SupplierPartnerProfile/GetServProvByServiceTypeCountry?workOrderService=" + this.home_finding.workOrderServicesId + "&type=25000").subscribe((data => {
      // this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ', data.result.value);
        this.SupplierCompany_repairs = data.result.value;
        // this.getInfo();
      }
    }), (err) => {
      console.log("no se realizo la consulta por falta de parametro");
    });
  }

  public openRepairsFileOnWindow(url_in: string): void {
    ////debugger;
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  public __serverPath__: string = this._services.url_images;
 

  _supplier() {
    // if (this.data.supplierPartner != null && this.data.supplierPartner != 0) {
    //   this._services.service_general_get("SupplierPartnerProfile/GetAdmintContactsServiceProv?supplierPartner=" + this.data.supplierPartner + "&workOrderService=" + this.data.workOrderServicesId).subscribe((data => {
    //    if (data.success) {
    //       console.log('DATA CONSULTA SUPPLIER: ', data.result.value);
    //       this.Supplier = data.result.value;
    //       this.getInfo();
    //     }
    //   }), (err) => {
    //     console.log("No se realizo la consulta por falta de parametros");
    //   });
    //   this.data.othersupplier = '';
    //   this.data.suppliertelephone = '';
    //   this.data.supplieremai = '';
    // }
    // else {
    //   this.data.supplier = null;
    // }
  }


  insert_ispection(obj_inspect) {
    this._services.service_general_post_with_url("HousingList/PostInspection", obj_inspect).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("HousingList/PostInspection - Request: ", data);
        this.data_inspection = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Add Inspection"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    });

  }

  update_ispection(obj_inspect) {
    ////debugger;
    this._services.service_general_put("HousingList/PutInspection", obj_inspect).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("HousingList/PutInspection: ", data);
        this.data_inspection = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Updated Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  delete_inspection(obj_inspect) {
    this._services.service_general_put("HousingList/DeleteInspection", obj_inspect.id).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("HousingList/DeleteInspection: ", data);
        this.data_inspection = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Delet Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  insert_repair(obj_repair) {

    this._services.service_general_post_with_url("HousingList/PostRepair", obj_repair).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("HousingList/PostRepair - Request: ", data);
        this.data_repairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Add Inspection"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    });



  }

  update_repair(obj_repair) {
    this.loader.showLoader();
    console.log("obj_repair Request HousingList/PutRepair: ", obj_repair);
    this._services.service_general_put("HousingList/PutRepair", obj_repair).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("Respuesta HousingList/PutRepair: ", data);
        this.data_repairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Updated Data"
          },
          width: "350px"
        });
      }
      else {
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  delete_obj_repair(obj_repair) {
    this._services.service_general_put("HousingList/DeleteRepair", obj_repair.id).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("HousingList/DeleteRepair: ", data);
        this.data_repairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Delet Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  delete_obj_document_repair(obj_repair, repair) {
    this._services.service_general_put("HousingList/DeleteDocumentRepair", obj_repair.id).subscribe((data => {
      ////debugger;
      if (data.success) {
        console.log("HousingList/DeleteDocumentRepair: ", data);
        repair.documentRepairs = data.result;
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Succes",
            body: "Succes Delet Data"
          },
          width: "350px"
        });
      }
      else {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Error Updated Data"
          },
          width: "350px"
        });
      }
    }
    ), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })

  }

  //*****************************************************************************************************//
  //**DELETE DOCUMENTO FROM DATABASE**//
  deleteDocument_DB_inspec(i, j, doc, item) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log(result);
      if (result) {
        if (doc.id > 0) {
          this.delete_obj_document_repair(doc, item);
        }
        else {
          this.data_repairs[i].documentRepairs.splice(j, 1);
        }


      }
    })
  }

  //////////////////ajustes diciembre 2022 

  actions_Change(ob: MatCheckboxChange, element, type) {
////debugger;
    if (ob.checked) {
      if (type == 'fair') {
        element.needRepair = false;
        element.needClean = false;
        element.needReplace = false;
      }
      else {
        element.noneAction = false
      }
    }
  };

   //Seccion property//
   getProperty(id) {
    for (let i = 0; i < this.ca_propertySection.length; i++) {
      if (this.ca_propertySection[i].id == id) {
        return this.ca_propertySection[i].propertySection;
      }
    }
  }
  //Seccion property//
  getCondicion(id) {
    for (let i = 0; i < this.ca_statuspropertySection.length; i++) {
      if (this.ca_statuspropertySection[i].id == id) {
        return this.ca_statuspropertySection[i].status;
      }
    }
  }
  //RELATION SHIP//
  getReltion(id) {
    for (let i = 0; i < this.ca_relation.length; i++) {
      if (this.ca_relation[i].id == id) {
        return this.ca_relation[i].relationship;
      }
    }
  }
  //Repair//
  getRepair(id) {
    for (let i = 0; i < this.ca_repair.length; i++) {
      if (this.ca_repair[i].id == id) {
        return this.ca_repair[i].repairType;
      }
    }
  }
  //Supplier//
  getSupplier(id) {
    for (let i = 0; i < this.SupplierCompany.length; i++) {
      if (this.SupplierCompany[i].int == id) {
        return this.SupplierCompany[i].supplierCompany;
      }
    }
  }
  //Supplier//
  getProperty_(id) {
    for (let i = 0; i < this.ca_property.length; i++) {
      if (this.ca_property[i].id == id) {
        return this.ca_property[i].propertyType;
      }
    }
  }

  //*****************************************************************************************************//
 
  ca_statuspropertySection = [];

  ca_relation = [];
  ca_repair = [];
  SupplierCompany = []
  ca_property = [];
  ca_privacy = [];
  ca_security = [];
  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com = [];

  save_ir_status(){
    if(this.permanentHome.groupIr[0].idStatus){
      let req_ = {status_id: this.permanentHome.groupIr[0].idStatus, id: this.permanentHome.groupIr[0].id}
      this._services.service_general_post_with_url('HousingList/save_ir_status', req_).subscribe(r => {
        if (r.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Updated status"
            },
            width: "350px"
          });
        }
        else{
          console.log("Error actualziando estatus de el ir: ", r);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Error",
              body: "Updated status Error"
            },
            width: "350px"
          });
        }
      })
    }
   
  };


  /////////////////////////// ATENDEEEES Y KEYS INVENTORY 


    ////delete deleteSectionInventory

    deleteSectionInventory(key, sectionInventories, propertyInspection) {
      ////debugger;
      if (key.id > 0) {
        //
        this.loader.showLoader();
        this._services.service_general_put("HousingList/deleteSectionInventory", key.id).subscribe((response_bd => {
          this.loader.hideLoader();
          ////debugger;
          if (response_bd.success) {
            console.log("HousingList/deleteSectionInventory ==============================", response_bd);
            sectionInventories = response_bd.result.value;
  
            var i_e = sectionInventories.indexOf(key);
            var removed = sectionInventories.splice(i_e, 1);
  
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Deleted Data"
              },
              width: "350px"
            });
  
          }
        }), (err) => {
          this.loader.hideLoader();
          console.log("error al eliminar la cuenat de banco: ", err);
        });
      }
      else {
        ////debugger;
        var i_e = sectionInventories.indexOf(key);
        var removed = sectionInventories.splice(i_e, 1);
  
      }
    }
  
    //************************************************//
    //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
    addKeyInventory(propertyInspection) {
      console.log("entra a abrir modal inventori");
  
      var data_move_id;
      if (propertyInspection == 1)
        data_move_id = this.data_move_in.id
      else
        data_move_id = this.data_move_out.id
  
      const dialog = this._dialog.open(DialogKeyComponent, {
        data: {
          id: 0, operacion: 'insertar', propertyReport: data_move_id
        },
        width: "95%"
      });
  
      dialog.beforeClosed().subscribe(result => {
        console.log(result);
  
        if (result.success) {
          result.propertyReport = data_move_id;
          if (propertyInspection == 1)
            this.data_move_in.keyInventories.push(result);
          else
            this.data_move_out.keyInventories.push(result);
        }
      })
    }
    //************************************************//
    //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
    editKeyInventory(data_inv, pos, propertyInspection) {
      console.log("entra a abrir modal key inventory EDICION");
  
      const dialog = this._dialog.open(DialogKeyComponent, {
        data: data_inv,
        width: "95%"
      });
  
      dialog.beforeClosed().subscribe(result => {
        console.log(result);
  
        if (result.success) {
          if (propertyInspection == 1)
            this.data_move_in.keyInventories[pos] = result;
          else
            this.data_move_out.keyInventories[pos] = result;
        }
      })
    }
  
    deletKeyInventory(key, propertyInspection) {
      ////debugger;
      if (key.id > 0) {
        //
        this.loader.showLoader();
        this._services.service_general_put("HousingList/deletKeyInventory", key.id).subscribe((response_bd => {
          this.loader.hideLoader();
          ////debugger;
          if (response_bd.success) {
            console.log("HousingList/deletKeyInventory ==============================", response_bd);
            if (propertyInspection == 1)
              this.data_move_in.keyInventories = response_bd.result.value;
            else
              this.data_move_out.keyInventories = response_bd.result.value;
  
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Deleted Data"
              },
              width: "350px"
            });
  
          }
        }), (err) => {
          this.loader.hideLoader();
          console.log("error al eliminar la cuenat de banco: ", err);
        });
      }
      else {
        ////debugger;
        if (propertyInspection == 1) {
          var i_e = this.data_move_in.keyInventories.indexOf(key);
          var removed = this.data_move_in.keyInventories.splice(i_e, 1);
        }
        else {
          var i_e = this.data_move_out.keyInventories.indexOf(key);
          var removed = this.data_move_out.keyInventories.splice(i_e, 1);
        }
  
      }
    }
  
    //************************************************//
    //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
    addAttendees(propertyInspection) {
      console.log("entra a abrir modal attendees");
  
  
      var move_section;
      if (propertyInspection == 1)
        move_section = this.data_move_in.id
      else
        move_section = this.data_move_out.id
  
      const dialog = this._dialog.open(DialogAttendeesComponent, {
        data: {
          id: 0,
          sr: this.data.sr,
          operacion: 'insertar',
          propertyReport: move_section,
          housingListId: this.data_land.housingListId,
          idServiceDetail: this.data_land.idServiceDetail
        },
        width: "95%"
      });
  
      dialog.beforeClosed().subscribe(result => {
        ////debugger;
        console.log(result);
  
        if (result.success) {
          if (propertyInspection == 1) {
            result.propertyReport = this.data_move_out.id;
            this.data_move_in.attendees.push(result);
          }
          else {
            result.propertyReport = this.data_move_out.id;
            this.data_move_out.attendees.push(result);
          }
  
        }
      })
    }
  
    //************************************************//
    //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
    editAttend(data_inv, pos, propertyInspection) {
      console.log("entra a abrir modal attend EDICION");
      let data_ = {
        data: data_inv,
        sr: this.data.sr,
        housingListId: this.data_land.housingListId,
        idServiceDetail: this.data_land.idServiceDetail
      }
  
      const dialog = this._dialog.open(DialogAttendeesComponent, {
        data: data_,
        width: "95%"
      });
  
      dialog.beforeClosed().subscribe(result => {
        console.log(result);
        if (result.success) {
          if (propertyInspection == 1)
            this.data_move_in.attendees[pos] = result;
          else
            this.data_move_out.attendees[pos] = result;
        }
      })
    }
  
    deleteAttend(key, propertyInspection) {
      //debugger
      if (key.id > 0) {
        //
        this.loader.showLoader();
        this._services.service_general_put("HousingList/deleteAttend", key.id).subscribe((response_bd => {
          this.loader.hideLoader();
          ////debugger;
          if (response_bd.success) {
            console.log("HousingList/deleteAttend ==============================", response_bd);
            if (propertyInspection == 1)
              this.data_move_in.attendees = response_bd.result.value;
            else
              this.data_move_out.attendees = response_bd.result.value;
  
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Deleted Data "
              },
              width: "350px"
            });
  
          }
        }), (err) => {
          this.loader.hideLoader();
          console.log("error al eliminar la cuenat de banco: ", err);
        });
      }
      else {
        ////debugger;
        if (propertyInspection == 1) {
          var i_e = this.data_move_in.attendees.indexOf(key);
          var removed = this.data_move_in.attendees.splice(i_e, 1);
        }
        else {
          var i_e = this.data_move_out.attendees.indexOf(key);
          var removed = this.data_move_out.attendees.splice(i_e, 1);
        }
  
  
      }
  
    }
  
    attendees_list_all = [];
  
    get_attendiees_vales(att) {
      let d_ = { name: "", email: "", title: "" }
  
      if (att != null && att != "" && att != undefined) {
        var att_ = this.attendees_list_all.filter(function (E) { if (E.id_Catalog == att) { return true; } });
        if (att_.length > 0) {
          d_.name = att_[0].name;
          d_.email = att_[0].email;
          d_.title = att_[0].title;
        }
      }
  
  
      return d_.title
  
    }
  
    get_attendees_list_all(housingListId) {
      //  this.loader.showLoader();
      let req_ = {
        idservicedetail: this.home_finding.id,
        propertyid: housingListId,
        srid: this.data.sr,
      }
  
      this._services.service_general_post_with_url('HousingList/GetAttendeesTitles', req_).subscribe(r => {
        //  this.loader.hideLoader();
        if (r.success) {
          console.log("HousingList/GetAttendeesTitles", r);
          this.attendees_list_all = r.result.value;
        }
      })
    }

}
