import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-documents',
  templateUrl: './dialog-documents.component.html',
  styleUrls: ['./dialog-documents.component.css']
})
export class DialogDocumentsComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  documents:        any   = {}
  caDocumentType:   any[] = [];
  caRelation:       any[] = [];
  caCountry:        any[] = [];
  temporalDocument:   any = {};
  user:               any = {};
  today:              any = "";

  ngOnInit(): void {
    console.log('data', this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.today = new Date();
    this.catalogos();
  }

  public default_dependents:boolean = true;
  async catalogos() {
    //this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType');
    //this.caCountry      = await this._services.getCatalogueFrom('GetCountry');
    this.caCountry = await this._services.getCatalogueFrom('Nationalities');
    console.log(this.data);

    this._services.service_general_get("Catalogue/GetDocumentType/"+this.data.typeDocument).subscribe((data => {
      console.log(data);
      if(data.success){
        this.caDocumentType = data.result;
      }
    }))

    /*if( this.data.hasOwnProperty('spc') ) {

      const holder:any = await this._services.getCatalogueFrom(`GetDependentImmigration?sr=${ this.data.sr }`);
      this.default_dependents = false;
      this.caRelation = holder.value;

    } else {*/

      this._services.service_general_get("ServiceRecord/GetApplicant/"+this.data.sr).subscribe((data => {
        console.log(data);
        if(data.success){
          this.caRelation = data.applicant.value;
        }
      }))

    //}

  }

  public library_data:any = undefined;
  public getDataToLibrarySettings( id_selected:any ):void {

    this.caRelation.forEach( (item:any) => {

      if( id_selected == item.id ) {

        this.library_data = item;

      }

    });

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
                "fileExtension": ext[ext.length-1],
                "documentType": "",
                "relationship": "",
                "issueDate": "",
                "expirationDate": "",
                "issuingAuthority": "",
                "countryOrigin": "",
                "comment": "",
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

  save(){

    this.temporalDocument = {
      "id": 0,
      "fileRequest": this.temporalDocument.fileRequest,
      "fileExtension": this.temporalDocument.fileExtension,
      "documentType": this.documents.documentType,
      "relationship": this.documents.relationship,
      "issueDate": this.documents.issueDate,
      "expirationDate": this.documents.expirationDate,
      "issuingAuthority": this.documents.issuingAuthority,
      "countryOrigin": this.documents.countryOrigin,
      "comment": this.documents.comment,
      "createdBy": this.temporalDocument.createdBy,
      "createdDate": this.temporalDocument.createdDate,
      "fileName": this.temporalDocument.name,
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      library_data: this.library_data,
      success: true
    }

    this.dialogRef.close(this.temporalDocument);
  }

}
