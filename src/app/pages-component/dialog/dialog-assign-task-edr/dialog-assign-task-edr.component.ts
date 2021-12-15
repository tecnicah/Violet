import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';



@Component({
  selector: 'app-dialog-assign-task-edr',
  templateUrl: './dialog-assign-task-edr.component.html',
  styleUrls: ['./dialog-assign-task-edr.component.css']
})
export class DialogAssignTaskEDRComponent implements OnInit {

  public typeTo = {
    name: ''
}

public typeAction = {
    actionType: ''
}

public typeWork = {
    numberWorkOrder: ''
}

public typeService = {
    serviceNumber: ''
}

public typeC = {
    name: ''
}

constructor(
    public dialogRef: MatDialogRef<DialogAssignTaskEDRComponent>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public preview_data: any,
    public _dialog: MatDialog
) { }

public __loader__: LoaderComponent = new LoaderComponent();
public user_data: any = JSON.parse(localStorage.getItem('userData'));
public today_date: Date = new Date();
public image_path: string = this._services.url_images;

ngOnInit() {
    console.log("assign action", this.preview_data);
    
    this.getCatalogues();
    this.initPageBehavior();
  

}

public is_sr_detected: boolean = false;
public initPageBehavior(): void {

    this.action_item_model.taskFrom = `${this.user_data.id}`;

    if (this.preview_data.id_so != undefined) {

        this.is_sr_detected = true;

        this.action_item_model.actionType = '1';
        this.action_item_model.serviceRecordId = this.preview_data.id_so;

        this.ableWOField();

        this.show_service_section = true;

    }

    if (this.preview_data.hasOwnProperty('service_line')) {

        this.action_item_model.serviceLineId = this.preview_data.service_line;

    }

}

public action_item_model: ItemActionModel = new ItemActionModel();
public createNewActionItem(): void {
    console.log('Obj To send => ', this.action_item_model);
    if (this.actionItemFieldsValidator()) {
        this.beforeNewCreateTask();

        this.__loader__.showLoader();

        this._services.service_general_post_with_url('Task/CreateTask', this.action_item_model)
            .subscribe((response: any) => {

                console.log('Res (Task/CreateTask) => ', response);

                if (response.success) {

                    this.hideModal();

                    this.showGeneralMessageDialog(
                        'Success',
                        'An Action Item has been created successfully,'
                    );
                    this.dialogRef.close();

                }

                this.__loader__.hideLoader();

            }, (error: any) => {

                console.error('Error (Task/CreateTask) => ', error);

                this.__loader__.hideLoader();

            });

    }

}

public beforeNewCreateTask(): void {

    let colaborators_in: ColaboratorMembersModel[] = [];

    this.action_item_model.createdBy = this.user_data.id;
    this.action_item_model.createdDate = this.today_date;
    this.action_item_model.assignedDate = this.today_date;
    this.action_item_model.colaboratorMembers.forEach((colaborator: any) => {

        const colaborator_model: ColaboratorMembersModel = new ColaboratorMembersModel();

        colaborator_model.colaborator = colaborator;

        colaborators_in.push(colaborator_model);

    });

    this.action_item_model.colaboratorMembers = colaborators_in;

}

public show_create_errors: boolean = false;
public actionItemFieldsValidator(): boolean {

    let result: boolean = true;

    this.show_create_errors = true;

    if (this.action_item_model.actionTitle == '') result = false;
    if (this.action_item_model.taskDescription == '') result = false;
    if (this.action_item_model.to.length == 0) result = false;
    if (this.action_item_model.dueDate == '') result = false;
    if (this.action_item_model.actionType == '') result = false;
    if (this.action_item_model.actionType == '1') {
        if (this.action_item_model.serviceRecordId == '') result = false;
        if (this.action_item_model.workOrderId == '') result = false;
        if (this.action_item_model.serviceId == '') result = false;
        if (this.action_item_model.colaboratorMembers.length == 0) result = false;
    } else {
        if (this.action_item_model.department == '') result = false;
        if (this.action_item_model.colaboratorMembers.length == 0) result = false;
    }

    return result;

}

public addNewDocument(): void {
    let data: any = this.action_item_model;
    data.sr = this.action_item_model.serviceRecordId;
    data.typeDocument = 3;
    const dialogRef = this._dialog.open(DialogDocumentsComponent, {
        width: "95%",
        data: data
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        const new_document: ItemDocumentsModel = new ItemDocumentsModel();
        new_document.id = result.id;
        new_document.createdBy = this.user_data.id;
        new_document.createdDate = this.today_date;
        new_document.nameFile = result.fileName;
        new_document.fileRequest = result.fileRequest;
        new_document.fileExtension = result.fileExtension;
        new_document.comment = result.comment;

        if (new_document.nameFile != '' && new_document.nameFile != undefined &&
            new_document.fileRequest != '' && new_document.fileRequest != undefined &&
            new_document.fileExtension != '' && new_document.fileExtension != undefined) {

            this.action_item_model.taskDocuments.push(new_document);
        }

    });

}
// add document office
AddDocumentOffice(data) {
    if (data == null) {
        data = { id: 0 };
    }
    const dialogRef = this._dialog.open(DialogDocumentsLeadClientComponent, {
        data: data, width: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result.success) {
            const new_document: ItemDocumentsModel = new ItemDocumentsModel();
            new_document.id = result.id;
            new_document.createdBy = this.user_data.id;
            new_document.createdDate = this.today_date;
            new_document.nameFile = result.fileName;
            new_document.fileRequest = result.fileRequest;
            new_document.fileExtension = result.fileExtension;
            new_document.comment = result.description;

            if (new_document.nameFile != '' && new_document.nameFile != undefined &&
                new_document.fileRequest != '' && new_document.fileRequest != undefined &&
                new_document.fileExtension != '' && new_document.fileExtension != undefined) {
                this.action_item_model.taskDocuments.push(new_document);
            }
        }

    });
}

