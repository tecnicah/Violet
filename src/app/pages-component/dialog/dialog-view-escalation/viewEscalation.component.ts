import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogEscalationLevels } from '../escalation-levels/escalationLevel.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
    selector: 'view-escalation-dialog',
    templateUrl: './viewEscalation.component.html',
    styleUrls: []
})
export class DialogViewEscalation implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogViewEscalation>,
        public _services: ServiceGeneralService,
        public _routerParams: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public pre_esc_data: any,
        public _dialog: MatDialog
    ) {}

    ngOnInit() { this.initPageBehavoir() }

    public image_path:string = this._services.url_images;
    public today_date:Date = new Date();
    public user_data:any = JSON.parse( localStorage.getItem('userData') );
    public __loader__:LoaderComponent = new LoaderComponent();

    public initPageBehavoir():void {
        console.log(this.pre_esc_data);
      this.requestEscalationData();


    }

    public escalation_data:EscalationModel = new EscalationModel();
    public requestEscalationData():void {

        this._services.service_general_get(`Scalate/GetEscalationCommunicationById?id=${ this.pre_esc_data.escalation.id }`)
            .subscribe( (response:any) => {

                if( response.success ) {

                    this.getCatalogues();

                    this.escalation_data = response.result.value[0];

                  console.log('this.escalation_data ===> ', this.escalation_data);
                  // checar si es coordinador
                  this.escalationCoordinador();

                }

            }, (error:any) => {

                console.error('Error (GetEscalationCommunicationById) => ', error);

            });

    }

    public updateEscalationData():void {

        if(!this.escalation_data.status){
           this.escalation_data.closedDate = new Date();
        }
        console.log('Sent this ===> ', this.escalation_data);

        this.__loader__.showLoader();

        this._services.service_general_put('Scalate/PutScalate', this.escalation_data)
            .subscribe( (response:any) => {

                console.log('Res ====> ', response);

                if( response.success ) {

                    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                        data: {
                          header: "Escalate updated",
                          body: "Escalate has been updated successfully."
                        }
                    });

                    this.initPageBehavoir();

                }

                this.__loader__.hideLoader();

            }, (error:any) => {

                console.error('Error (PutScalate) => ', error);

                this.__loader__.hideLoader();

            });

    }

    public comment_string:SingleComment = new SingleComment();
    public addNewComment():void {

        const new_comment:ScalateCommentsModel = new ScalateCommentsModel();

        new_comment.comments = this.comment_string.comment;
        new_comment.createdDate = this.today_date;
        new_comment.date = this.today_date;
        new_comment.scalateServiceId = this.escalation_data.id;
        new_comment.userFromId = this.user_data.id;
        new_comment.userToId = this.escalation_data.userToId;

        if( new_comment.comments.length != 0 ) {

            this.__loader__.showLoader();

            this._services.service_general_post_with_url('Scalate/PostComment', new_comment)
                .subscribe( (response:any) => {

                    if( response.success ) {

                        this.initPageBehavoir();

                    }

                    this.__loader__.hideLoader();

                }, (error:any) => {

                    console.error('Error (PostComment) => ', error);

                    this.__loader__.hideLoader();

                });

            this.comment_string.comment = '';

        }

    }

    public addNewDocument( event_data:any ):void {

        const new_document:ScalateDocumentsModel = new ScalateDocumentsModel(),
            file_root:any = event_data.files[0],
            file_reader:FileReader = new FileReader();

            new_document.createdDate = this.today_date;
            new_document.scalateServiceId = this.escalation_data.id;
            new_document.createdBy = this.user_data.id;
            new_document.local = true;

            file_reader.onload = function() {

                const base64:any = file_reader.result;

                new_document.fileRequest = base64.split(',')[1];
                new_document.fileName = file_root.name;
                new_document.fileExtension = file_root.name.split('.')[file_root.name.split('.').length - 1];

            }

            file_reader.readAsDataURL( file_root );

        this.escalation_data.scalateDocuments.push( new_document );

    }

    public deleteDocument( document:ScalateDocumentsModel, index:number ):void {

        if( document.local ) {

            this.escalation_data.scalateDocuments.splice(index, 1);

        } else {

            this.__loader__.showLoader();

            this._services.service_general_delete(`Scalate/DeleteDocument?docId=${ document.id }`)
                .subscribe( (response:any) => {

                    if( response.success ) {

                        this.__loader__.hideLoader();

                    }

                }, (error:any) => {

                    console.error('Error (DeleteDocument) => ', error);

                    this.__loader__.hideLoader();

                });

        }

    }

    /* Utilities */
    public async getCatalogues(): Promise<void> {

    }

    public hideModal(): void {

        this.dialogRef.close();

    }

    public showEscalationLevels():void {

        const add_call_dialog = this._dialog.open(DialogEscalationLevels, {
            data: {},
            width:"95%"
          });

          add_call_dialog.afterClosed().subscribe(result => {

          });

  }
  // si es escalation level 5 y si el usuario es coordinador  no podra cerrar e escalation
  public coordinadorLevel5 = false;
  escalationCoordinador() {
    if (this.escalation_data.escalationLevel == '5' && this.user_data.role.id == 2 ) {
      this.coordinadorLevel5 = true;
    }
  }

}

class EscalationModel {
    id:number = 0;
    userToId:number = 0;
    to:string = '';
    userFromId:number = 0;
    userFrom:string = '';
    status:boolean = false;
    escalationLevel:string = '';
    workOrderId:string = '';
    serviceId:number = 0;
    serviceLineId:number = 0;
    serviceLine:string = '';
    escalation:string = '';
    serviceRecordId:number = 0;
    createdDate:Date = undefined;
    closedDate:Date = undefined;
    numberWorkOrder:string = '';
    scalateComments:ScalateCommentsModel[] = [];
    scalateDocuments:ScalateDocumentsModel[] = [];
}

class ScalateCommentsModel {
    id:number = 0;
    comments:string = '';
    scalateServiceId:number = 0;
    date:Date = undefined;
    userFromId:number = 0;
    userToId:number = 0;
    createdDate:Date = undefined;
    name_user:string = '';
    avatar_user:string = '';
    tittle_user:string = '';
}

class ScalateDocumentsModel {
    id:number = 0;
    fileName:string = '';
    fileRequest:any = undefined;
    fileExtension:string = '';
    createdDate:Date = undefined;
    updatedDate:Date = new Date();
    updatedBy:number = 0;
    createdBy:number = 0;
    scalateServiceId:number = 0;
    local:boolean = false;
}

class SingleComment {
    comment:string = '';
}
