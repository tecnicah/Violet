import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-admin-center-add-info',
  templateUrl: './dialog-admin-center-add-info.component.html',
  styleUrls: ['./dialog-admin-center-add-info.component.css']
})
export class DialogAdminCenterAddInfoComponent implements OnInit {

  temporalDocument = [];
  data_:any = {
    photoCityAbouts : [],
    photoCityAttractions: [],
    photoWhatToDos: [],
    photoWhereEats: []
  }

  authoDate = new Date();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("data que reibe modal info: ", this.data);
    if(this.data != null){
      if(this.data.type == 1 && (this.data.title || this.data.subtitle || this.data.description)){
        this.data.type = 1;
        this.data_ = this.data;
        this.data_.idCity = this.data.idCity;
        return
      }

      if(this.data.type == 2 && (this.data.title || this.data.subtitle || this.data.description)){
        this.data.type = 2;
        this.data_ = this.data;
        this.data_.idCity = this.data.idCity;
        return
      }

      if(this.data.type == 4 && (this.data.title || this.data.subtitle || this.data.description)){
        this.data.type = 4;
        this.data_ = this.data;
        this.data_.idCity = this.data.idCity;
        return
      }

      if(this.data.type == 5 && (this.data.title || this.data.subtitle || this.data.description)){
        this.data.type = 5;
        this.data_ = this.data;
        this.data_.idCity = this.data.idCity;
        return
      }

      this.data_.type = this.data.type;
      this.data_.idCity = this.data.idCity;
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

              if(this.data_.type == 1){
                this.data_.photoCityAbouts.push({
                  "id": 0,
                  "idCityAbout": this.data_.idCity,
                  "fileName": droppedFile.relativePath,
                  "fileExtencion": ext[ext.length-1],
                  "fileRequest": encoded,
                  "createdDate": new Date(),
                }) 
              }
              
              if(this.data_.type == 2){
                this.data_.photoCityAttractions.push({
                  "id": 0,
                  "idCityAbout": this.data_.idCity,
                  "fileName": droppedFile.relativePath,
                  "fileExtencion": ext[ext.length-1],
                  "fileRequest": encoded,
                  "createdDate": new Date(),
                }) 
              }

              if(this.data_.type == 4){
                this.data_.photoWhatToDos.push({
                  "id": 0,
                  "idCityAbout": this.data_.idCity,
                  "fileName": droppedFile.relativePath,
                  "fileExtencion": ext[ext.length-1],
                  "fileRequest": encoded,
                  "createdDate": new Date(),
                }) 
              }

              if(this.data_.type == 5){
                this.data_.photoWhereEats.push({
                  "id": 0,
                  "idCityAbout": this.data_.idCity,
                  "fileName": droppedFile.relativePath,
                  "fileExtencion": ext[ext.length-1],
                  "fileRequest": encoded,
                  "createdDate": new Date(),
                }) 
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
  //*********************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*********************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //*********************************************//
  //DELETE PHOTO ABOUT//
  deletePhoto(item, i){
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
          this.data_.photoCityAbouts.splice(i,1);
        }else{
          this._services.service_general_delete("CountryAdminCenter/DeletePhotoAbout?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Photo deleted successfull'
                },
                width: "350px"
              });
              this.data_.photoCityAbouts.splice(i,1);
            }
          }))
        }
      }
    })
  }
  //CITY ATTRACTIONS//
  deletePhotoAttraction(item, i){
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
          this.data_.photoCityAttractions.splice(i,1);
        }else{
          this._services.service_general_delete("CountryAdminCenter/DeletePhotoAttraction?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Photo deleted successfull'
                },
                width: "350px"
              });
              this.data_.photoCityAttractions.splice(i,1);
            }
          }))
        }
      }
    })
  }
  //CITY WHAT TO DO//
  deletePhotoToDo(item, i){
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
          this.data_.photoWhatToDos.splice(i,1);
        }else{
          this._services.service_general_delete("CountryAdminCenter/DeletePhotoWhatToDo?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Photo deleted successfull'
                },
                width: "350px"
              });
              this.data_.photoWhatToDos.splice(i,1);
            }
          }))
        }
      }
    })
  }
  //CITY WHAT TO EAT//
  deletePhotoEat(item, i){
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
          this.data_.photoWhereEats.splice(i,1);
        }else{
          this._services.service_general_delete("CountryAdminCenter/DeletePhotoWhereEat?id=" + item.id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: 'Photo deleted successfull'
                },
                width: "350px"
              });
              this.data_.photoWhereEats.splice(i,1);
            }
          }))
        }
      }
    })
  }
}
