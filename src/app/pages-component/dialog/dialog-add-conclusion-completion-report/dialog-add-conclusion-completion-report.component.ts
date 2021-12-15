import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';


@Component({
  selector: 'app-dialog-add-conclusion-completion-report',
  templateUrl: './dialog-add-conclusion-completion-report.component.html',
  styleUrls: ['./dialog-add-conclusion-completion-report.component.css']
})
export class DialogAddConclusionCompletionReportComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }
  today = new Date();
  user: any = {};
  temporalDocument: any = {};
  comment;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('data que recibe dialog conclusion', this.data);
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
              this.temporalDocument = {
                "id": 0,
                "name": droppedFile.relativePath,
                "filePath": encoded,
                "fileExtension": ext[ext.length - 1],
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
  public active_comment: boolean = false;
  validForm() {
    if(this.comment == undefined){
      this.active_comment = true;
    }
    if((this.comment != undefined || this.comment == '' )){
      this.save();
    }

  }

  save() {
    console.log('save conclution', this.data);
    this._services.service_general_post_with_url('ReportDay/Add/Conclusion', {
      "id": 0,
      "serviceReportDayId": this.data.id,
      "conclusion": this.comment,
      "fileName": this.temporalDocument.name,
      "filePath": this.temporalDocument.filePath,
      "fileExtension": this.temporalDocument.fileExtension,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date()
    }).subscribe(resp => {
      if (resp.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Conclusion saved"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
      this.temporalDocument = {};
    });
  }
}
