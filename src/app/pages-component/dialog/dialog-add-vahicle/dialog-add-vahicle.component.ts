import { Component, OnInit, Inject } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentProfileSupplierComponent } from '../dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-add-vahicle',
  templateUrl: './dialog-add-vahicle.component.html',
  styleUrls: ['./dialog-add-vahicle.component.css']
})
export class DialogAddVahicleComponent implements OnInit {
  ca_city:any[]=[];
  ca_vehiculo:any[]=[];
  data_vehiculo:any={
    "documentVehicleServices": [],
    "photosVehicleServices": []
  };
  ca_year:any[]=[];
  user: any;
  ca_documentType: any[] = [];
  ca_privacy: any[] = [];
  temporalPhoto:any;
  interiorShow:boolean = false;
  exteriorShow:boolean = false;
  safetyShow:boolean = false;

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
    console.log("data de ingreso a modal: ", this.data);
    if(this.data != null){
       this.data_vehiculo =  this.data;
       if(!this.data_vehiculo.documentVehicleServices){
         this.data_vehiculo.documentVehicleServices = [];
       }
       if(!this.data_vehiculo.photosVehicleServices){
        this.data_vehiculo.photosVehicleServices = [];
       }else{
        this.verifyPhotos();
       }
       
       this.city();
    }
  }
  //*********************************************//
  async catalogos() {
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this._services.service_general_get("Catalogue/GetDocumentType/3").subscribe((data => {
      console.log(data);
      if(data.success){
        this.ca_documentType = data.result;
      }
    }))
  }
  //*********************************************//
  city(){
    this._services.service_general_get('Catalogue/GetState?country='+this.data.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result; 
      }
    })) 
  }
  //*********************************************//
  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[], type) {
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
              
              this.temporalPhoto= {
                "id": 0,
                "vehicleService": 0,
                "photo": encoded,
                "b64" : imageUrl,
                "photoExtension": ext[1],
                "createdBy": this.user.id,
                "createdDate": new Date(),
                "updatedBy": this.user.id,
                "updatedDate": new Date()
              }
                
              if(type == 1){
                this.temporalPhoto.interior = true;
                this.temporalPhoto.exterior = false;
                this.temporalPhoto.safety = false;
              }

              if(type == 2){
                this.temporalPhoto.interior = false;
                this.temporalPhoto.exterior = true;
                this.temporalPhoto.safety = false;
              }

              if(type == 3){
                this.temporalPhoto.interior = false;
                this.temporalPhoto.exterior = false;
                this.temporalPhoto.safety = true;
              }

              this.pushData();


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
  addDocument(){
    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: {country: this.data.country, city: this.data.city}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.data_vehiculo.documentVehicleServices.push(result);
      }
    });
  }
  //*********************************************//
  nameDocument(id) {
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if (this.ca_documentType[i].id == id) {
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //*********************************************//
  namePrivacy(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
      }
    }
  }
  //*********************************************//
  nameCity(id){
    for(let i = 0; i < this.ca_city.length; i++){
      if(this.ca_city[i].id == id){
         return this.ca_city[i].city;
      }
    }
  }
  //*********************************************//
  pushData(){
    this.data_vehiculo.photosVehicleServices.push(this.temporalPhoto);
    console.log("Photos: ", this.data_vehiculo);
    this.verifyPhotos();
  }
  //*********************************************//
  addNewPhoto(id){
    document.getElementById('doc'+id).click();
  }
  //*********************************************//
  verifyPhotos(){
    let interior = 0;
    let exterior = 0;
    let safety = 0;

    for (let i = 0; i < this.data_vehiculo.photosVehicleServices.length; i++) {
      if(this.data_vehiculo.photosVehicleServices[i].interior == true){
        interior++;
      } 
      if(this.data_vehiculo.photosVehicleServices[i].exterior == true){
        exterior ++;
      } 
      if(this.data_vehiculo.photosVehicleServices[i].safety == true){
        safety++;
      } 
    }
    
    if(interior > 0){
       this.interiorShow = true;
    }

    if(exterior > 0){
      this.exteriorShow = true;
    }

    if(safety > 0){
      this.safetyShow = true;
    }
  }
  //*********************************************//
  activeVehicleType: boolean = false;
  activeVehicleMake: boolean = false;
  activeVehicleModel: boolean = false;
  activeVehicleYear: boolean = false;
  activeVehiclePlateNumber: boolean = false;
  activeVehicleColor: boolean = false;
  activeVehicleCapacity: boolean = false;
  activeVehicleDoors: boolean = false;
  activeVehicleAir: boolean = false;
  contador = 0;
  validForm(){
    if(this.data_vehiculo.vehicleType == undefined || this.data_vehiculo.vehicleType == null || this.data_vehiculo.vehicleType == ''){
      this.activeVehicleType = true;
      this.contador++;
    }
    if(this.data_vehiculo.vehicleMake == undefined || this.data_vehiculo.vehicleMake == null || this.data_vehiculo.vehicleMake == ''){
      this.activeVehicleMake = true;
      this.contador++;
    }
    if(this.data_vehiculo.vehicleModel == undefined || this.data_vehiculo.vehicleModel == null || this.data_vehiculo.vehicleModel == ''){
      this.activeVehicleModel = true;
      this.contador++;
    }
    if(this.data_vehiculo.year == undefined || this.data_vehiculo.year == null || this.data_vehiculo.year == ''){
      this.activeVehicleYear = true;
      this.contador++;
    }
    if(this.data_vehiculo.plateNumber == undefined || this.data_vehiculo.plateNumber == null || this.data_vehiculo.plateNumber == ''){
      this.activeVehiclePlateNumber = true;
      this.contador++;
    }
    if(this.data_vehiculo.color == undefined || this.data_vehiculo.color == null || this.data_vehiculo.color == ''){
      this.activeVehicleColor = true;
      this.contador++;
    }
    if(this.data_vehiculo.capacity == undefined || this.data_vehiculo.capacity == null || this.data_vehiculo.capacity == ''){
      this.activeVehicleCapacity = true;
      this.contador++;
    }
    if(this.data_vehiculo.numberDoor == undefined || this.data_vehiculo.numberDoor == null || this.data_vehiculo.numberDoor == ''){
      this.activeVehicleDoors = true;
      this.contador++;
    }
    if(this.data_vehiculo.airConditioner == undefined || this.data_vehiculo.airConditioner == null || this.data_vehiculo.airConditioner == ''){
      this.activeVehicleAir = true;
      this.contador++;
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
  
  save(){
    this.data_vehiculo.success=true;
    if(this.data.id != undefined && this.data.id != null){
      if(this.temporalPhoto != undefined){
        this.temporalPhoto.vehicleService =  this.data.id
      }
    }
    this.data_vehiculo.createdBy = this.user.id,
    this.data_vehiculo.createdDate = new Date();
    this.data_vehiculo.updatedBy = this.user.id,
    this.data_vehiculo.updatedDate = new Date();
    this.dialogRef.close(this.data_vehiculo);
  }

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
}
