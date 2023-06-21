import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogInventoryComponent } from '../dialog-inventory/dialog-inventory.component';
import { DialogKeyComponent } from '../dialog-key/dialog-key.component';
import { DialogAttendeesComponent } from '../dialog-attendees/dialog-attendees.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';

@Component( {
    selector: 'app-dialog-inspectionrepairs',
    templateUrl: './dialog-inspectionrepairs.component.html',
    styleUrls: ['./dialog-inspectionrepairs.component.css']
  }

) export class DialogInspectionrepairsComponent implements OnInit {

  constructor(public _dialog:MatDialog, public dialogRef: MatDialogRef < any >, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) {}

  mostrarTarjeta : any= {
    repairs: false,
      move_in: false,
      move_out: false
  };

  loader:LoaderComponent=new LoaderComponent();

  user: any= {};

  data_move_out:any= {
    propertyReportSections: [],
      keyInventories: [],
      attendees: []
  };

  data_move_in:any= {
    propertyReportSections: [],
      keyInventories: [],
      attendees: []
  };

  dateNew = new Date();

  ngOnInit(): void {
    this.loader.showLoader();
    console.log("DATA QUE RECIBE EL MODAL DE INSPECTIONS & REPAIRS: ", this.data);
    this.user=JSON.parse(localStorage.getItem('userData'));
   // console.log("User info: ", this.user);
    this.catalogos();
    this.supplierPartner();
    this.llenarJSON();
  }

  //************************************************//
  llenarJSON() {

    console.log("Esta es la dara recibida que carga todo en el I&R", this.data)

    if(this.data.repairs) {
      this.data_repairs=this.data.repairs;
      this.data_final.repairs = this.data_repairs;
    }

    if(this.data.inspections) {
      this.data_inspection=this.data.inspections;
      this.data_final.inspection = this.data_inspection;
    }

    if(this.data.propertyReports) {
      for(let i=0; i < this.data.propertyReports.length; i++) {
        if(this.data.propertyReports[i].propertyInspection==1) {
          this.data_move_in=this.data.propertyReports[i];
          this.data_final.propertyReportSections = this.data_move_in;
        }

        if(this.data.propertyReports[i].propertyInspection==2) {
          this.data_move_out=this.data.propertyReports[i];
          this.data_final.propertyReportSectionsOut = this.data_move_out;
        }
      }

    }
    this.loader.hideLoader();
  }
  //************************************************//
  supplierPartner(){
    this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerServiceByServices?workOrderService="+this.data.workOrderServicesId+"&supplierType="+this.data.supplierType+"&serviceLine="+2).subscribe((data => {
      if (data.success) {
        console.log('DATA CONSULTA SUPPLIER PARTNER: ',data.result.value);
        this.SupplierCompany = data.result.value;
       }
    }), (err)=>{
      console.log("no se realizo la consulta por falta de parametro");
    });
  }
  //************************************************//
  //CONSULTA DE INFORMACION CATALOGOS//
  ca_currency=[];
  ca_repair=[];
  ca_propertySection=[];
  SupplierCompany=[];
  ca_statuspropertySection=[];
  ca_relation = [];

  async catalogos() {
    this.ca_currency=await this._services.getCatalogueFrom('GetCurrency');
    this.ca_repair=await this._services.getCatalogueFrom('GetRepairType');
    this.ca_propertySection=await this._services.getCatalogueFrom('GetPropertySection');
    this.ca_statuspropertySection=await this._services.getCatalogueFrom('GetStatusPropertySection');
    this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    /*
    this._services.service_general_get('Catalogue/GetSupplierCompany?id=2').subscribe(r=> {
        if(r.success) {
          for (let i=0; i < r.result.length; i++) {
            const element=r.result[i];
            this.SupplierCompany.push(element)
          }
        }
      });

    this._services.service_general_get('Catalogue/GetSupplierCompany?id=5').subscribe(r=> {
        if(r.success) {
          for (let i=0; i < r.result.length; i++) {
            const element=r.result[i];
            this.SupplierCompany.push(element)
          }
        }
      })
      */
      this.loader.hideLoader();
  }
  //************************************************//
  data_inspection=[];
  //AGREGAR NUEVO INSPECTION//
  addInspectionDate() {
    this.data_inspection.push( {
        id: 0,
        housingList: this.data.id,
        initialInspectionDate: null,
        finalInspectionDate: null,
        createdBy: this.user.id,
        createdDate: new Date(),
        updateBy: this.user.id,
        updatedDate: new Date(),
        idServiceDetail : this.data.idServiceDetail_current
      })
  }
  //DELETE INSPECTION//
  deleteInspection(k) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this inspection?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_inspection.splice(k, 1);
      }
    })

  }
  //************************************************//
  data_repairs=[];
  //REPAIRS//
  addRepairs() {
    this.data_repairs.push( {
        id: 0,
        housingList: this.data.id,
        repairType: null,
        supplierPartner: null,
        repairStartDate: null,
        repairEndDate: null,
        totalDays: 0,
        totalCostRepair: 0,
        currency: null,
        comments: null,
        createdBy: this.user.id,
        createdDate: new Date(),
        updateBy: this.user.id,
        updatedDate: new Date(),
        documentRepairs: [], 
        idServiceDetail : this.data.idServiceDetail_current
      }

    )
  }
  //************************************************//
  //FUNCION PARA GUARDAR INSPECIONS AND REPAIRS//
  guardar_inspectionAndRepairs() {
    if(this.data.status_ == 'nuevo') {
      this.loader.showLoader();
      this.pasar_Informacion();
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Save Data"
        },
        width: "350px"
      });
      this.loader.hideLoader();
    }
    else {
      this.updateInspection();
    }
  }
  //************************************************//
  //FUNCION PARA ACTUALIAZAR LA SECCION REPAIRS//
  updateInspection() {
    this.loader.showLoader();
    console.log("DATA A GUARDAR RERPAIS: ", this.data_repairs);

    for (let i=0; i < this.data_repairs.length; i++) {
      if(this.data_repairs[i].id !=0) {
        this._services.service_general_put("HousingList/PutRepair", this.data_repairs[i]).subscribe((data=> {
              if(data.success) {
                console.log(data);
                this.loader.hideLoader();
              }
            }

          ), (err)=> {
            this.loader.hideLoader();
            console.log("error al guardar los repairs: ", err);
          }

        )
      }

      else {
        this._services.service_general_post_with_url("HousingList/PostRepair", this.data_repairs[i]).subscribe((data=> {
              if(data.success) {
                console.log(data);
                this.loader.hideLoader();
              }
            }

          ), (err)=> {
            this.loader.hideLoader();
            console.log("error al guardar los repairs: ", err);
          }

        )
      }
    }

    for(let i=0; i < this.data_inspection.length; i++){
      if(this.data_inspection[i].id !=0) {
        this._services.service_general_put("HousingList/PutInspection", this.data_inspection[i]).subscribe((data=> {
              if(data.success) {
                console.log("HousingList/PutInspection - Request: " , this.data_inspection[i] ," response: ",data);
                this.loader.hideLoader();
              }
            }

          ), (err)=> {
            this.loader.hideLoader();
            console.log("error al guardar los repairs: ", err);
          }

        )
      }

      else {
        this._services.service_general_post_with_url("HousingList/PostInspection", this.data_inspection[i]).subscribe((data=> {
              if(data.success) {
                console.log("HousingList/PostRepair - Request: " , this.data_inspection[i] ," response: ",data);
                this.loader.hideLoader();
              }
            }

          ), (err)=> {
            this.loader.hideLoader();
            console.log("error al guardar los repairs: ", err);
          }

        )
      }
    }

    const dialog=this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Saved Data"
        }

        ,
        width: "350px"
      }

    );
  }
  //************************************************//
  //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveIn() {
    this.data_move_in.propertyReportSections.push( {
        "id":0,
        "propertyReport": this.data_move_in.id,
        "propertySection":0,
        "status": 0,
        "needRepair":false,
        "reportDate": null,
        "reportDetails":null,
        "createdBy":this.user.id,
        "createdDate": new Date(),
        "updatedBy":this.user.id,
        "updatedDate":new Date(),
        "photosPropertyReportSections": [],
        "sectionInventories": []
      })
  }
  //************************************************//
  //GUARDAR TARJETA ITERABLE DE MOVE OUT//
  save() {
    debugger;
    this.loader.showLoader();
    console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION MOVE IN: ", this.data_move_in);
    if(this.data.status_ == 'nuevo'){
      this.data_move_in.id=0;
      this.data_move_in.propertyInspection=1; //move in 
      this.data_move_in.housingList=this.data.id,
      this.data_move_in.propertyAddress=this.data.address;
      this.data_move_in.zipCode=this.data.zip;
      this.data_move_in.createdBy=this.user.id;
      this.data_move_in.createdDate=new Date();
      this.data_move_in.updatedBy=this.user.id;
      this.data_move_in.updatedDate=new Date();
      this.data_move_in.idServiceDetail = this.data.idServiceDetail_current;
  
      this.pasar_Informacion();
      console.log(this.data_move_in);
      console.log(this.data_move_out);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Saved Data"
        },
        width: "350px"
      });
      this.loader.hideLoader();
    }else{
      //ACTUALIZACION DEL REGISTROS//
      this.data_move_in.propertyInspection=1; //move in 
      this.data_move_in.housingList=this.data.id,
      this.data_move_in.propertyAddress=this.data.address;
      this.data_move_in.zipCode=this.data.zip;
      this.data_move_in.createdBy=this.user.id;
      this.data_move_in.createdDate=new Date();
      this.data_move_in.updatedBy=this.user.id;
      this.data_move_in.updatedDate=new Date();
      this.data_move_in.idServiceDetail = this.data.idServiceDetail_current;

      if(this.data_move_in.id && this.data_move_in.id!=0){
        console.log("data_move_in", this.data_move_in);
        this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_in).subscribe((data => {
          if(data.success){
            console.log(data);
             const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Updated Data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
            }
        }))
      }else{
        this.data_move_in.id=0;
        this._services.service_general_post_with_url("PropertyReport/PostPropertyReport", this.data_move_in).subscribe((data => {
          if(data.success){
            console.log("response PropertyReport/PostPropertyReport =============",data);
             const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Saved Data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
            }
        }))
      }
    }
  }
  //MOVE OUT//
  save_out() {
    this.loader.showLoader();
    console.log("ENTRA A GUARDAR O ACTUALIZAR INFORMACION MOVE OUT: ", this.data_move_out);
    if(this.data.status_ == 'nuevo'){
    
      this.data_move_out.id=0;
      this.data_move_out.propertyInspection=2;
      this.data_move_out.housingList=this.data.id,
      this.data_move_out.propertyAddress=this.data.address;
      this.data_move_out.zipCode=this.data.zip;
      this.data_move_out.createdBy=this.user.id;
      this.data_move_out.createdDate=new Date();
      this.data_move_out.updatedBy=this.user.id;
      this.data_move_out.updatedDate=new Date();
      this.data_move_out.idServiceDetail = this.data.idServiceDetail_current;

      this.pasar_Informacion();
      console.log(this.data_move_in);
      console.log(this.data_move_out);
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Saved Data"
        },
        width: "350px"
      });
      this.loader.hideLoader();
    }else{

      this.data_move_out.propertyInspection=2;
      this.data_move_out.housingList=this.data.id,
      this.data_move_out.propertyAddress=this.data.address;
      this.data_move_out.zipCode=this.data.zip;
      this.data_move_out.createdBy=this.user.id;
      this.data_move_out.createdDate=new Date();
      this.data_move_out.updatedBy=this.user.id;
      this.data_move_out.updatedDate=new Date();
      this.data_move_out.idServiceDetail = this.data.idServiceDetail_current;

      if(this.data_move_out.id && this.data_move_out.id!=0){
        console.log("data_move_out", this.data_move_out);
        this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_out).subscribe((data => {
          if(data.success){
            console.log(data);
             const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Updated Data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
            }
        }))
      }else{
        this.data_move_in.id=0;
        this._services.service_general_post_with_url("PropertyReport/PostPropertyReport", this.data_move_out).subscribe((data => {
          if(data.success){
            console.log(data);
             const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Saved Data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
            }
        }))
      }
      /*
      //ACTUALIZACION DEL REGISTROS//
      this._services.service_general_put("PropertyReport/PutPropertyReport", this.data_move_out).subscribe((data => {
        if(data.success){
          console.log(data);
           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Update Data"
                },
                width: "350px"
              });
              this.loader.hideLoader();
          }
      }))
      */
    }
  }
  //************************************************//
  data_final : any= {};
  pasar_Informacion() {
    this.data_final = {
        "inspection": this.data_inspection,
        "repairs": this.data_repairs,
        "propertyReportSections": this.data_move_in,
        "propertyReportSectionsOut": this.data_move_out
    }
  }
  //************************************************//
  close_Modal() {
    this.pasar_Informacion();
    this.dialogRef.close(this.data_final);
  }
  //************************************************//
  public fileOver(event) {
    console.log(event);
  }
  //************************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //FUNCION PARA AGREGAR MAS DOCUMENTOS//
  addDocument(i) {
    document.getElementById('doc'+i).click();
  }
  //************************************************//
  //FUNCION PARA ELIMINAR DOCUMENTOS//
  deleteDocument(i, j) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_repairs[i].documentRepairs.splice(j, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR REPAIR//
  deleteRepair(i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this repair?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_repairs.splice(i, 1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE IN//
  deletePhoto(r, p){
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
        this.data_move_in.propertyReportSections[r].photosPropertyReportSections.splice(p,1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deletePhotoOut(o, p){
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
        this.data_move_out.propertyReportSections[o].photosPropertyReportSections.splice(p,1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveIn(i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move In?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_in.propertyReportSections.splice(i,1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA ELIMINAR FOTOS DENTRO DE MOVE OUT//
  deleteMoveOut(i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Move Out?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_move_out.propertyReportSections.splice(i,1);
      }
    })
  }
  //************************************************//
  //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
  addInventoriModal(r) {
    console.log("entra a abrir modal inventori");

    const dialog=this._dialog.open(DialogInventoryComponent, {
        data: {
          id: 0, operacion: 'insertar'
        },
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);
        result.propertyReportSectionId=this.data_move_in.propertyReportSections[r].id;
        this.data_move_in.propertyReportSections[r].sectionInventories.push(result);

      })
  }
  //************************************************//
  //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
  editSectionInventory(data_inv, pos, r) {
    console.log("entra a abrir modal inventori EDICION");

    const dialog=this._dialog.open(DialogInventoryComponent, {
        data: data_inv,
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          this.data_move_in.propertyReportSections[r].sectionInventories[pos]=result;
        }
      })
  }
  //************************************************//
  //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
  addKeyInventory() {
    console.log("entra a abrir modal inventori");

    const dialog=this._dialog.open(DialogKeyComponent, {
        data: {
          id: 0, operacion: 'insertar', propertyReport: this.data_move_in.id
        },
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          result.propertyReport=this.data_move_in.id;
          this.data_move_in.keyInventories.push(result);
        }
      })
  }
  //************************************************//
  //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
  editKeyInventory(data_inv, pos) {
    console.log("entra a abrir modal key inventory EDICION");

    const dialog=this._dialog.open(DialogKeyComponent, {
        data: data_inv,
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          this.data_move_in.keyInventories[pos]=result;
        }
      })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
  addAttendees() {
    console.log("entra a abrir modal attendees");

    const dialog=this._dialog.open(DialogAttendeesComponent, {
        data: {
          id: 0, sr: this.data.sr, operacion: 'insertar', propertyReport: this.data_move_in.id
        },
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          result.propertyReport=this.data_move_in.id;
          this.data_move_in.attendees.push(result);
        }
      })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttend(data_inv, pos) {
    console.log("entra a abrir modal attend EDICION");

    const dialog=this._dialog.open(DialogAttendeesComponent, {
        data: data_inv,
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);
        if(result.success) {
          this.data_move_in.attendees[pos]=result;
        }
      })
  }
  //************************************************//
  //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
  addFotosMove(r) {
    document.getElementById('doc'+r).click();
  }
  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotos(files: NgxFileDropEntry[], r) {
    this.files=files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry=droppedFile.fileEntry as FileSystemFileEntry;
        const reader=new FileReader();

        fileEntry.file((file: File)=> {

            // Here you can access the real file
            console.log(droppedFile.relativePath);
            console.log(file, this.files);

            fileEntry.file(file=> {
              reader.readAsDataURL(file);
              reader.onload = () => {
                let imageUrl = reader.result;
                let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                if ((encoded.length % 4) > 0) {
                  encoded += '='.repeat(4 - (encoded.length % 4));
                }
  
  
                let ext = droppedFile.relativePath.split(".");

                  this.data_move_in.propertyReportSections[r].photosPropertyReportSections.push( {
                      "id": 0,
                      "propertyReportId": this.data_move_in.propertyReportSections[r].id,
                      "base64": imageUrl,
                      "photo": encoded,
                      "photoExtension": ext[ext.length-1],
                      "createdBy": this.user.id,
                      "createdDate": new Date(),
                      "updatedBy": this.user.id,
                      "updatedDate": new Date(),
                    })
                };
              });
            });
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry=droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //************************************************//
  //CARGA DE DOCUMENTOS PARA SECCION REPAIRS MOVE IN//
  public files: NgxFileDropEntry[]=[];
  public dropped(files: NgxFileDropEntry[], i) {
    this.files=files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry=droppedFile.fileEntry as FileSystemFileEntry;
        const reader=new FileReader();

        fileEntry.file((file: File)=> {

            // Here you can access the real file
            console.log(droppedFile.relativePath);
            console.log(file, this.files);

            fileEntry.file(file=> {
                reader.readAsDataURL(file);

                reader.onload=()=> {
                  let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }


                  let ext=droppedFile.relativePath.split(".");

                  this.data_repairs[i].documentRepairs.push( {
                      "id": 0,
                      "fileRequest": encoded,
                      "fileExtension": ext[ext.length-1],
                      "fileName": droppedFile.relativePath,
                      "repairId": 0,
                      "createdBy": this.user.id,
                      "createdDate": new Date(),
                    }

                  )
                }

                ;
              }

            );


          }

        );
      }

      else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry=droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  //***********************************************************************//
  //***********************************************************************//
  //FUNCION PARA MOVE OUT//
  //************************************************//
  //FUNCION PARA AGREGAR INVENTORY DENTRO DE MOVE IN//
  addInventoriModalOut(r) {
    console.log("entra a abrir modal inventory move out");

    const dialog=this._dialog.open(DialogInventoryComponent, {
        data: {
          id: 0, operacion: 'insertar'
        },
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);
        result.propertyReportSectionId=this.data_move_out.propertyReportSections[r].id;
        this.data_move_out.propertyReportSections[r].sectionInventories.push(result);

      })
  }
  //************************************************//
  //FUNCION PARA EDITAR INVENTORY DENTRO DE MOVE IN//
  editSectionInventoryOut(data_inv, pos, r) {
    console.log("entra a abrir modal inventory EDICION move out");

    const dialog=this._dialog.open(DialogInventoryComponent, {
        data: data_inv,
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);
        if(result.success) {
          this.data_move_out.propertyReportSections[r].sectionInventories[pos]=result;
        }
      })
  }
  //************************************************//
  //FUNCION PARA ABRIR MODAL DE CARGA DE FOTOS//
  addFotosMoveOut(o) {
    document.getElementById('doc'+o).click();
  }
  //************************************************//
  //FUNCION PARA AGREGAR NUEVA SECCION MOVE IN//
  addMoveOut() {
    this.data_move_out.propertyReportSections.push( {
        "id":0,
        "propertyReport": this.data_move_out.id,
        "propertySection":0,
        "status": 0,
        "needRepair":false,
        "reportDate": null,
        "reportDetails":null,
        "createdBy":this.user.id,
        "createdDate": new Date(),
        "updatedBy":this.user.id,
        "updatedDate":new Date(),
        "photosPropertyReportSections": [],
        "sectionInventories": []
      })
  }
  //************************************************//
  //FUNCION AGREGAR KEY INVENTORY DENTRO DE MOVE IN//
  addKeyInventoryOut() {
    console.log("entra a abrir modal inventory move out");

    const dialog=this._dialog.open(DialogKeyComponent, {
        data: {
          id: 0, operacion: 'insertar', propertyReport: this.data_move_out.id
        },
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          result.propertyReport=this.data_move_out.id;
          this.data_move_out.keyInventories.push(result);
        }
      })
  }
  //************************************************//
  //FUNCION EDITAR KEY INVENTORY  DENTRO DE MOVE IN//
  editKeyInventoryOut(data_inv, pos) {
    console.log("entra a abrir modal key inventory EDICION");

    const dialog=this._dialog.open(DialogKeyComponent, {
        data: data_inv,
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          this.data_move_out.keyInventories[pos]=result;
        }
      })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES DENTRO DE MOVE IN//
  addAttendeesOut() {
    console.log("entra a abrir modal attendees move out");

    const dialog=this._dialog.open(DialogAttendeesComponent, {
        data: {
          id: 0, sr: this.data.sr, operacion: 'insertar', propertyReport: this.data_move_out.id
        },
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);

        if(result.success) {
          result.propertyReport=this.data_move_in.id;
          this.data_move_out.attendees.push(result);
        }
      })
  }
  //************************************************//
  //FUNCION EDITAR ATTENDEES  DENTRO DE MOVE IN//
  editAttendOut(data_inv, pos) {
    console.log("entra a abrir modal attend move out EDICION");

    const dialog=this._dialog.open(DialogAttendeesComponent, {
        data: data_inv,
        width: "95%"
      });

    dialog.beforeClosed().subscribe(result=> {
        console.log(result);
        if(result.success) {
          this.data_move_out.attendees[pos]=result;
        }
      })
  }
  //************************************************//
  //CARGA DE FOTOS DE MOVE OUT//
  public droppedFotosOut(files: NgxFileDropEntry[], r) {
    this.files=files;

    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry=droppedFile.fileEntry as FileSystemFileEntry;
        const reader=new FileReader();

        fileEntry.file((file: File)=> {

            // Here you can access the real file
            console.log(droppedFile.relativePath);
            console.log(file, this.files);

            fileEntry.file(file=> {
              reader.readAsDataURL(file);
              reader.onload = () => {
                let imageUrl = reader.result;
                let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                if ((encoded.length % 4) > 0) {
                  encoded += '='.repeat(4 - (encoded.length % 4));
                }
  
  
                let ext = droppedFile.relativePath.split(".");


                  this.data_move_out.propertyReportSections[r].photosPropertyReportSections.push( {
                      "id": 0,
                      "propertyReportId": this.data_move_out.propertyReportSections[r].id,
                      "base64": imageUrl,
                      "photo": encoded,
                      "photoExtension": ext[ext.length-1],
                      "createdBy": this.user.id,
                      "createdDate": new Date(),
                      "updatedBy": this.user.id,
                      "updatedDate": new Date(),
                    })
                };
              });
            });
      }else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry=droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //************************************************//
  getProperty(id){
    for (let i = 0; i < this.ca_propertySection.length; i++) {
     if(this.ca_propertySection[i].id == id){
       return this.ca_propertySection[i].propertySection;
     }
    }
  }
  //************************************************//
  getReltion(id){
    for (let i = 0; i < this.ca_relation.length; i++) {
     if(this.ca_relation[i].id == id){
       return this.ca_relation[i].relationship;
     }
    }
  }

  //FUNCION PARA VER DOCUMENTO//
  showDocumentDialogDetails(url_in){
    const server_url:string = this._services.url_images + url_in;
    window.open( server_url );
  }

  show_hide_all_ = false;
  show_hide_all(option){
      this.show_hide_all_ = option;
      this.mostrarTarjeta.contractDetails = option ;
      this.mostrarTarjeta.paymenType = option;
      this.mostrarTarjeta.costSaving = option;
      this.mostrarTarjeta.renewalDetails = option;
      this.mostrarTarjeta.departureDetails = option;
      this.mostrarTarjeta.landLord = option; 
      this.mostrarTarjeta.move_in = option;
      this.mostrarTarjeta.repairs = option;
      this.mostrarTarjeta.move_out = option;
  };

  ///////////////////////////////////////////////// COSAS NUEVAS JULIO 2022 ////////////////////////////////////////////////

  permanentHome = null;
  

  get_lease_sf() {
    this.loader.showLoader();

    this._services.service_general_get("HousingList/GetHistoricHousingByService?key=" + this.data.id + "&servide_detail_id=" + this.data.idServiceDetail_current).subscribe((response => {
      debugger;
      // this.calc_RentCostSavings();
      this.permanentHome = response.result.value;
      console.log('Casa permamente desde el POP UP | I&R: ', response.result.value);
      //this.llenarJSON();
      this.loader.hideLoader();
    }));
  }

}

