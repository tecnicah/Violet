import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-status-detail',
  templateUrl: './dialog-status-detail.component.html',
  styleUrls: ['./dialog-status-detail.component.css']
})
export class DialogStatusDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }
  user: any; //era public
  ca_estatus = [];
  home_finding = { statusId: 0 }
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA RECIBIDA:", this.data)

    this._services.service_general_get("Catalogue/GetStatusServicebyRol?category=" + this.data.category + "&rol=" + this.data.rol).subscribe((res => {
      console.log("roles cargados en el pop up = ===============================", res);
      if (res.success) {
        this.ca_estatus = res.result;
      }
    }));

  }

  yes() {
    this.data_return.success = true;
    this.data_return.id = this.home_finding.statusId;

    this.update_status();
    this.dialogRef.close(this.data_return);
  }

  data_return = {
    id: 0,
    success: false
  }

  public __loader__: LoaderComponent = new LoaderComponent();

  update_status() {

    this.__loader__.showLoader();
    this._services.service_general_post_with_url(`RelocationServices/UpdateStatusServiceDetail?wos_id=${this.data.wos_id}&type=${this.data.type_id}&status_detail_id=${this.data_return.id}&sr=${this.data.srId}&user_id=${this.user.id}`, null).subscribe((r => {
      if (r.success) {
        console.log(r)
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Status Updated"
          },
          width: "350px"
        });

        this.__loader__.hideLoader();

      }
    }), (err) => {
      this.__loader__.hideLoader();
      console.log("error: ", err);
    })
  }




  no() {
    this.data_return.success = false;
    this.dialogRef.close(this.data_return);

  }

}
