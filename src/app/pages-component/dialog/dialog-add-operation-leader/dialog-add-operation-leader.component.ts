import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-operation-leader',
  templateUrl: './dialog-add-operation-leader.component.html',
  styleUrls: ['./dialog-add-operation-leader.component.css']
})
export class DialogAddOperationLeaderComponent implements OnInit {

  data:any = {}
  ca_assignedTeam = [];
  public filterLeader: any = { user: '' };


  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data_: any) { }

  ngOnInit(): void {
    /*
    this._services.service_general_get('Profile/GetAssignedTeam').subscribe((data => {
      if(data.success){
         this.ca_assignedTeam = data.result.value;
         console.log(this.ca_assignedTeam);
      }
    }))
    */
    this._services.service_general_get('Profile/GetDirectory').subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.ca_assignedTeam = data.result.value;
      }
      }));
  }
  //******************************************************************//
  save_office(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
