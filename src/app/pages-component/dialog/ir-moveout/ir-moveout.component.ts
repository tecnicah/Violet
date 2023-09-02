import {AfterViewInit, Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { anyChanged } from '@progress/kendo-angular-common';
import { DialogInventoryComponent } from '../dialog-inventory/dialog-inventory.component';
import { DialogAttendeesComponent } from '../dialog-attendees/dialog-attendees.component';
import { DialogKeyComponent } from '../dialog-key/dialog-key.component';
import { DialogAttendeesInspecComponent } from '../dialog-attendees-inspec/dialog-attendees-inspec.component';
import { IrMoveinDetailComponent } from '../ir-movein-detail/ir-movein-detail.component';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';

@Component({
  selector: 'app-ir-moveout',
  templateUrl: './ir-moveout.component.html',
  styleUrls: ['./ir-moveout.component.css']
})
export class IrMoveoutComponent implements OnInit {


  data_move_out: any = {
    propertyReportSections: [],
    keyInventories: [],
    attendees: []
  };
  displayedColumns: string[] = ['section', 'status', 'actions', 'photos', 'edit'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loader: LoaderComponent = new LoaderComponent();
  @ViewChild('sortrole') sortrole: MatSort;
  user: any = {};
  ca_currency: any[] = [];
  versions_ir = [];
  edicion = false;
  ca_statuspropertySection = [];
  ca_propertySection = [];
  ca_status_report =  [];
  data_land: any = {
    creditCardLandLordDetails: []
  };

  ca_relation = [];
  ca_repair = [];
  SupplierCompany = []
  ca_property = [];
  ca_privacy = [];
  ca_security = [];
  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com = [];
  ca_leaseTemplate = [];

  
   ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// VARIABLES 


  constructor( public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { 

  }

  section_ ;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA RECIBIDA inspections Select - MOVE OUT: ", this.data);
    this.edicion = this.data.edicion;
    this.catalogos();
    this.section_ = 2;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async catalogos() {
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.GetInspRepBySection(this.data.ph_id, this.data.servide_detail_id, this.section_);
    // I&R 
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this._services.service_general_get('PropertyReport/get_status_report').subscribe(r => {
      if (r.success) {
        this.ca_status_report  = r.result;
      }
    });

    this.get_items_section(0);
    this.get_attendees_list_all(this.data.ph_id);
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');

  }

  GetInspRepBySection(key, servide_detail_id, section) {
    this.loader.showLoader();
    this._services.service_general_get("HousingList/GetInspRepBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section).subscribe((cd => {
      this.data_move_out = cd.result.value.propertyReports[0];

      this.dataSource = this.data_move_out.propertyReportSections;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('ONLY Moe OUT  data_move_OUT : ', this.data_move_out);

      console.log('ONLY Moe OUT  respuesta completa : ', cd, this.data_move_out);
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar Move In: ", err);
    });

  };


  //GUARDAR TARJETA ITERABLE DE MOVE OUT//
  save_PropertyReport() {

    this.loader.showLoader();
    var _pr;
    
      //ACTUALIZACION DEL REGISTROS//
      this.data_move_out.propertyInspection = 2; //move out
      this.data_move_out.createdBy = this.user.id;
      this.data_move_out.createdDate = new Date();
      this.data_move_out.updatedBy = this.user.id;
      this.data_move_out.updatedDate = new Date();
      _pr = this.data_move_out;
    console.log("data_move_out", this.data_move_out);

    this._services.service_general_put("PropertyReport/PutPropertyReport", _pr).subscribe((respondepr => {

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
        this.dialogRef.close();
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
  };


  edit_Section(section){
      let edicion = false;

      const dialogRef = this._dialog.open(IrMoveinDetailComponent, {
        data: {
          ph_id: this.data.ph_id,
          servide_detail_id: this.data.servide_detail_id
          ,edicion : this.edicion
          ,section : section
        },
        width: "100%",
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.success) {
          console.log("regres del pop up de section ")
           //this.data_move_out.propertyReportSections = response_bd.result.value;
            this.dataSource = this.data_move_out.propertyReportSections;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
        else {
          console.log("ERROR regres del pop up de section")
        }
      });
    };

  delete_section(){

  }


  /////////////////////////// ATENDEEEES Y KEYS INVENTORY 


    deleteSectionInventory(key, sectionInventories, propertyInspection) {
      if (key.id > 0) {
        this.loader.showLoader();
        this._services.service_general_put("HousingList/deleteSectionInventory", key.id).subscribe((response_bd => {
          this.loader.hideLoader();
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
            this.data_move_out.keyInventories[pos] = result;
        }
      })
    }
  
    deletKeyInventory(key, propertyInspection) {
      if (key.id > 0) {
        this.loader.showLoader();
        this._services.service_general_put("HousingList/deletKeyInventory", key.id).subscribe((response_bd => {
          this.loader.hideLoader();
          if (response_bd.success) {
            console.log("HousingList/deletKeyInventory ==============================", response_bd);
        
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

          var i_e = this.data_move_out.keyInventories.indexOf(key);
          var removed = this.data_move_out.keyInventories.splice(i_e, 1);
        
  
      }
    }
  
    //************************************************//
    //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
    addAttendees(propertyInspection) {
      console.log("entra a abrir modal attendees");
  
  
      var move_section;
  
        move_section = this.data_move_out.id
  
      const dialog = this._dialog.open(DialogAttendeesComponent, {
        data: {
          id: 0,
          sr: this.data.sr_id,
          operacion: 'insertar',
          propertyReport: move_section,
          housingListId: this.data.ph_id,
          idServiceDetail: this.data.servide_detail_id
        },
        width: "95%"
      });
  
      dialog.beforeClosed().subscribe(result => {
        console.log(result);
  
        if (result.success) {
          
            result.propertyReport = this.data_move_out.id;
            this.data_move_out.attendees.push(result);
          
  
        }
      })
    }
  
    //************************************************//
    //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
    editAttend(data_inv, pos, propertyInspection) {
      console.log("entra a abrir modal attend EDICION");
      let data_ = {
        data: data_inv,
        sr: this.data.sr_id,
        housingListId: this.data.ph_id,
        idServiceDetail: this.data.hf_id
      }
  
      const dialog = this._dialog.open(DialogAttendeesComponent, {
        data: data_,
        width: "95%"
      });
  
      dialog.beforeClosed().subscribe(result => {
        console.log(result);
        if (result.success) {
            this.data_move_out.attendees[pos] = result;
        }
      })
    }
  
    deleteAttend(key, propertyInspection) {

      if (key.id > 0) {
     
        this.loader.showLoader();
        this._services.service_general_put("HousingList/deleteAttend", key.id).subscribe((response_bd => {
          this.loader.hideLoader();
        
          if (response_bd.success) {
            console.log("HousingList/deleteAttend ==============================", response_bd);

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
          var i_e = this.data_move_out.attendees.indexOf(key);
          var removed = this.data_move_out.attendees.splice(i_e, 1);
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
    
      let req_ = {
        idservicedetail: this.data.hf_id,
        propertyid: housingListId,
        srid: this.data.sr_id,
      }
  
      this._services.service_general_post_with_url('HousingList/GetAttendeesTitles', req_).subscribe(r => {
      
        if (r.success) {
          console.log("HousingList/GetAttendeesTitles", r);
          this.attendees_list_all = r.result.value;
        }
      })
    };

     //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveInOut(data_move_id, propertyInspection) {

    var section = {
      "id": 0,
      "propertyReport": data_move_id,//this.data_move_out.id,
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
        
          
          this.data_move_out.propertyReportSections = response_bd.result.value;
          this.dataSource = this.data_move_out.propertyReportSections;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Section has been added, please edit to complete the information"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }

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
  };

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
        sr: this.data.sr_id,
        operacion: 'insertar',
        inspection: item.id
        , housingListId: this.data.ph_id,
        idServiceDetail: this.data.hf_id
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("info recibidia del po pup attendis inspection: ", result);

      if (result.success) {
        item.attendeeInspecs.push(result);
        console.log("Data data_inspection despues del push: ")
      }
    })
  }


  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveInOut(id_section) {
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
        this.deletePropertyReport(id_section)
      }
    })
  }

  deletePropertyReport(id_section) {
    ////debugger;
    if (id_section > 0) {
      this.loader.showLoader();
      this._services.service_general_put("HousingList/deletePropertyReportSection", id_section).subscribe((response_bd => {
        this.loader.hideLoader();
        ////debugger;
        if (response_bd.success) {
          console.log("HousingList/deletePropertyReportSection ==============================", response_bd);
       

          

            this.data_move_out.propertyReportSections = response_bd.result.value;
            this.dataSource = this.data_move_out.propertyReportSections;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

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
     
       // this.data_move_out.propertyReportSections.splice(i, 1);
      
    }
  }

}

