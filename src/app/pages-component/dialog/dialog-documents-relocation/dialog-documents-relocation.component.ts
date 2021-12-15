import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-documents-relocation',
  templateUrl: './dialog-documents-relocation.component.html',
  styleUrls: ['./dialog-documents-relocation.component.css']
})
export class DialogDocumentsRelocationComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  documents: any = {}
  caDocumentType: any[] = [];
  temporalDocument: any = {};
  user: any = {};
  today: any = "";

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.today = new Date();
    this.catalogos();
  }

  public default_dependents: boolean = true;
  public ca_privacy = [];
  async catalogos() {
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this._services.service_general_get("Catalogue/GetDocumentType/" + this.data.typeDocument).subscribe((data => {
      console.log(data);
      if (data.success) {
        this.caDocumentType = data.result;
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


              let ext = droppedFile.relativePath.split(".");
              debugger;
              this.temporalDocument = {
                "id": 0,
                "fileRequest": encoded,
                "fileExtension": ext[ext.length - 1],
                "documentType": "",
                "relationship": "",
                "issueDate": "",
                "expirationDate": "",
                "issuingAuthority": "",
                "countryOrigin": "",
                "comment": "",
                "privacy": "",
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "name": droppedFile.relativePath
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
      "fileRequest": this.temporalDocument.fileRequest,
      "fileExtension": this.temporalDocument.fileExtension,
      "documentType": this.documents.documentType,
      "relationship": this.documents.relationship,
      "issueDate": this.documents.issueDate,
      "expirationDate": this.documents.expirationDate,
      "issuingAuthority": "",
      "countryOrigin": this.documents.countryOrigin,
      "privacy": this.documents.privacy,
      "comment": "",
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
