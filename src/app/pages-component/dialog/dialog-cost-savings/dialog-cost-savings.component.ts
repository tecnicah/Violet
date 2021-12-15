import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';


@Component({
  selector: 'app-dialog-cost-savings',
  templateUrl: './dialog-cost-savings.component.html',
  styleUrls: ['./dialog-cost-savings.component.css']
})
export class DialogCostSavingsComponent implements OnInit {

  data: any = {};
  user: any;
  ca_currency: any;

  constructor(public dialogRef: MatDialogRef < any > , @Inject(MAT_DIALOG_DATA) public data_: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  //********************************************************//
  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("data que recibe el modal: ", this.data_);
    if(this.data_.operacion == 'edicion'){
       this.data = this.data_.costSavingHomes[this.data_.i];
    }else if(this.data_.operacion == 'insertar'){
      this.data = {};
    }
    this.data.housingList = this.data_.id;
    //}
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }
  //********************************************************//
  save_data() {
    if (this.data_.operacion == 'insertar' && this.data_.id) {
      this.insert_DB();
    }

    if (this.data_.operacion == 'edicion' && this.data_.id) {
      this.update_DB();
    }

    if (this.data_.id == 0) {
      this.agregar_objeto();
    }

  }
  //********************************************************//
  //INSERCCION DE REGISTRO//
  insert_DB() {
    this.data.createBy = this.user.id;
    this.data.createDate = new Date();
    this.data.success = true;
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date();
    this.data.id = 0;
    console.log("DATA A GUARDAR DE COST SAVINGS: ", this.data);
    this._services.service_general_post_with_url("HousingList/PostCostSavingHome", this.data).subscribe((data => {
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
        this.dialogRef.close(this.data);
      }
    }), (err) => {
      console.log("Error al actualizar: ", err);
    })
  }
  //********************************************************//
  //ACTUALIZACION DE REGISTRO//
  update_DB() {
    this.data.success = true;
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date();
    console.log("DATA A GUARDAR DE COST SAVINGS: ", this.data);
    this._services.service_general_put("HousingList/PutSavingHomeHome", this.data).subscribe((data => {
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
      console.log("Error al actualizar: ", err);
    })
  }
  //********************************************************//
  //AGREGA A OBJETO//
  agregar_objeto() {
    this.data.success = true;
    this.dialogRef.close(this.data);
  }
}
