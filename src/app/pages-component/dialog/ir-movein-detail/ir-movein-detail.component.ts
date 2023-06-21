import { AfterViewInit, Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';

@Component({
  selector: 'app-ir-movein-detail',
  templateUrl: './ir-movein-detail.component.html',
  styleUrls: ['./ir.component.scss']
})
export class IrMoveinDetailComponent implements OnInit {



  data_move_in: any = {
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
  ca_status_report = [];
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
  attendees_list_all = [];
  public files: NgxFileDropEntry[] = [];
  section;

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// VARIABLES 



  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA RECIBIDA section detail: ", this.data);
    this.edicion = this.data.edicion;
    this.catalogos();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async catalogos() {

    this.section = this.data.section;
    console.log("Section local =======================================: ", this.section)
    this.loader.hideLoader();
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    // this.GetInspRepBySection(this.data.ph_id, this.data.servide_detail_id, 1);
    // I&R 
    this.ca_statuspropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
    this._services.service_general_get('PropertyReport/get_status_report').subscribe(r => {
      if (r.success) {
        this.ca_status_report = r.result;
      }
    });

    this.get_items_section(0);
    this.get_attendees_list_all(this.data.ph_id);
    this.ca_leaseTemplate = await this._services.getCatalogueFrom('GetLeaseTemplate');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this.ca_repair = await this._services.getCatalogueFrom('GetRepairType');
    this.ca_property = await this._services.getCatalogueFrom('GetPropertyTypeHousing');


    console.log("Sectiooooooooooooooooooooooooooooooooooooooooooooo: ", this.section)
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
    //  console.log("all_items" , this.all_items, "att_ ", att_ )
      if (att_.length > 0) {
        name = att_[0].item;
      }

    }
   // console.log("name" , name )
    return name;
  }

  get_name_section(id) {
    ////////debugger;
    var result = [];
    var result = this.ca_propertySection.filter(function (E) { if (E.id == id) { return true; } });
    // console.log(result);
    if (result) {
      //debugger;
      if (result.length > 1) {
        return result[0].propertySection;
      } else {
        return null;
      }

    }
    else {
      return null;
    }


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
  };

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


  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotos(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        fileEntry.file((file: File) => {

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
              let _pRid = this.section.id;

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

              this.section.photosPropertyReportSections.push(_photosPRS_);

            };
          });
        });
      }

      else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  };


  public fileOver(event) {
    //////debugger;
    console.log(event);
  }

  //////////////////ajustes diciembre 2022 

  actions_Change(ob: MatCheckboxChange, element, type) {
    //////debugger;
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

  save_section(section) {
    console.log("SECCION A EDICION", section);
    this.loader.showLoader();
    this._services.service_general_put("PropertyReport/PutPropertyReportSection", section).subscribe((response_bd => {
      this.loader.hideLoader();
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
  };

  //************************************************//
  //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
  addInventoriModal(section) {

    if (section.propertySection) {
      console.log("entra a abrir modal inventori", section);

      const dialog = this._dialog.open(DialogInventoryComponent, {
        data: {
          id: 0,
          operacion: 'insertar',
          propertyReportSectionId: section.id,
          section: section.propertySection,
        },
        width: "95%"
      });

      dialog.beforeClosed().subscribe(result => {
        console.log("resultado inventario por seccion =================================", result);
        if (result.success == true) {
          this.section.sectionInventories = result;
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

  //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
  editSectionInventory(data_inv, section) {
    console.log("entra a abrir modal inventori EDICION");
    data_inv.section = section;
    const dialog = this._dialog.open(DialogInventoryComponent, {
      data: data_inv,
      width: "95%"
    });
    dialog.beforeClosed().subscribe(result => {
      //debugger;
      //////debugger;
      console.log("resultado inventario por edit seccion =================================", result);
      //////debugger;
      if (result.success == true) {

        this.section.sectionInventories = result;

      }
    });

  };


  ////delete deleteSectionInventory

  deleteSectionInventory(key, sectionInventories, propertyInspection) {

    if (key.id > 0) {

      this.loader.showLoader();
      this._services.service_general_put("HousingList/deleteSectionInventory", key.id).subscribe((response_bd => {
        this.loader.hideLoader();
        if (response_bd.success) {
          console.log("HousingList/deleteSectionInventory ==============================", response_bd);
          this.section.sectionInventories = response_bd.result.value;

          //var i_e = sectionInventories.indexOf(key);
          //var removed = sectionInventories.splice(i_e, 1);

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
      var i_e = sectionInventories.indexOf(key);
      var removed = sectionInventories.splice(i_e, 1);
    }
  };

  //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
  addFotosMove(r) {
    //////debugger;
    document.getElementById('doc' + r).click();
  };


  public fileLeave(event) {
    //////debugger;
    console.log(event);
  }
  //FUNCION PARA AGREGAR MAS DOCUMENTOS//
  addDocument_1(i) {
    document.getElementById('doc' + i).click();
  };


  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE IN//
  deletePhoto(section, p,id_photo) {


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
        if (id_photo == 0) {
          // aca va la función cuando no esta en la base

          this.section.photosPropertyReportSections.splice(p, 1);
        }
        else {
          // aca va la función cuando ya esta ne la BD
     
         this.delete_photo_section(id_photo);
         // console.log("lo que regreso el servicio ==============================");
        }
      };
    });
  };

  delete_photo_section(id) {

    this.loader.showLoader();
    this._services.service_general_put("HousingList/delete_photo_section", id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("responde_bd delete photos seccion==============================", response_bd);
       
        this.section.photosPropertyReportSections = response_bd.result;
      
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la foto de la section : ", err);
    });
  };


}
