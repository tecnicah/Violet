import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';

@Component({
  selector: 'dialog-documents-view',
  templateUrl: './dialog-documents-view.component.html',
  styleUrls: []
})
export class DialogDocumentsView implements OnInit {

    public library_data:LibraryDocumentModel = new LibraryDocumentModel();

    constructor(
        public dialogRef: MatDialogRef<DialogDocumentsView>,
        public _services: ServiceGeneralService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public _dialog: MatDialog
    ) {}

    ngOnInit() {
        debugger;
        if(this.data.name_section == "only_one_service"){
            console.log(this.data);
            this.library_data.comment = this.data.document.comment;
            this.countryName(this.data.document.countryOrigin);
            this.relationName(this.data.document.relationship);
            this.library_data.upload_date = this.data.document.createdDate;
            this.docName(this.data.document.documentType);
            this.library_data.issueDate = this.data.document.issueDate;
            this.library_data.expirationDate = this.data.document.expirationDate;
            this.library_data.issuingAuthority = this.data.document.issuingAuthority;
            this.library_data.ulr_document = this.data.document.fileRequest;
        }else{
            this.initPageBehavior()
        }
    }

    relationName(id){
        this._services.service_general_get(`ServiceRecord/GetApplicant/${this.data.sr_id}`).subscribe(r =>{
            if(r.success){
                let applicant = r.applicant.value;
                for (let i = 0; i < applicant.length; i++) {
                    const element = applicant[i];
                    if(element.dependentId == id){
                        this.library_data.relationship = element.name;
                    }
                }
            }
        })
    }

    docName(id){
        this._services.service_general_get(`Catalogue/GetDocumentType/${this.data.sl}`).subscribe(r =>{
            if(r.success){
                for (let i = 0; i < r.result.length; i++) {
                    const element = r.result[i];
                    if(element.id == id){
                        this.library_data.document_type = element.documentType;
                    }
                }
            }
        })
    }

    countryName(id){
        this._services.service_general_get('Catalogue/GetCountry').subscribe(r => {
            if(r.success){
                for (let i = 0; i < r.result.length; i++) {
                    const element = r.result[i];
                    if(id == element.id){
                        this.library_data.name = element.name;
                    }
                }
            }
        })
    }

    public __loader__:LoaderComponent = new LoaderComponent();
    public __serverPath__:string = this._services.url_images;

    public initPageBehavior():void {

        console.log('Ya me ====> ', this.data);

        switch( this.data.name_section ) {

            case 'library':
                this.getDataFromLibraryDocument();
                break;

            case 'lib_im_re':
                this.getDataFromDocImmRel();
                break;

            default:
                console.info('Dar de alta otro caso');
                break;

        }

    }

    public getDataFromLibraryDocument():void {

        const check_id:any = this.data.document.id;

        if( check_id != '' || check_id != undefined || check_id != null ) {

            this.__loader__.showLoader();

            this._services.service_general_get(`ImmigrationProfile/GetAssigneFamilyById?id=${ check_id }`)
                .subscribe( (response:any) => {

                    if( response.success ) {

                        this.library_data = response.result.value[0];

                    }

                    this.__loader__.hideLoader();

                    console.log('this.library_data =======> ', this.library_data);

                }, (error:any) => {

                    console.error('Error (ImmigrationProfile/GetAssigneFamilyById) => ', error);

                    this.__loader__.hideLoader();

                });

        } else {

            const dialogRef = this._dialog.open(DialogDocumentsComponent, {
                width: "420px",
                data: {
                    header: 'Document Error',
                    body: 'Document not found or broke, please contact support.'
                }
            });

            dialogRef.afterClosed().subscribe( () => {

                this.hideModal();

            });

        }

    }

    public getDataFromDocImmRel():void {

        console.log('this data =======> ', this.data);

        const params:string = `?tipo=${ this.data.document.tipo }&id=${ this.data.document.id }`;

        this.__loader__.showLoader();

        this._services.service_general_get(`ImmigrationProfile/GetDocumentLibraryById${ params }`)
            .subscribe( (response:any) => {

                console.log('Res ====> ', response);

                if( response.success ) {

                    this.library_data = response.result.value[0];

                    console.log('======> ', this.library_data);

                }

                this.__loader__.hideLoader();

            }, (error:any) => {

                console.error('Error (GetDocumentLibraryById) => ', error);

                this.__loader__.hideLoader();

            });

    }

    public openFileOnWindow( url_in:string ):void {

        const server_url:string = this.__serverPath__ + url_in;

        window.open( server_url );

    }

    public hideModal(): void {

        this.dialogRef.close();

    }

}

class LibraryDocumentModel {
    id:number = 0;
    comment:string = '';
    dependentImmigrationInfoId:number = 0;
    document_type:string = '';
    expirationDate:string = '';
    issueDate:string = '';
    issuingAuthority:string = '';
    name:string = '';
    relationship:string = '';
    ulr_document:string = '';
    upload_date:string = '';
}
