import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAddReminderDetailComponent } from '../dialog-add-reminder-detail/dialog-add-reminder-detail.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-reminders-service-detail',
  templateUrl: './dialog-reminders-service-detail.component.html',
  styleUrls: ['./home-finding-full.component.scss']
})
export class DialogRemindersServiceDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
    , public _services: ServiceGeneralService
    , public _dialog: MatDialog) { }

  _reminders = { reminderServiceDetails: null, workOrderServicesId: 0 }
  loader: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {

    this._reminders = this.data;
    console.log("this._reminders, desde home finding: ", this._reminders);
  }
  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  addReminder() {
    // this.data.typeDocument = 1;
    // this.data.location = this.data.data.location;
    this.data = this._reminders
    const dialogRef = this._dialog.open(DialogAddReminderDetailComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("respuesta de agregar el docuemnto en POP UP ==================================: ", result)

      if (result.success) {
        this._reminders.reminderServiceDetails = result.result;
      }
      console.log(this._reminders);
    });
  }


  editReminder(item) {

    this.data = this._reminders
    this.data.reminderToTdit = item;
    const dialogRef = this._dialog.open(DialogAddReminderDetailComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("respuesta de agregar el docuemnto en POP UP ==================================: ", result)
      //add ultima vercion
      console.log(this._reminders);
      this._reminders = {
        reminderServiceDetails: this._reminders.reminderServiceDetails,
        workOrderServicesId: this._reminders.workOrderServicesId
      }
      console.log(this._reminders);

      if (result.success) {
        this._reminders.reminderServiceDetails = result.result;

      }

    });
  }


  removeReminder(item) {

    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Confirmation",
        body: "Are you sure to delete the document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.call_delete_service(item.id)
      }
      else {
        // alert('false');
      }
    });
  }


  call_delete_service(id_document) {
    this.loader.showLoader();
    this._services.service_general_post_with_url("ServiceRecord/DeleteReminderServiceDetail", id_document).subscribe((_respuesta => {
      this.loader.hideLoader();
      console.log("ServiceRecord/DeleteReminderServiceDetail ===============================", _respuesta)
      this._reminders.reminderServiceDetails = _respuesta.result;

      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Reminder has been deleted"
        },
        width: "350px"
      });


    }), (err) => {
      this.loader.hideLoader();
      console.log("Error en SendPropertys: ", err);
    })
  }

}
