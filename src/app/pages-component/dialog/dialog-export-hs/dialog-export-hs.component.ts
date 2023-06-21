import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-export-hs',
  templateUrl: './dialog-export-hs.component.html',
  styleUrls: ['./dialog-export-hs.component.css']
})
export class DialogExporthsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,  @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }

  ca_estatus = [];
  home_finding =  {statusId: 0}
  ngOnInit(): void {
    console.log("DATA RECIBIDA:" , this.data)
    
      this._services.service_general_get("HousingSpecification/GetHousingSpecification/" + this.data.sr).subscribe((res => {
        console.log("roles cargados en el pop up = ===============================", res);
        if (res.success) {
          res.result.value.forEach(element => {
            if(this.data.housing_specs_id != element.id){
              this.ca_estatus.push(element);
            }
          });
         
        }
      }));
  }

  yes(){
    this.data_return.success = true;
    this.data_return.hs = this.home_finding.statusId;
    this.dialogRef.close(this.data_return);
  }

  data_return = {
    success: false,
    hs: {}
  }

  no(){
    this.data_return.success = false;
    this.dialogRef.close(this.data_return);
    
  }

}
