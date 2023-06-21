import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-admin-center-documents-upload',
  templateUrl: './dialog-admin-center-documents-upload.component.html',
  styleUrls: ['./dialog-admin-center-documents-upload.component.css']
})
export class DialogAdminCenterDocumentsUploadComponent implements OnInit {

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
    this.documents.location = '';
    this.catalogos();
  }

  public default_dependents: boolean = true;
  caStatus = [];
  async catalogos() {
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType/25');
    this.caCountry = await this._services.getCatalogueFrom('GetPrivacy');
    this.caStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
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
              this.temporalDocument = {
                "id": 0,
                "idCountry": 0,
                "idDocumentType": this.documents.idDocumentType,
                "fileRequest": encoded,
                "fileExtencion": ext[ext.length - 1],
                "fileName": droppedFile.relativePath,
                "uploadDate": new Date(),
                "expirationDate": this.documents.expirationDate,
                "location": this.documents.location,
                "idStatus": this.documents.idStatus,
                "idPrivacy": this.documents.idPrivacy
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
      "idCountry": 0,
      "idDocumentType": this.documents.idDocumentType,
      "fileRequest": this.temporalDocument.fileRequest,
      "fileExtencion": this.temporalDocument.fileExtencion,
      "fileName": this.temporalDocument.fileName,
      "uploadDate": new Date(),
      "expirationDate": this.documents.expirationDate,
      "location": this.documents.location,
      //"idStatus": this.documents.idStatus,
      "idStatus": 1,
      "idPrivacy": this.documents.idPrivacy,
      success: true
    }

    this.dialogRef.close(this.temporalDocument);
  }

}
