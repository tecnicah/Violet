import { Component, OnInit, Inject } from '@angular/core';
import { FileSystemDirectoryEntry, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-admin-center-emergency',
  templateUrl: './dialog-admin-center-emergency.component.html',
  styleUrls: ['./dialog-admin-center-emergency.component.css']
})
export class DialogAdminCenterEmergencyComponent implements OnInit {

  typeResources: any[]= [];
  temporalDocument = [];
  data_:any = {
    photoCityEmergencies: []
  }

  authoDate = new Date();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  validaNumericos(event){
    console.log("valid");
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || 
       event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
       event.key == 'Backspace' ){
       return true;
    }
  
     return false;
  }
  
  ngOnInit(): void {
    console.log("data que reibe modal info: ", this.data);
    this._services.service_general_get("CountryAdminCenter/GetTypeResources")
        .subscribe((data => {
          console.log("Type",data);
            if (data.success) {
              this.typeResources = data.result;
            }
            
          }));
    if(this.data != null){
        this.data_ = this.data;
        if(!this.data_.photoCityEmergencies){ this.data_.photoCityEmergencies = []}
        if(this.data_.photoCityEmergencies == null){ this.data_.photoCityEmergencies = []}
    }
  }

  save(){
    this.data_.success = true;
    this.dialogRef.close(this.data_);
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[], type) {
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
              let ext = file.type.split("/");
                this.data_.photoCityEmergencies.push({
                  "id": 0,
                  "idEmergencyAbout": this.data_.idCity,
                  "fileName": droppedFile.relativePath,
                  "fileExtencion": ext[ext.length-1],
                  "fileRequest": encoded,
                  "createdDate": new Date(),
                }) 
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
  //*********************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*********************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //*********************************************//
  deletePhotoEmergency(item, i){
    console.log(item);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this photo?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if(item.id == 0){
          this.data_.photoCityEmergencies.splice(i,1);
        }else{
          this._services.service_general_delete("CountryAdminCenter/DeletePhotoEmergency?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Photo deleted successfull'
                },
                width: "350px"
              });
              this.data_.photoCityEmergencies.splice(i,1);
            }
          }))
        }
      }
    })
  }
}
