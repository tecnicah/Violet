import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDocumentProfileSupplierComponent } from '../dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAddVahicleComponent } from '../dialog-add-vahicle/dialog-add-vahicle.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-consultant',
  templateUrl: './dialog-consultant.component.html',
  styleUrls: ['./dialog-consultant.component.css']
})
export class DialogConsultantComponent implements OnInit {

  ca_contactType:any[]=[];
  ca_city: any[] =[];
  ca_typeSupplier:any[]=[];
  ca_languages:any[]=[];
  ca_documentType: any[] = [];
  ca_privacy: any[] = [];
  ca_vehiculo:any[]=[];
  datemodal = new Date();
  consultantContactsServices:any = {
    "documentConsultantContactsServices":[],
    "languagesConsultantContactsServices": [],
    "vehicleServices": []
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
    console.log("data recibida: ", this.data);
    this.verificaNodos();
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.ca_contactType   = await this._services.getCatalogueFrom('GetContactType');
    this.ca_typeSupplier   = await this._services.getCatalogueFrom('GetSupplierType');
    this.ca_languages  = await this._services.getCatalogueFrom('GetLanguages');
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((data => {
      if (data.success) {
        this.ca_documentType = data.result; 
        console.log(this.ca_documentType);
      }
    })) 
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
      this.consultantContactsServices = this.data;
      
      if(!this.consultantContactsServices.documentConsultantContactsServices){
        this.consultantContactsServices.photo = '';
        this.consultantContactsServices.id = 0;
        this.consultantContactsServices.documentConsultantContactsServices = [];
      }
      if(!this.consultantContactsServices.languagesConsultantContactsServices){
        this.consultantContactsServices.languagesConsultantContactsServices = [];
      }
      if(!this.consultantContactsServices.vehicleServices){
        this.consultantContactsServices.vehicleServices = [];
      }

      this.consultantContactsServices.languages = [];
      if(this.consultantContactsServices.languagesConsultantContactsServices.length > 0){
        for (let i = 0; i < this.consultantContactsServices.languagesConsultantContactsServices.length; i++) {
          this.consultantContactsServices.languages.push(this.consultantContactsServices.languagesConsultantContactsServices[i].language);
        }
      }

      if(this.data.immi || this.data.rel){
        this.consultantContactsServices.immigration = this.data.immi;
        this.consultantContactsServices.relocation = this.data.rel;
      }

    }
  }
  //*************************************************************//
  addDocument(){
    if(this.consultantContactsServices.city==null ||
      this.consultantContactsServices.city== undefined ||
      this.consultantContactsServices.city== ''
     ){

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To add documents it is necessary to fill the city"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
      return;
      }

    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: {city: this.consultantContactsServices.city}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.activeDcument = false;
        this.consultantContactsServices.documentConsultantContactsServices.push(result);
      }
    });
  }
  //*************************************************************//
  addVehicle(){
    if(this.consultantContactsServices.city==null ||
      this.consultantContactsServices.city== undefined ||
      this.consultantContactsServices.city== ''
     ){

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To add vehicle it is necessary to fill the city"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
      return;
    }
    const dialogRef = this._dialog.open(DialogAddVahicleComponent, {
      width: "90%",
      data: {
        country: this.data.country,
        city: this.consultantContactsServices.city
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.consultantContactsServices.vehicleServices.push(result);
      }
    });
  }
  //*************************************************************//
  editVehicle(datos, i){
    datos.country = this.data.country;
    datos.city = this.consultantContactsServices.city
    const dialogRef = this._dialog.open(DialogAddVahicleComponent, {
      width: "90%",
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.consultantContactsServices.vehicleServices[i] = result;
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

              this.consultantContactsServices.photo = encoded;
              this.consultantContactsServices.photoExtension = ext[1];
              this.consultantContactsServices.b64 = imageUrl;

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
  //*************************************************************//
  deleteDocument(id, i){
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
          if(id != 0){
            this._services.service_general_delete("Profile/DeleteDocumentContactsService?id=" + id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Document deleted"
                  },
                  width: "350px"
                });
                this.consultantContactsServices.documentConsultantContactsServices.splice(i,1);
                //this.ngOnInit();
              }
            }), (err)=>{
              console.log("Error: ", err);
            })
          }else{
            this.consultantContactsServices.documentConsultantContactsServices.splice(i,1);
          }
        }
      })
    }
  //************************************************************//
  save(){
    this.consultantContactsServices.success=true;
    this.consultantContactsServices.languagesConsultantContactsServices = [];
    if(this.consultantContactsServices.languages != undefined && this.consultantContactsServices.languages.length > 0){
      for (let i = 0; i < this.consultantContactsServices.languages.length; i++) {
        this.consultantContactsServices.languagesConsultantContactsServices.push({
          "consultantContactsService": this.consultantContactsServices.id,
          "language": this.consultantContactsServices.languages[i]
        })
      }
    }
    console.log(this.consultantContactsServices);
    this.dialogRef.close(this.consultantContactsServices);
  }
  //*************************************************************//
  public __serverPath__:string = this._services.url_images;

  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }

  downloadPdf(base64String, fileName,  ext) {
    const source = 'data:application/'+ext+';base64,'+base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName+'.'+ext;
    link.click();
  }
  onClickDownloadPdf(b64, ext){
    let base64String = b64;
  
    this.downloadPdf(base64String,"archivo", ext);
  }

  activesupplierType: boolean = false;
  activeServiceLine: boolean = false;
  activeContactName: boolean = false;
  activetTitle: boolean = false;
  activeLanguage: boolean = false;
  activeNumber: boolean = false;
  activeEmail: boolean = false;
  activeCity: boolean = false;
  activeComment: boolean = false;
  activeDcument: boolean = false;
  activeNumberLongitud: boolean = false;
  contador = 0;
  validForm(){
    if(this.consultantContactsServices.supplierType == undefined || this.consultantContactsServices.supplierType == null || this.consultantContactsServices.supplierType == ''){
      this.activesupplierType = true;
      this.contador++;
    }
    if(this.consultantContactsServices.immigration == undefined && this.consultantContactsServices.relocation == undefined){
       this.activeServiceLine = true;
       this.contador++;
    }
    if(this.consultantContactsServices.contactName == undefined || this.consultantContactsServices.contactName == null || this.consultantContactsServices.contactName == ''){
      this.activeContactName = true;
      this.contador++;
    }
    if(this.consultantContactsServices.title == undefined || this.consultantContactsServices.title == null || this.consultantContactsServices.title == ''){
      this.activetTitle = true;
      this.contador++;
    }
    if(this.consultantContactsServices.languages == undefined || this.consultantContactsServices.languages == null || this.consultantContactsServices.languages == '' || this.consultantContactsServices.languages.length == 0){
      this.activeLanguage= true;
      this.contador++;
    }
    if(this.consultantContactsServices.phoneNumber == undefined || this.consultantContactsServices.phoneNumber == null || this.consultantContactsServices.phoneNumber == ''){
      this.activeNumber = true;
      this.contador++;
    }
    
    if(this.consultantContactsServices.email == undefined || this.consultantContactsServices.email == null || this.consultantContactsServices.email == ''){
      this.activeEmail = true;
      this.contador++;
    }
    if(this.consultantContactsServices.city == undefined || this.consultantContactsServices.city == null || this.consultantContactsServices.city == ''){
      this.activeCity = true;
      this.contador++;
    }
    if(this.consultantContactsServices.comments == undefined || this.consultantContactsServices.comments == null || this.consultantContactsServices.comments == ''){
      this.activeComment = true;
      this.contador++;
    }
    if(this.consultantContactsServices.documentConsultantContactsServices.length == 0){
      //this.activeDcument = true;
      //this.contador++;
    }

    let aux_number = this.consultantContactsServices.phoneNumber;
    if(aux_number != undefined){
      let n = aux_number.toString();
      console.log(n);
      if(n.length > 20){
        this.activeNumberLongitud = true;
        this.contador++;
      }
    }
    
  
    if(this.contador == 0){
       this.save();
    }else{
      window.scrollTo(0,0);
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To save it is necessary to fill all the requested fields"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
      this.contador = 0;
      return;
    }
  }

  validateEmail(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.consultantContactsServices.email)) {
        this.contador = 0;
      }else{
        this.contador++;
        this.activeEmail = true;
        this.consultantContactsServices.email = '';
        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Warning",
            body: "Wrong email format"
          },
          width: "350px"
        });
    
        dialogRef.afterClosed().subscribe(result => {
        
        })
      }
  }

  FalseVar(){
    this.activeNumber = false;
    this.activeNumberLongitud = false
  }
}
