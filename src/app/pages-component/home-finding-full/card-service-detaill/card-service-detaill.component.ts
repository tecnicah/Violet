import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogClientDocuComponent } from 'app/pages-component/dialog/dialog-client-docu/dialog-client-docu.component';
import { DialogClientSdComponent } from 'app/pages-component/dialog/dialog-client-sd/dialog-client-sd.component';
import { DialogCommentsServiceDetailComponent } from 'app/pages-component/dialog/dialog-comments-service-detail/dialog-comments-service-detail.component';
import { DialogDocumnetsServiceDetailComponent } from 'app/pages-component/dialog/dialog-documnets-service-detail/dialog-documnets-service-detail.component';
import { DialogRemindersServiceDetailComponent } from 'app/pages-component/dialog/dialog-reminders-service-detail/dialog-reminders-service-detail.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-card-service-detaill',
  templateUrl: './card-service-detaill.component.html',
  styleUrls: ['./card-service-detaill.component.scss']
})
export class CardServiceDetaillComponent implements OnInit {

  @Input() datos: any = { workOrderServicesId: 0, partner_id: 0 };

  loader: LoaderComponent = new LoaderComponent();

  workOrderServicesId: number = 0;
  partner_id: number = 0;

  // workOrderServicesId: number = 4527;
  // partner_id: number = 1183;
  
  type_sr = 26;
  constructor(private route: ActivatedRoute, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    // this. GetBasicServiceData();
    this.partner_id = this.datos.partner_id;
    this.workOrderServicesId = this.datos.workOrderServicesId;

    console.log('===========datos===========',this.datos);

    this.GetGeneralServiceItems();
    this.getServiceScope();

  }

  // GetBasicServiceData() {
  //   this.loader.showLoader();
  //   this._services.service_general_get(`ServiceRecord/GetBasicServiceData?id_service=${this.id_hf}&type_sr=${this.type_sr}`).subscribe(resp => {
  //     this.loader.hideLoader();
  //     if (resp.success) {
  //       this.home_finding = {};
  //       // this.get_catalogos();

  //     }
  //   });
  // };

  serviceScope = { "documentcountries": "", "scopeDescription": "" };
  serviceGeneralItems = { "documentsServiceDetails": [], "commentServiceDetails": [], "reminderServiceDetails": [] };

  // get service scope
  getServiceScope() {
    this._services.service_general_get(`AdminCenter/ScopeDocuments/Service?service=${this.workOrderServicesId}&client=${this.partner_id}`).subscribe(resp => {
      if (resp.success) {
        console.log('Data ScopeService: ================================', resp);
        this.serviceScope = resp.result.value;
      }
    });
  }


  SeeClientScope() {
    let data = this.serviceScope.scopeDescription;

    // this.data.location = this.atributos_generales.location; DialogClientSdComponent DialogClientDocuComponent
    const dialogRef = this._dialog.open(DialogClientSdComponent, {
      width: "95%",
      data: data
    });

  }

  SeeClientDocuments() {
    let data = this.serviceScope.documentcountries;

    // this.data.location = this.atributos_generales.location; DialogClientSdComponent DialogClientDocuComponent
    const dialogRef = this._dialog.open(DialogClientDocuComponent, {
      width: "95%",
      data: data
    });

  }

  SeeDocumentsService() {
    let data = { "documentsServiceDetails": null, "workOrderServicesId": null, "Cat_Service_id": null };
    data.documentsServiceDetails = this.serviceGeneralItems.documentsServiceDetails;
    data.workOrderServicesId = this.workOrderServicesId;
    data.Cat_Service_id = 26; //checar id en la tabla Cat_Service , home findign es 26 ahí  

    // this.data.location = this.atributos_generales.location; DialogClientSdComponent DialogClientDocuComponent
    const dialogRef = this._dialog.open(DialogDocumnetsServiceDetailComponent, {
      width: "95%",
      height: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

      this.GetGeneralServiceItems();

    });

  }

  SeeCommentsService() {
    let data = { "commentServiceDetails": null, "workOrderServicesId": null };
    data.commentServiceDetails = this.serviceGeneralItems.commentServiceDetails;
    data.workOrderServicesId = this.workOrderServicesId;

    // this.data.location = this.atributos_generales.location; DialogClientSdComponent DialogClientDocuComponent
    const dialogRef = this._dialog.open(DialogCommentsServiceDetailComponent, {
      width: "95%",
      height: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

      this.GetGeneralServiceItems();

    });
  }

  SeeRemindersService() {
    let data = { "reminderServiceDetails": null, "workOrderServicesId": null };
    data.reminderServiceDetails = this.serviceGeneralItems.reminderServiceDetails;
    data.workOrderServicesId = this.workOrderServicesId;


    // this.data.location = this.atributos_generales.location; DialogClientSdComponent DialogClientDocuComponent
    const dialogRef = this._dialog.open(DialogRemindersServiceDetailComponent, {
      width: "95%",
      height: "90%",
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {

      this.GetGeneralServiceItems();

    });
  }

  GetGeneralServiceItems() {
    this.loader.showLoader();
    //debugger;
    this._services.service_general_get(`ServiceRecord/GetGeneralServiceItems?wos_id=${this.workOrderServicesId}`).subscribe(resp => {
      this.loader.hideLoader();
      if (resp.success) {

        this.serviceGeneralItems = resp.result;
        console.log(' serviceGeneralItems: ================================', this.serviceGeneralItems);
      }
    });
  };

}