public deleteItemActionDocument(index_document: number): void {

    this.action_item_model.taskDocuments.splice(index_document, 1);

}

public show_departament_section: boolean = false;
public show_service_section: boolean = false;
public actionTypeSelected(): void {

    if (this.action_item_model.actionType == '1') {

        this.show_departament_section = false;
        this.show_service_section = true;

    } else {

        this.show_departament_section = true;
        this.show_service_section = false;

    }

}

public wo_field_disabled: boolean = false;
public wo_catalogue: any = [];
public ableWOField(): void {

    this.__loader__.showLoader();

    this._services.service_general_get(`Catalogue/GetworkOrder/${this.action_item_model.serviceRecordId}`)
        .subscribe((response: any) => {

            this.wo_catalogue = response.result.value;

            this.__loader__.hideLoader();

            this.wo_field_disabled = true;

        }, (error: any) => {

            console.error('Error (GetworkOrder) => ', error);

            this.__loader__.hideLoader();

        });

}

public service_field_unable: boolean = false;
public service_catalogue: any = [];
public ableServiceField(): void {

    this.service_field_unable = true;

    console.log('Service ===> ', this.action_item_model.workOrderId);

    this.__loader__.showLoader();

    this._services.service_general_get(`Catalogue/GetServiceByWorkOrder?wo=${this.action_item_model.workOrderId}`)
        .subscribe((response: any) => {

            console.log('Res ====> ', response);

            this.service_catalogue = response.result.value;

            this.__loader__.hideLoader();

        }, (error: any) => {

            console.error('Error (GetServiceByWorkOrder) => ', error);

            this.__loader__.hideLoader();

        });

}

/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/
/********************** Funciones Generales ****************************************/
/***********************************************************************************/
/***********************************************************************************/
/***********************************************************************************/
public userto_catalogue: any = [];
public actiontype_catalogue: any = [];
public statustask_catalogue: any = [];
public departament_catalogue: any = [];
public servicerecord_catalogue: any = [];
public collaborator_catalogue: any = [];
public userto_sr = [];
public async getCatalogues(): Promise<void> {

    this.actiontype_catalogue = await this._services.getCatalogueFrom('GetActionType');
    this.statustask_catalogue = await this._services.getCatalogueFrom('GetEstatusTask');
    this.departament_catalogue = await this._services.getCatalogueFrom('GetDepartment');
    this.servicerecord_catalogue = await this._services.getCatalogueFrom(`GetServiceRecord/${this.user_data.id}`);
    this.userto_catalogue = await this._services.getCatalogueFrom('GetUserTo');
    this.collaborator_catalogue = await this._services.getCatalogueFrom('GetUserTo');
    this.getUserSR();
    this.action_item_model.serviceRecordId = this.preview_data.serviceRecordId;

}


getUserSR() {
    this._services.service_general_get(`ServiceRecord/ExperienceTeam/${this.preview_data.serviceRecordId}`)
        .subscribe((response: any) => {
            console.log('Res ====> ', response);
            this.userto_sr = response.result.value;
            this.action_item_model.serviceLineId = this.preview_data.service_line;
        }, (error: any) => {
            console.error('Error (GetServiceByWorkOrder) => ', error);
            this.__loader__.hideLoader();

        });
}

public showGeneralMessageDialog(title: string = "No title", body: string = "No content"): void {

    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
            header: title,
            body: body
        }
    });

    dialogRef.afterClosed().subscribe((result: any) => { });

}

public hideModal(): void {

    this.dialogRef.close();

}

}

class ItemActionModel {
id: number = 0;
actionTitle: string = '';
serviceRecordId: string = null;
workOrderId: string = null;
taskFrom: string = '';
taskTo: string = '0';
to: number[] = [];
statusId: string = '1';
assignedDate: Date = undefined;
dueDate: string = '';
completedDate: string = '';
serviceId: string = null;
serviceLineId: string = null;
comments: string = '';
taskDescription: string = '';
overdueTask: boolean = true;
department: string = '';
actionType: string = '';
urgent: boolean = false;
createdBy: string = '';
createdDate: Date = undefined;
updateBy: string = '';
taskDocuments: ItemDocumentsModel[] = [];
colaboratorMembers: any[] = [];
}

class ItemDocumentsModel {
id: number = 0;
fileRequest: string = '';
nameFile: string = '';
comment: string = '';
taskId: string = '0';
createdDate: Date = undefined;
createdBy: string = '';
fileExtension: string = '';
}

class ColaboratorMembersModel {
task: string = '0';
colaborator: string = '';
}
