import { Component, OnInit, Inject } from '@angular/core';
import { DialogInvoiceEditComponent } from '../edit-service-records/invoice-edit-so.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogSupplierpartnerinvoiceComponent } from '../dialog-supplierpartnerinvoice/dialog-supplierpartnerinvoice.component';

@Component({
  selector: 'app-dialog-request-invoice',
  templateUrl: './dialog-request-invoice.component.html',
  styleUrls: ['./dialog-request-invoice.component.css']
})
export class DialogRequestInvoiceComponent implements OnInit {

  data_: any = {};

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) {}

  //****************************************************************************//
  ngOnInit(): void {
    console.log("data que recibe modal request invoice select: ", this.data);
    this.getCatalogos();
  }
  //****************************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_type = [];
  async getCatalogos(){
    this.ca_type = await this._services.getCatalogueFrom('GetInvoiceType');
  }
  //****************************************************************************//
  //FUNCION PARA CIERRE DE MODAL//
  public hideModal(): void {
    this.dialogRef.close(true);
  }
  //****************************************************************************//
  //FUNCION PARA ABRIR MODAL DETERMINADO POR CADA UNO DE LOS VALORES SELECT//
  save() {
    console.log(this.data_);
    if (this.data_.type == 1) {
       const dialogRef = this._dialog.open(DialogInvoiceEditComponent, {
         data: { sr_id: this.data.sr_id, type: this.data_.type }, width: "90%"
       });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(result)
        if(result){
          this.hideModal();
        }
      });
    } else {
      const dialogRef = this._dialog.open(DialogSupplierpartnerinvoiceComponent, {
        data: { sr_id: this.data.sr_id, type: this.data_.type }, width: "90%"
      });
     
      dialogRef.afterClosed().subscribe(result => {
         console.log(result)
         if(result){
           this.hideModal();
         }
     });
    }
  }

}
