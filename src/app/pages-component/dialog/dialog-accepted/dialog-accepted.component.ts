import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'environments/environment';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderComponent } from 'app/shared/loader';
import { Item } from 'pdfmake-wrapper';

@Component({
  selector: 'app-dialog-accepted',
  templateUrl: './dialog-accepted.component.html',
  styleUrls: ['./dialog-accepted.component.css']
})
export class DialogAcceptedComponent implements OnInit {

  _serviceLine: number = 0;
  services: any = {
    service_name: '',
    numberWorkOrder: '',
    number_server: '' 
  };

  services_consult: any = {
    country: '',
    service: this.services = []
  };

  standAlone: any[] = [];
  bundle: any[] = [];
  coordinator: any = [];
  url_image: any;
  userData: any;

  constructor(public dialogRef: MatDialogRef<DialogAcceptedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    public _services: ServiceGeneralService,
    private _snackBar: MatSnackBar) { }
    public __loader__: LoaderComponent = new LoaderComponent();
    
  ngOnInit(): void {
    console.log(this.data);
    this.url_image = environment.images_path;
    this.userData = JSON.parse(localStorage.getItem('userData'));

    //servicios supplier
    if(this.data.tipo == 3){
      debugger
        if(this.data.datos.supplierImm?.length > 0)
          this._serviceLine = 1;
        if(this.data.datos.supplierRelo?.length > 0)
          this._serviceLine = 2;
        this.services_consult = [];

        this.data.datos.supplierImm.forEach(element => {
          element.bundled.forEach(item => {
            this.services_consult.push(item);  
          });
        });

        this.data.datos.supplierImm.forEach(element => {
          element.standalone.forEach(item => {
            this.services_consult.push(item);
          });
        });

        this.data.datos.supplierRelo.forEach(element => {
          element.bundled.forEach(item => {
            this.services_consult.push(item);
          });
        });

        this.data.datos.supplierRelo.forEach(element => {
          element.standalone.forEach(item => {
            this.services_consult.push(item);
          });
        });


       console.log(this.services_consult);

      this.services_consult.forEach(element => {
        console.log("element", element);
        if(element.serviceType == "standalone"){
          this.standAlone.push(element);
        }
        if(element.serviceType == "bundled"){
          this.bundle.push(element);
        }
      });

    }
   
    console.log("standAlone",this.standAlone);
    console.log("bundle",this.bundle);
  }

  accept_coorninator(respuesta: boolean) {
    //console.log(this.data.datos.serviceline);
    console.log(this.data);
    this.__loader__.showLoader()
debugger;
    if(this.data.tipo == 2){
      if(this._serviceLine == 1){
        //Servide line 1 - Imm
        this._services.service_general_put('ServiceRecord/AcceptImmigrationCoordinator/' + this.userData.id + '/' + respuesta + '?sr=' + this.data.serviceRecordId, '').subscribe((_data_ => {
          if (_data_.success && respuesta) {
            this._snackBar.open('Service Record accepted', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
          if (_data_.success && !respuesta) {
            this._snackBar.open('Service Record rejected', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
        }));
      }
      else{
        this._services.service_general_put('ServiceRecord/AcceptRelocationCoordinator/' + this.userData.id + '/' + respuesta+ '?sr=' + this.data.serviceRecordId, '').subscribe((_data_ => {
          if (_data_.success && respuesta) {
            this._snackBar.open('Service Record accepted', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
          if (_data_.success && !respuesta) {
            this._snackBar.open('Service Record rejected', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
        }));
      }
    }
    else
    {
      //Servide line 2 - Relo
      if(this._serviceLine == 1){
        this._services.service_general_put('ServiceRecord/AcceptImmigrationSupplierPartner/' + this.userData.id + '/' + respuesta + '?sr='+this.data.datos.id, '').subscribe((_data_ => {
          if (_data_.success && respuesta) {
            this._snackBar.open('Service Record accepted', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
          if (_data_.success && !respuesta) {
            this._snackBar.open('Service Record rejected', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
        }));
      }
      else{
        this._services.service_general_put('ServiceRecord/AcceptRelocationSupplierPartner/' + this.userData.id + '/' + respuesta+ '?sr='+this.data.datos.id, '').subscribe((_data_ => {
          if (_data_.success && respuesta) {
            this._snackBar.open('Service Record accepted', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
          if (_data_.success && !respuesta) {
            this._snackBar.open('Service Record rejected', 'Close', {
              duration: 6000,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ['my-snack-bar']
            });
            this.__loader__.hideLoader()
          }
          
        }));
      }
    }
  }

  accept_coorninatorIndividual(respuesta: boolean, workOrderServiceId: number, index: number, type: string)
  {
    debugger;
    console.log(workOrderServiceId);
    this.__loader__.showLoader();
    // this.standAlone = [];
    // this.bundle = [];
    if(respuesta){
      if(type == 'standalone'){
        this.standAlone[index].status = "Active";
      }
      else
      {
        this.bundle[index].status = "Active";
      }
    }
    else
    {
      if(type == 'standalone'){
        this.standAlone[index].status = "Cancelled";
      }
      else
      {
        this.bundle[index].status = "Cancelled";
      }      
    }
     
    // this.services_consult = [];
    if(this._serviceLine == 1){
      this._services.service_general_put('ServiceRecord/AccpetImmigrationSupplierPartnerIndividual/' + this.userData.id + '/' + respuesta+ '/'+ workOrderServiceId + '?sr='+this.data.datos.id, '').subscribe((_data_ => {
        if (_data_.success && respuesta) {
          //this.ngOnInit();
          this._snackBar.open('Service Record accepted', 'Close', {
            duration: 6000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['my-snack-bar']
          });
          this.__loader__.hideLoader();
        }
        if (_data_.success && !respuesta) {
          //this.ngOnInit();
          this._snackBar.open('Service Record rejected', 'Close', {
            duration: 6000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['my-snack-bar']
          });
          this.__loader__.hideLoader();
        }
        this.__loader__.hideLoader();
      }));
    }
    else{
      this._services.service_general_put('ServiceRecord/AccpetRelocationSupplierPartnerIndividual/' + this.userData.id + '/' + respuesta+ '/'+ workOrderServiceId + '?sr='+this.data.datos.id, '').subscribe((_data_ => {
        if (_data_.success && respuesta) {
          //this.ngOnInit();
          this._snackBar.open('Service Record accepted', 'Close', {
            duration: 6000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['my-snack-bar']
          });
          this.__loader__.hideLoader();
        }
        if (_data_.success && !respuesta) {
          //this.ngOnInit();
          this._snackBar.open('Service Record rejected', 'Close', {
            duration: 6000,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ['my-snack-bar']
          });
          this.__loader__.hideLoader();
        }
        this.__loader__.hideLoader();
      }));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
