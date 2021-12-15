import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../../dialog/general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogEscalationLevels } from '../escalation-levels/escalationLevel.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'edit-service-redcord-escalate',
    templateUrl: './escalate.component.html'
}) export class DialogEscalateComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogEscalateComponent>,
      @Inject(MAT_DIALOG_DATA) public data_from_esr: any,

        public _services: ServiceGeneralService,
        public _dialog: MatDialog
    ) { }

    typeFilter = {
        numberWorkOrder: ''
    }
    public toppings = new FormControl();

    typeService = {
        category: ''
    }

    typeTo = {
        name: ''
    }

    typeLine = {
        serviceLine: ''
    }
    public toppings_ = new FormControl();

    public loader: LoaderComponent = new LoaderComponent();

    public user_log_name: string = this.data_from_esr.user_log_name;
    public image_path: string = this._services.url_images;
    public today_date: Date = new Date();
    public user: any = JSON.parse(localStorage.getItem("userData"));

  ngOnInit() {

    console.log(this.user);
    console.log('data que recibe modal', this.data_from_esr);
    this.escalation_model = new EscalationModel;
    this.escalation_model.createdDate = new Date();
    this.requestScalateStatus();
    this.getCatalogues();

    }

    public userto_catalogue: any = [];
    public service_catalogue: any = [];
    public serviceline_catalogue: any = [];
    public async getCatalogues() {

        const params = `${this.data_from_esr.id_sr}`;

        this.service_catalogue = await this._services.getCatalogueFrom('GetService');
        this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
        this._services.service_general_get(`ServiceRecord/ExperienceTeam/${this.data_from_esr.id_sr}`).subscribe(resp => {
          if (resp.success) {
            this.userto_catalogue = resp.result.value;
            console.log('userto_catalogue', this.userto_catalogue);
          }
        });
    }

    public showEscalationLevels(): void {

        const add_call_dialog = this._dialog.open(DialogEscalationLevels, {
            data: {},
            width: "95%"
        });

    }

    public is_it_newone: boolean = false;
    public requestScalateStatus(): void {

        /*this._services.service_general_get(`Scalate/GetScalate?srId=${ this.data_from_esr.id_sr }&user=${ this.data_from_esr.id_user }`)
            .subscribe( (response:any) => {

                if( response.success ) {

                    if( response.result == null ) {

                        this.is_it_newone = true;
                        this.escalation_model.createdDate = this.getTodayDay();

                    } else {

                        this.is_it_newone = false;
                        this.escalation_model = response.result;
                        this.escalation_model.createdDate = this.dateWorker( this.escalation_model.createdDate );
                        this.escalation_model.scalateDocuments = [];

                    }

                }

            }, (error:any) => {

                console.log('Error () => ', error);

            });*/

    }

    public escalation_model: EscalationModel = new EscalationModel();
    public sendEscalationData(): void {

        this.escalation_model.userFromId = this.data_from_esr.id_user;
        this.escalation_model.serviceRecordId = this.data_from_esr.id_sr;
        this.escalation_model.status = true;
        this.escalation_model.escalation = new Date();
        this.escalation_model.closedDate = new Date();
        this.escalation_model.scalateComments[0].createdDate = new Date();
        this.escalation_model.scalateComments[0].userFromId = this.user.id;
        this.escalation_model.scalateComments[0].userToId = this.escalation_model.userToId;
        this.escalation_model.scalateComments[0].scalateServiceId = Number(this.escalation_model.escalationLevel);
        this.escalation_model.escalationLevel = Number(this.escalation_model.escalationLevel);

        console.log('Orale ====> ', this.escalation_model);

        if (this.escalationFormValidator()) {

            this.loader.showLoader();

            this._services.service_general_post_with_url('Scalate/PostScalate', this.escalation_model)
                .subscribe((response: any) => {

                    this.hideModal();
                    this.showGeneralMessageDialog('Escalation has been completed', 'An Escalation has been sent successfully.');
                    this.loader.hideLoader();

                }, (error: any) => {

                    console.error('Error (Scalate/PostScalate) => ', error);
                    this.loader.hideLoader();

                });

        }

    }

    public sendEscalationDataUpdated(): void {

        this.loader.showLoader();
        this.escalation_model.escalation = new Date();
        this.escalation_model.closedDate = new Date();

        setTimeout(() => {

            this._services.service_general_put('Scalate/PutScalate', this.escalation_model)
                .subscribe((response: any) => {

                    if (response.success) {

                        this.hideModal();
                        this.showGeneralMessageDialog('Escalation has been updated', 'An Escalation has been updated successfully.');
                        this.loader.hideLoader();

                    }

                }, (error: any) => {

                    console.error('Error (PutScalate) => ', error);
                    this.loader.hideLoader();

                });

        }, this.howMuchTimeWillWait());

    }

    public howMuchTimeWillWait(): number {

        return this.escalation_model.scalateDocuments.length * 2200;

    }

    public showGeneralMessageDialog(title: string = "No title", body: string = "No content"): void {

        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
                header: title,
                body: body
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });

    }

    public new_comment: CommentModel = new CommentModel();
    public replayComment(): void {

        const replay_comment: any = document.getElementById('replay-comment');

        this.new_comment.comments = replay_comment.value;
        this.new_comment.createdDate = new Date();
        this.new_comment.userFromId = this.data_from_esr.id_user;
        this.new_comment.userToId = this.escalation_model.userToId;
        this.new_comment.scalateServiceId = this.escalation_model.id;

        this._services.service_general_post_with_url('Scalate/PostComment', this.new_comment)
            .subscribe((response: any) => {

                if (response.success) {

                    this.requestScalateStatus();
                    replay_comment.value = '';

                }

            }, (error: any) => {

                console.log('Error (PostComment) => ', error);

            });

    }

    public no_first_comment: boolean = false;
    public getCommentsIn(): void {

        const comment_added: any = document.getElementsByClassName('comment-in');

        for (let comment = 0; comment < comment_added.length; comment += 1) {

            const comment_add: any = comment_added[comment].value,
                new_comment: CommentModel = new CommentModel();

            comment_added[0].value == '' ?
                this.no_first_comment = true :
                this.no_first_comment = false;

            new_comment.comments = comment_add;
            new_comment.userToId = this.escalation_model.userToId;
            new_comment.userFromId = this.data_from_esr.id_user;
            new_comment.createdDate = new Date();
            new_comment.date = new Date()

            if (comment_add != '') this.escalation_model.scalateComments.push(new_comment);

        }

    }

    public esc_form_validator: any = {
        no_fron: false,
        no_leve: false,
        no_serv: false,
        no_lser: false,
        no_come: false
    }
    public escalationFormValidator(): boolean {

        let result: boolean = true;

        this.escalation_model.userToId == 0 || this.escalation_model.userToId == null ?
            this.esc_form_validator.no_fron = true : this.esc_form_validator.no_fron = false;

        this.escalation_model.escalationLevel == 0 || this.escalation_model.escalationLevel == null ?
            this.esc_form_validator.no_leve = true : this.esc_form_validator.no_leve = false;

        this.escalation_model.serviceId == 0 || this.escalation_model.serviceId == null ?
            this.esc_form_validator.no_serv = true : this.esc_form_validator.no_serv = false;

        this.escalation_model.serviceLineId == 0 || this.escalation_model.serviceLineId == null ?
            this.esc_form_validator.no_lser = true : this.esc_form_validator.no_lser = false;

        for (let field in this.esc_form_validator) {

            if (this.esc_form_validator[field]) result = false;

        }

        return result;

    }

    public hideModal(): void {

        this.dialogRef.close();

    }

    public getTodayDay(): string {

        const date = {
            date: function () { return new Date() },
            day: function () { return this.date().getDate() },
            month: function () { return this.date().getMonth() + 1 },
            year: function () { return this.date().getFullYear() },
            today: function () {
                return `${this.month()}/${this.day()}/${this.year()}`
            }
        }

        return date.today();

    }

    public removeErrorLabel(input_value: any, object_data: any): void {

        if (input_value == "" || input_value == null) {

            object_data.handler[object_data.field] = true;

        } else {

            object_data.handler[object_data.field] = false;

        }

    }

    public dateWorker(date_in: string): string {

        if (date_in != null && date_in != '' && date_in != undefined) {

            const date_actions: any = {
                set_date: function (d) { this.date = d },
                split_date: function () { this.date_split = date_in.split('T') },
                get_date: function () { return this.date_split[0] }
            }

            let work_date = Object.create(date_actions);
            work_date.split_date();

            return work_date.get_date();

        } else {

            return 'No date found'

        }

    }

    public services_catalogue: any = [];
    public workorders_catalogue: any = [];
    public now_can_see_services: boolean = false;
    public async getServiceLine(line_id: string): Promise<any> {
        console.log("entra a funcion");
        this.now_can_see_services = true;

        const params: string = `?service_record_Id=${this.data_from_esr.id_sr}&service_line_id=${line_id}`;

        this.services_catalogue = await this._services.getCatalogueFrom('GetServiceBySOId', params);
        let workorders_catalogueC = await this._services.getCatalogueFrom('GetworkOrderBySR', params);
        this.workorders_catalogue = workorders_catalogueC.value;

    }

    public new_document: DocumentEscalation = new DocumentEscalation();

    /* AAAAAAAAAAAARRRRRRRTTTTTUUUUUU */
    public files: NgxFileDropEntry[] = [];

    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        const root: any = this;
        for (const droppedFile of files) {
            // Is it a file?
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                const reader = new FileReader();
                fileEntry.file((file: File) => {

                    // Here you can access the real file
                    console.log(droppedFile.relativePath);
                    console.log(file, this.files);
                    fileEntry.file(file => {
                        reader.readAsDataURL(file);
                        this.new_document.fileExtension = file.name.split('.')[file.name.split('.').length - 1];
                        this.new_document.name = file.name;
                        reader.onload = () => {
                            const base64_gotted: any = reader.result;
                            this.new_document.fileRequest = base64_gotted.split(',')[1];
                            this.new_document.document_from = 'local';
                            this.new_document.createdDate = new Date();
                            this.new_document.updatedBy = this.user.id;
                            this.new_document.updatedDate = new Date();
                            this.new_document.createdBy = this.user.id;
                            this.escalation_model.scalateDocuments.push(this.new_document);
                        };
                    });
                });
            } else {
                // It was a directory (empty directories are added, otherwise only files)
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
                //console.log(droppedFile.relativePath, fileEntry);
            }
        }
        console.log('Saori ===> ', this.escalation_model);
    }

    public fileOver(event) {
        //console.log(event);
    }

    public fileLeave(event) {
        //console.log(event);
    }


    SetServiceLine(item) {
        console.log(item);
        if (item.immigration) {
            this.escalation_model.serviceLineId = 1;
            this.getServiceLine(this.escalation_model.serviceLineId.toString());
        }

        if (item.relocation) {
            this.escalation_model.serviceLineId = 2;
            this.getServiceLine(this.escalation_model.serviceLineId.toString());
        }
    }
}

class EscalationModel {
    id: number = 0;
    userToId: number = 0;
    userFromId: number = 0;
    status: boolean = true;
    escalationLevel: number = 0;
    workOrderId: number = 0;
    serviceId: number = 0;
    serviceLineId: number = 0;
    escalation: Date;
    serviceRecordId: number = 0;
    createdDate: Date;
    closedDate: Date;
    scalateComments: CommentModel[] = [new CommentModel()];
    scalateDocuments: any[] = [];
}

class CommentModel {
    id: number = 0;
    comments: string = '';
    scalateServiceId: number = 0;
    date: Date;
    userFromId: number = 0;
    userToId: number = 0;
    createdDate: any;
}

class DocumentEscalation {
    id: number = 0;
    fileRequest: string = '';
    fileExtension: string = '';
    scalateServiceId: number = 0;
    createdDate: any;
    createdBy: number = 0;
    document_from: string = '';
    updatedDate: any;
    updatedBy: number;
    name: string = '';
}
