import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-add-documents-detail',
  templateUrl: './dialog-add-documents-detail.component.html',
  styleUrls: ['./dialog-add-documents-detail.component.css']
})
export class DialogAddDocumentsDetailComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _dialog: MatDialog) { }

    documents: any = {comment: ""}
    caDocumentType: any[] = [];
    temporalDocument: any = {};
    user: any = {};
    today: any = "";
  
    ngOnInit(): void {
      console.log(" Recibido para iniciar a agregar: ========================",this.data)
      this.user = JSON.parse(localStorage.getItem('userData'));
      this.today = new Date();
      this.catalogos();
    }
  
    public default_dependents: boolean = true;
    public ca_privacy = [];
    async catalogos() {
      this.ca_privacy = await this._services.getCatalogueFrom('GetPrivacy');
      this._services.service_general_get("Catalogue/GetDocumentType/" + this.data.Cat_Service_id).subscribe((data => {
        console.log("Catalogue/GetDocumentType/", data);
        if (data.success) {
          this.caDocumentType = data.result;
        }
      }))
    }
  
  
    public files: NgxFileDropEntry[] = [];
  
    public dropped(files: NgxFileDropEntry[]) {
      this.files = files;
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
              reader.onload = () => {
                let imageUrl = reader.result;
                let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                if ((encoded.length % 4) > 0) {
                  encoded += '='.repeat(4 - (encoded.length % 4));
                }
  
  
                let ext = droppedFile.relativePath.split(".");
                debugger;
                this.temporalDocument = {
                  "id": 0,
                  "fileRequest": encoded,
                  "fileExtension": ext[ext.length - 1],
                  "documentType": "",
                  "relationship": "",
                  "issueDate": "",
                  "expirationDate": "",
                  "issuingAuthority": "",
                  "countryOrigin": "",
                  "comment": "",
                  "privacy": "",
                  "createdBy": this.user.id,
                  "createdDate": new Date(),
                  "name": droppedFile.relativePath
                }
              };
            });
  
  
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }
  
    public fileOver(event) {
      console.log(event);
    }
  
    public fileLeave(event) {
      console.log(event);
    }
  
    save() {
  
      this.temporalDocument = {
        "id": 0,
        "fileRequest": this.temporalDocument.fileRequest,
        "fileExtension": this.temporalDocument.fileExtension,
        "documentType": this.documents.documentType,
        "relationship": this.documents.relationship,
        "issueDate": this.documents.issueDate,
        "expirationDate": this.documents.expirationDate,
        "issuingAuthority": "",
        "countryOrigin": this.documents.countryOrigin,
        "privacy": this.documents.privacy,
        "comment": this.documents.comment,
        "createdBy": this.temporalDocument.createdBy,
        "createdDate": this.temporalDocument.createdDate,
        "fileName": this.temporalDocument.name,
        "updatedBy": this.user.id,
        "updatedDate": new Date(),
        "success": true,
        "workOrderServiceId": this.data.workOrderServicesId
      }
      this.call_service_send_propertys();
     
    }

    loader: LoaderComponent = new LoaderComponent();

    call_service_send_propertys() {
      this.loader.showLoader();
  
      console.log("Este es el objeto a insertarse de docuemntos:" , JSON.stringify(this.temporalDocument));

      this._services.service_general_post_with_url("ServiceRecord/AddDocumentsServiceDetail", this.temporalDocument).subscribe((resp => {
        this.loader.hideLoader();
  
        console.log("resultado de ServiceRecord/AddDocumentsServiceDetail: ", resp);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Document Saved"
          },
          width: "350px"
        });


        this.dialogRef.close(resp);
  
      }), (err) => {
        this.loader.hideLoader();
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body: "Save Error"
          },
          width: "350px"
        });
        console.log("Error en SendPropertys: ", err);
      })
    }
  
  }
  