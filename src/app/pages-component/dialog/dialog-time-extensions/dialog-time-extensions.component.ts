import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-time-extensions',
  templateUrl: './dialog-time-extensions.component.html',
  styleUrls: ['./dialog-time-extensions.component.css']
})
export class DialogTimeExtensionsComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();


  extensionsRentalFurniture: any = {};
  isInitialDateMayor: boolean = false;
  Dateinitial: boolean = false
  Datefinal: boolean = false
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("DATA RECIBIDA:", this.data)
    this.extensionsRentalFurniture = this.data.param == '' ? {
      id: 0,
      initialDate: null,
      finalDate: null,
      comment:'',
    } : this.data.param
    console.log(this.extensionsRentalFurniture);

  }
  calculateDifference1() {

    const { initialDate, finalDate } = this.extensionsRentalFurniture;
    console.log(initialDate, finalDate);
    if (this.extensionsRentalFurniture.initialDate != null) {
      this.Dateinitial = false
    }
    if (this.extensionsRentalFurniture.finalDate != null) {
      this.Datefinal = false
    }
    if (initialDate && finalDate) {
      const initialDateObj = new Date(initialDate);
      const finalDateObj = new Date(finalDate);

      if (initialDateObj <= finalDateObj) {
        const timeDiffMilliseconds = (finalDateObj.getTime() - initialDateObj.getTime());
        this.extensionsRentalFurniture.totalDays = Math.floor(timeDiffMilliseconds / (1000 * 60 * 60 * 24));
        this.isInitialDateMayor = false;
        console.log(this.extensionsRentalFurniture.totalDays);
      } else {
        this.isInitialDateMayor = true;
      this.Datefinal = false
        console.log('The start date cannot be less than the end date');
        this.extensionsRentalFurniture.totalDays;
      }
    } else {
      this.extensionsRentalFurniture.totalDays = 0;
      this.isInitialDateMayor = false;
    }
  }
  saveExtensions() {
    if (this.extensionsRentalFurniture.initialDate == null) {
      this.Dateinitial = true
    }
    if (this.extensionsRentalFurniture.finalDate == null) {
      this.Datefinal = true
    }
    if (this.isInitialDateMayor) {

    } else {
      this.__loader__.showLoader()
      if (this.extensionsRentalFurniture.id > 0) {
        console.log('puedes actualizar');
        this.updateExtensionFornitura();
      } else {
        console.log('puede crea');
        this.saveExtensionsFornitura();
      }

    }
  }
  updateExtensionFornitura() {
    console.log('this.paymentRentalFurniture', this.extensionsRentalFurniture);
     const urlSavePaymentRentalFurniture = 'RelocationServices/PutStayExtensionRentalFurniture';
    this._services.service_general_put(urlSavePaymentRentalFurniture, this.extensionsRentalFurniture).subscribe((responseUpdateExtensionsRentalFurniture) => {
      console.log('responseUpdateExtensionsRentalFurniture', responseUpdateExtensionsRentalFurniture);
      if(responseUpdateExtensionsRentalFurniture.success){
        this.viewMensajeComponente('Time Extensions','Updated successfully')
        this.__loader__.hideLoader
        this.closeModal(responseUpdateExtensionsRentalFurniture);
      }
    })
  }
  saveExtensionsFornitura() {
    const newData = {
      id: this.extensionsRentalFurniture.id,
      rentalFurnitureCoordinationId: this.data.idRentalFurniture,
      initialDate: this.extensionsRentalFurniture.initialDate,
      finalDate: this.extensionsRentalFurniture.finalDate,
      totalDays: this.extensionsRentalFurniture.totalDays,
      comment: this.extensionsRentalFurniture.comment,
    }
    console.log('this.paymentRentalFurniture', newData);
    const urlSavePaymentRentalFurniture = 'RelocationServices/PostStayExtensionRentalFurniture';
    this._services.service_general_post_with_url(urlSavePaymentRentalFurniture, newData).subscribe((responseSaveExtensionRentalFurniture) => {
      console.log('responseSaveExtensionRentalFurniture', responseSaveExtensionRentalFurniture);
      if(responseSaveExtensionRentalFurniture.success){
        this.viewMensajeComponente('Time Extensions','Saved successfully')
        this.__loader__.hideLoader
        this.closeModal(responseSaveExtensionRentalFurniture);
      }
    })
  }
  viewMensajeComponente(header: string, msg: string) {
    window.scrollTo(0, 0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: header,
        body: msg
      },
      width: "350px"
    });
  }
  closeModal(data) {
    this.dialogRef.close(data)
  }
}
