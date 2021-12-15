import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

class PermissionsMenu {
  color: string;
  cols: number;
  rows: number;
  menu: string;
  permissionssubmenu: PermissionsSubmenu[] = [];
}

class PermissionsSubmenu {
  id: number = 0;
  role: number = 0;
  idCatMenu: number = 0;
  idCatSubMenu: number = 0;
  idCatSeccion: number = 0;
  submenu: string = '';
  seccion: string = '';
  reading: boolean;
  writing: boolean;
  editing: boolean;
  deleting: boolean;
}

@Component({
  selector: 'app-dialog-catalog-roles',
  templateUrl: './dialog-catalog-roles.component.html',
  styleUrls: ['./dialog-catalog-roles.component.css']
})

export class DialogCatalogRolesComponent implements OnInit {

  permissions: PermissionsMenu[] = [];
  public myArr = [];
  permissionsOperation: PermissionsSubmenu[] = [];
  permissionsPartner: PermissionsSubmenu[] = [];
  permissionsFinace: PermissionsSubmenu[] = [];
  permissionsAdmin: PermissionsSubmenu[] = [];

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogRolesComponent>) { }


  ngOnInit(): void {
    //console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    // comprobar si es creacion o actualizacion de currencies
    if (this.data.id != 0) {
      this._services.service_general_get(`Catalog/GetRole/${this.data.id}`).subscribe(r => {
        if (r.success) {
          this.data = r.result.value[0];

          for (var i = 0; i < this.data.permissions.length; i++) {
            switch (this.data.permissions[i].menu) {
              case 'Operations':
                //for (j = 0; j < this.data.permissions[i].)
                this.permissionsOperation.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsOperation
                  });
                break;
              case 'Partner & Clients':
                this.permissionsPartner.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 2,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsPartner
                  });
                break;
              case 'Finance':
                this.permissionsFinace.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 4,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsFinace
                  });
                break;
              case 'Admin Center':
                this.permissionsAdmin.push({
                  id: this.data.permissions[i].id,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: this.data.permissions[i].reading,
                  writing: this.data.permissions[i].writing,
                  editing: this.data.permissions[i].editing,
                  deleting: this.data.permissions[i].deleting
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 5,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsAdmin
                  });
                break;
              default:
              // code block
            }
          }

          /*
          this.myArr.push(this.permissions[0]);
          this.myArr.push(this.permissions[9]);
          this.myArr.push(this.permissions[11]);
          this.myArr.push(this.permissions[15]);
          */
         for(let i = 0; i < this.permissions.length; i++){
          if(this.permissions[i].menu == "Operations"){
           this.myArr.push(this.permissions[i]);
           break;
          }
       }

       for(let i = 0; i < this.permissions.length; i++){
         if(this.permissions[i].menu == "Partner & Clients"){
          this.myArr.push(this.permissions[i]);
          break;
         }
       }

       for(let i = 0; i < this.permissions.length; i++){
         if(this.permissions[i].menu == "Finance"){
          this.myArr.push(this.permissions[i]);
          break;
         }
       }

       for(let i = 0; i < this.permissions.length; i++){
         if(this.permissions[i].menu == "Admin Center"){
          this.myArr.push(this.permissions[i]);
          break;
         }
       }
          //const newArr = this.permissions.filter((el: any, index) => myArr.indexOf(el) === index)

          console.log(this.myArr);

          console.log('respuesta de actualizacion', this.permissions);
          this.__loader__.hideLoader();
        }
      });
    }
    else {
      this._services.service_general_get(`Catalog/GetRole/1`).subscribe(r => {
        if (r.success) {
          this.data = r.result.value[0];
          this.data.id = 0;
          this.data.role = "";
          this.data.description = ""
          this.data.createdDate = null;

          for (var i = 0; i < this.data.permissions.length; i++) {
            switch (this.data.permissions[i].menu) {
              case 'Operations':
                //for (j = 0; j < this.data.permissions[i].)
                this.permissionsOperation.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 9,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsOperation
                  });
                break;
              case 'Partner & Clients':
                this.permissionsPartner.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 2,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsPartner
                  });
                break;
              case 'Finance':
                this.permissionsFinace.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: 'lightblue',
                    cols: 1,
                    rows: 4,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsFinace
                  });
                break;
              case 'Admin Center':
                this.permissionsAdmin.push({
                  id: 0,
                  role: this.data.id,
                  idCatMenu: this.data.permissions[i].idCatMenu,
                  idCatSubMenu: this.data.permissions[i].idCatSubMenu,
                  idCatSeccion: this.data.permissions[i].idCatSeccion,
                  submenu: this.data.permissions[i].submenu,
                  seccion: this.data.permissions[i].seccion,
                  reading: false,
                  writing: false,
                  editing: false,
                  deleting: false
                });
                this.permissions.push(
                  {
                    color: '#F9F9F9',
                    cols: 1,
                    rows: 5,
                    menu: this.data.permissions[i].menu,
                    permissionssubmenu: this.permissionsAdmin
                  });
                break;
              default:
              // code block
            }
          }

          this.myArr.push(this.permissions[0]);
          this.myArr.push(this.permissions[9]);
          this.myArr.push(this.permissions[11]);
          this.myArr.push(this.permissions[15]);
          /*
          for(let i = 0; i < this.permissions.length; i++){
             if(this.permissions[i].menu == "Operations"){
              this.myArr.push(this.permissions[i]);
              return true;
             }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].menu == "Partner & Clients"){
             this.myArr.push(this.permissions[i]);
             return true;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].menu == "Finance"){
             this.myArr.push(this.permissions[i]);
             return true;
            }
          }

          for(let i = 0; i < this.permissions.length; i++){
            if(this.permissions[i].menu == "Admin Center"){
             this.myArr.push(this.permissions[i]);
             return true;
            }
          }
          */
          //const newArr = this.permissions.filter((el: any, index) => myArr.indexOf(el) === index)

          console.log(this.myArr);

          console.log('respuesta de actualizacion', this.permissions);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  // validar formulario
  active_role: boolean = false;
  active_description: boolean = false;
  // banderas de seleccion y unselect
  selectAll: boolean = false;

  AllRole() {
    this.selectAll = true;
    console.log('select all permissions');
    // recorremos el array
    this.myArr.forEach(menu => {
      menu.permissionssubmenu.forEach(permisos => {
        permisos.deleting = true;
        permisos.editing = true;
        permisos.reading = true;
        permisos.writing = true;
      });
    });
  }
  unSelectRole() {
    this.selectAll = false;
    console.log('select all permissions');
    // recorremos el array
    this.myArr.forEach(menu => {
      menu.permissionssubmenu.forEach(permisos => {
        permisos.deleting = false;
        permisos.editing = false;
        permisos.reading = false;
        permisos.writing = false;
      });
    });
  }

  validForm() {
    if (this.data.role == undefined) {
      this.active_role = true;
    } if (this.data.description == undefined) {
      this.active_description = true;
    }
    if ((this.data.role != undefined || this.data.role == '') && (this.data.description != undefined || this.data.description == '')) {
      this.save();
    }
  }

  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updateBy = userData.id;
    this.data.updatedDate = new Date();
    console.log("Inicial:", this.data);
    let newarr = [];
    console.log(this.permissions[0].permissionssubmenu);
    console.log(this.permissions[9].permissionssubmenu);
    console.log(this.permissions[11].permissionssubmenu);
    console.log(this.permissions[15].permissionssubmenu);
    for(let i = 0; i < this.permissions.length; i++){
      if(this.permissions[i].menu == "Operations"){
        for (var j = 0; j < this.permissions[i].permissionssubmenu.length; j++){
          newarr.push(this.permissions[i].permissionssubmenu[j]);
        }
        break;
      }
    }
    for(let i = 0; i < this.permissions.length; i++){
      if(this.permissions[i].menu == "Partner & Clients"){
        for (var j = 0; j < this.permissions[i].permissionssubmenu.length; j++){
          newarr.push(this.permissions[i].permissionssubmenu[j]);
        }
        break;
      }
    }
    for(let i = 0; i < this.permissions.length; i++){
      if(this.permissions[i].menu == "Finance"){
        for (var j = 0; j < this.permissions[i].permissionssubmenu.length; j++){
          newarr.push(this.permissions[i].permissionssubmenu[j]);
        }
        break;
      }
    }
    for(let i = 0; i < this.permissions.length; i++){
      if(this.permissions[i].menu == "Admin Center"){
        for (var j = 0; j < this.permissions[i].permissionssubmenu.length; j++){
          newarr.push(this.permissions[i].permissionssubmenu[j]);
        }
        break;
      }
    }
    /*
    for (var i = 0; i < this.permissions[0].permissionssubmenu.length; i++)
    {
      newarr.push(this.permissions[0].permissionssubmenu[i]);
    }
    for (var i = 0; i < this.permissions[9].permissionssubmenu.length; i++) {
      newarr.push(this.permissions[9].permissionssubmenu[i]);
    }
    for (var i = 0; i < this.permissions[11].permissionssubmenu.length; i++) {
      newarr.push(this.permissions[11].permissionssubmenu[i]);
    }
    for (var i = 0; i < this.permissions[15].permissionssubmenu.length; i++) {
      newarr.push(this.permissions[15].permissionssubmenu[i]);
    }
    */
    this.data.permissions = newarr;
    console.log("Data:", this.data);

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date().toDateString();
      this._services.service_general_post_with_url("Catalog/AddRole", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('Catalog/UpdateRole', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }

  }
  public dateWorker(date: string): string {
    let result: string = '';
    if (date != null) {
      const date_to_work: string = date,
        date_remove_time: string = date_to_work.split('T')[0];
      result = date_remove_time;
    } else {
      result = 'No Date';

    }
    return result;

  }

}
