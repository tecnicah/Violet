import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';

@Component({
  selector: 'app-dialog-inventory',
  templateUrl: './dialog-inventory.component.html',
  styleUrls: ['./dialog-inventory.component.css']
})
export class DialogInventoryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }
  loader: LoaderComponent = new LoaderComponent();

  ca_items_inventory = [{ id: 'Sofa' },
  { id: 'Love seat' },
  { id: 'Chair' },
  { id: 'Chaise' },
  { id: 'Table lamp' },
  { id: 'Floor lamp' },
  { id: 'Desk lamp' },
  { id: 'Chandelier' },
  { id: 'Coffee table ' },
  { id: 'Book Shelf' },
  { id: 'Curtain' },
  { id: 'Cushion' },
  { id: 'Carpet' },
  { id: 'Ceiling Fan' },
  { id: 'AC' },];
  inventorye: any = {};
  user: any = {};

  ngOnInit(): void {
    console.log("DATA QUE RECIBE MODAL INVENTORI: ", this.data);
    this.user = JSON.parse(localStorage.getItem('userData'));
    debugger;
    this.get_items_section(this.data.section);
    if (this.data.id == 0 && this.data.operacion == 'insertar') {
      this.inventorye = {
        id: 0,
        "propertyReportSectionId": this.data.propertyReportSectionId,
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
    else {
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
                "photoName": droppedFile.relativePath,
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

  doc() {
    document.getElementById("doc").click();
  }

  save() {

    console.log("AddSectionInventory this.inventorye: ", this.inventorye)
    if (this.inventorye.id == 0) {
      this.loader.showLoader();
      this._services.service_general_put("HousingList/AddSectionInventory", this.inventorye).subscribe((response_bd => {
        this.loader.hideLoader();
        debugger;
        if (response_bd.success) {
          console.log("HousingList/AddSectionInventory ==============================", response_bd);
          // sectionInventories = response_bd.result.value;
          debugger;
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data"
            },
            width: "350px"
          });

          response_bd.result.value.success = true;
          this.dialogRef.close(response_bd.result.value);
        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
    }
    else { //solo se actualizo el inventario existente
   //   this.inventorye.success = true;
    //  this.dialogRef.close(this.inventorye);
    this.update_inventory();
    }


  }

  update_inventory(){
    this.loader.showLoader();
      this._services.service_general_put("HousingList/EditSectionInventory", this.inventorye).subscribe((response_bd => {
        this.loader.hideLoader();
        debugger;
        if (response_bd.success) {
          console.log("HousingList/EditSectionInventory ==============================", response_bd);
          // sectionInventories = response_bd.result.value;
          debugger;
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Deleted Data"
            },
            width: "350px"
          });

          response_bd.result.value.success = true;
          this.dialogRef.close(response_bd.result.value);
        }
      }), (err) => {
        this.loader.hideLoader();
        console.log("error al eliminar la cuenat de banco: ", err);
      });
  }

  all_items = [];
  get_items_section(section) {
debugger;

    this._services.service_general_post_with_url('HousingList/GetItemsSectionInventory', section).subscribe(r => {

      if (r.success) {
        console.log("HousingList/GetItemsSectionInventory", r);
        this.all_items = r.result.value;
      }
    })
  }

   //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE IN//
  deletePhoto(p,id_photo) {
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
        
        if (id_photo == 0) {
          // aca va la función cuando no esta en la base

          this.inventorye.photosInventories.splice(p, 1);
        }
        else {
          // aca va la función cuando ya esta ne la BD
     
         this.delete_photo_section(id_photo);
         // console.log("lo que regreso el servicio ==============================");
        }
      }
    })
  };

  delete_photo_section(id) {

    this.loader.showLoader();
    this._services.service_general_put("HousingList/delete_photo_section_inventory", id).subscribe((response_bd => {
      this.loader.hideLoader();
      if (response_bd.success) {
        console.log("responde_bd delete photos photosInventories ==============================", response_bd);
       
        this.inventorye.photosInventories = response_bd.result;
      
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al eliminar la cuenat de banco: ", err);
    });
  }


}
