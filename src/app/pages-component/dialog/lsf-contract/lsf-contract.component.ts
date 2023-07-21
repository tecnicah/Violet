import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatSort } from '@angular/material/sort';
import { DialogPropertyExpensesComponent } from '../dialog-property-expenses/dialog-property-expenses.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-lsf-contract',
  templateUrl: './lsf-contract.component.html',
  styleUrls: ['./lsf-contract.component.css']
})
export class LsfContractComponent implements OnInit {


  loader: LoaderComponent = new LoaderComponent();
  @ViewChild('sortrole') sortrole: MatSort;
  user: any = {};
  ca_currency: any[] = [];
  
  data_contracts: any = {};
  RentCostSavings = 0;
  ca_lease_signa = [{ id: 1, value: "Assignee" }, { id: 2, value: "Client" }, { id: 3, value: "Assignee and Client" }];

  data_group_paymnets: any = { paymentHousings: [] };
  recurrence_static = [{ id: "Monthly" }, { id: "Bimonthly" }, { id: "Quarterly" }, { id: "Annually" }, { id: "Biannually" }];
  payments_due = [];
  payments_not_due = [];

  versions_lsf = [];
  edicion = false;

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////// VARIABLES 


  constructor( public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }

  ngOnInit(): void {
   this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATA RECIBIDA lsf-contract: ", this.data);
    this.edicion = this.data.edicion;
    this.catalogos();
  }

  async catalogos() {
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  
    this.fill_payments_due();
    this.GetLSFBySection(this.data.ph_id, this.data.servide_detail_id, 1, this.data.cat_category_id);

  }

  GetLSFBySection(key, servide_detail_id, section, cat_category_id) {
    this.loader.showLoader();
    this._services.service_general_get("HousingList/GetLSFBySection?key=" + key + "&servide_detail_id=" + servide_detail_id + "&section=" + section+ "&cat_category_id=" + cat_category_id).subscribe((cd => {
      this.data_contracts = cd.result.value.contractDetails[0];
      console.log('ONLY LEASE SUMARY FORMGetLSFBySection : ', cd, this.data_contracts);
      this.loader.hideLoader();
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  calc_RentCostSavings() {

    this.RentCostSavings = 0;
    let _res = 0;
    let current_p = this.data_contracts.finalRentPrice;
    let invalid_ = false;
    if ((current_p == 0) || (isNaN(current_p)) || (current_p == null) || (current_p == undefined))
      invalid_ = true
    if (((this.data_contracts.listRentPrice - current_p) < 0) || invalid_) {
      _res = 0;
    }
    else {
      _res = this.data_contracts.listRentPrice - this.data_contracts.finalRentPrice;
      _res = _res * -1;
    }
    this.RentCostSavings = _res;

  }

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
  }

  

  fill_payments_due() {

    for (var h = 0; h < 31; h++) {
      var v = h + 1;
      var ese = v.toString();
      var obj_ = { id: ese }
      var obj_n = v;
      this.payments_due[h] = obj_;
      this.payments_not_due[h] = obj_n;
    }

  }

  addExpense() {
    //////debugger;;
    console.log("entra a abrir modal property expenses para inserccion");
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: {
        id: 0
        , contractDetail: this.data_contracts.idContract
        , edicion : this.data.edicion
      },
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      ////debugger;;
      if (result.success) {
        this.data_contracts.propertyExpenses = result;
        this.sort_property_exp();
      }
    });
  }

  save_BD() {
    this.updateContractDetail();
    console.log(this.data_contracts);
  }

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
  }

  updateContractDetail() {
    //////debugger;;
    this.loader.showLoader();
    this.data_contracts.createdBy = this.user.id;
    this.data_contracts.createdDate = new Date();
    //this.data_contracts.paymentsDue = 1 ;
    console.log("DATA A GUARDAR PutContractDetail: ", this.data_contracts);
    this._services.service_general_put("HousingList/PutContractDetail", this.data_contracts).subscribe((data => {
      //////debugger;;
      if (data.success) {
        console.log(data);
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Saved Data"
          },
          width: "350px"
        });
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al guardar los contract details: ", err);
    })
  }

  //Currency//
  getCurrency(id) {
    for (let i = 0; i < this.ca_currency.length; i++) {
      if (this.ca_currency[i].id == id) {
        return this.ca_currency[i].currency;
      }
    }
  };

  editExpense(data_, i) {
    console.log("entra a abrir modal property expenses para edicion");
    data_.edicion = this.edicion;
    const dialog = this._dialog.open(DialogPropertyExpensesComponent, {
      data: data_,
      width: "95%"
    });

    dialog.beforeClosed().subscribe(result => {
      if (result.success) {
        this.data_contracts.propertyExpenses = result;
      }
      this.sort_property_exp();
    });
  };

  deleteExpense(expense) {
    //////debugger;;
    this.loader.showLoader();
    this._services.service_general_put("HousingList/DeleteExpense", expense.id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("HousingList/DeleteExpense ==============================", response_bd);
        this.data_contracts.propertyExpenses = response_bd.result.value;
        //this.dataData_land_list = new  MatTableDataSource(this.data_land_list);
        //this.dataData_land_list.sort = this.sortrole;

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
