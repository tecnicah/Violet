import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-add-commentr-detail',
  templateUrl: './dialog-add-commentr-detail.component.html',
  styleUrls: ['./dialog-add-commentr-detail.component.css']
})
export class DialogAddCommentrDetailComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog) { }

  today = new Date();
  user: any = {};
  loader: LoaderComponent = new LoaderComponent();


  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('userData'));
   console.log(" Recibido para iniciar a agregar: ========================", this.data, this.user)
  }

  newcomment = {
    "id": 0,
    "workOrderServiceId": this.data.workOrderServicesId
    , "reply": ""
    , "userId": null
    , "createdBy": null
    , "createdDate": this.today
    , "updateBy": null
    , "updatedDate": this.today
  }


  save() {

    this.call_service_send_propertys();

  }


  call_service_send_propertys() {
    this.loader.showLoader();
    this.newcomment.userId = this.user.id;
    this.newcomment.createdBy = this.user.id;
    this.newcomment.updateBy = this.user.id;
    console.log("Este es el objeto a insertarse de Comments:", JSON.stringify(this.newcomment));

    this._services.service_general_post_with_url("ServiceRecord/AddNewServiceComent", this.newcomment).subscribe((resp => {
      this.loader.hideLoader();

      console.log("resultado de ServiceRecord/AddNewServiceComent: ", resp);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Comment Saved"
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
