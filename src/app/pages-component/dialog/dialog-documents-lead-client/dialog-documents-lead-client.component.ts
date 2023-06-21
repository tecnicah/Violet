import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-documents-lead-client',
  templateUrl: './dialog-documents-lead-client.component.html',
  styleUrls: ['./dialog-documents-lead-client.component.css']
})
export class DialogDocumentsLeadClientComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDocumentsLeadClientComponent>,
              public _services: ServiceGeneralService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public _dialog: MatDialog) { }

  temporalDocument: any = {};;
  user: any = {};
  today: any = new Date();

  caDocumentType: any[] = [];
  caDocumentStatus: any[] = [];
caPrivacy: any[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
  }

  async catalogos() {
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this.caDocumentStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.caPrivacy = await this._services.getCatalogueFrom('GetPrivacy');
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
              this.temporalDocument.updateDate = new Date();
              this.temporalDocument.documentName = droppedFile.relativePath;
              this.temporalDocument.fileName = droppedFile.relativePath;
              this.temporalDocument.fileRequest = encoded;
              this.temporalDocument.fileExtension = ext[ext.length-1];
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


    //*************************************************************//
  //VALIDACIONES//
  active_description:boolean = false;
  active_fileName:boolean = false;
  active_idDocumentType :boolean = false;

  
  valida_form(){



    if(this.temporalDocument.description == undefined || this.temporalDocument.description == ''){
      this.active_description = true;
    }
    if(this.temporalDocument.idDocumentType == undefined || this.temporalDocument.idDocumentType.length == 0){
      this.active_idDocumentType = true;
    }
    if(this.temporalDocument.fileName == undefined || this.temporalDocument.fileName.length == 0){
      this.active_fileName = true;
    }


    if(this.validationForm())
    {
      this.temporalDocument.success = true;
      this.dialogRef.close(this.temporalDocument);
    }else
    {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body: "It is required to complete the missing information"
        },
        width: "350px"
      });
    }


  }



  validationForm()
  {
    if(this.temporalDocument.description == undefined){
      return false
    }

    if(this.temporalDocument.idDocumentTypeName == undefined){
      return false
    }

    if(this.temporalDocument.fileName == undefined){
      return false
    }

    return true;
  }

  save(){

    console.log('this.temporalDocument',this.temporalDocument);
    this.valida_form();


  }
}
