import { Component, OnInit, Inject } from '@angular/core';
import { DialogAdminCenterAddInfoComponent } from '../dialog-admin-center-add-info/dialog-admin-center-add-info.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogAdminCenterEmergencyComponent } from '../dialog-admin-center-emergency/dialog-admin-center-emergency.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
@Component({
  selector: 'app-dialog-admin-center-add-city',
  templateUrl: './dialog-admin-center-add-city.component.html',
  styleUrls: ['./dialog-admin-center-add-city.component.css']
})
export class DialogAdminCenterAddCityComponent implements OnInit {

  data_:any = {
    cityAbouts : [],
    cityAttractions: [],
    cityEmergencies: [],
    cityWhatToDos: [],
    cityWhereEats:[]
  };

  public timefilter: any = { timeZone: '' };

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

   ngOnInit(): void {
     console.log("DATA QUE RECIBE EL MODAL: ", this.data);
     this.data_ = this.data;
     if(!this.data_.cityAbouts){ this.data_.cityAbouts = []; }
     if(!this.data_.cityAttractions){ this.data_.cityAttractions = []; }
     if(!this.data_.cityEmergencies){ this.data_.cityEmergencies = []; }
     if(!this.data_.cityWhatToDos){ this.data_.cityWhatToDos = []; }
     if(!this.data_.cityWhereEats){ this.data_.cityWhereEats = []; }
     this.getCatalogos();
   }
   //**************************************************************************//
   ca_timeZone = [];
   async getCatalogos(){
     this.ca_timeZone = await this._services.getCatalogueFrom('GetTimeZone');
     console.log(this.ca_timeZone);
   }
  //**************************************************************************//
  //AGREGAR INFORMACION EMERGENCY//
  addInfoEmergency(){
    console.log("ABRE MODAL ADD INFO");
    const dialogRef = this._dialog.open(DialogAdminCenterEmergencyComponent, {
      data: {idCity:this.data_.id, ciudadName : this.data_.city},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
       if(result.success){
           result.id = 0;
           result.idCity = this.data.id;
           this.data_.cityEmergencies.push(result);
       }
    })
  }

  //EDIT EMERGENCY//
  editInfoEmergency(data, i){
    data.ciudadName = this.data_.city;
    console.log("ABRE MODAL EDIT INFO emergency");
    const dialogRef = this._dialog.open(DialogAdminCenterEmergencyComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
       if(result.success){
          this.data_.cityEmergencies[i] = result;
       }
    })
  }
  //**************************************************************************//
  //AGREGAR INFORMACION//
  addInfo(type){
    console.log("ABRE MODAL ADD INFO");
    const dialogRef = this._dialog.open(DialogAdminCenterAddInfoComponent, {
      data: {type: type, idCity:this.data_.id, ciudadName: this.data_.city},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
       if(result.success){
         if(type == 1){
           result.id = 0;
           result.idCity = this.data.id;
           this.data_.cityAbouts.push(result);
         }
         if(type == 2){
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityAttractions.push(result);
         }
         if(type == 4){
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityWhatToDos.push(result);
         }
         if(type == 5){
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityWhereEats.push(result);
         }
       }
    })
  }
  //**************************************************************************//
  //EDICION DE INFORMACION//
  editInfo(type, data, i){
    data.type = type;
    data.ciudadName = this.data_.city;
    console.log("ABRE MODAL EDIT INFO");
    const dialogRef = this._dialog.open(DialogAdminCenterAddInfoComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
       if(result.success){
         if(type == 1){
             this.data_.cityAbouts[i] = result;
         }
         if(type == 2){
          this.data_.cityAttractions[i] = result;
         }
         if(type == 4){
          this.data_.cityWhatToDos[i] = result;
         }
         if(type == 5){
          this.data_.cityWhereEats[i] = result;
         }
       }
    })
  }
  //**************************************************************************//
  //ELIMINAR INFORMACION//
  deleteInfo(type, i, data_){
    console.log();
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this city?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if(type == 1){
          if(data_.id == 0){
            this.data_.cityAbouts.splice(i,1);
          }else{
            this._services.service_general_delete("CountryAdminCenter/DeleteCityAbout?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityAbouts.splice(i,1);
              }
            }))
          }

        }
        if(type == 2){
          if(data_.id == 0){
           this.data_.cityAttractions.splice(i,1);
          }else{
            this._services.service_general_delete("CountryAdminCenter/DeleteCityAttractions?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityAttractions.splice(i,1);
              }
            }))
          }
        }
        if(type == 3){
          if(data_.id == 0){
           this.data_.cityEmergencies.splice(i,1);
          }else{
            this._services.service_general_delete("CountryAdminCenter/DeleteCityEmergency?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityEmergencies.splice(i,1);
              }
            }))
          }
        }
        if(type == 4){
          if(data_.id == 0){
            this.data_.cityWhatToDos.splice(i,1);
          }else{
            this._services.service_general_delete("CountryAdminCenter/DeleteCityWhatToDo?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityWhatToDos.splice(i,1);
              }
            }))
          }
        }
        if(type == 5){
          if(data_.id == 0){
            this.data_.cityWhereEats.splice(i,1);
          }else{
            this._services.service_general_delete("CountryAdminCenter/DeleteCityWhereEat?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityWhereEats.splice(i,1);
              }
            }))
          }
        }
      }
    })
  }
  //**************************************************************************//
  save(){
    this.data_.createDate = new Date();
    this.data_.success = true;
    console.log('save: ', this.data_);
    this.dialogRef.close(this.data_);
  }
}
