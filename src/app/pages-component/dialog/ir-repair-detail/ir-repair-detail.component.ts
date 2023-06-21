import { AfterViewInit, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAttendeesInspecComponent } from '../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ir-repair-detail',
  templateUrl: './ir-repair-detail.component.html',
  styleUrls: ['./home-finding-full.component.scss']
})
export class IrRepairDetailComponent implements OnInit {

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// VARIABLES 

  user: any = {};

  repair;


  loader: LoaderComponent = new LoaderComponent();
  versions_lsf = [];
  lsf_service_detail_id;
  // Inspection Type 
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Address', 'Neighborhood', 'Property Type','Price', 'Actions'];

  ca_inspec_type = [{ id: 1, type: "Pre Inspection" }, { id: 2, type: "Post Delivery" }]

  ///////////////////////////////////////////////// VAIABLES //////////////////////

  permanentHome = { groupIr: [], id: null }
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

  //user: any = {};
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
  edicion = false;
  ca_propertySection = [];
  ca_leaseTemplate = [];
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
  ca_status_report = [];
  all_items = [];
  attendees_list_all = [];
  ca_resppayrep = [];
  data_land: any = {
    creditCardLandLordDetails: []
  };
  data_inspection;
  data_repairs = [];
  public files: NgxFileDropEntry[] = [];
  public __serverPath__: string = this._services.url_images;

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// VARIABLES 



  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA RECIBIDA section ispections & repairs ===================== : ", this.data);
    this.edicion = this.data.edicion;
    this.get_catalogs();
    this.getDataHousing();
    this.user = JSON.parse(localStorage.getItem('userData'));
    if(this.data.action){
      this.repair = this.data.action;
    }
    else{
      this.new_repair();
    }
  }

  new_repair(){
    this.repair = {
      id : 0 
     ,housingList: this.data.ph_id
     ,repairType: null
     ,paymentResponsibility: null
     ,totalDays: null
     ,repairStartDate: null
     ,repairEndDate: null
     ,totalCostRepair: null
     ,currency: null
     ,supplierPartner: null
     ,comments: null
     ,documentRepairs: []
     ,createdBy: this.user.id
     ,createdDate: new Date()
     ,idServiceDetail: this.data.servide_detail_id
     ,InspectionId: this.data.inspection.id
     ,
    }
  }


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
        this.ca_status_report = r.result;
      }
    });

    this._services.service_general_post_with_url('HousingList/GetPaymentRepairResponsability', 1).subscribe(r => {
      this.ca_resppayrep = r.hl;
    });

    this.get_items_section(0);
    this.get_attendees_list_all(this.data.ph_id);
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
    this.supplierPartner_repairs();
    
   // this.GetInspRepBySection(this.data.ph_id, this.data.servide_detail_id, 3);
  };


  supplierPartner_repairs() {
    //console.log(" datos a enviar SupplierCompany_repairs ============", this.home_finding.workOrderServicesId, this.data)
    this._services.service_general_get("SupplierPartnerProfile/GetServProvByServiceTypeCountry?workOrderService=" + this.data.wos_id + "&type=25000").subscribe((data => {
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


  GetInspRepBySection(key, servide_detail_id, section) {
    this.loader.showLoader();
    this._services.service_general_get("HousingList/GetInspRepBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section).subscribe((cd => {

      this.permanentHome.groupIr = cd.result.value.groupIr;
      this.data_inspection = this.permanentHome.groupIr[0].inspections;
      this.data_repairs = this.permanentHome.groupIr[0].repairs;
      // console.log('this.permanentHome.groupIr : ', this.permanentHome.groupIr);

      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al crgar Inspections: ", err);
    });

  };


   //DATA TABLE HOUSING//
   getDataHousing() {

    this._services.service_general_get(`HousingList/GetPermanentHousingList?id_sr=1851`).subscribe(data_housing => {
      if (data_housing.success) {

        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        // this.permanent_homet(this.departure.propertyId);

      }
    });
  }

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
        sr: this.data.sr_id,
        operacion: 'insertar',
        inspection: item.id
        , housingListId: this.data.ph_id,
        idServiceDetail: this.data.servide_detail_id
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
  };

  get_attendees_list_all(housingListId) {
    //  this.loader.showLoader();
    let req_ = {
      idservicedetail: this.data.servide_detail_id,
      propertyid: housingListId,
      srid: this.data.sr_id,
    }

    this._services.service_general_post_with_url('HousingList/GetAttendeesTitles', req_).subscribe(r => {
      //  this.loader.hideLoader();
      if (r.success) {
        console.log("HousingList/GetAttendeesTitles", r);
        this.attendees_list_all = r.result.value;
      }
    })
  };

  saveRepairs() {

    // var obj_repair = {
    //   id: 0,
    //   housingList: this.permanentHome.id,
    //   repairType: null,
    //   supplierPartner: null,
    //   repairStartDate: null,
    //   repairEndDate: null,
    //   totalDays: 0,
    //   totalCostRepair: 0,
    //   currency: null,
    //   comments: null,
    //   createdBy: this.user.id,
    //   createdDate: new Date(),
    //   updateBy: this.user.id,
    //   updatedDate: new Date(),
    //   documentRepairs: [],
    //   idServiceDetail: this.home_finding.id,//this.data.idServiceDetail_current
    //   groupIrId: this.permanentHome.groupIr[0].id,
    //   paymentResponsibility: null
    // }
    if(this.repair.id > 0){
      this.update_repair(this.repair);
    }
    else{
       this.insert_repair(this.repair);
    }
   
  };

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



  };

  update_repair(obj_repair) {
    this.loader.showLoader();
    console.log("obj_repair Request HousingList/PutRepair: ", obj_repair);
    this._services.service_general_put("HousingList/PutRepair", obj_repair).subscribe((data => {

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

  };


  save_ir_status() {
    if (this.permanentHome.groupIr[0].idStatus) {
      let req_ = { status_id: this.permanentHome.groupIr[0].idStatus, id: this.permanentHome.groupIr[0].id }
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
        else {
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

  addInspectionDate(inspectType) {

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

  };

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

  };

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

  };

  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttendInspec(data_inv, pos,) {
    console.log("entra a abrir modal attend EDICION");
    let data_ = {
      data: data_inv,
      sr: this.data.sr_id,
      housingListId: this.data.ph_id,
      idServiceDetail: this.data.servide_detail_id
    }

    const dialog = this._dialog.open(DialogAttendeesInspecComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        // this.data_move_in.attendees[pos] = result;
      }
    })
  };

  addFotosMoveInspec(r) {
    document.getElementById('doc_i').click();
  };

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

  };


  public openRepairsFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  };

  delete_obj_repair(obj_repair) {
    this._services.service_general_put("HousingList/DeleteRepair", obj_repair.id).subscribe((data => {
      
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

  };

    //FUNCION PARA AGREGAR MAS DOCUMENTOS//
    addDocument_1(i) {
      document.getElementById('doc' + i).click();
    };


      //**DELETE DOCUMENTO FROM DATABASE**//
  deleteDocument_DB_inspec(i, j, doc, item) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });
  };

  //***************** *******************************//
  //CARGA DE DOCUMENTOS PARA SECCION REPAIRS MOVE IN//
 // public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
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

              this.repair.documentRepairs.push({
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

        console.log("Drop ==========================" , this.repair.documentRepairs);
      }
      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
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
  };

    //************************************************//
    public fileOver(event) {
      ////debugger;
      console.log(event);
    }
    //************************************************//
    public fileLeave(event) {
      ////debugger;
      console.log(event);
    };
  
    deletePhoto_ins(id, index_pic, photosInspecs) {
      console.log("photos Repair -------------------------------------------------" , photosInspecs)
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
          if (id > 0) {
            this.delete_photo_repair(id, index_pic);
          }
          else {
            photosInspecs.splice(index_pic, 1);
          }
  
        }
      })
    };
  
    delete_photo_repair(id, index_pic) {

      this.loader.showLoader();
      this._services.service_general_put("HousingList/delete_photo_repair", id).subscribe((response_bd => {
        this.loader.hideLoader();
        if (response_bd.success) {
          console.log("responde_bd delete photos delete_photo_repair ==============================", response_bd);
          this.repair.documentRepairs.splice(index_pic, 1);
  
        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la foto de la inspection : ", err);
      });
    };

  _supplier(){

  }

  pre_img = "data:image/jpeg;base64,";

  ////////////////// FOTOS  //////////////////////////////////////////////

  
}