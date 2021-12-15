import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';

@Component({
    selector: 'dialog-library-documents',
    templateUrl: './dialog-library-documents.component.html',
    styleUrls: []
})
export class DialogLibraryDocuments implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogLibraryDocuments>,
        public _services: ServiceGeneralService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _dialog: MatDialog
    ) {}

    ngOnInit() { this.initPagesSettings(); }

    public __loader__:LoaderComponent = new LoaderComponent();

    public initPagesSettings():void {

        this.requestLibraryDocuments();

    }

    public documents_request_data:any[] = [];
    public requestLibraryDocuments():void {

        const params:string = `?service_record_id=${ this.data.sr_id }&service_line=${ this.data.service_line }`;

        this.__loader__.showLoader();

        this._services.service_general_get(`ImmigrationProfile/GetAllHistoryImmigrationLibrary${ params }`)
            .subscribe( (response:any) => {

                console.log('Res => ', response);

                if( response.success ) {

                    this.documents_request_data = response.result.value;

                }

                this.__loader__.hideLoader();

            }, (error:any) => {

                console.error('Error (GetAllHistoryImmigrationLibrary) => ', error);

                this.__loader__.hideLoader();

            });

    }

    public showDocumentDetail( document_in:any ):void {

        console.log('Aqui ==========> ', document_in);

        const dialogRef = this._dialog.open(DialogDocumentsView, {
            width: "95%",
            data: {
              sr_id: this.data.sr_id,
              document: document_in,
              name_section: 'lib_im_re'
            }
        }); 

    }

    public hideModal(): void {

        this.dialogRef.close();
    
    }

}