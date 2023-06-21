import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogRolesComponent } from '../dialog/dialog-catalog-roles/dialog-catalog-roles.component';
import { DialogCatalogUserComponent } from '../dialog/dialog-catalog-user/dialog-catalog-user.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { DialogInactiveUserComponent } from './../dialog/dialog-inactive-user/dialog-inactive-user.component';
import { Router, Resolve } from '@angular/router';
import { DialogChangePasswordComponent } from '../dialog/dialog-change-password/dialog-change-password.component';


@Component({
  selector: 'app-admin-center-users',
  templateUrl: './admin-center-users.component.html',
  styleUrls: ['./admin-center-users.component.css']
})
export class AdminCenterUsersComponent implements OnInit {
  // role
  @ViewChild('sortrole') sortrole: MatSort;
  // @ViewChild('pagrole') pagrole: MatPaginator;
  @ViewChild(MatPaginator)pagrole: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;
  // @ViewChild(MatPaginator, {static: true}) pagrole: MatPaginator;


  // user
  @ViewChild('sortuser') sortuser: MatSort;
  @ViewChild(MatPaginator) paguser: MatPaginator;
  // @ViewChild('paginatoruserElement', {read: ElementRef}) paginatoruserHtmlElement: ElementRef;

  // @ViewChild(MatPaginator, {static: true}) paguser: MatPaginator;

  // delete user
  @ViewChild('sortdeleteuser') sortdeleteuser: MatSort;
  @ViewChild(MatPaginator) pagdeleteuser: MatPaginator;
  // @ViewChild('paginatordeleteElement', {read: ElementRef}) paginatordeleteHtmlElement: ElementRef;
  // @ViewChild(MatPaginator, {static: true}) pagdeleteuser: MatPaginator;

  // variables
  tableCatalog: string;
  // value table columns
  dataRoles: any;
  dataUser: any;
  dataDeleteUser: any;
  classCard;
  dataRolesSerch: any[]=[];
  data_model: any = {};
  role: any[] = [];
  filteruno: boolean = false;
  search;

