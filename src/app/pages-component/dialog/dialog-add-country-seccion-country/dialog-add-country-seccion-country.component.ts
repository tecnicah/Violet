import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogDocumentsLeadClientComponent } from '../dialog-documents-lead-client/dialog-documents-lead-client.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DialogDocumentsAdminCenterServicesComponent } from '../dialog-documents-admin-center-services/dialog-documents-admin-center-services.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { MatOption } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-country-seccion-country',
  templateUrl: './dialog-add-country-seccion-country.component.html',
  styleUrls: ['./dialog-add-country-seccion-country.component.scss']
})
export class DialogAddCountrySeccionCountryComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(public dialogRef: MatDialogRef<DialogAddCountrySeccionCountryComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog, private fb: FormBuilder) { }

    caCounty: any[] = [];
    caDocumentType: any[] = [];
    caDocumentStatus: any[] = [];
    caPrivacy: any[] = [];
  ngOnInit(): void {
    console.log('data que recibe modal contry', this.data)
    if(this.data.documentServiceCountries){}else{
      this.data.documentServiceCountries = [];
    }
    this.searchUserForm = this.fb.group({
      userType: new FormControl('')
    });
    this.catalogos();
  }

  async catalogos(){
    this.caCounty = await this._services.getCatalogueFrom('GetCountry');
    console.log(this.caCounty);
    this.caDocumentType = await this._services.getCatalogueFrom('GetDocumentType/1');
    this.caDocumentStatus = await this._services.getCatalogueFrom('GetDocumentStatus');
    this.caPrivacy = await this._services.getCatalogueFrom('GetPrivacy');
  }

  @ViewChild('allSelected') private allSelected: MatOption;
  searchUserForm: FormGroup;
  toggleAllSelection() {
    if(!this.data.country){
      this.data.country = [];
    }
    if (this.allSelected.selected) {
      this.searchUserForm.controls.userType
        .patchValue([...this.caCounty.map(item => item.id),0]);
    } else {
      this.searchUserForm.controls.userType.patchValue([]);
    }
    console.log(this.searchUserForm);
  }

  DialogDocumentsLeadClientComponent(data){
      if(data == null){
        data = {id: 0};
      }

      data.status = true;
      const dialogRef = this._dialog.open(DialogDocumentsAdminCenterServicesComponent, {
        data: data, width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
        let userData = JSON.parse(localStorage.getItem('userData'));
      if(result.success){
        result.serviceCountry = this.data.id;
        result.updatedBy= userData.id;
        result.updatedDate= new Date();
        result.documentType = result.idDocumentType;
        result.filePath = result.fileRequest;
        if(this.data.id == 0){
          result.createdBy= userData.id;
          result.createdDate= new Date();
        }
        console.log(result);
        this.data.documentServiceCountries.push(result);
      }

    });
   }

  getDocumentName(id){
    for (let i = 0; i < this.caDocumentType.length; i++) {
      const element = this.caDocumentType[i];
      if(id == element.id){
        return element.documentType;
      }
    }
  }

  statusName(id){
    for (let i = 0; i < this.caDocumentStatus.length; i++) {
      const element = this.caDocumentStatus[i];
      if(id == element.id){
        return element.status;
      }
    }
  }

  privacyName(id){
    for (let i = 0; i < this.caPrivacy.length; i++) {
      const element = this.caPrivacy[i];
      if(id == element.id){
        return element.privacy;
      }
    }
  }

  save() {
    if(this.data.id == 0){
      let country = this.searchUserForm.controls.userType.value;
          country.forEach(element => {
            if(element != 0){
              this.data.country.push(element);
            }
          });
    }
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

  view(){
    console.log(this.data.scopeDescription);
  }

  deleteDocument(id, i) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Document?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if(id != undefined && id != 0){
          this._services.service_general_delete('AdminCenter/ScopeDocument/'+ id).subscribe((data) =>{
            console.log('respuesta de eliminacion documento', data);
            if (data.success) {
              
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Document was deleted'
                },
                width: "350px"
              });
              this.data.documentServiceCountries.splice(i,1);
            }
          }, (error) => {
              console.error('error con el delete', error);
              const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Warning",
                body: `Try again later`
              },
              width: "350px"
              });
          })
        }
        else{  
              this.data.documentServiceCountries.splice(i,1); 
        }
        
      }
    });
  }

}
