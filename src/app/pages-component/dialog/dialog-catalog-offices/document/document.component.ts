import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../../general-message/general-message.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  ca_privacy: any = [];
  ca_statusDoc: any = [];
  today = new Date();
  temporalDocument: any = {};
  cargaDocumento: boolean = false;
  activeDocument: boolean = false;
  activePrivacy: boolean = false;
  activeStatus: boolean = false;

  data_document: any = {
    id: 0,
    idCatOffice: 0,
    documentName: "",
    image: '',
    imageExtension: '',
    filePath: '',
    idPrivacy: null,
    date: new Date(),
    status: null
  };
  constructor(public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data_: any) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("Data recibida modal add/edit document ========================", this.data_)
    this.viewOperacion()
    this.listMatOption()

  }
  async viewOperacion() {
    switch (this.data_.operacion) {
      case 'insertar':
        if (this.data_.id != 0) {
          this.data_document.idCatOffice = this.data_.id
        }
        break;
    }
    console.log('List Document: ', this.data_document);
  }
  async listMatOption() {
    this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
    this.ca_statusDoc = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.__loader__.hideLoader();
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
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
              console.log(encoded);
              let ext = droppedFile.relativePath.split(".");
              this.data_document.image = encoded
              this.data_document.imageExtension = ext[ext.length - 1],
                //    this.data_document.filePath = encoded
                console.log(this.data_document);
              this.temporalDocument = {
                "fileName": droppedFile.relativePath,
              }

              console.log(this.temporalDocument);

              if (this.temporalDocument.fileName != undefined || this.temporalDocument.fileName != null || this.temporalDocument.fileName != '') {
                this.cargaDocumento = false;

              }
            }
          })
        })
      }
      else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  save_data() {
    console.log('view from Document: ', this.data_document);

    if (this.data_.operacion == 'insertar') {
      this.insertDocument()
    }
  }
  insertDocument() {
    const validFalse = [
      this.validForm('cargaDocumento', this.data_document.image),
      this.validForm('activeDocument', this.data_document.documentName),
      this.validForm('activePrivacy', this.data_document.idPrivacy),
      this.validForm('activeStatus', this.data_document.status)
    ].every(isValid => isValid);

    if (validFalse) {
      if (this.data_.id != 0) {
        console.log(this.data_document);

        this._services.service_general_post_with_url("Catalog/AddDocumentOffice", this.data_document).subscribe(documentOffices => {
          console.log(documentOffices);
          this.viewMensajeComponente('save', 'it was inserted correctly')
          this.dialogRef.close(this.data_document);
        })
      }
      else {
        this.viewMensajeComponente('save', 'it was inserted correctly')
        this.dialogRef.close(this.data_document);
      }
    }

  }
  validForm(flagName: string, value: any): boolean {
    const isValid = !(value == undefined || value == null || value === '');
    if (!isValid) {
      this[flagName] = true;
    }
    return isValid;
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
}
