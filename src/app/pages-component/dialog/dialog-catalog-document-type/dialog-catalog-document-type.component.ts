import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-catalog-document-type',
  templateUrl: './dialog-catalog-document-type.component.html',
  styleUrls: ['./dialog-catalog-document-type.component.css']
})
export class DialogCatalogDocumentTypeComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogCatalogDocumentTypeComponent>) { }

  active_document: boolean = false;
  active_type: boolean = false;

  typeDoc: any;

  ngOnInit(): void {
    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    if (this.data.id != 0) {
     this._services.service_general_get(`AdminCenter/GetDocumentTypeById?key=${this.data.id}`).subscribe( r => {
       if (r.success) {
         this.data = r.result;
         console.log('respuesta de actualizacion', r);
         this.__loader__.hideLoader();
       }
     });
    }
    this._services.service_general_get('AdminCenter/GetTypeDocuments').subscribe(rtype => {
      if (rtype.success) {
        this.typeDoc = rtype.result
      }
    });
  }
  validForm() {
    if(this.data.documentType == undefined && this.data.type == undefined){
      this.active_document = true;
      this.active_type = true;
    }
    if((this.data.documentType != undefined || this.data.documentType != '' ) && (this.data.type != undefined || this.data.type != '' )){
      this.save();
    }
  }
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.data.updatedBy = userData.id;
    this.data.updatedDate = new Date();
    if (this.data.id == 0) {
      this.data.createdBy = userData.id;
      this.data.createdDate = new Date();
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("AdminCenter/AddDocumentType", this.data).subscribe(r => {
        console.log(r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      })
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_put('AdminCenter/UpdateDocumentType', this.data).subscribe(r => {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
      })

    }
  }

}
