import { Component, OnInit, Inject } from '@angular/core';
import { DialogAdminCenterAddInfoComponent } from '../dialog-admin-center-add-info/dialog-admin-center-add-info.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogAdminCenterEmergencyComponent } from '../dialog-admin-center-emergency/dialog-admin-center-emergency.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LoaderComponent } from 'app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-admin-center-add-city',
  templateUrl: './dialog-admin-center-add-city.component.html',
  styleUrls: ['./dialog-admin-center-add-city.component.css']
})

export class DialogAdminCenterAddCityComponent implements OnInit {

  //formCities: FormGroup;
  // cityName = new FormControl();
  options: string[] = [];
  lista_ciudades = [];
  typeResources: any[] = [];
  filteredOptions: Observable<string[]>;
  searchcity = '';
  data_: any = {
    cityAbouts: [],
    cityLivings: [],
    cityAttractions: [],
    cityEmergencies: [],
    cityWhatToDos: [],
    cityWhereEats: []
  };

  public timefilter: any = { timeZone: '' };
  public cityfilter: any = { name: '' };
  loader: LoaderComponent = new LoaderComponent();


  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog,
    private fb: FormBuilder) {
    // this.formCities = this.fb.group({
    //   cityName: ['', Validators.required]
    // });
  }

  isVioletApp: boolean = false;

  ngOnInit(): void {

    this.data_ = this.data;
    if (this.data_.fileRequest != null) {
     // this.data_.fileRequest = this._services.url_images + this.data_.fileRequest;
    }
    if (this.data_.resorucesGuideRequest != null) {
      this.data_.resorucesGuideRequest = this._services.url_images + this.data_.resorucesGuideRequest;
    }
    console.log("Data recibida", this.data_);
    if (this.data.id > 0) {
      this.searchcity = this.data.city;
      this.buscar_ciudades_pornombre();
    }

    if (this.data_.origin == "violetApp") {
      this.isVioletApp = true;
    }

    //console.log(this.data.country);
    // this.loader.showLoader();
    // this._services.service_general_get("CountryAdminCenter/GetCityByCountryName?countryName=" + this.data.country).subscribe((data => {
    //   this.loader.hideLoader();
    //   if (data.success) {
    //     data.result.forEach(element => {
    //       this.options.push(element.name);
    //     });
    //   }
    //     this.lista_ciudades = data.result;

    //   console.log(" Todas la ciudades ======================== " , this.options)
    // }));

    //this.options = this.data.cities.name;
    // setTimeout(() => {
    //   console.log(this.options);
    //   this.filteredOptions = this.cityName.valueChanges.pipe(
    //     startWith(''),
    //     map(value => value.length > 2 ? this._filter(value) : []),
    //   );
    // }, 1000);


    console.log("DATA QUE RECIBE EL MODAL: ", this.data);
    //this.cityName.setValue = this.data_.name == "" || this.data_.name == null ? "" : this.data_.name;
    if (!this.data_.cityAbouts) { this.data_.cityAbouts = []; }
    if (!this.data_.cityLivings) { this.data_.cityLivings = []; }
    if (!this.data_.cityAttractions) { this.data_.cityAttractions = []; }
    if (!this.data_.cityEmergencies) { this.data_.cityEmergencies = []; }
    if (!this.data_.cityWhatToDos) { this.data_.cityWhatToDos = []; }
    if (!this.data_.cityWhereEats) { this.data_.cityWhereEats = []; }
    this.getCatalogos();
  }

  change_city_text() {
    if (this.searchcity.length > 2) {
      this.buscar_ciudades_pornombre();
    }
  }

  public files: NgxFileDropEntry[] = [];

  isValidSize(files: any, mg: number) {

    const file = files;
    const fileSizeInBytes = file.size;
    const maxSizeInBytes = mg * 1024 * 1024; // 18 MB
    console.log("megas", file, files, mg, fileSizeInBytes, maxSizeInBytes)

    if (fileSizeInBytes > maxSizeInBytes) {
      console.log('El archivo excede el tamaño máximo permitido.');
      this.snackBar.open(`The file exceeds the maximum size allowed ${mg} mb`, "", {
        duration: 2500,
      });
      return true;
      // Aquí puedes mostrar un mensaje de error o realizar alguna acción adicional
    } else {
      console.log('El archivo cumple con el tamaño máximo permitido.');

      // Aquí puedes realizar alguna acción con el archivo válido
      return false;
    }
  }

  public dropped(files: NgxFileDropEntry[]) {

    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          if (this.isValidSize(file, 2)) {
            return
          }

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");
              this.data_.fileName = droppedFile.relativePath; // cover image name
             // this.data_.fileRequest = encoded;
              this.data_.introductionImg = droppedFile.relativePath; // cover image path

              // this.temporalDocument = {
              //   "id": 0,
              //   "idCountry": 0,
              //   "idDocumentType": this.documents.idDocumentType,
              //   "fileRequest": encoded,
              //   "fileExtencion": ext[ext.length - 1],
              //   "fileName": droppedFile.relativePath,
              //   "uploadDate": new Date(),
              //   "expirationDate": this.documents.expirationDate,
              //   "location": this.documents.location,
              //   "idStatus": this.documents.idStatus,
              //   "idPrivacy": this.documents.idPrivacy
              // }
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  deleteDocument() {
    this.data_.fileName = undefined;
    this.data_.fileRequest = "";
  }

  public droppedPdf(files: NgxFileDropEntry[]) {
   

    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          if (this.isValidSize(file, 20)) {
            return
          }

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = droppedFile.relativePath.split(".");
             // this.data_.resorucesGuide = droppedFile.relativePath;
             // this.data_.resorucesGuideRequest = encoded;
             this.data_.fileRequest = droppedFile.relativePath; // video path
             this.data_.resorucesGuide = droppedFile.relativePath; // video name

              
              // this.temporalDocument = {
              //   "id": 0,
              //   "idCountry": 0,
              //   "idDocumentType": this.documents.idDocumentType,
              //   "fileRequest": encoded,
              //   "fileExtencion": ext[ext.length - 1],
              //   "fileName": droppedFile.relativePath,
              //   "uploadDate": new Date(),
              //   "expirationDate": this.documents.expirationDate,
              //   "location": this.documents.location,
              //   "idStatus": this.documents.idStatus,
              //   "idPrivacy": this.documents.idPrivacy
              // }
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  deleteDocumentPdf() {
    this.data_.resorucesGuide = undefined;
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  buscar_ciudades_pornombre() {
    this.loader.showLoader();
    this._services.service_general_get("CountryAdminCenter/GetCityByCountryCityNames?countryName=" + this.data.country + '&cityname=' + this.searchcity).subscribe((data => {
      this.loader.hideLoader();
      if (data.success) {
        this.lista_ciudades = data.result;
        console.log(" Todas la ciudades GetCityByCountryCityNames ======================== ", this.options)
      }

    }));

  }


  //Filters
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //**************************************************************************//
  ca_timeZone = [];
  async getCatalogos() {
    this.ca_timeZone = await this._services.getCatalogueFrom('GetTimeZone');
    console.log(this.ca_timeZone);

    this._services.service_general_get("CountryAdminCenter/GetTypeResources")
      .subscribe((data => {
        console.log("Type", data);
        if (data.success) {
          this.typeResources = data.result;
        }

      }));
  }
  //**************************************************************************//
  //AGREGAR INFORMACION EMERGENCY//
  addInfoEmergency() {
    console.log("ABRE MODAL ADD INFO");
    const dialogRef = this._dialog.open(DialogAdminCenterEmergencyComponent, {
      data: { idCity: this.data_.id, ciudadName: this.data_.city },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        result.id = 0;
        result.idCity = this.data.id;
        this.data_.cityEmergencies.push(result);
      }
    })
  }

  //EDIT EMERGENCY//
  editInfoEmergency(data, i) {
    data.ciudadName = this.data_.city;
    console.log("ABRE MODAL EDIT INFO emergency");
    const dialogRef = this._dialog.open(DialogAdminCenterEmergencyComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.data_.cityEmergencies[i] = result;
      }
    })
  }
  //**************************************************************************//
  //AGREGAR INFORMACION//
  addInfo(type) {
    console.log("ABRE MODAL ADD INFO");
    const dialogRef = this._dialog.open(DialogAdminCenterAddInfoComponent, {
      data: { type: type, idCity: this.data_.id, ciudadName: this.data_.city },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        if (type == 1) {
          result.id = 0;
          result.idCity = this.data.id;
          this.data_.cityAbouts.push(result);
        }
        if (type == 2) {
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityAttractions.push(result);
        }
        if (type == 4) {
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityWhatToDos.push(result);
        }
        if (type == 5) {
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityWhereEats.push(result);
        }
        if (type == 6) {
          result.idCity = 0;
          result.idCity = this.data.id;
          this.data_.cityLivings.push(result);
        }
      }
    })
  }
  //**************************************************************************//
  //EDICION DE INFORMACION//
  editInfo(type, data, i) {
    data.type = type;
    data.ciudadName = this.data_.city;
    console.log("ABRE MODAL EDIT INFO");
    const dialogRef = this._dialog.open(DialogAdminCenterAddInfoComponent, {
      data: data,
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        if (type == 1) {
          this.data_.cityAbouts[i] = result;
        }
        if (type == 2) {
          this.data_.cityAttractions[i] = result;
        }
        if (type == 4) {
          this.data_.cityWhatToDos[i] = result;
        }
        if (type == 5) {
          this.data_.cityWhereEats[i] = result;
        }
        if (type == 6) {
          this.data_.cityLivings[i] = result;
        }
      }
    })
  }
  //**************************************************************************//
  //ELIMINAR INFORMACION//
  deleteInfo(type, i, data_) {
    console.log();
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
        if (type == 1) {
          if (data_.id == 0) {
            this.data_.cityAbouts.splice(i, 1);
          } else {
            this._services.service_general_delete("CountryAdminCenter/DeleteCityAbout?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityAbouts.splice(i, 1);
              }
            }))
          }

        }
        if (type == 2) {
          if (data_.id == 0) {
            this.data_.cityAttractions.splice(i, 1);
          } else {
            this._services.service_general_delete("CountryAdminCenter/DeleteCityAttractions?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityAttractions.splice(i, 1);
              }
            }))
          }
        }
        if (type == 3) {
          if (data_.id == 0) {
            this.data_.cityEmergencies.splice(i, 1);
          } else {
            this._services.service_general_delete("CountryAdminCenter/DeleteCityEmergency?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityEmergencies.splice(i, 1);
              }
            }))
          }
        }
        if (type == 4) {
          if (data_.id == 0) {
            this.data_.cityWhatToDos.splice(i, 1);
          } else {
            this._services.service_general_delete("CountryAdminCenter/DeleteCityWhatToDo?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityWhatToDos.splice(i, 1);
              }
            }))
          }
        }
        if (type == 5) {
          if (data_.id == 0) {
            this.data_.cityWhereEats.splice(i, 1);
          } else {
            this._services.service_general_delete("CountryAdminCenter/DeleteCityWhereEat?id=" + data_.id).subscribe((data => {
              if (data.success) {
                const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "City was deleted"
                  },
                  width: "350px"
                });
                this.data_.cityWhereEats.splice(i, 1);
              }
            }))
          }
          if (type == 6) {
            if (data_.id == 0) {
              this.data_.cityLivings.splice(i, 1);
            } else {
              this._services.service_general_delete("CountryAdminCenter/DeleteCityLiving?id=" + data_.id).subscribe((data => {
                if (data.success) {
                  const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                    data: {
                      header: "Success",
                      body: "City was deleted"
                    },
                    width: "350px"
                  });
                  this.data_.cityLivings.splice(i, 1);
                }
              }))
            }

          }
        }
      }
    })
  }
  //**************************************************************************//
  save() {
    // if(this.formCities.valid){
    this.data_.createDate = new Date();
    this.data_.success = true;
    //this.data_.city = this.cityName.value;
    console.log('save: ', this.data_);
    this.dialogRef.close(this.data_);
    // }
  }
}
