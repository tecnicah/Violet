import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-comment-history',
  templateUrl: './dialog-comment-history.component.html',
  styleUrls: ['./dialog-comment-history.component.css']
})
export class DialogCommentHistoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("Este es el DATA DE LOS COMENTARIOS A ITERAR: ", this.data);
  }

}
