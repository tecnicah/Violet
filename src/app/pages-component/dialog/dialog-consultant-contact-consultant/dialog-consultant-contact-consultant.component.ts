import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDocumentProfileSupplierComponent } from '../dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAddVahicleConsultantComponent } from '../dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';

@Component({
  selector: 'app-dialog-consultant-contact-consultant',
  templateUrl: './dialog-consultant-contact-consultant.component.html',
  styleUrls: ['./dialog-consultant-contact-consultant.component.css']
})
export class DialogConsultantContactConsultantComponent implements OnInit {

  ca_contactType:any[]=[];
  ca_city: any[] =[];
  ca_typeSupplier:any[]=[];
  ca_languages:any[]=[];
  ca_documentType: any[] = [];
  ca_privacy: any[] = [];
  ca_vehiculo:any[]=[];
  datemodal = new Date();
  consultantContactsConsultants:any = {
    "documentConsultantContactsConsultants":[],
    "languagesConsultantContactsConsultants": [],
    "vehicleConsultants": []
  };
  user: any;
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  validaNumericos(event){
    console.log("valid");
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || 
       event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
       event.key == 'Backspace' ){
       return true;
    }
  
     return false;
  }
  
  //*************************************************************//
  async ngOnInit(){
    console.log("data recibida: ", this.data)
    this.verificaNodos();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.ca_contactType   = await this._services.getCatalogueFrom('GetContactType');
    this.ca_typeSupplier   = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_languages  = await this._services.getCatalogueFrom('GetLanguages');
    this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');

    this._services.service_general_get('Catalogue/GetState?country='+this.data.country).subscribe((data => {
        if (data.success) {
          this.ca_city = data.result;
        }
      }))
  }
  //*************************************************************//
  verificaNodos(){
    if(this.data != null){
      this.consultantContactsConsultants = this.data;
      if(!this.consultantContactsConsultants.documentConsultantContactsConsultants){
        this.consultantContactsConsultants.photo = '';
        this.consultantContactsConsultants.id = 0;
        this.consultantContactsConsultants.documentConsultantContactsConsultants = [];
      }
      if(!this.consultantContactsConsultants.languagesConsultantContactsConsultants){
        this.consultantContactsConsultants.languagesConsultantContactsConsultants = [];
      }
      if(!this.consultantContactsConsultants.vehicleConsultants){
        this.consultantContactsConsultants.vehicleConsultants = [];
      }


      this.consultantContactsConsultants.languages = [];
      if(this.consultantContactsConsultants.languagesConsultantContactsConsultants.length > 0){
        for (let i = 0; i < this.consultantContactsConsultants.languagesConsultantContactsConsultants.length; i++) {
          this.consultantContactsConsultants.languages.push(this.consultantContactsConsultants.languagesConsultantContactsConsultants[i].language);
        }
      }

    }
  }
  //*************************************************************//
  addDocument(){
    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: {city: this.consultantContactsConsultants.city}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.consultantContactsConsultants.documentConsultantContactsConsultants.push(result);
      }
    });
  }
  //*************************************************************//
  addVehicle(){
    const dialogRef = this._dialog.open(DialogAddVahicleConsultantComponent, {
      width: "90%",
      data: {
        country: this.data.country,
        city: this.consultantContactsConsultants.city
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.consultantContactsConsultants.vehicleConsultants.push(result);
      }
    });
  }
  //*************************************************************//
  editVehicle(datos, i){
    datos.country = this.data.country;
    datos.city = this.consultantContactsConsultants.city
    const dialogRef = this._dialog.open(DialogAddVahicleConsultantComponent, {
      width: "90%",
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.consultantContactsConsultants.vehicleConsultants[i] = result;
      }
    });
  }
  //*************************************************************//
  editPhoto(){
    document.getElementById('photoCont').click();
  }
  //*************************************************************//
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

              this.consultantContactsConsultants.photo = encoded;
              this.consultantContactsConsultants.photoExtension = ext[1];
              this.consultantContactsConsultants.b64 = imageUrl;

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
  //*************************************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*************************************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //************************************************************//
  nameDocument(id) {
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if (this.ca_documentType[i].id == id) {
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //************************************************************//
  namePrivacy(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
      }
    }
  }
  //************************************************************//
  nameCity(id){
    for(let i = 0; i < this.ca_city.length; i++){
      if(this.ca_city[i].id == id){
         return this.ca_city[i].city;
      }
    }
  }
  //************************************************************//
  nameVehicle(id){
    for(let i = 0; i < this.ca_vehiculo.length; i++){
      if(this.ca_vehiculo[i].id == id){
         return this.ca_vehiculo[i].type;
      }
    }
  }
  //************************************************************//
  save(){
    this.consultantContactsConsultants.success=true;
    this.consultantContactsConsultants.languagesConsultantContactsConsultants = [];
    if(this.consultantContactsConsultants.languages != undefined && this.consultantContactsConsultants.languages.length > 0){
      for (let i = 0; i < this.consultantContactsConsultants.languages.length; i++) {
        this.consultantContactsConsultants.languagesConsultantContactsConsultants.push({
          "consultantContactsService": this.consultantContactsConsultants.id,
          "language": this.consultantContactsConsultants.languages[i]
        })
      }
    }
    console.log(this.consultantContactsConsultants);
    this.dialogRef.close(this.consultantContactsConsultants);
  }
  //*************************************************************//
  deleteDocument(i){
    console.log("Entra a eliminar documento: ", i);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the document"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.consultantContactsConsultants.documentConsultantContactsConsultants.splice(i,1);
      }
    })
  }
}
