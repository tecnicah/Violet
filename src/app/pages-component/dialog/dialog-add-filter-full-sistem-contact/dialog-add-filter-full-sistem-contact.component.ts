import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-add-filter-full-sistem-contact',
  templateUrl: './dialog-add-filter-full-sistem-contact.component.html',
  styleUrls: ['./dialog-add-filter-full-sistem-contact.component.css']
})
export class DialogAddFilterFullSistemContactComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  dataFilters: any[] = []; // trae los filtros
  valueFilter: any[] = []; // valor del filtro (select)
  filTitle;
  filCountry;
  filCity;
  filCompany;
  filOffice;
  filReportType;
  editFilter: any[] = [];
  eventos: any = {};

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddFilterFullSistemContactComponent>) { }

  ngOnInit(): void {
    console.log('data que recibe dialog-filter', this.data);
    // this.getFilter();
    this.getCatalogs();
    if (this.data.filter != undefined) {
      if (this.data.filter.length > 0) {
        console.log('este reporte tiene filtros');
        for (let i = 0; i < this.data.filter.length; i++) {
          const element = this.data.filter[i];
          this.editFilter.push({
            id: element.filter1,
            name: element.filter1Navigation.name,
            value: element.value,
            check: true
          });
        }

      }
    }
    console.log('filtros de data', this.editFilter);
    this.getFilter();
  }

  caTitle: any[] = [];
  caCountry: any[] = [];
  caCity: any[] = [];
  caCompany: any[] = [];
  caOffice: any[] = [];
  caReportType: any[] = [];
  getCatalogs() {
    this._services.service_general_get('Catalogue/GetTitle').subscribe(r => {
      // console.log('respuesta title', r.result);
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const value = r.result[i];
          this.caTitle.push(value)
        }
        // this.caTitle = r.result;
      }
    });
    this._services.service_general_get('Catalogue/GetCountry').subscribe(r => {
      // console.log('respuesta country', r.result);
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const value = r.result[i];
          this.caCountry.push(value)
        }
      }
      // this.caCountry = r.result;
    });
    this._services.service_general_get('Catalogue/GetCity').subscribe(r => {
      // console.log('respuesta city', r.result);
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const value = r.result[i];
          this.caCity.push(value)
        }
        // this.caCity = r.result;
      }
    });
    this._services.service_general_get('Catalogue/GetCompany').subscribe(r => {
      // console.log('respuesta company', r.result.value);
      if (r.success) {
        for (let i = 0; i < r.result.value.length; i++) {
          const value = r.result.value[i];
          this.caCompany.push(value)
        }
        // this.caCompany = r.result;
      }
    });
    this._services.service_general_get('Catalogue/GetOffice').subscribe(r => {
      // console.log('respuesta office', r.result);
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const value = r.result[i];
          this.caOffice.push(value)
        }
        // this.caOffice = r.result;
      }
    });
    this._services.service_general_get('Catalogue/GetReportType').subscribe(r => {
      // console.log('respuesta report type', r.result);
      if (r.success) {
        for (let i = 0; i < r.result.length; i++) {
          const value = r.result[i];
          this.caReportType.push(value)
        }
        // this.caReportType = r.result;
      }
    });
  }
  getFilter() {
    this._services.service_general_get('Catalogue/GetFilterReport/2').subscribe(r => {
      console.log('getfilter', r);
      if (r.success) {
        r.result.forEach(element => {
          element.check = false;
        });
        this.dataFilters = r.result;
        // for (let d = 0; d < this.dataFilters.length; d++) {
          for (let e = 0; e < this.editFilter.length; e++) {
            if (this.editFilter[e].id  === 1) {
              this.filTitle = this.editFilter[e].value;
              this.dataFilters[0].check = true;
              this.eventos.title = true;
            }
            if (this.editFilter[e].id  === 2) {
              this.filCountry = this.editFilter[e].value;
              this.dataFilters[1].check = true;
              this.eventos.country = true;
            }
            if ( this.editFilter[e].id  === 3) {
              this.filCity = this.editFilter[e].value;
              this.dataFilters[2].check = true;
              this.eventos.city = true;
            }
            if (this.editFilter[e].id === 4) {
              this.filCompany = this.editFilter[e].value;
              this.dataFilters[3].check = true;
              this.eventos.company = true;
            }
            if (this.editFilter[e].id === 5) {
              this.filOffice = this.editFilter[e].value;
              this.dataFilters[4].check = true;
              this.eventos.office = true;
            }
            if (this.editFilter[e].id === 6) {
              this.filReportType = this.editFilter[e].value;
              this.dataFilters[5].check = true;
              this.eventos.report = true;
            }

          }
        // }
      }
    })
    // this.valueRespFilter();

  }
  //check, false --event
  //data -> name, id, check
  //i -> posicion array
  changeStatus(e, data, i) {
    if(data.id == 1){
      this.eventos.title = e.checked;
    }
    if(data.id == 2){
      this.eventos.country = e.checked;
      // console.log('valor de select', this.filCountry);
    }
    if(data.id == 3){
      this.eventos.city = e.checked;
    }
    if(data.id == 4){
      this.eventos.company = e.checked;
    }
    if(data.id == 5){
      this.eventos.office = e.checked;
    }
    if(data.id == 6){
      this.eventos.report = e.checked;
    }
  }

  save() {
    // primero se debe enviar el id del reporte
    // console.log(this.eventos, 'eventos');
    let dataSave = [];
    if (this.eventos) {
      // if title
      if (this.eventos.title == true) {
        let title = { filter1: 1 , value:  this.filTitle };
        dataSave.push(title);
      }
      // ifcountry
      if (this.eventos.country == true) {
        let country = { filter1: 2  , value:  this.filCountry };
        dataSave.push(country);
      }
      // city
      if (this.eventos.city == true) {
        let city = { filter1: 3 , value:  this.filCity };
        dataSave.push(city);
      }
      // company
      if (this.eventos.company == true) {
        let company = { filter1: 4 , value:  this.filCompany };
        dataSave.push(company);
      }
      // office
      if (this.eventos.office == true) {
        let office = { filter1: 5, value:  this.filOffice };
        dataSave.push(office);
      }
      // report
      if (this.eventos.report == true) {
        let report = { filter1: 5, value:  this.filReportType };
        dataSave.push(report);
      }
      // console.log('resultado de push ', dataSave);
    }
    let userData = JSON.parse(localStorage.getItem('userData'));
    let back = [];
    for (let i = 0; i < dataSave.length; i++) {
      const value = dataSave[i];
      back.push({
        "id": 0,
        "report": this.data.report,
        "filter1": value.filter1,
        "value": value.value,
        "firstDate": new Date(),
        "secondDate": new Date(),
        "createdBy": userData.id,
        "createdDate": new Date(),
        "updatedBy": userData.id,
        "updatedDate": new Date()
      });
    }
    this._services.service_general_post_with_url(`Report/EditFilters/${this.data.report}`, back).subscribe(r => {
      console.log('respuesta de creacion de filtros', r);
      this.dialogRef.close(r);
    });
  }
// /api/Report/EditFilters/{report}
  // "id": 0,
  //     "report": 0,
  //     "filter1": 0,
  //     "value": 0,
  //     "createdBy": 0,
  //     "createdDate": "2021-01-19T22:33:50.027Z",
  //     "updatedBy": 0,
  //     "updatedDate": "20-01-19T22:33:50.027Z"
  //   }

}
