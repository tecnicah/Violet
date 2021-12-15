import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
    selector: 'add-call-dialog',
    templateUrl: './addCall.component.html',
    styleUrls: []
})
export class DialogAddCall implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogAddCall>,
        public _services: ServiceGeneralService,
        public _routerParams: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _dialog: MatDialog
    ) {}

    ngOnInit() {

        this.getCatalogues();
        this.call_model = this.data;
        console.log("call_model: ", this.call_model);
        this.filterServices();

    }

    public duration_catalogue:any = [];
    public serviceline_catalogue:any = [];
    public userto_catalogue:any = [];
    public async getCatalogues(): Promise<void> {

        this.duration_catalogue = await this._services.getCatalogueFrom('GetDuration');
        this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
        this.userto_catalogue = await this._services.getCatalogueFrom('GetUserTo');

    }

    public calle = [];
    FilterUser(){
      console.log("Entra a filtrar informacion");
      let aux_data = [];
      for(let i = 0; i < this.userto_catalogue.value.length; i++){
          if(this.userto_catalogue.value[i].id != this.call_model.caller){
           aux_data.push(this.userto_catalogue.value[i]);
          }
      }
      this.calle = aux_data;
    }

    public assistance = [];
    FilterAssistance(){
      console.log("Entra a filtrar informacion");
      let aux_data = [];
      for(let i = 0; i < this.calle.length; i++){
          if(this.calle[i].id != this.call_model.calle){
           aux_data.push(this.calle[i]);
          }
      }
      this.assistance = aux_data;
    }

    public show_errors_form:boolean = false;
    public call_model:CallModel = new CallModel();
    public sendNewCall():void {

        this.show_errors_form = true;
        this.call_model.serviceRecordId = this.data.id_so;

        this.call_model.callAssistants = [];
        let data = this.userto_catalogue.value;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < this.call_model.assistance.length; j++) {
            if (data[i].id == this.call_model.assistance[j]) {
             this.call_model.callAssistants.push({
              "callId": this.call_model.id,
              "assistant": data[i].id
            });
          }
        }
    }


        debugger
        if( this.validatingFullForm() ) {

            this._services.service_general_post_with_url('Call/CreateCall', this.call_model)
                .subscribe( (response:any) => {

                    if( response.success ) {

                        this.hideModal();
                        this.showGeneralMessageDialog('Call created','Call has been created successfully');

                    }

                }, (error:any) => {

                    console.error('[CP57] (Call/CreateCall) => ', error);

                });

        }

    }

    public validatingFullForm():boolean {

        let result:boolean = true;

        if( this.call_model.caller == '' ) result = false;
        if( this.call_model.calle == '' ) result = false;
        if( this.call_model.date == '' ) result = false;
        if( this.call_model.time == '' ) result = false;
        if( this.call_model.duration == '' ) result = false;
        if( this.call_model.serviceLineId == '' ) result = false;
        if( this.call_model.serviceId == '' ) result = false;
        if( this.call_model.workOrderId == '' ) result = false; 

        return result;

    }

    public services_catalogue:any = [];
    public workorders_catalogue:any = [];
    public now_can_see_services:boolean = false;
    public async getServiceLine( line_id:string ):Promise<any> {

        this.now_can_see_services = true;

        const params:string = `?service_record_Id=${ this.data.id_so }&service_line_id=${ line_id }`;

        //this.services_catalogue = await this._services.getCatalogueFrom('GetServiceBySOId', params);
        this.workorders_catalogue = await this._services.getCatalogueFrom('GetworkOrderBySR', params);

    }

    public now_can_see_services_wo = false;
    async filterServices(){
        this.services_catalogue = await this._services.getCatalogueFrom('GetServiceByWorkOrder?wo='+this.call_model.workOrderId );
        this.now_can_see_services_wo = true;
    }

    public hideModal(): void {

        this.dialogRef.close();

    }

    public showGeneralMessageDialog(title: string = "No title", body: string = "No content"): void {

        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: title,
            body: body
          }
        });
    
        dialogRef.afterClosed().subscribe(result => {
    
        });
    
    }

}

class CallModel {
    id:number = 0;
    serviceRecordId:number = 0;
    caller:string = '';
    calle:string = '';
    date:string = '';
    time:string = '';
    duration:string = '';
    welcomeCall:boolean = false;
    escalate:boolean = false;
    serviceId:string = '';
    serviceLineId:string = '';
    comments:string = '';
    workOrderId:string = '';
    assistance = [];
    callAssistants = [];
}
