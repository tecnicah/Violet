import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
@Component({
  selector: 'app-dialog-add-slide-home',
  templateUrl: './dialog-add-slide-home.component.html',
  styleUrls: ['./dialog-add-slide-home.component.css']
})
export class DialogAddSlideHomeComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddSlideHomeComponent>) { }

  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.__loader__.hideLoader();
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
      this._services.service_general_get(`AdminCenter/GetSliderPhraseById?key=${this.data.id}`).subscribe( r => {
        if (r.success) {
          this.data = r.result;
          document.getElementById('lead_client_avatar').setAttribute('src',this._services.url_images+this.data.image);
          console.log('foto', this.data.image);
          this.__loader__.hideLoader();
        }
      });
    }
  }
  img(event){
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
        this.data.image = encoded;
        this.data.extension = ext[1];
        document.getElementById('lead_client_avatar').setAttribute('src',''+reader.result);
    };
  }

  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy= userData.id;
    this.data.updatedDate = new Date();

    if (this.data.id == 0) {
      this.__loader__.showLoader();
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      console.log(JSON.stringify(this.data), this.data);
      this._services.service_general_post_with_url("AdminCenter/AddSliderPhrase", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    } else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateSliderPhrase', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })
    }
  }
}
