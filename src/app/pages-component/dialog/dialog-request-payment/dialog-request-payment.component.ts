import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-request-payment',
  templateUrl: './dialog-request-payment.component.html',
  styleUrls: ['./dialog-request-payment.component.css']
})
export class DialogRequestPaymentComponent implements OnInit {


  constructor(public _services: ServiceGeneralService,
              public dialogRef: MatDialogRef<any>,
              public _dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

documents:        any   = {}
caDocumentType:   any[] = [];
caRelation:       any[] = [];
caCountry:        any[] = [];
caPaymentType:    any[] = [];
caCurrency:       any[] = [];
temporalDocument: any[] = [];
user:               any = {};
today:              any = "";
cestatus:         any[] = [];
cSupplierType:    any[] = [];
cSupplier:        any[] = [];
PaymetData:       any = {};
cRequestType:     any[] = [];
ccity:            any[] = [];
caNumbers:        any[] = [];
cDuration:        any[] = [];

nuevo:          boolean = true;
vista: boolean = false;

public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit() {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.today = new Date();

    if (this.data.id > 0) {
      this.nuevo = false;
      this._services.service_general_get("RequestPayment/GetRequestPaymentById?rp=" + this.data.id).subscribe((r => {
        if (r.success) {
          console.log(r);
          this.data = r.result;
          this.getcity(this.data);
          this.suplier(this.data);
          if (this.data.commentRequestPayments == 0) {
            this.addReply();
          }
        }
      }))
    } else {
      this.data.commentRequestPayments = [];
      this.addReply();
    }

    console.log("DATA PRINCIPAL: ", this.data);

    for (let i = 1; i < 11; i++) {
      this.caNumbers.push({
        value: i,
      })
    }



    this.data.requestType = 3;
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.catalogos();
  }

  async catalogos() {
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    this.caPaymentType = await this._services.getCatalogueFrom('GetPaymentType');
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
    this.cestatus = await this._services.getCatalogueFrom('GetStatus');
    this.cSupplierType = await this._services.getCatalogueFrom('GetSupplierType');
    this.cRequestType = await this._services.getCatalogueFrom('GetRequestType');
    this.cDuration = await this._services.getCatalogueFrom('GetDuration');
    for (let a = 0; a < this.cRequestType.length; a++) {
      const elementres = this.cRequestType[a];
      if (elementres.id == this.data.requestType) {
        this.data.requestTypename = elementres.requestType;
      }
    } 

    await this.__loader__.hideLoader();
    this.vista = true;
  }

  async suplier(key) {
    console.log(key.supplierType);
    this.cSupplier = await this._services.getCatalogueFrom('GetSupplierBySupplierType?key=' + key.supplierType);
    console.log(this.cSupplier);
  }

  getcity(data) {

    this._services.service_general_get("Catalogue/GetState?country=" + data.countrySupplier).subscribe((data => {
      if (data.success) {
        this.ccity = data.result;
      }
    }))
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = file.type.split("/");
              this.temporalDocument.push({
                "id": 0,
                "fileName": droppedFile.relativePath,
                "fileExtension": ext[1],
                "fileRequest": encoded,
                "requestPaymentId": this.data.id,
                "createdBy": this.user.id,
                "createdDate": new Date(),

              })
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  addDoc() {
    document.getElementById('doc').click();
  }

  deleteDocument(id) {

  }

  removeDocument(i) {
    this.temporalDocument.splice(i, 1);
  }

  addReply() {
    console.log(this.user);
    this.data.commentRequestPayments.push({
      "id": 0,
      "requestPaymentId": this.data.id,
      "reply": null,
      "userId": this.user.id,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })
  }

  save() {
    this.__loader__.showLoader();
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date();
    this.data.documentRequestPayments = this.temporalDocument;
    this.temporalDocument = [];
    console.log(this.data);
    if (this.nuevo) {
      this._services.service_general_post_with_url("RequestPayment/PostRequestPayment", this.data).subscribe((r => {
        if (r.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Request Payment register"
            },
            width: "350px"
          });
          this.__loader__.hideLoader();
          this.dialogRef.close();
        }
      }))
    } else {
      this.PaymetData.workOrderServicesId = this.data.workOrderServicesId;
      this._services.service_general_put("RequestPayment/PutRequestPayment", this.data).subscribe((r => {
        if (r.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Request Payment updated"
            },
            width: "350px"
          });
          this.__loader__.hideLoader();
          this.dialogRef.close();
        }
      }))
    }
  }

}
