import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-add-reminder-detail',
  templateUrl: './dialog-add-reminder-detail.component.html',
  styleUrls: ['./dialog-add-reminder-detail.component.css']
})
export class DialogAddReminderDetailComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog) { }

    today = new Date();
    user: any = {};
    loader: LoaderComponent = new LoaderComponent();


  ngOnInit(): void {
    console.log(" Recibido para iniciar a agregar: ========================",this.data)
    this.user = JSON.parse(localStorage.getItem('userData'));
    if(this.data.reminderToTdit){ //significa que se va a editar
      this.newreminder = this.data.reminderToTdit;
    }
  }

  newreminder = {
    "id": 0
    , "workOrderServiceId": this.data.workOrderServicesId
    , "reminderComments" : ""
    , "reminderDate" : this.today
    , "userId": this.user.id
    , "createdBy" :this.user.id
    , "createdDate": this.today
    }


  save() {
  
    // if(this.data.reminderToTdit){ //significa que se va a editar
    //   this.call_service_edit_propertys();
    // }
    // else{
      this.call_service_send_propertys();
   // }
   
  }

  call_service_edit_propertys() {
    this.loader.showLoader();

    console.log("Este es el objeto a agregarse de Reminder:" , JSON.stringify(this.newreminder));

    this._services.service_general_post_with_url("ServiceRecord/UpdateNewServiceReminder", this.newreminder).subscribe((resp => {
      this.loader.hideLoader();

      console.log("resultado de ServiceRecord/UpdateNewServiceReminder: ", resp);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Reminder Saved"
        },
        width: "350px"
      });


      this.dialogRef.close(resp);

    }), (err) => {
      this.loader.hideLoader();
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "Save Error"
        },
        width: "350px"
      });
      console.log("Error en SendPropertys: ", err);
    })
  }

  call_service_send_propertys() {
    this.loader.showLoader();

    console.log("Este es el objeto a insertarse de Reminder:" , JSON.stringify(this.newreminder));

    this._services.service_general_post_with_url("ServiceRecord/UpdateNewServiceReminder", this.newreminder).subscribe((resp => {
      this.loader.hideLoader();

      console.log("resultado de ServiceRecord/UpdateNewServiceReminder: ", resp);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Reminder Saved"
        },
        width: "350px"
      });


      this.dialogRef.close(resp);

    }), (err) => {
      this.loader.hideLoader();
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "Save Error"
        },
        width: "350px"
      });
      console.log("Error en SendPropertys: ", err);
    })
  }

}
