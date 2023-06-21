import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-attendees-inspec',
  templateUrl: './dialog-attendees-inspec.component.html',
  styleUrls: ['./dialog-attendees-inspec.component.css']
})
export class DialogAttendeesInspecComponent implements OnInit {

  data_key:any = {};
  user:any;
  loader:LoaderComponent=new LoaderComponent();

  constructor(public _dialog:MatDialog,public dialogRef: MatDialogRef< any > , @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }

  ngOnInit(): void {
    console.log("DATA QUE RECIBE MODAL DE ATTENDEES: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    if(this.data.operacion != 'insertar'){
      this.data_key = this.data.data;
    }else{
      this.data_key.inspection = this.data.inspection;
      this.data_key.id = 0;
    }
    this.catalogos();
  }

  ca_applicant = [];
  ca_relation = [];
  attendees_list_all =  [];

  async catalogos(){
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this._services.service_general_get('ServiceRecord/GetApplicant/'+Number(this.data.sr)).subscribe(r=>{
      if(r.success){
        console.log(r);
        this.ca_applicant = r.applicant.value;
      }
    })

      this.get_attendees_list_all();
    
  }

  get_attendees_list_all(){
   // debugger;
    this.loader.showLoader();
    let req_ = { 
      idservicedetail: this.data.idServiceDetail,
      propertyid: this.data.housingListId,
      srid : this.data.sr, 
    }
    console.log("Req GetAttendeesTitles: " , req_)
    this._services.service_general_post_with_url('HousingList/GetAttendeesTitles', req_).subscribe(r=>{
      this.loader.hideLoader();
      if(r.success){
       // debugger;
        console.log("HousingList/GetAttendeesTitles", r);
        this.attendees_list_all = r.result.value;
        // const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        //   data: {
        //     header: "Success",
        //     body: "Information saved"
        //   },
        //   width: "350px"
        // });

      }
    })
  }

  set_attendiees_vales(){

    let i_ = this.data_key.att;
    var att_ = this.attendees_list_all.filter(function (E) { if (E.id_Catalog == i_) { return true; } });
    if(att_.length > 0)
    {
      this.data_key.name = att_[0].name;
      this.data_key.email = att_[0].email;
    }
    
  }


  get_attendiees_vales(att){

    let i_ = att;

    let d_ = {name: "", email: "" }
    var att_ = this.attendees_list_all.filter(function (E) { if (E.id_Catalog == i_) { return true; } });
    if(att_.length > 0)
    {
      d_.name = att_[0].name;
      d_.email = att_[0].email;
    }

    return d_

  }


  save(){
    debugger;

    

    if(this.data_key.id == 0 && (this.data_key.inspection==undefined || this.data_key.inspection==null || this.data_key.inspection==0)){
       this.data_key.success = true;
       this.data_key.createdBy = this.user.id;
       this.data_key.updatedBy = this.user.id;
       this.data_key.createdDate = new Date();
       this.data_key.updatedDate = new Date();
       this.dialogRef.close(this.data_key);
    }else if(this.data_key.id != 0 && this.data_key.inspection!=0 && this.data_key.inspection!=undefined && this.data_key.inspection!=null){
       this.data_key.createdBy = this.user.id;
       this.data_key.updatedBy = this.user.id;
       this.data_key.createdDate = new Date();
       this.data_key.updatedDate = new Date();
       this.put_registro();
    }else if(this.data_key.id == 0 && this.data_key.inspection!=0 && this.data_key.inspection!=undefined && this.data_key.inspection!=null){
       this.data_key.createdBy = this.user.id;
       this.data_key.updatedBy = this.user.id;
       this.data_key.createdDate = new Date();
       this.data_key.updatedDate = new Date();
       this.post_registro();
    }
  }

  put_registro(){
    this.loader.showLoader();
    this.data_key.inspectionNavigation = null;
    this._services.service_general_put('HousingList/PutAttendeeInspec',this.data_key).subscribe(r=>{
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
        this.loader.hideLoader();
        this.dialogRef.close(r.result);
      }
    })
  }

  post_registro(){
    this.loader.showLoader();
    this._services.service_general_post_with_url('HousingList/PostAttendeeInspecs',this.data_key).subscribe(r=>{
      debugger;
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
        this.loader.hideLoader();
        this.dialogRef.close(r.result);
      }
    })
  }
}
