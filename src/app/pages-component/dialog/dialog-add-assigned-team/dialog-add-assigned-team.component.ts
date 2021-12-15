import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-assigned-team',
  templateUrl: './dialog-add-assigned-team.component.html',
  styleUrls: ['./dialog-add-assigned-team.component.css']
})
export class DialogAddAssignedTeamComponent implements OnInit {

  data:any = {}
  ca_assignedTeam = [];
    
  constructor(public _services : ServiceGeneralService, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data_: any) { }

  ngOnInit(): void {
    this._services.service_general_get('Profile/GetAssignedTeam').subscribe((data => {
      if(data.success){
         this.ca_assignedTeam = data.result.value;
      }
    }))
  }
  //******************************************************************//
  save_office(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
