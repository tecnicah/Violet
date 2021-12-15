import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBasePruebaComponent } from '../dialog/dialog-base-prueba/dialog-base-prueba.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
    selector: 'teams-component',
    templateUrl: './teams.component.html',
    styleUrls: ['./teams.component.scss']
})

export class TeamsComponent {

  animal: string;
  name: string;
  object_test: string = 'class_1';

  constructor(public dialog: MatDialog) { }

  move_object(): void {
    this.object_test = "class_2";
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBasePruebaComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
