import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-inventory',
  templateUrl: './dialog-inventory.component.html',
  styleUrls: ['./dialog-inventory.component.css']
})
export class DialogInventoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

    inventorye: any = {};
    user:       any = {};

  ngOnInit(): void {
    console.log("DATA QUE RECIBE MODAL INVENTORI: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    if(this.data.id == 0 && this.data.operacion == 'insertar'){
       this.inventorye = {
          id: 0,
          "propertyReportSectionId": this.data.id,
          "item": "",
          "description": "",
          "quantity": null,
          "createdBy": null,
          "createdDate": new Date(),
          "updatedBy": this.user.id,
          "updatedDate": new Date(),
          "photosInventories": []
          }
        }
        else{
          this.inventorye = this.data;
        }
        console.log(this.data);
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


              let ext = file.type.split("/");
              this.inventorye.photosInventories.push({
                    "id": 0,
                    "sectionInventory": this.data.id,
                    "photoName" : droppedFile.relativePath,
                    "photo": encoded,
                    "photoExtension": ext[1],
                    "createdBy": this.user.id,
                    "createdDate": new Date(),
                    "updatedBy": this.user.id,
                    "updatedDate": new Date(),
                    "base64": imageUrl
              })            
            }
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

  doc(){
    document.getElementById("doc").click();
  }

  save(){
    this.inventorye.success = true;
    this.dialogRef.close(this.inventorye);
  }
}
