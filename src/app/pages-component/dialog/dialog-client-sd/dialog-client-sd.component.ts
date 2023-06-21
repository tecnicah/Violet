import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-client-sd',
  templateUrl: './dialog-client-sd.component.html',
  styleUrls: ['./dialog-client-sd.component.css']
})
export class DialogClientSdComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  serviceScope = {scopeDescription: null }

  ngOnInit(): void {

this.serviceScope.scopeDescription = this.data;

//console.log("this.datathis.datathis.datathis.datathis.datathis.data",this.data)

  }

}