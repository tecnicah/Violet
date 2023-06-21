import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogAddCommentrDetailComponent  } from '../dialog-add-commentr-detail/dialog-add-commentr-detail.component';

@Component({
  selector: 'app-dialog-comments-service-detail',
  templateUrl: './dialog-comments-service-detail.component.html',
  styleUrls: ['./dialog-comments-service-detail.component.css']
})
export class DialogCommentsServiceDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
    , public _services: ServiceGeneralService
    , public _dialog: MatDialog) { }

  _comments = { commentServiceDetails: null }

  user: any = {avatar: null};

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._comments = this.data;
    console.log("Info recibida por el pop up de Comentarios =========", this.data)

  }
  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

  addDocument() {
   // this.data.typeDocument = 1;
    // this.data.location = this.data.data.location;
    const dialogRef = this._dialog.open(DialogAddCommentrDetailComponent, {
      width: "95%",
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("respuesta de agregar el docuemnto en POP UP ==================================: ", result)
      if (result.success) {
        this._comments.commentServiceDetails = result.result; 
      }
    });
  }

}