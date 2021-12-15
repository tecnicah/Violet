import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogDocumentProfileSupplierComponent } from '../dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-add-vahicle-consultant',
  templateUrl: './dialog-add-vahicle-consultant.component.html',
  styleUrls: ['./dialog-add-vahicle-consultant.component.css']
})
export class DialogAddVahicleConsultantComponent implements OnInit {

  ca_city: any[] = [];
  ca_vehiculo: any[] = [];
  data_vehiculo: any = {
    "documentVehicleConsultants": [],
    "photosVehicleConsultants": []
  };
  ca_year: any[] = [];
  user: any;
  ca_documentType: any[] = [];
  ca_privacy: any[] = [];
  temporalPhoto: any;
  interiorShow: boolean = false;
  exteriorShow: boolean = false;
  safetyShow: boolean = false;


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
    console.log("data de ingreso a modal: ", this.data);
    if (this.data != null) {
      this.data_vehiculo = this.data;
      if (!this.data_vehiculo.documentVehicleConsultants) {
        this.data_vehiculo.documentVehicleConsultants = [];
      }

      if (!this.data_vehiculo.photosVehicleConsultants) {
        this.data_vehiculo.photosVehicleConsultants = [];
      } else {
        this.verifyPhotos();
        this.ordenarFotos();
      }

      this.city();
    }
  }
  //*********************************************//
  verifyPhotos() {
    let interior = 0;
    let exterior = 0;
    let safety = 0;

    for (let i = 0; i < this.data_vehiculo.photosVehicleConsultants.length; i++) {
      if (this.data_vehiculo.photosVehicleConsultants[i].interior == true) {
        interior++;
      }
      if (this.data_vehiculo.photosVehicleConsultants[i].exterior == true) {
        exterior++;
      }
      if (this.data_vehiculo.photosVehicleConsultants[i].safety == true) {
        safety++;
      }
    }

    if (interior > 0) {
      this.interiorShow = true;
    }

    if (exterior > 0) {
      this.exteriorShow = true;
    }

    if (safety > 0) {
      this.safetyShow = true;
    }
  }
  public fotoInterior = [];
  public fotoExterior= [];
  public fotoSafety = [];

  // ordenar fotos
  ordenarFotos() {
    this.fotoInterior = [];
    this.fotoExterior= [];
    this.fotoSafety = [];
    this.data_vehiculo.photosVehicleConsultants.forEach(fotos => {
      if (fotos.interior == true) {
        this.fotoInterior.push(fotos);
      }
      if (fotos.exterior == true) {
        this.fotoExterior.push(fotos);
      }
      if (fotos.safety == true) {
        this.fotoSafety.push(fotos);
      }
    });
    console.log('fotos interior', this.fotoInterior);
    console.log('fotos Exterior', this.fotoExterior);
    console.log('fotos safety', this.fotoSafety);
  }
  //*********************************************//
  async catalogos() {
    this.ca_vehiculo = await this._services.getCatalogueFrom('GetVehicleType');
    this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType/3');
    console.log('ca_documentType', this.ca_documentType);
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
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
  addNewPhoto(id){
    document.getElementById('doc'+id).click();
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
                "vehicleConsultant": 0,
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
    let element_data = {}
    if(this.data != null){
    element_data = { country: this.data.country, city: this.data.city }
    }
    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: element_data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.data_vehiculo.documentVehicleConsultants.push(result);
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
    this.data_vehiculo.photosVehicleConsultants.push(this.temporalPhoto);
    console.log("Photos: ", this.data_vehiculo);
    this.verifyPhotos();
    this.ordenarFotos();
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
    this.data_vehiculo.success=true;
    if( this.data != null && this.data.id != undefined && this.data.id != null){
      if(this.temporalPhoto != undefined){
      this.temporalPhoto.vehicleConsultants =  this.data.id
      }
    }

    this.data_vehiculo.createdBy = this.user.id,
    this.data_vehiculo.createdDate = new Date();
    this.data_vehiculo.updatedBy = this.user.id,
    this.data_vehiculo.updatedDate = new Date();
    this.dialogRef.close(this.data_vehiculo);
  }
}
