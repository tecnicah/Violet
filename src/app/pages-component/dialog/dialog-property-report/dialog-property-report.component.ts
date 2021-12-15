import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogInventoryComponent } from '../dialog-inventory/dialog-inventory.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-property-report',
  templateUrl: './dialog-property-report.component.html',
  styleUrls: ['./dialog-property-report.component.css']
})
export class DialogPropertyReportComponent implements OnInit {

  dataSource:any[] = [
    {uno: "Lorem Ipsum", dos: "Lorem Ipsum", tres: 6, cuatro: 2},
    {uno: "Lorem Ipsum", dos: "Lorem Ipsum", tres: 6, cuatro: 2}
  ];
  displayedColumns: string[] = ['Item', 'Description', 'Quantity', 'Photos', 'Action'];

  temporalDocument: any[] = [];
  user:               any = {};
  allUser:          any[] = [];
  temporalPhotos:   any[] = [];
  StatusPropertySection: any[] = [];
  PropertySection: any[] = [];
  caNumbers:        any[] = [];
  housingList:      any;

  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log(this.data);
    this.housingList = this.data.housingList;
    this.data.createdBy = this.user.id;
    this.data.createdDate = new Date();
    this.data.date =        new Date();
    if(this.data.id != 0){
      this._services.service_general_get('PropertyReport/GetPropertyReportById?id='+this.data.id).subscribe(r=>{
        if(r.success){
          this.data = r.result;
          console.log(r);
          for(let i = 0; i <this.data.propertyReportSections.length;i++ ){
            for(let j = 0; j < this.data.propertyReportSections[i].photosPropertyReportSections.length; j++){
              this.data.propertyReportSections[i].photosPropertyReportSections[j].img = this._services.url_images+this.data.propertyReportSections[i].photosPropertyReportSections[j].photo;
            }
            for (let m = 0; m < this.data.propertyReportSections[i].sectionInventories.length; m++) {
              for (let n = 0; n < this.data.propertyReportSections[i].sectionInventories[m].photosInventories.length; n++) {
                this.data.propertyReportSections[i].sectionInventories[m].photosInventories[n].base64 = this._services.url_images+this.data.propertyReportSections[i].sectionInventories[m].photosInventories[n].photo;
              }              
            }
          }
        }
      })
    }else{
      this.data.propertyReportSections = [];
    }

    this._services.service_general_get('User').subscribe(r=>{
      this.allUser = r.result;
    })
      this.catalogos();
  }

  async catalogos(){
    this.StatusPropertySection = await this._services.getCatalogueFrom('GetStatusPropertySection');
    this.PropertySection = await this._services.getCatalogueFrom('GetPropertySection');
  }

  getusername(id){
    for (let i = 0; i < this.allUser.length; i++) {
      const element = this.allUser[i];
      if(element.id == id){
        return element.name+" "+element.lastName+" "+element.motherLastName;
      }
      
    }
  }

  public files: NgxFileDropEntry[] = [];
  
  public dropped(files: NgxFileDropEntry[], a) {
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
              this.data.propertyReportSections[a].photosPropertyReportSections.push({
                    id: 0,
                    propertyReportId: this.data.id,
                    photo: encoded,
                    photoExtension: ext[1],
                    createdBy: this.user.id,
                    createdDate: new Date(),
                    updatedBy: this.user.id,
                    updatedDate: new Date(),
                    img: imageUrl
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

  public fileOver(event, a) {
    console.log(event);
  }

  public fileLeave(event, a) {
    console.log(event);
  }


  addInventory(a){

    const dialogRef = this._dialog.open(DialogInventoryComponent,{
      data: {id : 0, propertyid: this.data.id},
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(this.data.propertyReportSections[a].sectionInventories){}else{
        this.data.propertyReportSections[a].sectionInventories = [];
      }
        this.data.propertyReportSections[a].sectionInventories.push(result);
    })
  }

  editInventory(data:any, a, e){
    const dialogRef = this._dialog.open(DialogInventoryComponent,{
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.data.propertyReportSections[a].sectionInventories[e] = result;
    })
  }

  Delete(a,i){
      this.temporalPhotos[a].splice(i,1);
  }

  addSectio(){
    this.data.propertyReportSections.push({
      show: true,
      id: 0,
      propertyReport: this.data.id,
      propertySection: 0,
      status: 0,
      housingList: this.data.id,
      reportDate: new Date(),
      reportDetails: new Date(),
      createdBy: this.user.id,
      createdDate: new Date(),
      updatedBy: this.user.id,
      updatedDate: new Date(),
      photosPropertyReportSections: []
    })
  }

  removeSecction(a, id){
      if(id === 0){
        this.data.propertyReportSections.splice(a,1);
      }
  }

  save(){
    this.data.updatedBy = this.user.id;
    this.data.updatedDate = new Date();
    console.log(this.data);
        this.__loader__.showLoader();
    if(this.data.id ==0){
      this._services.service_general_post_with_url('PropertyReport/PostPropertyReport',this.data).subscribe(r=>{
        if(r.success){
            this.__loader__.hideLoader();
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Property Report added"
              },
              width: "350px"
            });
        }
      })
    }else{
      this._services.service_general_put('PropertyReport/PutPropertyReport',this.data).subscribe(r=>{
        if(r.success){
            this.__loader__.hideLoader();
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Property Report adited"
              },
              width: "350px"
            });
        }
      })
    }
  }
}
