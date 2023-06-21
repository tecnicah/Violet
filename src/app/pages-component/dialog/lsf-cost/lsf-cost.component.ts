import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogCostSavingsComponent } from '../dialog-cost-savings/dialog-cost-savings.component';

@Component({
  selector: 'app-lsf-cost',
  templateUrl: './lsf-cost.component.html',
  styleUrls: ['./lsf-cost.component.css']
})
export class LsfCostComponent implements OnInit {

  loader: LoaderComponent = new LoaderComponent();
  ca_security = [];
  ca_initial = [];
  ca_ongoing = [];
  ca_realtor_com 
  user: any = {};
  ca_currency =  [];
  @ViewChild('sortrole') sortrole: MatSort;
  edicion = false; 
  data_group_saving;
  costSavingHomes;
  data_contracts: any = {};

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
    this.ca_security = await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetSecurityDeposit');
    this.ca_initial = await this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetInitialRentPayment');
    this.ca_ongoing = await this.ca_security; //await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetOngoingRentPayment');
    this.ca_realtor_com = await this.ca_security;//await this._services.getCatalogueFrom('GetResponsablePayment');//= await this._services.getCatalogueFrom('GetRealtorCommission'); 


  this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 2, this.data.cat_category_id);

}

GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
  this.loader.showLoader();
  this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section+ "&cat_category_id=" + cat_category_id).subscribe((cd => {
    this.loader.hideLoader();
    console.log('Cost savings  FORMGetLSFBySection : ', cd);
    this.data_group_saving = cd.result.value.groupCostSavings[0];
    this.costSavingHomes = this.data_group_saving.costSavingHomes;
   
   
  }), (err) => {
    this.loader.hideLoader();
    console.log("error al guardar los contract details: ", err);
  })
};

addCostSavings() {
  console.log("entra a abrir modal cost saving");
  this.data.operacion = 'insertar';
  this.data.groupCostSavingId = this.data_group_saving.id;
  //this.data.id_service_detail = this.data;
  const dialog = this._dialog.open(DialogCostSavingsComponent, {
    data: this.data,
    width: "95%"
  });

  dialog.beforeClosed().subscribe(result => {
    if (result.success) {
      console.log(result);
      // result.id = 0;
      //result.housingList = 0;
      result.createdBy = this.user.id;
      result.createdDate = new Date();
      this.costSavingHomes.push(result);
      console.log(this.costSavingHomes);
    }
    this.sort_property_exp();
  });
}

editCostSavings(data, i) {
  console.log("entra a abrir modal cost saving");
  this.data.operacion = 'edicion';
  this.data.i = i;
  this.data.element = data;
  const dialog = this._dialog.open(DialogCostSavingsComponent, {
    data: this.data,
    width: "95%"
  });

  dialog.beforeClosed().subscribe(result => {
    if (result.success) {
      result.updateBy = this.user.id;
      result.updatedDate = new Date();
      console.log(result);
      this.costSavingHomes[i] = result;
    }
    this.sort_property_exp()
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

sort_property_exp() {
  // ////debugger;;
  if (this.data_contracts.propertyExpenses) {
    this.data_contracts.propertyExpenses.sort(function (a, b) {
      if (a.included > b.included) {
        return -1;
      }
      if (a.included < b.included) {
        return 1;
      }
      // a must be equal to b
      return 0;
    });
  }
};

  //Currency//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  };


  deleteCostSavings(cost) {
    //////debugger;;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/deleteCostSavings", cost.id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("HousingList/DeletePaymnetType ==============================", response_bd);
        this.costSavingHomes = response_bd.result.value;

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

}
