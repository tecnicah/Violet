import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog,public _dialogRef: MatDialogRef<AddContentComponent>, public _routerParams: ActivatedRoute) { }
  //***********************************************//
  ngOnInit(): void {
    this.getCatalogos();
  }
  //***********************************************//
  public content_type = [];
  public data_type:any = {};
  async getCatalogos(){
    this.content_type = await this._services.getCatalogueFrom('GetContentType');
  }
  //***********************************************//
  save(){
    this.data_type.success = true;
    this._dialogRef.close(this.data_type);
  }
}
