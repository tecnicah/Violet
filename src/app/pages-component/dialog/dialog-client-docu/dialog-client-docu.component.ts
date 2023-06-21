import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-client-docu',
  templateUrl: './dialog-client-docu.component.html',
  styleUrls: ['./dialog-client-docu.component.css']
})
export class DialogClientDocuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ,public _services: ServiceGeneralService) { }
  
  serviceScope = {documentcountries: null }

  ngOnInit(): void {

this.serviceScope.documentcountries = this.data;

//console.log("this.datathis.datathis.datathis.datathis.datathis.data",this.data)

  }
  public __serverPath__: string = this._services.url_images;

  public openFileOnWindow(url_in: string): void {
    const server_url: string = this.__serverPath__ + url_in;
    window.open(server_url);
  }

}