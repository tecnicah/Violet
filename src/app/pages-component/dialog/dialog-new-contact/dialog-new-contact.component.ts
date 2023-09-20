import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentProfileSupplierComponent } from '../dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogCropImageComponent } from '../dialog-crop-image/dialog-crop-image.component';


@Component({
  selector: 'app-dialog-new-contact',
  templateUrl: './dialog-new-contact.component.html',
  styleUrls: ['./dialog-new-contact.component.css']
})
export class DialogNewContactComponent implements OnInit {

  public no_main_photo: boolean = false;
  ca_contactType: any[] = [];
  ca_city: any[] = [];
  ca_privacy: any[] = [];
  ca_documentType: any[] = [];
  public prefixCatalog;
  administrativeContactsServices: any = {
    "documentAdministrativeContactsServices": [],
  };
  typePrefix = {
    countriesName: ''
  }
  prefixWork: any;
  user: any;
  date: any;
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  //***********************************//
  ngOnInit() {
    console.log("data recibida: ", this.data);
    this.data = { ...this.data }
    console.log(this.data.supplier_type);

    // sacar prefix de work phone
    if (this.data.phoneNumber != '' && this.data.phoneNumber != null) {
      let search = '+';
      // obtener la posicion de +
      let posicion = this.data.phoneNumber.indexOf(search);
      // obtener el valor de prefix
      this.prefixWork = this.data.phoneNumber.substr(0, posicion);
      // obtener valor phone
      this.data.phoneNumber = this.data.phoneNumber.substr(posicion + 1);

    }

    //console.log(photo_assing);
    if (this.data.photo == undefined || this.data.photo == null || this.data.photo == '') {

      this.no_main_photo = true;

    }
    this.verificaNodos();
    this._services.service_general_get('Catalogue/GetState?country=' + this.data.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
    this.catalogos();
    this.date = new Date();
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  public previewSelectedPhoto(event: any, field_to_display: string, section: string = ''): void {

    const dialogRef = this._dialog.open(DialogCropImageComponent, {
      data: { image: "", name: "" },
      width: "70%",
      height: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result != undefined) {
        this.no_main_photo = false;
        //this._services.url_images = "";

        const field_photo: any = document.getElementById(field_to_display),
          //event_data: any = event.target.files[0],
          dependent_index: string = field_to_display.split('_')[3],
          root: any = this;

        const base64: any = result
        ////console.log(base64.split('.')[1]);
        this.administrativeContactsServices.photo = base64.split(',')[1];
        this.administrativeContactsServices.photoExtension = "png";

        setTimeout(() => field_photo.setAttribute('src', base64), 333);
      }
    });

  }


  //************************************************************//
  verificaNodos() {
    if (this.data != null) {
      this.administrativeContactsServices = this.data;
      if (!this.administrativeContactsServices.documentAdministrativeContactsServices) {
        this.administrativeContactsServices.photo = '';
        this.administrativeContactsServices.id = 0;
        this.administrativeContactsServices.documentAdministrativeContactsServices = [];
      }
    }
  }
  //************************************************************//
  async catalogos() {
    //this.ca_documentType = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/' + this.data.supplier_type).subscribe((data => {
      if (data.success) {
        this.ca_documentType = data.result;
        console.log(this.ca_documentType);
      }
    }))
    this.ca_contactType = await this._services.getCatalogueFrom('GetContactType?id=' + this.data.contact_type);
    console.log(this.ca_contactType);

    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
  }
  //*************************************************************//
  addDocument() {
    if (this.administrativeContactsServices.city == null ||
      this.administrativeContactsServices.city == undefined ||
      this.administrativeContactsServices.city == ''
    ) {

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To add documents it is necessary to fill the city"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {

      })

      return;

    }
    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: {
        country: this.administrativeContactsServices.country,
        city: this.administrativeContactsServices.city,
        supplier_type: this.data.supplier_type,
        tipo: this.data.tipo,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.activeDocumentos = false;
        this.administrativeContactsServices.documentAdministrativeContactsServices.push(result);
      }
    });
  }
  //*************************************************************//
  editPhoto() {
    document.getElementById('photoCont').click();
  }
  //*************************************************************//
  public files: NgxFileDropEntry[] = [];

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

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


              let ext = file.type.split("/");

              this.administrativeContactsServices.photo = encoded;
              this.administrativeContactsServices.photoExtension = ext[1];
              this.administrativeContactsServices.b64 = imageUrl;


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
  //*************************************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*************************************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //*************************************************************//
  nameDocument(id) {
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if (this.ca_documentType[i].id == id) {
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //************************************************************//
  namePrivacy(id) {
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if (this.ca_privacy[i].id == id) {
        return this.ca_privacy[i].privacy;
      }
    }
  }
  //************************************************************//
  nameCity(id) {
    for (let i = 0; i < this.ca_city.length; i++) {
      if (this.ca_city[i].id == id) {
        return this.ca_city[i].city;
      }
    }
  }
  //*************************************************************//
  deleteDocument(id, i) {
    console.log("Entra a eliminar documento: ", i);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the document"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id != 0) {
          this._services.service_general_delete("Profile/DocumentAdministrativeContactsService?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Document deleted"
                },
                width: "350px"
              });
              this.administrativeContactsServices.documentAdministrativeContactsServices.splice(i, 1);
              //this.ngOnInit();
            }
          }), (err) => {
            console.log("Error: ", err);
          })
        } else {
          this.administrativeContactsServices.documentAdministrativeContactsServices.splice(i, 1);
        }
      }
    })
  }

  //************************************************************//
  save() {
    this.administrativeContactsServices.success = true;
    if (this.administrativeContactsServices.phoneNumber != '' && this.prefixWork) {
      this.administrativeContactsServices.phoneNumber = `${this.prefixWork}+${this.administrativeContactsServices.phoneNumber}`
    }
    this.dialogRef.close(this.administrativeContactsServices);
  }
  cerrar() {
    this.dialogRef.close()
  }
  //*************************************************************//
  //*************************************************************//
  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  downloadPdf(base64String, fileName, ext) {
    const source = 'data:application/' + ext + ';base64,' + base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName + '.' + ext;
    link.click();
  }
  onClickDownloadPdf(b64, ext) {
    let base64String = b64;

    this.downloadPdf(base64String, "archivo", ext);
  }

  //*********************************************//
  activeContactType: boolean = false;
  activeContactName: boolean = false;
  activeTitle: boolean = false;
  activePhoneNumber: boolean = false;
  activeEmail: boolean = false;
  activeCity: boolean = false;
  activeComents: boolean = false;
  activeDocumentos: boolean = false;
  activeNumberLongitud: boolean = false;
  contador = 0;
  validForm() {

    console.log("entra a funcion");
    if (this.administrativeContactsServices.contactType == undefined || this.administrativeContactsServices.contactType == null || this.administrativeContactsServices.contactType == '') {
      this.activeContactType = true;
      this.contador++;
    }
    if (this.administrativeContactsServices.contactName == undefined || this.administrativeContactsServices.contactName == null || this.administrativeContactsServices.contactName == '') {
      this.activeContactName = true;
      this.contador++;
    }
    if (this.administrativeContactsServices.title == undefined || this.administrativeContactsServices.title == null || this.administrativeContactsServices.title == '') {
      this.activeTitle = true;
      this.contador++;
    }
    if (this.administrativeContactsServices.phoneNumber == undefined || this.administrativeContactsServices.phoneNumber == null || this.administrativeContactsServices.phoneNumber == '') {
      this.activePhoneNumber = true;
      this.contador++;
    }

    if (this.administrativeContactsServices.email == undefined || this.administrativeContactsServices.email == null || this.administrativeContactsServices.email == '') {
      this.activeEmail = true;
      this.contador++;
    }
    if (this.administrativeContactsServices.city == undefined || this.administrativeContactsServices.city == null || this.administrativeContactsServices.city == '') {
      this.activeCity = true;
      this.contador++;
    }
    if (this.administrativeContactsServices.comments == undefined || this.administrativeContactsServices.comments == null || this.administrativeContactsServices.comments == '') {
      this.activeComents = true;
    }
    if (this.administrativeContactsServices.documentAdministrativeContactsServices.length == 0) {
      //this.activeDocumentos = true;
      //this.contador++;
    }

    let aux_number = this.administrativeContactsServices.phoneNumber;
    if (aux_number != undefined) {
      let n = aux_number.toString();
      console.log(n);
      if (n.length > 20) {
        this.activeNumberLongitud = true;
        this.contador++;
      }
    }


    if (this.contador == 0) {
      this.save();
    } else {
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To save it is necessary to fill in all the requested fields"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {

      })
      this.contador = 0;
      return;
    }
  }

  validateEmail() {
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(this.administrativeContactsServices.email)) {
      this.contador = 0;
    } else {
      this.contador++;
      this.activeEmail = true;
      this.administrativeContactsServices.email = '';
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "Wrong email format"
        },
        width: "350px"
      });

      dialogRef.afterClosed().subscribe(result => {

      })
    }
  }


  validaNumericos(event) {
    console.log("valid");
    if (event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' ||
      event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
      event.key == 'Backspace') {
      return true;
    }

    return false;
  }

  FalseVar() {
    this.activePhoneNumber = false;
    this.activeNumberLongitud = false;
  }
}
