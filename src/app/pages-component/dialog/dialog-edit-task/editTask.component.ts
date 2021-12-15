import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';

@Component({
    selector: 'edit-task-dialog',
    templateUrl: './editTask.component.html',
    styleUrls: []
})
export class DialogEditTask implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogEditTask>,
        public _services: ServiceGeneralService,
        public _routerParams: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) public preview_data:any,
        public _dialog: MatDialog
    ) {}

    public __loader__:LoaderComponent = new LoaderComponent();
    public user_data:any = JSON.parse( localStorage.getItem('userData') );
    public today_date:Date = new Date();
    public image_path:string = this._services.url_images;

    //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//
    ngOnInit() {
      this.consultaPermisos();
      this.initPageApp(); 
    }

    public initPageApp():void {

        this.getCatalogues();
        this.getActionItemDataByRequest();

    }

    public action_item_data:ActionItemModel = new ActionItemModel();
    public show_departament_section:boolean = false;
    public show_sr_section:boolean = false;
    public name_section_active:string = '';
    public getActionItemDataByRequest():void {

        console.log('preview_data ===> ', this.preview_data);

        this.__loader__.showLoader();

        this._services.service_general_get(`Task/GetTaskById?Id=${ this.preview_data.id }`)
            .subscribe( (response:any) => {

                if( response.success ) {

                    console.log('Iteraciones ===> ', response);

                    this.action_item_data = response.result;

                    console.log('this.action_item_data ===> ', this.action_item_data);

                    this.documentsConfiguration();

                    if( this.action_item_data.actionType == 1 ) {

                        this.show_departament_section = false;
                        this.show_sr_section = true;
                        this.name_section_active = 'Service Record';

                    } else if ( this.action_item_data.actionType == 2 ) {

                        this.show_departament_section = true;
                        this.show_sr_section = false;
                        this.name_section_active = 'Departament';

                    }

                }

                this.__loader__.hideLoader();

            }, (error:any) => {

                console.error('Error (GetTaskById) => ', error);

                this.__loader__.hideLoader();

            });

    }

    public documentsConfiguration():void {

        this.action_item_data.taskDocuments.forEach( (document:ItemDocumentsModel) => {

            document.local = false;
        });

    }

    public reply_model:ReplyItemActionModel = new ReplyItemActionModel();
    public addNewReply():void {

        if( this.reply_model.reply.length != 0 ) {

            this.reply_model.createdDate = new Date();
            this.reply_model.taskId = this.action_item_data.id;
            this.reply_model.user_name = `${ this.user_data.name } ${ this.user_data.lastName }`;
            this.reply_model.avatar = this.user_data.avatar;
            this.reply_model.createdBy = this.user_data.id;
            this.action_item_data.taskReplies.push( this.reply_model );

            this.reply_model = new ReplyItemActionModel();

        }

  }

  AddDocumentOffice(data) {
    data = {id: 0};
    // this.action_item_data.sr = this.action_item_data.serviceRecordId;
    const dialogRef = this._dialog.open(DialogDocumentsLeadClientComponent, {
      width: "95%",
      data: data
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result.success) {
      const new_document: ItemDocumentsModel = new ItemDocumentsModel();
      // new_document.taskId = this.action_item_data.id;
      new_document.id = 0;
      new_document.createdBy = this.user_data.id;
      new_document.createdDate = this.today_date;
      new_document.nameFile = result.fileName;
      new_document.fileRequest = result.fileRequest;
      new_document.fileExtension = result.fileExtension;
      new_document.comment = result.description;

      if( new_document.nameFile != '' && new_document.nameFile != undefined &&
          new_document.fileRequest != '' && new_document.fileRequest != undefined &&
          new_document.fileExtension != '' && new_document.fileExtension != undefined ) {
          this.action_item_data.taskDocuments.push( new_document );
      }
     }

  });
  }

  public addNewDocument():void {
      this.action_item_data.sr = this.action_item_data.serviceRecordId;
      const dialogRef = this._dialog.open(DialogDocumentsComponent, {
          width: "95%",
          data: this.action_item_data
      });
      dialogRef.afterClosed().subscribe( (result:any) => {
        const new_document:ItemDocumentsModel = new ItemDocumentsModel();
        new_document.taskId = this.action_item_data.id;
        new_document.id = result.id;
        new_document.createdBy = this.user_data.id;
        new_document.createdDate = this.today_date;
        new_document.nameFile = result.fileName;
        new_document.fileRequest = result.fileRequest;
        new_document.fileExtension = result.fileExtension;
        new_document.comment = result.comment;
        if( new_document.nameFile != '' && new_document.nameFile != undefined &&
          new_document.fileRequest != '' && new_document.fileRequest != undefined &&
          new_document.fileExtension != '' && new_document.fileExtension != undefined ) {
          this.action_item_data.taskDocuments.push( new_document );
        }
      });
  }

    public updateActionItemRequest():void {
      this.__loader__.showLoader();
      let documentos = this.action_item_data.taskDocuments;
      this.action_item_data.taskDocuments = [];
      for(let i = 0; i < documentos.length; i++){
        if(documentos[i].id == 0 || documentos[i].id == undefined ){
          this.action_item_data.taskDocuments.push(documentos[i]);
        }
      }

      

      console.log('Data update sent ===> ', this.action_item_data);
      if(this.action_item_data.statusId == 3){
        this.action_item_data.completedDate = new Date();
      }
      console.log('Data update sent ===> ', JSON.stringify(this.action_item_data));
      this._services.service_general_put('Task/UpdateTask', this.action_item_data).subscribe( (response:any) => {
        console.log('Res ======> ', response);
        if( response.success ) {
          this.showGeneralMessageDialog('Success', 'Action item has been updated successfully'
          );
          this.dialogRef.close();
        }
        this.__loader__.hideLoader();
      }, (error:any) => {
        console.error('Error (UpdateTask) =>', error);
        this.__loader__.hideLoader();
        this.dialogRef.close();
      });
    }

    public deleteDocument( document_in:ItemDocumentsModel, index:number ):void {

        console.log('document_in ===> ', document_in);
        console.log('==========> ', index);

        const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
            width: "420px",
            data: {
                header: 'Delete Document',
                body: 'Are you sure to delete this document?'
            }
        });

        dialogRef.afterClosed().subscribe( (result:any) => {

            if( result ) {

               if( document_in.local ) {

                this.action_item_data.taskDocuments.splice( index, 1 );

               } else {

                this.__loader__.showLoader();

                this._services.service_general_get(`Task/DeleteDocumentTask?id=${ document_in.id }`)
                    .subscribe( (response:any) => {

                        if( response.success ) {

                            this.showGeneralMessageDialog(
                                'Document deleted',
                                'Document has beeen successfully deleted.'
                            );

                        }

                        this.__loader__.hideLoader();

                    }, (error:any) => {

                        console.error('Error (DeleteDocumentTask) => ', error);

                        this.__loader__.hideLoader();

                    });

                this.action_item_data.taskDocuments.splice( index, 1 );

               }

            }

        });

    }

    public getCollaborators( people_in:any[] ):string {

        let collaborators:string[] = [],
            collaborators_names:string = '';

        if( people_in.length != 0 ) {

            people_in.forEach( (person:any) => {

                collaborators.push(
                    `${ person.colaboratorNavigation.name } ${ person.colaboratorNavigation.lastName }`
                );

            });

        }

        collaborators_names = collaborators.join(', ');

        return collaborators_names;

    }

    /***********************************************************************************/
    /***********************************************************************************/
    /***********************************************************************************/
    /********************** Funciones Generales ****************************************/
    /***********************************************************************************/
    /***********************************************************************************/
    /***********************************************************************************/
    public statustask_catalogue:any = [];
    public async getCatalogues(): Promise<void> {

        this.statustask_catalogue = await this._services.getCatalogueFrom('GetEstatusTask');

    }

    public showGeneralMessageDialog(title: string = "No title", body: string = "No content"): void {

        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: title,
            body: body
          },
          width: '420px'
        });

        dialogRef.afterClosed().subscribe(result => {

            this.initPageApp();

        });

    }

    public hideModal(): void {

        this.dialogRef.close();

    }

    //FUNCION PARA VER DOCUMENTO//
  showDocumentDialogDetails(item){
    console.log(item);
    const server_url:string = this._services.url_images + item.fileRequest;
    window.open( server_url );
  }

}

