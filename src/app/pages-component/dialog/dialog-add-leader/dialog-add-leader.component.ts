import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-add-leader',
  templateUrl: './dialog-add-leader.component.html',
  styleUrls: ['./dialog-add-leader.component.css']
})
export class DialogAddLeaderComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddLeaderComponent>) { }

  leader: any = {};
  data_leader: any[] = [];
  active_leader: boolean = false;
  public filterLeader: any = { user: '' };
  GetServiceLine: any[] = [];
  serviceLine: number = 0;

  ngOnInit(): void {
    console.log('data que recibe modal', this.data);
    this.catalogos();
    // this._services.service_general_get('Profile/GetDirectory').subscribe((data => {
    //   if (data.success) {
    //     console.log(data.result.value);
    //     this.data_leader = data.result.value;
    //     this.__loader__.hideLoader();
    //   }
    //   }));
  }

  async catalogos(){
    this.GetServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
  }
  getService() {
    let dataLeader;
    this.data_leader = [];
    this._services.service_general_get(`Profile/GetDirectory`).subscribe(r=>{
      if (r.success) {
        dataLeader = r.result.value;
        console.log(dataLeader);
        for (let i = 0; i < dataLeader.length; i++) {
          const element = dataLeader[i];
          if (element.servce_line == this.serviceLine || element.servce_line == 3) {
            this.data_leader.push(element);
          }
        }
        console.log('leader', this.data_leader);
        // this.data_leader= r.result.value;
      }
    })

  }
  validForm() {
    if(this.data.id == undefined){
      this.active_leader = true;
    }
    if((this.data.id != undefined || this.data.id != '' )){
      this.save();
    }
  }
  nameLeader(id) {
    for(let i = 0; i < this.data_leader.length; i++){
      if(this.data_leader[i].user_id == id){
        return this.data_leader[i].user;
      }
    }
  }
  profileLeader(id) {
    for (let i = 0; i < this.data_leader.length; i++) {
      if (this.data_leader[i].user_id == id) {
        return this.data_leader[i].role;
      }
    }
  }
  save() {
    this.leader = {
      "country": 0,
      "leader": this.data.id,
      "profile": this.profileLeader(this.data.id),
      "name": this.nameLeader(this.data.id),
      success: true
    }
    this.dialogRef.close(this.leader);


  }
}
