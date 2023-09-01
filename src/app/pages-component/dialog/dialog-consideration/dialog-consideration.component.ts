import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-consideration',
  templateUrl: './dialog-consideration.component.html',
  styleUrls: ['./dialog-consideration.component.css']
})
export class DialogConsiderationComponent implements OnInit {

  data:any={};
  user:any;
  ca_currency = [];
  loader: LoaderComponent = new LoaderComponent();

  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>, public _dialog:MatDialog,  @Inject(MAT_DIALOG_DATA) public data_: any) { }
  //****************************************************************************//
  ngOnInit(): void {


    console.log("Data recibida modal add/edit Special C ========================",this.data_)
    this.user = JSON.parse(localStorage.getItem('userData'));
    
    if(this.data_.operacion == 'edicion'){
      this.data = this.data_.element;

    }else if(this.data_.operacion == 'insertar'){
      this.data = {};
      this.data.lsfGroupSpecialConsiderationsId = this.data_.lsfGroupSpecialConsiderationsId;

    }
    
  }



  //****************************************************************************//
  save_data() {
    debugger;
    if (this.data_.operacion == 'insertar') {
      this.insert_DB();
    }

    if (this.data_.operacion == 'edicion') {
      this.update_DB();
    }

  }


  //****************************************************************************//
  //INSERCCION DE REGISTRO//
  insert_DB() {
    this.loader.showLoader();

    console.log("DATA A GUARDAR EN ADD CONSIDERATION: ", this.data);
    this._services.service_general_post_with_url("HousingList/AddConsiderarion", this.data).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
       
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
        //debugger;
        //console.log(data);
        //console.log(data);
        this.dialogRef.close(data);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("Error al actualizar: ", err);
    })
  }
  //****************************************************************************//
  //ACTUALIZACION DE REGISTRO//
  update_DB() {
    this.loader.showLoader();

    console.log("DATA A GUARDAR EN EDIT CONSIDERATIONS: ", this.data);
    this._services.service_general_put("HousingList/EditConsideration", this.data).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update Data"
          },
          width: "350px"
        });
        this.dialogRef.close(this.data);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("Error al actualizar: ", err);
    })
  }


}
