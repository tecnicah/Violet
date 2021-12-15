import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-add-event-tenancy',
  templateUrl: './dialog-add-event-tenancy.component.html',
  styleUrls: ['./dialog-add-event-tenancy.component.css']
})
export class DialogAddEventTenancyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  loader: LoaderComponent = new LoaderComponent();
  show: boolean = false;
  severity_catalogue: any[] = [];
  temporalEvent: any = {};
  public user_data: any = JSON.parse(localStorage.getItem('userData'));
  catalog_estatus: any[] = [];
  public image_path: string = this._services.url_images;
  public today_date = new Date();
  tenancyManagement;
  public event: reportAnEventsModel = new reportAnEventsModel();
  newComment: any[] = [];
  newPhotoAssignee: any[] = [];
  newPhotoSupplier: any[] = [];
  dataComment;

  ngOnInit(): void {
    console.log('user', this.user_data);
    console.log('data que recibe', this.data);
    this.show = true;
    this.dataTenancy();

  }
  dataTenancy() {
    // consulta de tenancy Management
    this.getCatalog();
    this._services.service_general_get(`RelocationServices/TenancyManagementById?id=${this.data.tenancyManagementId}`).subscribe(resp => {
      if (resp.success) {
        this.loader.hideLoader();
        this.tenancyManagement = resp.result
        // this.dataComment = resp.result.commentReportAnEvents;
        console.log('tenancy', this.tenancyManagement);
        this.getDataEvent();
      }
    }, (error: any) => {
      console.log('error RelocationServices/TenancyManagement', error);
    });

  }

  getDataEvent() {
    // extraer la info del evento en caso de ser update
    if (this.data.id != 0) {
      for (let i = 0; i < this.tenancyManagement.reportAnEvents.length; i++) {
        const element = this.tenancyManagement.reportAnEvents[i];
        if (element.id == this.data.id) {
          this.event = element;
        }
      }
    }
    console.log('obj event', this.event);
  }
  async getCatalog() {
    this.severity_catalogue = await this._services.getCatalogueFrom('GetSeverity');
    this.catalog_estatus = await this._services.getCatalogueFrom('GetStatusReportAnEvent');
  }
  deleteImgAssignee(data) {
    // /api/RelocationServices/Photo/Assigned
    if (data.id == 0) {
      this.newPhotoAssignee.splice(data.id, 1)
    }
    else if (data.id != 0) {
      this._services.service_general_delete(`RelocationServices/Photo/Assigned?id=${data.id}`).subscribe(resp => {
        if (resp.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Delete Photo"
            },
            width: "350px"
          });
          this.dialogRef.close();
          this.ngOnInit();

        }
      });
    }
  }
  deleteImgSupplier(data) {
    if (data.id == 0) {
      this.newPhotoSupplier.splice(data.id, 1)
    }
    else if (data.id != 0) {
      this._services.service_general_delete(`RelocationServices/Photo/SupplierConsultant?id=${data.id}`).subscribe(resp => {
        if (resp.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Delete Photo"
            },
            width: "350px"
          });
          this.dialogRef.close();
          this.ngOnInit();

        }
      });
    }

  }
  addPhotosAssignee(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
      this.newPhotoAssignee.push({
        'id': 0,
        'reportAnEventId': this.data.id,
        'photoName': file.name,
        'photoPath': encoded,
        'photoExtension':  ext[1],
        'createdBy': this.user_data.id,
        'createdDate': new Date(),
        'updateBy': this.user_data.id,
        'updatedDate': new Date(),
        // 'htmlid': setAttribute('src',''+reader.result),
      });
      // document.getElementById('photoAssignee').setAttribute('src',''+reader.result);
    };
  }
  addPhotosSupplier(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        this.newPhotoSupplier.push({
          'id': 0,
          'reportAnEventId': this.data.id,
          'photoName': file.name,
          'photoPath': encoded,
          'photoExtension':  ext[1],
          'createdBy': this.user_data.id,
          'createdDate': new Date(),
          'updateBy': this.user_data.id,
          'updatedDate': new Date(),
        });
        // document.getElementById('photoSupplier').setAttribute('src',''+reader.result);

    };
  }
  public comment_string:SingleComment = new SingleComment();

  public addNewComment():void {
    const new_comment:commentReportAnEventsModel = new commentReportAnEventsModel();
    new_comment.id = 0;
    new_comment.reportAnEventId = this.data.id;
    new_comment.comment = this.comment_string.comment
    new_comment.createdBy = this.user_data.id;
    new_comment.createdDate = this.today_date;
    new_comment.updatedBy = this.user_data.id;
    new_comment.updatedDate = this.today_date;
    new_comment.createdByNavigation = this.user_data;

    this.event.commentReportAnEvents.push( new_comment );

    this.comment_string.comment = '';

  }

  save() {
    console.log('save');
    this.event.updateBy = this.user_data.id;
    this.event.updatedDate = new Date();
    this.event.tenancyManagementId = this.data.tenancyManagementId;
    this.event.supplierConsultantPhotos = this.newPhotoSupplier;
    this.event.assignedPhotos = this.newPhotoAssignee;
    for (let com = 0; com < this.event.commentReportAnEvents.length; com++) {
      const element = this.event.commentReportAnEvents[com];
      if (element.id == 0) {
        // element.createdByNavigation.splice(1);
        delete element.createdByNavigation;
      }
    }
    console.log('event save', this.event);
    if (this.data.id == 0) {
      this.event.createdBy = this.user_data.id;
      this.event.createdDate = new Date();
      console.log("Informacion a guardar: ", this.event);
      this._services.service_general_post_with_url("RelocationServices/Add/ReportAnEvent", this.event).subscribe((data => {
        if (data.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Information saved"
            },
            width: "350px"
          });
          this.dialogRef.close();
          this.ngOnInit();
        }
      }))
    }
    else if (this.data.id != 0){
      console.log("Informacion a guardar: ", this.event);
      this._services.service_general_put("RelocationServices/Edit/ReportAnEvent", this.event).subscribe((data => {
        if (data.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Information saved"
            },
            width: "350px"
          });
          this.dialogRef.close();
          this.ngOnInit();
        }
      }))
    }
    this.newComment = [];
    this.newPhotoSupplier = [];
    this.newPhotoAssignee = [];
  }
}
class reportAnEventsModel {
  id: number = 0;
  tenancyManagementId: number = 0;
  eventReportDate: Date;
  eventCloseDate: Date;
  severityId: number = 0;
  description: string = "";
  statusId: number = 0;
  quoteApproval: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
  assignedPhotos: assignedPhotosModel[] = [];
  commentReportAnEvents: commentReportAnEventsModel[] = [];
  supplierConsultantPhotos: supplierConsultantPhotosModel[] = [];
}
class assignedPhotosModel {
  id: number = 0;
  reportAnEventId: number = 0;
  photoName: string = "";
  photoPath: string = "";
  photoExtension: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class commentReportAnEventsModel {
  id: number = 0;
  reportAnEventId: number = 0;
  comment: string = "";
  createdBy: number = 0;
  createdDate: Date ;
  updatedBy: number = 0;
  updatedDate: Date;
  createdByNavigation: createdByNavigationModel[] = [];
}
class supplierConsultantPhotosModel {
  id: number = 0;
  reportAnEventId: number = 0;
  photoName: string = "";
  photoPath: string = "";
  photoExtension: string = "";
  createdBy: number = 0;
  createdDate: Date;
  updateBy: number = 0;
  updatedDate: Date;
}
class createdByNavigationModel {
  id: number = 0;
  email: string = "";
  name: string = "";
  lastName: string = "";
  motherLastName: string = "";
  mobilePhone: string = "";
  avatar: string = "";
  reset: boolean = true;
  token: string = "";
  status: boolean = true;
  clientName: string = "";
  userType: userTypeModel[] = [];

}
class userTypeModel {
  id: number = 0;
  type: string = "";
}

class SingleComment {
  comment:string = '';
}
