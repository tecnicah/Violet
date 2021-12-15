import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public userData: any;
  public training_data:any = {};

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.data);
  }
  //*********************************************//
  
  save(){
  this.training_data.id = 0;
  this.training_data.createdBy = this.userData.id;
  this.training_data.createdDate = new Date();
  this.training_data.updatedBy = this.userData.id;
  this.training_data.updatedDate = new Date();
  console.log(this.training_data);
    this._services.service_general_post_with_url('Training/AddGroup',this.training_data).subscribe(response => {
      if(response.success){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Group Added"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
    }) 
  }
}
