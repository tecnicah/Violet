import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-profile-document',
  templateUrl: './dialog-profile-document.component.html',
  styleUrls: ['./dialog-profile-document.component.css']
})
export class DialogProfileDocumentComponent implements OnInit {

  temporalDocument:   any = {};
  data_document:any = {};
  today = new Date();
  user:any;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data_: any,public _services : ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
  }
  //********************************************************************************//
  //CONSULTA DE INFROMACION DE LOS CATALOGOS//
  ca_document = [];
  ca_privacy = [];
  ca_statusDoc = [];
  async catalogos(){
    //this.ca_document = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_statusDoc = await this._services.getCatalogueFrom('GetDocumentStatus');
    this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((data => {
      if (data.success) {
          this.ca_document = data.result;
      }
    }))
  }
  //********************************************************************************//

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
                "id":0,
                "consultantContactsService":0,
                "fileName": droppedFile.relativePath,
                "filePath": encoded,
                "fileExtension": ext[ext.length-1],
                "documentType":'',
                "expirationDate":"",
                "location":"",
                "privacy":'',
                "status":'',
                "createdBy":this.user.id,
                "createdDate": new Date(),
                "updatedBy":this.user.id,
                "updatedDate": new Date(),
                "type":file.type
              }
              console.log(this.temporalDocument);
              if(this.temporalDocument.fileName != undefined || this.temporalDocument.fileName != null || this.temporalDocument.fileName != ''){
                this.cargaDocumento = false;
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
        "id":0,
        "consultantContactsService":0,
        "fileName": this.temporalDocument.fileName,
        "filePath": this.temporalDocument.filePath,
        "fileExtension": this.temporalDocument.fileExtension,
        "documentType": this.data_document.documentType,
        "expirationDate": this.data_document.expirationDate,
        "location":this.data_document.location,
        "privacy":this.data_document.privacy,
        "status":this.data_document.status,
        "createdBy": this.temporalDocument.createdBy,
        "createdDate": this.temporalDocument.createdDate,
        "updatedBy": this.temporalDocument.updatedBy,
        "updatedDate": this.temporalDocument.updatedDate,
        "type": this.temporalDocument.type,
        "success": true
      }

    this.dialogRef.close(this.temporalDocument);
  }


  activeStatus: boolean = false;
  activeExpiration: boolean = false;
  activeLocation: boolean = false;
  activePrivacy: boolean = false;
  activeDocument: boolean = false;
  cargaDocumento: boolean = false;
  contador = 0;
 valida_form(){

  if(this.temporalDocument.fileName == undefined || this.temporalDocument.fileName == null || this.temporalDocument.fileName == ''){
    this.cargaDocumento = true;
    this.contador++;
  }

  if(this.data_document.documentType == undefined || this.data_document.documentType == null || this.data_document.documentType == ''){
    this.activeDocument = true;
    this.contador++;
  }


  if(this.data_document.privacy == undefined || this.data_document.privacy == null || this.data_document.privacy == ''){
    this.activePrivacy = true;
    this.contador++;
  }

  if(this.data_document.status == undefined || this.data_document.status == null || this.data_document.status == ''){
    this.activeStatus = true;
    this.contador++;
  }
  if(this.data_document.expirationDate == undefined || this.data_document.expirationDate == null || this.data_document.expirationDate == ''){
    this.activeExpiration = true;
    this.contador++;
  }
  if(this.data_document.location == undefined || this.data_document.location == null || this.data_document.location == ''){
    this.activeLocation = true;
    this.contador++;
  }

  if(this.contador == 0){
     this.save();
  }else{
    window.scrollTo(0,0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Warning",
        body: "To save it is necessary to save all the requested fields"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {

    })
    this.contador = 0;
    return;
  }
 }
}
