import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceGeneralService } from '../../service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { LoaderComponent } from '../../shared/loader';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { json } from '@angular-devkit/core';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private service: ServiceGeneralService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog
  ) { }

  public loginFormGroup: FormGroup;
  public recoverFormPassword: FormGroup;
  public loader: LoaderComponent = new LoaderComponent();

  get email() {
    return this.loginFormGroup.get('email') as FormControl
  }

  get password() {
    return this.loginFormGroup.get('password') as FormControl
  }

  get email_recover() {
    return this.recoverFormPassword.get('email_recover') as FormControl
  }

  ngOnInit() {

    this.isAnySessionActive();

    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.resetNavigator();
    this.loginFormGroup = this._formBuilder.group({
      'email': [null, [Validators.required, Validators.maxLength(50), Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, Validators.maxLength(50)]],
    });
    this.recoverFormPassword = this._formBuilder.group({
      'email_recover': [null, [Validators.required, Validators.pattern(emailregex)]]
    });

  }

  public isAnySessionActive(): void {

    const session_data: any = JSON.parse(localStorage.getItem('userData'));

    if (session_data != null || session_data != undefined) {

      if (session_data.token != '') {

        this._router.navigateByUrl('dashboard');

      }
      else
      {
        this._router.navigateByUrl('login');
      }

    }

  }

  public onSubmit(form_data: any): void {

    console.log('Here ===> ', form_data);
    console.log(this.loginFormGroup);

    this.loader.showLoader();

    const user_in_info: any = {
      date: new Date()
    }

    //User/Login?email=${ form_data.email }&password=${ form_data.password }
    this.service.service_general_post_with_url('User/Login?' + 'email=' + form_data.email + '&password=' + form_data.password, form_data)
      .subscribe((response: any) => {
        console.log("ProfileUserDto", response);
        if (response.success) {

          if(response.result.role.id != 4){
            this._router.navigateByUrl('dashboard');
          }
          else
          {
            this._router.navigateByUrl('home');
          }
          
          console.log(response.result);
          let permission = response.result.role.permissions;
          debugger;
          console.log("Estos son los permisos: ", permission);
          //**********************************************************//
          //ELIMANDO MENU OPERATIONAL REPORT//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 3){
              permission.splice(i, 1)
            }
          }

          //TRAINING CURSES//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 18){
              permission.splice(i, 1)
            }
          }

          //LEADS//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 12){
              permission.splice(i, 1)
            }
          }
          // //SERVICE CALENDAR//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 7){
              permission.splice(i, 1)
            }
          }
          // //ACTIVITY//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 4){
              permission.splice(i, 1)
            }
          }
          //EXPERIENCE SURVAY//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 8){
              permission.splice(i, 1)
            }
          }
          //TRAINING//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatSubMenu == 10){
              permission.splice(i, 1)
            }
          }

          //ELIMANDO MENU FINANCE//
          for (let i = 0; i < permission.length; i++) {
            if(permission[i].idCatMenu == 4){
              permission.splice(i, 4)
            }
          }
          console.log("Permisos ya con eliminacion de reports: ", permission);
          //**********************************************************//
          //AQUI AGREGAMOS EL PATH O RUTA DE CADA COMPONENETE//
          for (let i = 0; i < permission.length; i++) {
            switch (permission[i].idCatSubMenu) {
              case 3:
                permission[i].nameSubmenu = "Operational Reports";
                permission[i].ruta = "/reports";
                break;
              case 4:
                permission[i].nameSubmenu = "Activity";
                permission[i].ruta = "/activity";
                break;
              case 5:
                permission[i].nameSubmenu = "Service Records";
                permission[i].ruta = "/serviceRecord";
                break;
              case 6:
                permission[i].nameSubmenu = "Pending Authorizations";
                permission[i].ruta = "/PendingAuthorizations";
                break;
              case 7:
                permission[i].nameSubmenu = "Service Calendar";
                permission[i].ruta = "/serviceCalendar";
                break;
              case 8:
                permission[i].nameSubmenu = "Experience Surveys";
                permission[i].ruta = "/experienceSurveys";
                break;
              case 9:
                permission[i].nameSubmenu = "Supplier Partners";
                permission[i].ruta = "/supplierPartners";
                break;
              case 10:
                permission[i].nameSubmenu = "Training";
                permission[i].ruta = "/training";
                break;
              case 11:
                permission[i].nameSubmenu = "Partners & Clients";
                permission[i].ruta = "/partner";
                break;
              case 12:
                permission[i].nameSubmenu = "Leads";
                permission[i].ruta = "/leads";
                break;
              case 13:
                permission[i].nameSubmenu = "Request Center";
                permission[i].ruta = "/requestcenter";
                break;
              case 14:
                permission[i].nameSubmenu = "Invoices Service";
                permission[i].ruta = "/invoicesService";
                break;
              case 15:
                permission[i].nameSubmenu = "Users";
                permission[i].ruta = "/admin-center/users";
                break;
              case 16:
                permission[i].nameSubmenu = "Catalogs";
                permission[i].ruta = "/catalogs";
                break;
              case 17:
                permission[i].nameSubmenu = "System Configuration";
                permission[i].ruta = "/admin-center/system-configuration";
                break;
              case 18:
                permission[i].nameSubmenu = "Training Courses";
                permission[i].ruta = "/admin-trainig";
                break;
              case 20:
                permission[i].nameSubmenu = "Invoices Supplier";
                permission[i].ruta = "/invoicesSupplier";
                break;
              case 21:
                permission[i].nameSubmenu = "Third Party Invoice";
                permission[i].ruta = "/thirdPartyExpenses";
                break;
              case 22:
                permission[i].nameSubmenu = "VIOLET App Configuration";
                permission[i].ruta = "/countries";
                break;
              case 2:
                permission[i].nameSubmenu = "Dashboard";
                permission[i].ruta = "/dashboard";
                break;
            }
          }
          //**********************************************************//
          //SE ARMA EL JSON PARA ITERAR EL MENU//
          let json_menu = [];
          let contador_aux = 0;
          let posicion_json = 0;
          for (let i = 0; i < permission.length; i++) {
            contador_aux = 0;
            posicion_json = 0;
            for (let j = 0; j < json_menu.length; j++) {
              if (permission[i].idCatMenu == json_menu[j].id) {
                contador_aux++;
                posicion_json = j;
              }
            }



            console.log("Existe: ", contador_aux);
            console.log("DATA A INERTAR: ", permission[i]);
            switch (permission[i].idCatMenu) {
              case 2:
                if (contador_aux == 0) {
                  json_menu.push({
                    id: 2,
                    name: "Operations",
                    icon: './assets/operations-icon.png',
                    subMenu: [{
                      "id_subMenu": permission[i].idCatSubMenu,
                      "nameSubMenu": permission[i].nameSubmenu,
                      "ruta" : permission[i].ruta,
                      "reading": permission[i].reading
                    }]
                  })
                  /*
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                  */
                } else {
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                }
                break;
              case 3:
                if (contador_aux == 0) {
                  json_menu.push({
                    id: 3,
                    name: "Partner & Clients",
                    icon: './assets/partner-client-icon.png',
                    subMenu: [{
                      "id_subMenu": permission[i].idCatSubMenu,
                      "nameSubMenu": permission[i].nameSubmenu,
                      "ruta" : permission[i].ruta,
                      "reading": permission[i].reading
                    }]
                  })
                  /*
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                  */
                } else {
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                }
                break;
              case 4:
                if (contador_aux == 0) {
                  json_menu.push({
                    id: 4,
                    name: "Finance",
                    icon: './assets/finance-icon.png',
                    subMenu: [{
                      "id_subMenu": permission[i].idCatSubMenu,
                      "nameSubMenu": permission[i].nameSubmenu,
                      "ruta" : permission[i].ruta,
                      "reading": permission[i].reading
                    }]
                  })
                  /*
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                  */
                } else {
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                }
                break;
              case 5:
                if (contador_aux == 0) {
                  json_menu.push({
                    id: 5,
                    name: "Admin Center",
                    icon: './assets/admin-center.png',
                    subMenu: [{
                      "id_subMenu": permission[i].idCatSubMenu,
                      "nameSubMenu": permission[i].nameSubmenu,
                      "ruta" : permission[i].ruta,
                      "reading": permission[i].reading
                    }]
                  })
                  /*
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                  */
                } else {
                  json_menu[posicion_json].subMenu.push({
                    "id_subMenu": permission[i].idCatSubMenu,
                    "nameSubMenu": permission[i].nameSubmenu,
                    "ruta" : permission[i].ruta,
                    "reading": permission[i].reading
                  })
                }
                break;
            }
          }

          for(let i = 0; i < json_menu.length; i++){
            let submenu = json_menu[i].subMenu;
            for(let j = 0; j < submenu.length; j++){
               if(submenu[j].reading){
                json_menu[i].show = true;
                break;
               }else{
                json_menu[i].show = false;
               }
            }
          }

          /*
          for(let i = 0; i < json_menu.length; i++){
            if(json_menu[i].id == 2){
              for(let j = 0; j < json_menu[i].subMenu.length; j++){
                if(json_menu[i].subMenu[j].id_subMenu == 3){
                  json_menu[i].subMenu.push({
                    id_subMenu: 3,
                    ruta: '/full-sistem-contacts',
                    nameSubMenu: 'Full Sistem Contacts',
                    reading: json_menu[i].subMenu[j].reading
                 });
                 break
                }
              }
            }
          }
          */

          console.log(json_menu);
          localStorage.setItem('Menu', JSON.stringify(json_menu));
          //**********************************************************//
          debugger
          localStorage.setItem('userData', JSON.stringify(response.result));
          localStorage.setItem('user_expiration', JSON.stringify(user_in_info));

        } else {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Access denied',
              body: 'User or password incorrect'
            },
            width: '350px'
          });

        }

        this.loader.hideLoader();

        console.log('Response ===> ', response);

      }, (error: any) => {

        console.error('Error login WS ===> ', error);

      });

  }

  public type_input = 'password';
  public eyed : boolean = false;
  public changeType(type) {
     if(type == true){
      this.type_input = 'text';
      this.eyed = true;
     }else{
      this.type_input = 'password';
      this.eyed = false;
     }
  }

  public recoverPassword(form_data: any): void {

    this.loader.showLoader();

    this.service.service_general_put(`User/Recovery_password?email=${form_data.email_recover}`, form_data)
      .subscribe((response: any) => {

        if (response.success) {

          this.showSection('login');

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Password recovered',
              body: 'A new password has been sent to your email.'
            },
            width: '350px'
          });

        } else {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'A System Error',
              body: 'Please try later or use support contact #COD135'
            },
            width: '350px'
          });

        }

        this.loader.hideLoader();

      }, (error: any) => {

        console.log('Erro ===> ', error);

        this.loader.hideLoader();

      });

  }

  public getErrorEmail(): any {
    return this.loginFormGroup.get('email').hasError('required') ? 'Email is required' :
      this.loginFormGroup.get('email').hasError('pattern') ? 'Email format not valid' : '';
  }

  public getErrorEmailRecover(): any {
    return this.recoverFormPassword.get('email_recover').hasError('required') ? 'Email is required' :
      this.recoverFormPassword.get('email_recover').hasError('pattern') ? 'Email format not valid' : '';
  }

  public section_active: string = 'login';
  public showSection(section: string): void {

    this.section_active = section;

  }

  public resetNavigator(): void {

    localStorage.removeItem('last_section');

  }

}
