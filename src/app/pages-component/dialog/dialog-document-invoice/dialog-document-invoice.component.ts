import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-document-invoice',
  templateUrl: './dialog-document-invoice.component.html',
  styleUrls: ['./dialog-document-invoice.component.css']
})
export class DialogDocumentInvoiceComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data: any) {}

  documents: any = {}
  caDocumentType: any[] = [];
  caRelation: any[] = [];
  caCountry: any[] = [];
  temporalDocument: any = {};
  user: any = {};
  today: any = "";

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.today = new Date();
    this.catalogos();
  }

  async catalogos() {
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    console.log(this.data);
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


              let ext = droppedFile.relativePath.split(".");
              debugger;
              this.temporalDocument = {
                "id": 0,
                "invoice": 0,
                "name": droppedFile.relativePath,
                "filePath": encoded,
                "fileExtension": ext[ext.length - 1],
                "documentType": 0,
                "issueDate": null,
                "expirationDate": null,
                "issuingAuthority": null,
                "countryOrigin": 0,
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date()
              }
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

  save() {

    this.temporalDocument = {
      "id": 0,
      "filePath": this.temporalDocument.filePath,
      "fileExtension": this.temporalDocument.fileExtension,
      "documentType": this.documents.documentType,
      "issueDate": this.documents.issueDate,
      "expirationDate": this.documents.expirationDate,
      "issuingAuthority": this.documents.issuingAuthority,
      "countryOrigin": this.documents.countryOrigin,
      "createdBy": this.temporalDocument.createdBy,
      "createdDate": this.temporalDocument.createdDate,
      "fileName": this.temporalDocument.name,
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "success": true
    }
    this.dialogRef.close(this.temporalDocument);
  }

}
