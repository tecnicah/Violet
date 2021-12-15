import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-add-client',
  templateUrl: './dialog-add-client.component.html',
  styleUrls: ['./dialog-add-client.component.css']
})
export class DialogAddClientComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddClientComponent>,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }

  caCliente: any[] = [];
  data: any = {};
  filterC: any = {name: ""};

  ngOnInit(): void {
    this._services.service_general_get_noapi('GetClientPartnerProfileCatalog').subscribe(r =>{
      if(r.success){
        this.caCliente = r.result.value;
      }
    })
  }

  save(){
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

}