  displayedColumnsRoles: string[] = ['Role', 'Description', 'Creation Date', 'Action'];
  displayedColumnsUser: string[] = ['Name','Email', 'Office', 'Country', 'Job Title', 'Role', 'Creation Date', 'Action'];
  displayedColumnsDeleteUser: string[] = ['Name','Email', 'Office', 'Country', 'Job Title', 'Role', 'Creation Date', 'Action'];
  // loader
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router: Router) { }
  public filterRole: any = { name: '' };
  selectCatalogs = [
    { value: 'Roles', name: 'Roles & Permissions' },
    { value: 'Users', name: 'Users' },
   // { value: 'Delete user', name: 'Delete user' },
  ];
  public filterCatalog: any = { name: '' };
  maxall: number = 20;


  ngOnInit(): void {
    this.__loader__.showLoader();
    this.tableCatalog = 'Users';
    this.get_catalogos();
    this.consultaPermisos();
    this.__loader__.hideLoader();
  }

  
  changePassword(email: string) {
    //console.log('change email', email);
    const dialogRef = this._dialog.open(DialogChangePasswordComponent, {
      data: { email: email },
      width: "50%",
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Change password"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      else if (result === 2) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "User incorrect"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      else {
        this.get_catalogos();
      }
    })
  }

   //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  getPageSizeOptionsRole() {
    if (this.dataRoles?.paginator.length > this.maxall) {
      return [10, 20, this.dataRoles?.paginator.length];
    }
    else {
      return [10, 20];
    }
  }
  getPageSizeOptionsUser() {
    if (this.dataUser.paginator.length > this.maxall) {
      return [10, 20, this.dataUser.paginator.length];
    }
    else {
      return [10, 20];
    }
  }
  getPageSizeOptionsDelete() {
    if (this.dataUser?.paginator.length > this.maxall) {
      return [10, 20, this.dataUser?.paginator.length];
    }
    else {
      return [10, 20];
    }
  }
  //*********************************************//
  get_catalogos() {
    debugger;
    if (this.tableCatalog == 'Roles') {
      this.__loader__.showLoader();
      this._services.service_general_get('Catalog/GetAllRole').subscribe(rRole => {
        console.log('catalogo role', rRole);
        debugger;
        if (rRole.success) {
          // this.dataRoles = rRole.result;
          this.dataRoles = new  MatTableDataSource(rRole.result);
          this.dataRoles.paginator = this.pagrole;
          this.dataRoles.sort = this.sortrole;

          this.search = '';
        }
      });

      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Users') {
      this.__loader__.showLoader();
      this.dataUser = [];
      this._services.service_general_get('Catalog/GetAllUsersNew').subscribe(rUser => {
        console.log('catalogo user', rUser);
        if (rUser.success) {
          // this.dataUser = rUser.result.value;
          this.dataUser = new  MatTableDataSource(rUser.result.value);
          this.dataUser.paginator = this.paguser;
          this.dataUser.sort = this.sortuser;
          console.log('dataTable', this.dataUser);
          // ++
          this.search = '';
          this.data_model.role = '';
        }
      });

      // role
      this._services.service_general_get('Catalog/GetRolesNew').subscribe(rRole => {
        console.log('catalogo role', rRole);
        if (rRole.success) {
          this.dataRolesSerch = [];
          for (let i = 0; i < rRole.result.length; i++) {
            const eRole = rRole.result[i];
            this.dataRolesSerch.push(eRole)
          }
        }
      });

      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Delete user') {
      this.__loader__.showLoader();
      this._services.service_general_get('Catalog/User/Inactive').subscribe(rDeleteUser => {
        console.log('catalogo delete user', rDeleteUser);
        if (rDeleteUser.success) {
          this.dataDeleteUser = new  MatTableDataSource(rDeleteUser.result.value);
          this.dataDeleteUser.paginator = this.pagdeleteuser;
          this.dataDeleteUser.sort = this.sortdeleteuser;
          console.log('dataTable', this.dataDeleteUser);
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }

  }

  // paginator
  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.tableCatalog == 'Roles') {
      this.dataRoles.filter = filterValue.trim().toLowerCase();
    } else if (this.tableCatalog == 'Users') {
      this.dataUser.filter = filterValue.trim().toLowerCase();
    } else if (this.tableCatalog == 'Delete user') {
      this.dataDeleteUser.filter = filterValue.trim().toLowerCase();
    }
  }
  searchData() {
    let selectRoles: string = '';
    let params = '';
    for (let item in this.data_model.role) {
      if (this.data_model.role[item] != '') {
        selectRoles += `role=${this.data_model.role[item]}&`;
        params = selectRoles.substring(0, selectRoles.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getSerchUser(params);

      // if (this.data_model.role != '') {
      //   this.getSerchUser(this.data_model.role);
      // }
  }
  //CONSULTA INFORMACION POR FILTRO//
  public getSerchUser(params: string = ''): void {
    this.__loader__.showLoader();
    this.dataUser = [];
    // this.events = [];
    const params_in: string = params == '' ? '' : `?${params}`;
    this._services.service_general_get('Catalog/GetAllUsersNew' + params_in).subscribe((data: any) => {
      if (data.success) {
        this.dataUser = new  MatTableDataSource(data.result.value);
        this.dataUser.paginator = this.paguser;
        this.dataUser.sort = this.sortuser;
        this.__loader__.hideLoader();
      }
    });
  }
  getPageSizeOptions() {
    if(this.tableCatalog === 'Users'){
      if (this.dataUser.paginator?.length > this.maxall) {
        return [10, 20, this.dataUser.paginator?.length];
      }
      else {
        return [10, 20];
      }
    }
  }
  // getSerchUser(params) {
  //   let parametro = '';
  //   let x = '';
  //   console.log('id a buscar', params);
  //   this.__loader__.showLoader();
  //   this.dataUser = [];
  //   params.forEach(function(elemento, indice, array) {
  //     console.log(elemento, indice);
  //   if (indice == 0) {
  //         x = 'role=' + elemento;
  //       }
  //       else {
  //         x = '&role=' + elemento;
  //       }
  //       parametro = parametro + x;
  // })

  //   console.log('parametros', parametro);
  //   // Catalog/GetAllUsers?role=${params}
  //   this._services.service_general_get(`Catalog/GetAllUsers?${parametro}`).subscribe((data: any) => {
  //     if (data.success) {
  //       this.dataUser = new  MatTableDataSource(data.result.value);
  //       this.dataUser.paginator = this.paguser;
  //       this.dataUser.sort = this.sortuser;
  //       this.__loader__.hideLoader();
  //     }
  //   });
  // }

  public cleanFilter(): void {
    this.filterRole = { name: '' };
    this.data_model.role = '';
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  addRole(id) {
    console.log('abrir modal role');
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogRolesComponent, {
      data: {id: id},
      width: "100%",
      // data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteRole(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Role?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteRole/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.role}`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Role is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  addUser(id, role) {
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogUserComponent, {
      data: {
        id: id,
        role: role
      },
      width: "50%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if(result === 2){
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 3) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "error mail"
          },
          width: "350px"
        });
        this.get_catalogos();

      }
    })

  }


  profilePage(id) {
    let role;
    console.log(id);
    if (id != 0) {
      this._services.service_general_get(`Catalog/GetUser/${id}`).subscribe( r => {
        if (r.success) {
          role = r.result.value.role;
          // role id 19 es igual a "Super Admin"
          // if (role == 1 || role == 4  || role == 11 || role == 13 || role == 14 ||  role == 19  || role == 20 || role == 21 || role == 22 ) {
            if(role != 2 && role != 3 && role != 4){
            this._router.navigateByUrl(`profilemanager/${id}`);
            }else if(role == 2){
              this._router.navigateByUrl(`profilecoordinator/${id}`);
            }else if(role == 3){
              this._router.navigateByUrl(`profileconsultant/${id}`);
            }
        }
      });
    }
  }
  deleteUser(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this User?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete('Catalog/User/'+ id +'/Inactive').subscribe((data) =>{
          console.log('respuesta de inactivacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.name}`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The user is in use.`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // activa el usuario en la seccion delete user
  activeUser(id : number) {
    debugger;
    const dialogRef = this._dialog.open(DialogInactiveUserComponent, {
      data: {
        header: "Active confirmation",
        body: "Are you sure to active this User?"
      },
      width: "350px"
    });
    // Catalog/User/${id}/Active
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_put(`Catalog/User/${id}/active`,'').subscribe((data) =>{
          console.log('respuesta de activacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Active ${data.result.name}`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        })
      }
    });
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

  deleteUserPermanente(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this User?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete('User/'+ id).subscribe((data) =>{
          console.log('respuesta de eliminacion permanente', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted user`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: 'This user is in use.'
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }


}
