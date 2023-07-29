import { Component, OnInit, Inject } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-document-profile-supplier',
  templateUrl: './dialog-document-profile-supplier.component.html',
  styleUrls: ['./dialog-document-profile-supplier.component.css']
})
export class DialogDocumentProfileSupplierComponent implements OnInit {

  user: any;
  temporalDocument:any={};
  tempData:any={};
  privacy:any[]=[];
  documentType:any[]=[];
  date:any;
  city:any;
  constructor(public _services: ServiceGeneralService,  public _dialog:MatDialog,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log("data recibida: ", this.data);
    this.catalogos();
    this.date = new Date;
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get('Catalogue/GetState?country='+this.data.country).subscribe((data => {
      if (data.success) {
        let ca_city = data.result; 
        for(let i = 0; i < ca_city.length; i++){
          if(ca_city[i].id == this.data.city){
             this.city = ca_city[i].city;
          }
        }
      }
    })) 
  }
  //*********************************************//
  getName(id){
    for (let i = 0; i < this.city.length; i++) {
      if(this.city[i].id == id){
         return this.city[i].city;
      }
    }
  }
  //*********************************************//
  async catalogos(){
    this.privacy   = await this._services.getCatalogueFrom('GetPrivacy');
    //this.documentType   = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/29').subscribe((data => {
      if (data.success) {
        this.documentType = data.result; 
        console.log(this.documentType);
      }
    })) 
    console.log(this.privacy);
  }
  //*********************************************//
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
                "fileName": droppedFile.relativePath,
                //"fileExtension": ext[1],
                "fileExtension": ext[ext.length-1],
                "fileRequest": encoded,
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "administrativeContactsService": 0,
                "city": 0,
                //"filePath": droppedFile.relativePath,
                "filePath": encoded,
                "documentType": this.tempData.documentType,
                "expirationDate": this.tempData.expirationDate,
                "privacy": this.tempData.privacy,
                "type":file.type
              }

              if(this.temporalDocument.fileName != undefined || this.temporalDocument.fileName != null || this.temporalDocument.fileName != ''){
                this.cargaDocumento = false;
              }

              debugger
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
  //*********************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*********************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //*********************************************//
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

  if(this.tempData.documentType == undefined || this.tempData.documentType == null || this.tempData.documentType == ''){
    this.activeDocument = true;
    this.contador++;
  }
  
  if(this.tempData.privacy == undefined || this.tempData.privacy == null || this.tempData.privacy == ''){
    this.activePrivacy = true;
    this.contador++;
  }
 
  if(this.tempData.expirationDate == undefined || this.tempData.expirationDate == null || this.tempData.expirationDate == ''){
    this.activeExpiration = true;
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

  save(){
    this.temporalDocument.success  = true;
    this.temporalDocument.administrativeContactsService =  0;
    this.temporalDocument.consultantContactsService =  0;
    this.temporalDocument.administrativeContactsConsultant =  0;
    this.temporalDocument.vehicleService = 0;
    this.temporalDocument.city =  this.data.city;
    this.temporalDocument.documentType =  this.tempData.documentType;
    this.temporalDocument.expirationDate =  this.tempData.expirationDate,
    this.temporalDocument.privacy = this.tempData.privacy,
    console.log("data de los documentos: ", this.temporalDocument);
    this.dialogRef.close(this.temporalDocument);
  }

}
