import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';


@Component({
  selector: 'app-dialog-key',
  templateUrl: './dialog-key.component.html',
  styleUrls: ['./dialog-key.component.css']
})
export class DialogKeyComponent implements OnInit {

  data_key:any = {};
  user:any;
  loader: LoaderComponent = new LoaderComponent();

  constructor(public _dialog:MatDialog,public dialogRef: MatDialogRef< any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }

  ngOnInit(): void {
    console.log("data que recibe modal key inventory: ", this.data);
    if(this.data.operacion != 'insertar'){
      this.data_key = this.data;
    }else{
      this.data_key.propertyReport = this.data.propertyReport;
      if(this.data.propertyReport == undefined){
        this.data_key.propertyReport = 0;
      }
      this.data_key.id = 0;
    }
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.catalogos();
  }

  ca_propertySection = [];
  async catalogos(){
    this.ca_propertySection = await this._services.getCatalogueFrom('GetPropertySection');
  }


  save(){

    if(this.data_key.id == 0 && ((this.data_key.propertyReport==0 || this.data_key.propertyReport==0) || (this.data_key.propertyReport==undefined || this.data_key.propertyReport==undefined))){
       this.data_key.success = true;
       this.data_key.propertyReport = 0;
       this.data_key.createdBy = this.user.id;
       this.data_key.updatedBy = this.user.id;
       this.data_key.createdDate = new Date();
       this.data_key.updatedDate = new Date();
       this.dialogRef.close(this.data_key);
    }else if(this.data_key.id != 0 && this.data_key.propertyReport!=0 && this.data_key.propertyReport!=undefined && this.data_key.propertyReport!=null){
       this.data_key.createdBy = this.user.id;
       this.data_key.updatedBy = this.user.id;
       this.data_key.createdDate = new Date();
       this.data_key.updatedDate = new Date();
      this.put_registro();
    }else if(this.data_key.id == 0 && this.data_key.propertyReport!=0 && this.data_key.propertyReport!=undefined && this.data_key.propertyReport!=null){
      this.data_key.createdBy = this.user.id;
       this.data_key.updatedBy = this.user.id;
       this.data_key.createdDate = new Date();
       this.data_key.updatedDate = new Date();
      this.post_registro();
    }
  }

  put_registro(){
    this.data_key.propertyReportNavigation = null;
    this._services.service_general_put('HousingList/PutKeyInventory',this.data_key).subscribe(r=>{
      if(r.success){
        console.log(r);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        r.result.success = true;
        this.dialogRef.close(r.result);
      }
    })
  }

  post_registro(){
    this.loader.showLoader();
    this._services.service_general_post_with_url('HousingList/PostKeyInventory',this.data_key).subscribe((r=>{
      this.loader.hideLoader();
      if(r.success){
        console.log(r);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Information saved"
          },
          width: "350px"
        });
        r.result.success = true;
        this.dialogRef.close(r.result);
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar al agregar el registro de inventariod e sección: ", err);
    });
  }
}
