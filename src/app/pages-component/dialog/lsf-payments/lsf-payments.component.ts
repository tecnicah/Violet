import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogPaymentTypeComponent } from '../dialog-payment-type/dialog-payment-type.component';

@Component({
  selector: 'app-lsf-payments',
  templateUrl: './lsf-payments.component.html',
  styleUrls: ['./lsf-payments.component.css']
})
export class LsfPaymentsComponent implements OnInit {

  loader: LoaderComponent = new LoaderComponent();
  paymentHousings = [];
  ca_payment_Type = [];
  ca_responsible = [];
  user: any = {};
  ca_currency =  [];
  @ViewChild('sortrole') sortrole: MatSort;
  data_group_paymnets;
  payment_rocess = { "securityDepositId": null, "initialRentPaymentId": null, "ongoingRentPaymentId": null, "realtorCommissionId": null }
  edicion = false;

//////////////////////////////////////////////

constructor( public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("data recibida por payments: ", this.data);
    if(this.data.edicion)
    {
      this.edicion = true;
    }

    this.catalogos();
  }

  async catalogos() {
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    //Paymentsa 
    this.ca_payment_Type = await this._services.getCatalogueFrom('GetPaymentTypeStatus'); //= await this._services.getCatalogueFrom('GetPaymentType');
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');

    this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 3, this.data.cat_category_id);

  }

  GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
    this.loader.showLoader();
    this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section+ "&cat_category_id=" + cat_category_id).subscribe((cd => {
      this.data_group_paymnets = cd.result.value.groupPaymnetsHousings[0];
      this.paymentHousings = this.data_group_paymnets.paymentHousings;
      console.log('Paymnets  FORMGetLSFBySection : ', cd,this.data_group_paymnets, this.paymentHousings);
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  //Payment//
  getPayment(id) {
    debugger;
    for (let i = 0; i < this.ca_payment_Type.length; i++) {
      if (this.ca_payment_Type[i].id == id) {
        return this.ca_payment_Type[i].type;
      }
    }
  }


  //Responsable//
  getResponsable(id) {
    for (let i = 0; i < this.ca_responsible.length; i++) {
      if (this.ca_responsible[i].id == id) {
        return this.ca_responsible[i].responsable;
      }
    }
  }

  editPaymentType(element, i) {
    ////////debugger;;
    console.log("entra a abrir modal payment type");
    this.data.operacion = 'edicion';
    this.data.payment_rocess = this.payment_rocess;
    this.data.i = i;
    this.data.element = element;
    const dialog = this._dialog.open(DialogPaymentTypeComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento guardado de payment: ", result);
      if (result.success) {
        result.updateBy = this.user.id;
        result.updatedDate = new Date();
        console.log(result);
        this.paymentHousings[i] = result;
      }
    });
  }


  deletePayment(payment) {
    //////debugger;;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/DeletePaymnetType", payment.id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("HousingList/DeletePaymnetType ==============================", response_bd);
        this.paymentHousings = response_bd.result.value;

        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Deleted Data"
          },
          width: "350px"
        });

      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  };

  sortTable(table, columna) {
    ////////debugger;;
    var table, rows, switching, i, x, y, shouldSwitch, x_html, y_html;
    table = document.getElementById(table);
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[columna];
        y = rows[i + 1].getElementsByTagName("TD")[columna];
        // Check if the two rows should switch place:
        x_html = x.innerHTML.toLowerCase();
        y_html = y.innerHTML.toLowerCase();

        if (x_html.indexOf("$") >= 0) {
          ////////debugger;;
          x_html = x_html.substring(1, x_html.length - 1).replace(/,/g, "");;
          y_html = y_html.substring(1, y_html.length - 1).replace(/,/g, "");;
          //!isNaN(val)
          x_html = Number(x_html);
          y_html = Number(y_html);
        }

        if (x_html > y_html) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  };

  addPaymentType() {
    
    this.data.operacion = 'insertar';
    this.data.payment_rocess = this.data.payment_rocess;
    this.data.groupPaymentsHousingId = this.data_group_paymnets.id;
    const dialog = this._dialog.open(DialogPaymentTypeComponent, {
      data: this.data,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      console.log("elemento recibido de  pop up payment: ", result);
      if (result.success) {
        console.log(result);
        result.createdBy = this.user.id;
        result.createdDate = new Date();
        this.paymentHousings.push(result);
        console.log(this.paymentHousings);
      }
    });
  };

   //Currency//
   getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  };

}