class ActionItemModel {
    id:number = 0;
    actionTitle:string = '';
    actionType:number = 0;
    serviceRecordId:number = 0;
    taskFromName:string = '';
    taskFrom:number = 0;
    taskToName:string = '';
    taskTo:number = 0;
    status:string = '';
    statusId:any;
    assignedDate:string = '';
    dueDate:any;
    completedDate:any;
    serviceId:number = null;
    standalone:any = null;
    bundled:any = null;
    sr:any;
    serviceLineId:number = null;
    serviceLine:string = null;
    comments:string = '';
    taskDescription:string = '';
    user_name_comment:string = '';
    tittle_comment:string = '';
    taskReplies:ReplyItemActionModel[] = [];
    taskDocuments:ItemDocumentsModel[] = [];
    colaboratorMembers:Collaborator[] = [];
    overdueTask:boolean = false;
    taskToNavigation:any;
    taskFromNavigation:any;
}

class Collaborator {
    colaboratorNavigation = {

    }
}

class ReplyItemActionModel {
    user_name:string = '';
    tittle:string = '';
    id:number = 0;
    taskId:number = 0;
    reply:string = '';
    avatar:string = '';
    createdDate:Date = new Date();
    createdBy: number = 0;
    createdByNavigation:any = {

    }
}

class ItemDocumentsModel {
    id:number = 0;
    fileRequest:string = '';
    nameFile:string = '';
    comment:string = '';
    taskId:number = 0;
    createdDate:Date = undefined;
    createdBy:string = '';
    fileExtension:string = '';
    local:boolean = true;
}

