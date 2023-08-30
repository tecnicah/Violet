import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAddDocumentsDetailComponent } from '../dialog-add-documents-detail/dialog-add-documents-detail.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';


@Component({
  selector: 'app-dialog-documnets-service-detail',
  templateUrl: './dialog-documnets-service-detail.component.html',
  styleUrls: ['./dialog-documnets-service-detail.component.css']
})
export class DialogDocumnetsServiceDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
    , public _services: ServiceGeneralService
    , public _dialog: MatDialog) { }

  serviceScope = { documentcountries: null }

  loader: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {

    this.serviceScope.documentcountries = this.data.documentsServiceDetails;
    console.log('service Documments : ' , this.serviceScope.documentcountries);

  }
  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  addDocument() {
   // this.data.typeDocument = 1;
    // this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogAddDocumentsDetailComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("respuesta de agregar el docuemnto en POP UP ==================================: ", result)
      if (result.success) {
        this.serviceScope.documentcountries = result.result;
      }
    });
  }

  delete_document(item) {

    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Confirmation",
        body: "Are you sure to delete the document?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.call_delete_service(item.id)
      }
      else
      {
       // alert('false');
      }
    });
  }


  call_delete_service(id_document) {
    this.loader.showLoader();
    this._services.service_general_post_with_url("ServiceRecord/DeleteDocumentsServiceDetail", id_document).subscribe((_respuesta => {
      this.loader.hideLoader();
      console.log("_respuesta.documentsServiceDetails ===============================", _respuesta)
      this.serviceScope.documentcountries = _respuesta.result;

      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Document has been deleted"
        },
        width: "350px"
      });


    }), (err) => {
      this.loader.hideLoader();
      console.log("Error en SendPropertys: ", err);
    })
  }

}
