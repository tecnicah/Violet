import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


export interface service {
  id_sr: number,
  partnerID: number,
  new_sr: boolean,
  close: boolean
}

@Component({
  selector: 'app-dialog-confirm-service',
  templateUrl: './dialog-confirm-service.component.html',
  styleUrls: ['./dialog-confirm-service.component.css']
})

export class DialogConfirmServiceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef < any >,
    @Inject(MAT_DIALOG_DATA) public data: service,
    public _router: Router) {}

  ngOnInit(): void {
  
  }

  goTo(){

  }

  yes(){
    this.dialogRef.close()
    //this._router.navigateByUrl("editServiceRecord/"+this.data.id_sr);
  }
}

