import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router, Resolve } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { MenuItemsSide } from '../../shared/menu-items/menu-items';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponent } from 'app/pages-component/dashboard/dashboard.component';
import {  } from '../../../environments/environment'

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.scss']
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  userData: any = {};
  private _mobileQueryListener: () => void;
  public __loader__: LoaderComponent = new LoaderComponent();
  user: any;
  table_contacts: any[] = [];
  profile;
  public today = new Date();
  // avatar = './assets/avatar.svg';


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, public _dialog: MatDialog,
    public menuItems: MenuItems,
    public menuItemsSide: MenuItemsSide,
    public menu: ServiceGeneralService,
    public _router: Router, public _services: ServiceGeneralService,
    private _ngZone: NgZone) {
    //this.suscribirEventos();
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userData = JSON.parse(localStorage.getItem('userData'));
    // this.menu.retrieveMappedObject().subscribe((receivedObj: any) => {
    //   console.log(receivedObj);
    //   this.get_Chats();
    //   this.get_Notification();
    // });

  }
  id: number = 0;
  profileUser;


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // private suscribirEventos() {
  //   this._services.avisoAdmin.subscribe(data => {
  //     this._ngZone.run(() => {
  //       this.get_Chats();
  //       this.get_Notification();
  //     });
  //   });
  // }

  viewMessage(id) {
    console.log(id);
    //localStorage.setItem("conversationId", id);
    this._router.navigateByUrl('/messenger-center/'+id);
  }
  redirecMessage() {
    // console.log(id);
    // localStorage.setItem("conversationId", id);
    this._router.navigateByUrl('/messenger-center/0');
  }

  public destroySession(): void {

    this.__loader__.showLoader();

    let wait_for_remover: Promise<boolean> = new Promise((resolve: any) => {

      localStorage.removeItem('userData');

      setTimeout(() => resolve(true), 777);

    });

    wait_for_remover.then((result: boolean) => {

      if (result) {

        this.__loader__.hideLoader();
        this._router.navigateByUrl('');

      }

    });

    this._router.navigateByUrl('');

  }
  errorHandler(event) {
    console.log('evento onerror', event);
    event.target.src = './assets/avatar.svg';
    //Do other stuff with the event.target
  }

  profilePage() {
    let user = JSON.parse(localStorage.getItem('userData'));
    console.log(user);
    // role id 19 es igual a "Super Admin"
    // if (user.role.id == 1 || user.role.id == 19) {
    if (user.role.id != 2 && user.role.id != 3) {
      this._router.navigateByUrl('profilemanager/' + user.profileUsers[0].id);
    } else if (user.role.id == 2) {
      this._router.navigateByUrl('profilecoordinator/' + user.profileUsers[0].id);
    } else if (user.role.id == 3) {
      this._router.navigateByUrl('profileconsultant/' + user.profileUsers[0].id);
    }
  }
  // acceder al perfil desde notificaciones
  profilePageNotification(idUser: number, role: number){
    // let user = JSON.parse(localStorage.getItem('userData'));
    console.log('id user', idUser);
    console.log('role', role);

    // role id 19 es igual a "Super Admin"
    // if (role == 1 || role == 19) {
    if(role != 2 && role != 3){
      this._router.navigateByUrl('profilemanager/'+idUser);
    }else if(role == 2){
      this._router.navigateByUrl('profilecoordinator/'+idUser);
    }else if(role == 3){
      this._router.navigateByUrl('profileconsultant/'+idUser);
    }
  }

  ngAfterViewInit() {
    this.get_Notification();
    this.get_Chats();
    let user = JSON.parse(localStorage.getItem('userData'));
    this.id = user.id;
    this.getAvatarProfile(user.profileUsers[0].id);

  }
  getAvatarProfile(id: number) {
    this._services.service_general_get(`Profile/GetProfile/${id}`).subscribe(profile => {
      if (profile.success) {
        this.profileUser = profile.result;
        console.log('profile', this.profileUser);
      }
    });
  }

  menus() {
    if (this.menu.menu) {
      this.menu.small = true;
      this.menu.big = false;
      setTimeout(() => {
        this.menu.menu = false;
      }, 200);
    } else {
      this.menu.small = false;
      this.menu.big = true;
      setTimeout(() => {
        this.menu.menu = true;
      }, 1500);
    }
  }

  get_Chats() {
    this.menu.service_general_get('Chat/GetChatNotification/' + this.userData.id).subscribe(n => {
      if (n.success) {
        this.table_contacts = n.result.value;
        console.log(this.table_contacts);
      }
    })
  }

  //*************************************************************//
  ca_notification = [];
  get_Notification() {
    this.ca_notificationView = 0;
    //this.get_NotificationView();
    let notificaciones = [];
    this.menu.service_general_get('Notification/GetAllNotifications/' + this.userData.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        console.log('DATA CONSULTA NOTIFICACIONES:', data);
        // notificaciones = data.result.value.sort(function (a, b) {
        //   return b.createdDate.localeCompare(a.createdDate);
        // });
        var notificaciones = data.result.value.today;
        // var notificaciones = data.result.value.previous.concat(data.result.value.today)
      //  notificaciones = data.result.value;
        let uux_notificaciones = []
        for (let i = 0; i < notificaciones.length; i++) {
          if ((notificaciones[i].archive == false && notificaciones[i].view == false)) {
            uux_notificaciones.push(notificaciones[i])
          }
        }
        this.ca_notificationView = uux_notificaciones.length;
        //this.ca_notification = data.result.value;
        this.ca_notification = notificaciones;
        //this.get_NotificationView();
        console.log("NOTIFICACIONES 1: ", uux_notificaciones);
      }
    }));
  }

  leerNotificaciones(){
    this.menu.service_general_put('Notification/PutViewAll/?userId=' + this.userData.id, '').subscribe((data => {
      // this.menu.service_general_put(`Notification/PutViewed/${data.id}/true`).subscribe((data => {
      if (data.success) {
        this.get_Notification();
      }
    }));
  }

  //*************************************************************//
  ca_notificationView = 0;
  get_NotificationView() {
    this.ca_notificationView = 0;
    let notificaciones = [];
    this.menu.service_general_get('Notification/GetNotifications/' + this.userData.id).subscribe((data => { //this.area_orientation.workOrderServicesId
      if (data.success) {
        console.log('DATA CONSULTA NOTIFICACIONES: ', data);
        //this.ca_notification = data.result.value;
        notificaciones = data.result.value.filter(function (E) {
          if (E.view == false) {
            return true;
          }
        })
        console.log("NOTIFICACIONES 2: ", notificaciones.length);
        this.ca_notificationView = notificaciones.length;
      }
    }));
  }
  //*************************************************************//
  marcarLeida(data) {
    console.log(data);
    if (data.view == false) {
      let viewt = true;
      this.menu.service_general_put('Notification/PutViewed/' + data.id + '/' + viewt, '').subscribe((data => {
        // this.menu.service_general_put(`Notification/PutViewed/${data.id}/true`).subscribe((data => {
        if (data.success) {
          this.get_Notification();
          document.getElementById("dashboard").click();
        }
      }));
    } else if (data.view == true) {
      let viewf = false;
      this.menu.service_general_put('Notification/PutViewed/' + data.id + '/' + viewf, '').subscribe((data => {
        if (data.success) {
          this.get_Notification();
          document.getElementById("dashboard").click();
        }
      }));
    }
  }
  //*************************************************************//
  archivar(data__, event) {
    console.log(data__);
    if (event.checked) {
      this.menu.service_general_put('Notification/PutArchive/' + data__.id + '/' + event.checked, '').subscribe((data => {
        if (data.success) {
          this.marcarLeida(data__);
        }
      }));
    } else {
      this.menu.service_general_put('Notification/PutArchive/' + data__.id + '/' + event.checked, '').subscribe((data => {
        if (data.success) {
          this.marcarLeida(data__);
        }
      }));
    }
  }

  goto(url_){
    //alert(url);
    let url = this._router.createUrlTree([url_]);
    window.open(url.toString(), '_blank');
  }

  //ACEPTAMOS NOTIFICACION//
  accept(data_, status) {
    console.log(status);
    this.menu.service_general_putnoapi(status, '').subscribe((resp => {
      if (resp.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Notification was accepted."
          },
          width: "350px"
        });
        let event = { 'checked': true };
        this.archivar(data_, event);
      }
    }))
  }
  //DECLINAMOS NOTIFICACION//
  decline(data_, status) {
    console.log(status);
    this.menu.service_general_putnoapi(status, '').subscribe((data => {
      console.log(data);
      if (data.success) {
        
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Notification was declined."
          },
          width: "350px"
        });
        let event = { 'checked': false };
        this.archivar(data_, event);
      }
     // let event = { 'checked': false };
     // this.archivar(data_, event);
     //  this.marcarLeida(data_);
    }))
  }
}

