import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { Resolve, Router } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
    selector: 'edit-record-request-info',
    templateUrl: './request-information.component.html'
}) export class DialogRequestInformation implements OnInit {

    constructor(
        public dialogRef:MatDialogRef<DialogRequestInformation>,
        public _services:ServiceGeneralService,
        public _router:Router,
        @Inject(MAT_DIALOG_DATA) public data_income: any,
        public _dialog: MatDialog
    ) {}

    public _loader_:LoaderComponent = new LoaderComponent();
    public emailPattern:RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  public user: any = JSON.parse(localStorage.getItem('userData'));
  today = new Date();
  assignee: [
    {
      id: 1,
      name: 'me'
    },
    {
      id: 2,
      name: 'spouce'
    },
    {
      id: 3,
      name: 'child'
    }
  ]
  Emails: any[] = [];
  Houses: any[] = [];
  profileImmi;

  ngOnInit() {
    console.log("data que recibe ", this.data_income);
    console.log("userData ", this.user);
      if( this.isUserActive() ) {
          //this.documents.push( this.new_document );
          //this.new_request_data.requestInformationDocuments.push( new DocumentRequest );
          this.getCatalogues();
          this.getEmails();
      } else {
          this._router.navigateByUrl('');
      }
    }

    public relationship_catalogue:any = [];
    public autoriza_catalogue:any = [];
    public documenttype_catalogue:any = [];
    public async getCatalogues():Promise<any> {

        const id_user:string = `?user=${ this.SO_ID }`;

        this.autoriza_catalogue = await this._services.getCatalogueFrom('GetUserTo', id_user);
        this.documenttype_catalogue = await this._services.getCatalogueFrom('GetDocumentType/3');

        this._services.service_general_get(`ServiceRecord/GetApplicant/${ this.data_income.sr_id }`)
        .subscribe( (response:any) => {
          if( response.success ) {
            this.relationship_catalogue = response.applicant.value;
          }
        }, (error:any) => {

            console.error('Error (GetApplicant) => ', error);

        });

      this._services.service_general_get("ServiceRecord/GetServices/" + this.data_income.sr_id + "?type=" + 1).subscribe(resp => {
        if (resp.success) {
          this.profileImmi = resp.map.value.home;
          console.log('profileimi', this.profileImmi);
        }
      });

    }

    public async getEmails(){
        this._services.service_general_get(`Catalogue/GetEmails/${ this.data_income.sr_id }`)
            .subscribe( (response:any) => {
                if( response.success ) {
                    this.Emails = response.result.value;
                }
            }, (error:any) => {
                console.error('Error () => ', error);
            });
    }

    public getServices(event: any){
        if (event.checked) {
            this._services.service_general_get(`Catalogue/RequestHouses/${ this.data_income.sr_id }`)
                .subscribe( (response:any) => {
                    if( response.success ) {
                        console.log('DATA', response);
                        this.Houses = response.result;
                        console.log('DATA', this.Houses);
                    }
                }, (error:any) => {
                    console.error('Error () => ', error);
                });
        }
    }

    public USERDATA:any = null;
    public SO_ID:number = null;
    public isUserActive():boolean {

        let result:boolean = false;
        const user_in = localStorage.getItem('userData');

        if( user_in != undefined ) {

            this.USERDATA = JSON.parse( user_in );
            this.SO_ID = this.USERDATA.id;
            result = true;

        } else {

            result = false;

        }

        return result;

    }

    public new_request_data:InformationRequest = new InformationRequest();
    public can_show_errors:boolean = false;
    public sendRequestData():void {
      this.can_show_errors = true;
      // seteo de autorized by por el id loggeado
      this.new_request_data.authorizedBy = this.user.id;
      console.log('autorized',  this.new_request_data.authorizedBy);
      this.new_request_data.serviceRecordId = this.data_income.sr_id;

      const form_validations:any = {
        main_form: this.validateRequestForm(),
        docs_forms: this.validatingDocumentGroup()
      }

      console.log('Construyendo OBJ => ', this.new_request_data);
        //if( form_validations.main_form && form_validations.docs_forms ) {
      if( form_validations.main_form ) {
        const working_request:any = new Promise( (resolve:any) => {

            this._loader_.showLoader();
            resolve( true );

        });
        let aux_documentos = this.new_request_data.requestInformationDocuments;
        this.new_request_data.requestInformationDocuments = [];
        for(let i = 0; i < aux_documentos.length; i++){
          if(aux_documentos[i].documentType != 0 || aux_documentos[i].relationshipId != 0){
            this.new_request_data.requestInformationDocuments.push(aux_documentos[i]);
          }
        }
        working_request.then( (result:boolean) => {
          const total_documents:number = this.new_request_data.requestInformationDocuments.length;
          console.log('Envio esto ==> ', this.new_request_data);
          setTimeout( () => {
            this._services.service_general_post_with_url('RequestInformation/PostRequestInformation', this.new_request_data)
            .subscribe( (response:any) => {
              console.log('Response (PostRequestInformation) => ', response);
                if( response.success ) {
                  this.hideModal( true );
                }

                this._loader_.hideLoader();

                this.showGeneralMessageDialog(
                    'Request information sent',
                    'Request information has been sent successfully.'
                );

            }, (error:any) => {

                console.log('WS Erros => ', error);

                this._loader_.hideLoader();

            });
          }, total_documents * 4200)
        });
      }
    }

     public appendDocumentToModel( file_data:any, document:DocumentRequest ):void {

         const file_reader:FileReader = new FileReader();
             file_reader.onload = function() {

                 const base64:any = file_reader.result;

                 document.fileRequest = base64.split(',')[1];
                 document.fileExtension = file_data.name.split('.')[1];

             }
             file_reader.readAsDataURL( file_data );

     }

    public validatingDocumentGroup():boolean {
      let result:boolean = true;
      const documents:any = document.getElementsByClassName('document');
      for( let document = 0; document < documents.length; document += 1 ) {
        const root_element:any = documents[document],
          doc_inputs: any = root_element.querySelectorAll('input');

        validateInputs( doc_inputs );
      }
      function validateInputs(inputs_in: any) {
        //const input_one:any = inputs_in[0];
        //console.log('inpunt', input_one);
        //input_one.value == '' ?
        //input_one.parentElement.querySelector('.label-error').classList.remove('display-none') :
        //input_one.parentElement.querySelector('.label-error').classList.add('display-none');
        //if( input_one.value == '' ) result = false;
      }
      this.new_request_data.requestInformationDocuments.forEach( (document:any) => {
          //if( document.documentType == 0 ) result = false;
          if( document.relationshipId == 0 ) result = false;
      });
      return result;
    }

    public form_data:any = {
        no_send: false,
        no_mail_valid: false,
        no_ddue: false,
        no_file: false,
        no_house_data: false
    }
    public validateRequestForm():boolean {

        let result:boolean = true;

        this.new_request_data.sentTo == "" && this.new_request_data.sentsTo.length == 0 ?
            this.form_data.no_send = true : this.form_data.no_send = false;

        !this.validateEmail( this.new_request_data.sentTo ) && this.new_request_data.sentsTo.length == 0 ?
            this.form_data.no_mail_valid = true : this.form_data.no_mail_valid = false;

        this.new_request_data.due == "" || this.new_request_data.due == null ?
            this.form_data.no_ddue = true : this.form_data.no_ddue = false;

        this.new_request_data.authorizedBy == "" ?
            this.form_data.no_auto = true : this.form_data.no_auto = false;

        !this.new_request_data.housingSpecification &&
        !this.new_request_data.immigrationProfile &&
        !this.new_request_data.needsAssessment ?
            this.form_data.no_file = true : this.form_data.no_file = false;
        debugger;
        this.new_request_data.housingSpecification == true && this.new_request_data.house == 0
        ? this.form_data.no_house_data = true : this.form_data.no_house_data = false;

        for( let field in this.form_data ) {

            if( this.form_data[field] ) result = false;

        }

        return result;

    }





    public setNameFileName( event_data:any, to_where:string ) {

        const get_name_container:any = document.getElementById( to_where );

        get_name_container.innerHTML = event_data.files[0].name;

    }

    public documents:any = [];
    //public new_document:Document = new Document();
    public new_document:DocumentRequest = new DocumentRequest();
    public addDocument():void {

        this.new_request_data.requestInformationDocuments.push( new DocumentRequest() );

    }

    public removeDocument( index:number ):void {

        this.documents.splice( index ,1 );

    }

    public hideModal( completed:boolean = false ): void {

        this.dialogRef.close( completed );

    }

    public validateEmail( email_in:string ):boolean {

        let result:boolean = true;

        const validating_email = this.emailPattern.test( email_in );

        if( !validating_email ) result = false;

        return result;

    }

    public removeErrorLabel( input_value:any, object_data:any ):void {

        if( input_value == "" || input_value == null ) {

            object_data.handler[object_data.field] = true;

        } else {

            object_data.handler[object_data.field] = false;

        }

    }

    public validEmailSentTo( email:string ) {

        !this.validateEmail( email ) ?
            this.form_data.no_mail_valid = true :
            this.form_data.no_mail_valid = false;

    }

    public formSelected():void {

        !this.new_request_data.housingSpecification &&
        !this.new_request_data.immigrationProfile &&
        !this.new_request_data.needsAssessment ?
            this.form_data.no_file = true : this.form_data.no_file = false;

    }

    public removeErrorDinamic(input_value: any, id_label: string): void {

        const get_input_label: any = document.getElementById(id_label);

        if (input_value == '' || input_value == null || input_value == undefined) {

          get_input_label.classList.remove('display-none');

        } else {

          get_input_label.classList.add('display-none');

        }

    }

    public showGeneralMessageDialog( title:string = '', body:string = '' ):void {

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

}

class Document {
    type:string = '';
    relationship:string = '';
}

class InformationRequest {
    id:number = 0;
    sentTo:string = '';
    sentsTo:any = [];
    authorizedBy:string = '';
    needsAssessment:boolean = false;
    immigrationProfile:boolean = false;
    housingSpecification:boolean = false;
    house:number = 0;
    serviceRecordId:number = 0;
    due:string = '';
    requestInformationDocuments:any = [];
    comment: string = '';
}

class DocumentRequest {
    id:number = 0;
    documentType:number = 0;
    relationshipId:number = 0;
    fileRequest:any = '';
    requestInformationId:number = 0;
    fileExtension:string = '';
}

