import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';



@Component({
  selector: 'app-dialog-property-expenses',
  templateUrl: './dialog-property-expenses.component.html',
  styleUrls: ['./dialog-property-expenses.component.css']
})
export class DialogPropertyExpensesComponent implements OnInit {

  user:any;
  data:any = {};
  loader: LoaderComponent = new LoaderComponent();

  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef < any >,  @Inject(MAT_DIALOG_DATA) public data_: any, public _dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.data_ != null && this.data_ != undefined){
       this.data = this.data_;
    }
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("expenseeeee data recibida desde contract ========================", this.data)

    this.catalogos();
  }
  //****************************************************************************//
  ca_recurrence= [];
  ca_currency = [];
  async catalogos(){
    let duration = await this._services.getCatalogueFrom('GetDuration');
    this.ca_recurrence = duration.filter(function(E){
      if(E.recurrence != null){
         return true;
      }
    });
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }
   //****************************************************************************//
  
   save(){
    this.data.success = true;
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.data.updateBy = this.user.id;
    this.data.updatedDate = new Date();
debugger;
    if(this.data.id == 0){  // inserta en la base de datos y regresa la lista nueva de expenses
      this.addExpense();
    }
    else // al editar solo regresa el mismo objeto editado
    {
      this.editExpense();
      //console.log(this.data);
      //this.dialogRef.close(this.data);
    }
   
    
  }

   addExpense(){
    debugger;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/AddExpense", this.data).subscribe((response_bd => {
     this.loader.hideLoader();
      if (response_bd.success) {
        debugger;
        console.log("HousingList/AddExpense ==============================",response_bd);
        let respuesta = response_bd.result.value;
        respuesta.success = true;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });

        this.dialogRef.close(respuesta);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al agregar expense: ", err);
    });
  }

  editExpense(){
    debugger;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/EditExpense", this.data).subscribe((response_bd => {
     this.loader.hideLoader();
      if (response_bd.success) {
        debugger;
        console.log("HousingList/EditExpense ==============================",response_bd);
        let respuesta = response_bd.result.value;
        respuesta.success = true;
  
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Edited Expnese"
          },
          width: "350px"
        });
  
        this.dialogRef.close(respuesta);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }

}
