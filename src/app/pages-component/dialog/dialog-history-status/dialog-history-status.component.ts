import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-history-status',
  templateUrl: './dialog-history-status.component.html',
  styleUrls: ['./dialog-history-status.component.css']
})
export class DialogHistoryStatusComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

    caStatus: any[] =[];
    history: any[] =[];

  ngOnInit(): void {
    console.log(this.data);
     this.catalogos();
    this._services.service_general_get('HousingList/GetAllStatusHistory?key='+this.data.id).subscribe(r=>{
      if (r.success) {
        this.history = r.result;
        console.log(this.history);
      }
    })
  }

  async catalogos(){
    this.caStatus = await this._services.getCatalogueFrom('GetStatusHousing');
  }
  
  statusName(id){
    for (let i = 0; i < this.caStatus.length; i++) {
      const element = this.caStatus[i];
      if(element.id == id){
        return element.status;
      }
      
    }
  }

}
