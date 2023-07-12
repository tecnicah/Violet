import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogAdminCenterAddCityComponent } from '../dialog-admin-center-add-city/dialog-admin-center-add-city.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAdminCenterDocumentsUploadComponent } from '../dialog-admin-center-documents-upload/dialog-admin-center-documents-upload.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAddLeaderComponent } from './../dialog-add-leader/dialog-add-leader.component';

@Component({
  selector: 'app-dialog-admin-center-countries',
  templateUrl: './dialog-admin-center-countries.component.html',
  styleUrls: ['./dialog-admin-center-countries.component.css']
})
export class DialogAdminCenterCountriesComponent implements OnInit {

  // filtros
  public filterCountry: any = { name: '' };
  active_country: boolean = false;
  catalogoCountry: any[] = [];
  ddlCountry; any;

  user: any;
  data_: any = {
    "name": "",
    "description": "",
    "idCurrency": 0,
    "idLenguage": 0,
    "sortname": "",
    "phonecode": "",
    "flag": "",
    catCities: [],
    countryDocuments: [],
    countryLeaders: []
  }

  authoDate = new Date();
  document = [];
  countryLeaders: any[] = [];
  loader: LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  //******************************************************//
  ngOnInit(): void {
    console.log("Data que recibe modal: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));

    this.getCatalogos();

    this._services.service_general_get('Catalogue/Generic/Countries').subscribe(r => {
      if (r.success) {
        this.catalogoCountry = r.result;
        //console.log("Catalogue/Generic/Countries =========================",r.result);
        this._services.service_general_get('CountryAdminCenter/GetCountry').subscribe(rCountry => {

          // console.log("CountryAdminCenter/GetCountry =============================== ", rCountry.result.value);
          rCountry.result.value.forEach(name => {
            this.catalogoCountry.forEach((country, index) => {
              //console.log("name.country.toLowerCase() ", name.country.toLowerCase(), '==', country.name.toLowerCase());
              if (name.country?.toLowerCase() == country.name?.toLowerCase()) {
                this.catalogoCountry.splice(index, 1);
              }
            });
          });
        });
      }
    })


    if (this.data.id != 0) {
      this.loader.showLoader();
      this._services.service_general_get('CountryAdminCenter/GetCountryById?id=' + this.data.id).subscribe((data_c => {
        console.log("CountryAdminCenter/GetCountryById?id ============================ ", data_c);
        if (data_c.success) {
          console.log("CountryAdminCenter/GetCountryById?id ============================ ", data_c.result.value[0]);
          this.data_ = data_c.result.value[0];
          this.ddlCountry = this.data_.name;
          // for (let i = 0; i < this.data_.catCities.length; i++) {
          //   this.data_.catCities[i].createDate = this.data_.cities[i].createDate;
          //   this.data_.catCities[i].resource_guide = this.data_.cities[i].resource_guide;
          // }
          console.log("Data Cities", this.data_);
          this.loader.hideLoader();
          this.getCatalogos();
        }
      }), (error) => {
        this.loader.hideLoader();
        console.error('error con el delete', error);
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Warning",
            body: `Error to load`
          },
          width: "350px"
        });

      });

    }
  }
  //******************************************************//
  ca_currency = [];
  ca_language = [];
  caDocumentType = [];
  caCountry = [];
  caStatus = [];
  ca_timeZone = [];
  async getCatalogos() {
    this.ca_timeZone = await this._services.getCatalogueFrom('GetTimeZone');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    this.ca_language = await this._services.getCatalogueFrom('GetLanguages');
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType/25');
    this.caCountry = await this._services.getCatalogueFrom('GetPrivacy');
    this.caStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
    console.log("El get si jala", this.ca_currency);
    this.loader.hideLoader();
  }
  //******************************************************//

  // countryname(){
  //   console.log(this.ddlCountry)
  //   for (let i = 0; i < this.catalogoCountry.length; i++) {
  //     const element = this.catalogoCountry[i];
  //     if(this.data_.idCountry == element.id){
  //        this.data_.name = element.name;
  //     }
  //   }
  //   console.log(this.data_.name);
  // }

  addCity() {
    let dataC: any = {};
    dataC.id = 0;
    dataC.origin = this.data.origin;
    dataC.country = this.ddlCountry;

    console.log("ABRE MODAL ADD CITY", dataC);
    const dialogRef = this._dialog.open(DialogAdminCenterAddCityComponent, {
      // data: {
      //   id: this.data.id
      //   },
      data: dataC,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Este es el result de add city: ", result);
      if (result.success) {
        // result.id = this.data.id;
        result.idCountry = this.data.id;
        result.createdDate = new Date();
        this.data_.catCities.push(result)
      }
    })
  }
  //******************************************************//
  editRegistro(data_, i) {
    data_.origin = this.data.origin;
    data_.country = this.ddlCountry;
    console.log("ABRE MODAL ADD CITY PARA EDICIONMMMMM", data_);
    const dialogRef = this._dialog.open(DialogAdminCenterAddCityComponent, {
      data: data_,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Este es el result de add city: ", result);
      if (result.success) {
        this.data_.catCities[i] = result;
      }
    })
  }
  //******************************************************//
  deleteLeader(idLeader) {
    // let countryLeader = this.data_.countryLeaders;
    console.log('borrar', idLeader);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this country leader?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        for (let i = 0; i < this.data_.countryLeaders.length; i++) {
          const element = this.data_.countryLeaders[i];
          if (element.leader == idLeader) {
            this.data_.countryLeaders.splice(i, 1);
            break;
          }
          console.log('countryleader', this.data_.countryLeaders);
        }
        this._services.service_general_put("CountryAdminCenter/UpdateCountry", this.data_).subscribe((data) => {
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted country leader`
              },
              width: "350px"
            });
            this.getCatalogos();
          }
        }, (error) => {
          console.error('error con el delete', error);
          const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The country leader is in use `
            },
            width: "350px"
          });
          this.getCatalogos();
        })

      }
    });

  }
  addLeader() {
    console.log("ABRE MODAL LEADER PARA DOCUMENTO");
    const dialogRef = this._dialog.open(DialogAddLeaderComponent, {
      data: {
        id: 0
      },
      width: "45%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        result.country = this.data_.id;
        console.log("Este es el result de leader: ", result);
        this.data_.countryLeaders.push(result);
        // this.data_.countryLeaders = this.countryLeaders;
      }
    })
  }
  valid_idCurrency: boolean = false;
  valid_idLenguage: boolean = false;
  valid_country: boolean = false;




  isValidar() {

    if (this.ddlCountry == undefined || this.ddlCountry == null || this.ddlCountry == 0) {
      this.valid_country = true;
    } else {
      this.valid_country = false;
    }

    if (this.data_.idCurrency == undefined || this.data_.idCurrency == null || this.data_.idCurrency == 0) {
      this.valid_idCurrency = true;
    } else {
      this.valid_idCurrency = false;
    }

    if (this.data_.idLenguage == undefined || this.data_.idLenguage == null || this.data_.idLenguage == 0) {
      this.valid_idLenguage = true;
    }
    else {
      this.valid_idLenguage = false;
    }


    if (this.valid_idCurrency == true || this.valid_idLenguage == true || this.valid_country == true) {
      return true;
    } else {
      return false;
    }

  }
  save() {
    if (this.isValidar()) {
      return
    }

    this.loader.showLoader();
    //console.log(this.filterCountry);
    //console.log(this.ddlCountry.name);
    this.data_.name = this.ddlCountry;
    this.data_.id = this.data.id;
    this.data_.createdBy = this.user.id;
    this.data_.createdDate = new Date();
    this.data_.updateBy = this.user.id;
    this.data_.updatedDate = new Date();
    this.data_.countryDocuments = this.document;
    // if (this.data_.leader != undefined) {
    // this.data_.countryLeaders = this.data_.countryLeaders;
    // }
    //console.log("Esta es la informacion a guardar: ", this.data_);

    console.log("Esta es la informacion a guardar (STRINGIFY): ", JSON.stringify(this.data_));
    debugger;
    console.log(this.data_);
    if (this.data_.id == 0) {
      this._services.service_general_post_with_url("CountryAdminCenter/AddCountry", this.data_).subscribe(data => {
        if (data.success) {
          console.log(data);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Saved Data"
            },
            width: "350px"
          });
          this.loader.hideLoader();
          this.dialogRef.close();
        }
      },
        (error) => {
          console.log(error.error.message);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: error.error.message
            },
            width: "350px"
          });
          this.loader.hideLoader();
          this.dialogRef.close();
        });

    } else {
      this._services.service_general_put("CountryAdminCenter/UpdateCountry", this.data_).subscribe((data => {
        if (data.success) {
          console.log(data);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Saved Data"
            },
            width: "350px"
          });
          this.loader.hideLoader();
          this.dialogRef.close();
        }
      }))
    }
  }
  //******************************************************//
  addDocument() {
    console.log("ABRE MODAL DOCUMENT PARA DOCUMENTO");
    const dialogRef = this._dialog.open(DialogAdminCenterDocumentsUploadComponent, {
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Este es el result de leader: ", result);
      if (result.success) {
        result.idCountry = this.data_.id;
        this.document.push(result);
      }
    })
  }
  //******************************************************//
  //FUNCIONES PARA CONSULTA DE NOMBRES//
  getName(id) {
    for (let i = 0; i < this.caDocumentType.length; i++) {
      if (this.caDocumentType[i].id == id) {
        return this.caDocumentType[i].documentType;
      }
    }
  }

  getStatus(id) {
    for (let i = 0; i < this.caStatus.length; i++) {
      if (this.caStatus[i].id == id) {
        return this.caStatus[i].status;
      }
    }
  }

  getPrivacy(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].privacy;
      }
    }
  }

  getTimeZone(id) {
    for (let i = 0; i < this.ca_timeZone.length; i++) {
      if (this.ca_timeZone[i].id == id) {
        return this.ca_timeZone[i].timeZone;
      }
    }
  }
  //******************************************************//
  //FUNCIONES PARA ELIMINAR//
  deleteTemporal(i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.document.splice(i, 1);
      }
    })
  }
  //FUNCION PARA ELIMINAR DE BASE DE DATOS DOCUMENT COUNTRY//
  deleteDocumentCountry(data) {
    console.log(data);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete("CountryAdminCenter/DeleteCountryDocument?id=" + data.id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: 'Document deleted successfull'
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    })
  }
  //DELETE CITY//
  deleteCity(i, item) {
    console.log(item);
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
        if (item.id == 0) {
          this.data_.catCities.splice(i, 1);
        } else {
          this._services.service_general_delete("CountryAdminCenter/DeleteCity?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "City was deleted"
                },
                width: "350px"
              });
              this.ngOnInit();
            }
          }))
        }
      }
    }, (error) => {
      console.error('error con el delete', error);
      const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: `The city is in use.`
        },
        width: "350px"
      });
      this.ngOnInit();
    })
  }

  public __serverPath__: string = this._services.url_images;

  public openRepairsFileOnWindow(url_in: string): void {
    debugger;
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }
}
