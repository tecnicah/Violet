import { Component, ViewChild, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../app/shared/loader';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, Resolve, ActivatedRoute } from '@angular/router';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogDocumentInvoiceComponent } from '../dialog/dialog-document-invoice/dialog-document-invoice.component';
import { DialogConfirmComponent } from '../dialog/dialog-confirm/dialog-confirm.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogAdditionalExpensesComponent } from '../dialog/dialog-additional-expenses/dialog-additional-expenses.component';

@Component({
  selector: 'request-invoice-records',
  templateUrl: './requestInvoice.component.html',
}) export class RequestInvoiceComponent implements OnInit {

  constructor(public _router: Router, public _dialog: MatDialog, public _routerParams: ActivatedRoute, public _services: ServiceGeneralService) {}

  @ViewChild(MatPaginator, {
    static: true
  }) paginator: MatPaginator;
  public data_: any = {
    additional:false,
    status:1,
    commentInvoices: [],
    documentInvoices: [],
    workOrderInvoices: [],
    additionalExpenses:[]

  };
  public table_once_cols: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10', 'col_11'];
  public table_nueve_cols: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9'];
  public table_diez_cols: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6', 'col_7', 'col_8', 'col_9', 'col_10'];
  public table_siet_cols: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5', 'col_6'];
  public table_seis_cols: string[] = ['col_0', 'col_1', 'col_2', 'col_3', 'col_4', 'col_5'];
  public cr: string = "Reply";
  public user: any = {};
  public ids_to_find: string = '';
  public __loader__: LoaderComponent = new LoaderComponent();
  public temporalDocument = [];
  public cliente : string = '';

  //*******************************************************************************************//
  //VALIDACIOMOS QUE HAYA SERVICOS A FACTURAR SELECCIONADOS//
  supplier:any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.ids_to_find = localStorage.getItem('lines_selected');
    let id_invoice = Number(localStorage.getItem('idInvoice'));
    this.supplier = Number(localStorage.getItem('supplier'));
    console.log('id_invoice: ', id_invoice);

    if(id_invoice != 0){
        this.get_DataEdit(id_invoice);
    }else{
        if (this.ids_to_find == null || this.ids_to_find == undefined) {
            this._router.navigateByUrl('serviceRecord');
        } else {
            this.initPageRequests();
        }
    }
    this.getSupplierPartner();
    this.getCatalogos();
  }
  //*******************************************************************************************//
  //FUNCION PARA CONSULTA DE INFORMACION PARA EDICION//
  public supplierPartnerName:string = '';
  getSupplierPartner(){
   let sr = localStorage.getItem('sr');
   let supplier_ = [];
   this._services.service_general_get(`SupplierPartnerProfile/GetSupplierPartnersBySR/  ${ sr }`)
      .subscribe((response: any) => {
      console.log('SP: ', response);
      supplier_ = response.result.value;
      for(let i = 0; i < supplier_.length; i++){
         if(supplier_[i].id == this.supplier){
            return this.supplierPartnerName = supplier_[i].name;
         }
      }
   })
  }
  //*******************************************************************************************//
  //FUNCION PARA CONSULTA DE INFORMACION PARA EDICION//
  get_DataEdit(id){
    this._services.service_general_get('RequestInvoice/GetInvoice?invoice='+id)
    .subscribe((response: any) => {
      if (response.success) {
        const service_data: any = response.result.value;
        console.log('All tables EDIT => ', service_data);
        this.cliente = service_data.invoiceData.client;
        this.data_.status = service_data.invoiceData.statusId;
        this.data_.id = service_data.invoiceData.id;
        this.data_.invoiceType  = service_data.invoiceData.invoiceType;
        this.data_.serviceRecord = service_data.invoiceData.serviceRecord;
        this.data_.comment = service_data.invoiceData.comments;
        this.data_.documentInvoices = service_data.invoiceData.documents;
        this.relocation_standalone_data = service_data.relocation;
        this.relocation_standalone_table = new MatTableDataSource(this.relocation_standalone_data);
        this.immigration_coordinator_data = service_data.immigration;
        this.immigration_coordinator_table = new MatTableDataSource(this.immigration_coordinator_data);
        //return true;
        this.filterWorkorder(service_data.invoiceData.workOrderInvoices);
        this.initDataSettings();
        this.sumaCantidades();
      }
    }, (error: any) => {
      console.log('Error (RequestInvoice/GetInvoice EDICION) => ', error);
      this.__loader__.hideLoader();
    });
  }
  //*******************************************************************************************//
  filterWorkorder(work_orders){
    let immigration = [];
        immigration = work_orders.filter(function(E){
            if(E.serviceLine == 1){
                return true;
            }
        })
    let relocation = [];
        relocation = work_orders.filter(function(E){
            if(E.serviceLine == 2){
                return true;
            }
        })
    
    for (let i = 0; i < this.immigration_coordinator_table.filteredData.length; i++) {
        for(let j = 0; j < immigration.length; j++){
            if(this.immigration_coordinator_table.filteredData[i].workOrderId == immigration[j].workOrder){
                //this.immigration_coordinator_table.filteredData[i].id = immigration[j].id;
                this.immigration_coordinator_table.filteredData[i].available =  Number(this.immigration_coordinator_table.filteredData[i].available) - Number(this.immigration_coordinator_table.filteredData[i].invoiced);
                //this.immigration_coordinator_table.filteredData[i].amountToInvoice = immigration[j].amountToInvoice;
                //this.immigration_coordinator_table.filteredData[i].hoursToInvoice = immigration[j].hourInvoice;
                //this.immigration_coordinator_table.filteredData[i].invoice = immigration[j].invoice;
                //calculo para invoiced, etc...
            }
        }
    } 

    for (let i = 0; i < this.relocation_standalone_table.filteredData.length; i++) {
        for(let j = 0; j < relocation.length; j++){
            if(this.relocation_standalone_table.filteredData[i].workOrderId == relocation[j].workOrder){
                //this.relocation_standalone_table.filteredData[i].id = relocation[j].id;
                this.relocation_standalone_table.filteredData[i].available =  Number(this.relocation_standalone_table.filteredData[i].available) - Number(this.relocation_standalone_table.filteredData[i].invoiced);
                //this.relocation_standalone_table.filteredData[i].amountToInvoice = relocation[j].amountToInvoice;
                //this.relocation_standalone_table.filteredData[i].hoursToInvoice = relocation[j].hourInvoice;
                //this.relocation_standalone_table.filteredData[i].invoice = relocation[j].invoice;
                //calculo para invoiced, etc...
            }
        }
    } 


    console.log("variables finales igualadas");
    console.log("relocation: ",this.relocation_standalone_table.filteredData);
    console.log("immigration:",this.immigration_coordinator_table.filteredData);
  }
  //*******************************************************************************************//
  //CONSULTA DE CATALOGOS//
  ca_status = [];
  ca_currency = [];
  async getCatalogos() {
    this.ca_status = await this._services.getCatalogueFrom('GetStatusInvoice');
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
  }
  //*******************************************************************************************//
  //CONSULTAMOS LOS DATOS PARA CADA UNA DE LAS TABLAS//
  public relocation_standalone_data: any[] = [];
  public relocation_standalone_table: any = undefined;
  public immigration_coordinator_data: any[] = [];
  public immigration_coordinator_table: any = undefined;
  public initPageRequests(): void {
    this.__loader__.showLoader();
    
    if(this.supplier != 0){
      this._services.service_general_get(`RequestInvoice/GetInvoice?${ this.ids_to_find }&supplierPartner=${ this.supplier }`)
      .subscribe((response: any) => {
        if (response.success) {
          const service_data: any = response.result.value;
          console.log('All tables => ', service_data);
          this.cliente = service_data.client;
          this.relocation_standalone_data = service_data.relocation;
          this.relocation_standalone_table = new MatTableDataSource(this.relocation_standalone_data);
          this.immigration_coordinator_data = service_data.immigration;
          this.immigration_coordinator_table = new MatTableDataSource(this.immigration_coordinator_data);
          this.__loader__.hideLoader();
          this.initDataSettings();
          this.sumaCantidades();
        }
      }, (error: any) => {
        console.log('Error (RequestInvoice/GetInvoice) => ', error);
        this.__loader__.hideLoader();
      });
    }else{
      this._services.service_general_get(`RequestInvoice/GetInvoice?${ this.ids_to_find }`)
      .subscribe((response: any) => {
        if (response.success) {
          const service_data: any = response.result.value;
          console.log('All tables => ', service_data);
          this.cliente = service_data.client;
          this.relocation_standalone_data = service_data.relocation;
          this.relocation_standalone_table = new MatTableDataSource(this.relocation_standalone_data);
          this.immigration_coordinator_data = service_data.immigration;
          this.immigration_coordinator_table = new MatTableDataSource(this.immigration_coordinator_data);
          this.__loader__.hideLoader();
          this.initDataSettings();
          this.sumaCantidades();
        }
      }, (error: any) => {
        console.log('Error (RequestInvoice/GetInvoice) => ', error);
        this.__loader__.hideLoader();
      });
    }
    
  }
  //*******************************************************************************************//
  //CONSULTAMOS LOS DATOS PARA CADA UNA DE LAS TABLAS//
  public initDataSettings(): void {
    this.relocation_standalone_data.forEach((item: any) => {
      item.projectedFee = Number( item.projectedFee);
      item.pendingFee = Number( item.pendingFee);
      item.amountToInvoice = Number( item.amountToInvoice);
    });
    this.immigration_coordinator_data.forEach((item: any) => {
        item.projectedFee = Number( item.projectedFee);
        item.pendingFee = Number( item.pendingFee);
        item.amountToInvoice = Number( item.amountToInvoice);
    });
  }
  //*********************************************************************************//  
  //**METHODS COMMENTS (NEW)**//
  addReply() {
    console.log(this.user);
    this.data_.commentInvoices.push({
      "id": 0,
      "invoice": 0,
      "comment": null,
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updatedBy": this.user.id,
      "updatedDate": new Date(),
      "user": this.user
    })

    if (this.data_.commentInvoices.length == 1) {
      this.cr = "Comment";
    } else {
      this.cr = "Reply";
    }
  }
  //*********************************************************************************//  
  //**METHODS DOCUMENTS**//
  addDocument() {
    const dialogRef = this._dialog.open(DialogDocumentInvoiceComponent, {
      width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result.success) {
        this.temporalDocument.push(result);
      }
    });
  }
  //DELETE DOCUMENT//
  deleteDocument(i) {
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
        this.temporalDocument.splice(i, 1);
      }
    })
  }
  //*********************************************************************************// 
  //FUNCION PARA TABLE IMMIGRATION//
  validate_immigration($event, element, i) {
    if ($event.checked) {
      element.amountToInvoice = element.pendingFee;
      element.pendingFee = 0;
      element.available = 0;
      element.invoiced = element.total;
    } else {
      element.pendingFee = element.amountToInvoice;
      element.amountToInvoice = 0;
      element.available = element.total;
      element.invoiced = 0;
    }
    this.immigration_coordinator_table.filteredData[i] = element;
    this.sumaCantidades();
  }
  //FUNCION PARA TABLE RELOCATION//
  validate_relocation($event, element, i) {
    if ($event.checked) {
      element.amountToInvoice = element.pendingFee;
      element.pendingFee = 0;
      element.available = 0;
      element.invoiced = element.total;
    } else {
      element.pendingFee = element.amountToInvoice;
      element.amountToInvoice = 0;
      element.available = element.total;
      element.invoiced = 0;
    }
    this.relocation_standalone_table.filteredData[i] = element;
    this.sumaCantidades();
  }
  //*********************************************************************************//
  saveDataInvoice(element, i){
     if(Number(element.hoursToInvoice) <= Number(element.total)){
      element.editHour = false;
      element.available = Number(element.total) - Number(element.hoursToInvoice);
      element.invoiced = Number(element.hoursToInvoice);
      element.amountToInvoice = (Number(element.hoursToInvoice) * Number(element.amountPerHour));
      element.pendingFee = Number(element.pendingFee) - Number(element.amountToInvoice);
      this.relocation_standalone_table.filteredData[i] = element;
      this.sumaCantidades();
   }else{
     const dialogRef = this._dialog.open(DialogConfirmComponent, {
         data: {
           header: "Warning",
           body: "the number of hours to be billed cannot be greater than the total number of hours assigned to the service"
         },
         width: "350px"
       });
   
       dialogRef.afterClosed().subscribe(result => {
       })
   }
  }
  //*********************************************************************************//
  public Total = 0;
  public PendingFee = 0; 
  public subtotal_imm = 0; public subtotal_rel = 0;
  public pending_imm = 0; public pending_r = 0;
  sumaCantidades(){
   let total = 0;
   let pendingFee = 0;

   let total_imm = 0; let total_rel = 0; let pending_immi = 0; let pending_rel = 0;

   this.relocation_standalone_data.forEach((item: any) => {
    total = total + item.projectedFee;
    pendingFee = pendingFee + item.pendingFee;
    total_rel = total_rel + item.amountToInvoice;
    pending_rel = pending_rel + item.pendingFee;
  });

  this.pending_r = pending_rel;
  this.subtotal_rel = total_rel;

  this.immigration_coordinator_data.forEach((item: any) => {
    total = total + item.projectedFee;
    pendingFee = pendingFee + item.pendingFee;
    total_imm = total_imm + item.amountToInvoice;
    pending_immi = pending_immi + item.pendingFee;
  });
 
  this.subtotal_imm = total_imm;
  this.pending_imm = pending_immi;
  
  this.Total = total;
  this.PendingFee = pendingFee;

  }
  //*********************************************************************************//
  //ADD EXPENCE//
  addExpence(){
    const dialogRef = this._dialog.open(DialogAdditionalExpensesComponent, {
      width: "95%",
      data: {}
     });

     dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        result.requested = true;
        result.invoice = 0;
        this.data_.additionalExpenses.push(result);
      }
    })
  }
  //EDIT EXPENCE//
  editExpence(data_, i){
    const dialogRef = this._dialog.open(DialogAdditionalExpensesComponent, {
      width: "95%",
      data: data_
     });

     dialogRef.afterClosed().subscribe(result => {
      if(result.success){
        this.data_.additionalExpenses[i] = result;
      }
    })
  }
  //*********************************************************************************// 
  //FUNCION PARA GUARDAR//
  save() {
   if(this.data_.id){
       this.update_DB();
   }else{
       this.insert_DB();
   } 
  }
  //*********************************************************************************//
  //INSERT A BASE DE DATOS//
  insert_DB(){
    this.__loader__.showLoader();
    this.data_.id = 0;
    this.data_.serviceRecord = Number(localStorage.getItem('sr'));
    this.data_.invoiceType = Number(localStorage.getItem('invoiceType'));
    this.data_.createdBy = this.user.id;
    this.data_.createdDate = new Date();
    this.data_.updatedBy = this.user.id
    this.data_.updatedDate = new Date();
    this.data_.documentInvoices = this.temporalDocument;
    
    for (let i = 0; i < this.immigration_coordinator_table.filteredData.length; i++) {
        this.data_.workOrderInvoices.push({
             "id": 0,
             "invoice": 0,
             "workOrder": this.immigration_coordinator_table.filteredData[i].workOrderId,
             "service": this.immigration_coordinator_table.filteredData[i].id,
             "serviceLine": 1,
             "toInvoice": true,
             "to_Invoice":this.immigration_coordinator_table.filteredData[i].to_Invoice,
             "typeProgram": this.immigration_coordinator_table.filteredData[i].typeProgram,
             "hourInvoice": this.immigration_coordinator_table.filteredData[i].hoursToInvoice,
             "comments": this.immigration_coordinator_table.filteredData[i].comments,
             "amountToInvoice": this.immigration_coordinator_table.filteredData[i].amountToInvoice,
             "createdBy": this.user.id,
             "createdDate": new Date(),
             "updatedBy": this.user.id,
             "updatedDate": new Date()
        })
    }

    for (let i = 0; i < this.relocation_standalone_table.filteredData.length; i++) {
        this.data_.workOrderInvoices.push({
             "id": 0,
             "invoice": 0,
             "workOrder": this.relocation_standalone_table.filteredData[i].workOrderId,
             "service": this.relocation_standalone_table.filteredData[i].id,
             "serviceLine": 2,
             "toInvoice": true,
             "to_Invoice":this.relocation_standalone_table.filteredData[i].to_Invoice,
             "typeProgram": this.relocation_standalone_table.filteredData[i].typeProgram,
             "hourInvoice": this.relocation_standalone_table.filteredData[i].hoursToInvoice,
             "comments": this.relocation_standalone_table.filteredData[i].comments,
             "amountToInvoice": this.relocation_standalone_table.filteredData[i].amountToInvoice,
             "createdBy": this.user.id,
             "createdDate": new Date(),
             "updatedBy": this.user.id,
             "updatedDate": new Date()
        })
    }
    
    console.log("Servicios a facturar", this.data_);
    let json_final = [];

    let services_to_invoice = this.data_.workOrderInvoices;
        for (let i = 0; i < services_to_invoice.length; i++) {
        /*     
          if((services_to_invoice[i].hourInvoice != '0' && services_to_invoice[i].hourInvoice != null) || services_to_invoice[i].to_Invoice != false){
            json_final.push({
            "id":0,
            "serviceRecord":this.data_.serviceRecord,
            "invoiceType":this.data_.invoiceType,
            "consultant":this.supplier,
            "comments": this.data_.comments,
            "inoviceNo":"",
            "paymentNumber":"",
            "createdBy":this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "additionalExpenses": this.data_.additionalExpenses,
            "commentInvoices":[],
            "documentInvoices":[],
            "serviceInvoices":[
               {
                  "id":0,
                  "invoice":services_to_invoice[i].invoice,
                  "workOrder":services_to_invoice[i].workOrder,
                  "service":services_to_invoice[i].service,
                  "serviceLine":services_to_invoice[i].serviceLine,
                  "typeService":services_to_invoice[i].typeProgram,
                  "status":this.data_.status,
                  "toInvoice":services_to_invoice[i].toInvoice,
                  "hourInvoice":services_to_invoice[i].hourInvoice,
                  "amountToInvoice": services_to_invoice[i].amountToInvoice,
                  "createdBy": this.user.id,
                  "createdDate": new Date(),
                  "updatedBy":this.user.id,
                  "updatedDate": new Date()
               }
            ]
             })
          }
          */
         if(services_to_invoice[i].amountToInvoice != 0){
          if(this.supplier == 0){
             this.supplier = null;
          }
          json_final.push({
            "id":0,
            "serviceRecord":this.data_.serviceRecord,
            "invoiceType":this.data_.invoiceType,
            "consultant":this.supplier,
            "comments": this.data_.comments,
            "inoviceNo":"",
            "paymentNumber":"",
            "createdBy":this.user.id,
            "createdDate": new Date(),
            "updatedBy": this.user.id,
            "updatedDate": new Date(),
            "additionalExpenses": this.data_.additionalExpenses,
            "commentInvoices":[],
            "documentInvoices":[],
            "serviceInvoices":[
               {
                  "id":0,
                  "invoice":services_to_invoice[i].invoice,
                  "workOrder":services_to_invoice[i].workOrder,
                  "service":services_to_invoice[i].service,
                  "serviceLine":services_to_invoice[i].serviceLine,
                  "typeService":services_to_invoice[i].typeProgram,
                  "status":this.data_.status,
                  "toInvoice":services_to_invoice[i].toInvoice,
                  "hourInvoice":services_to_invoice[i].hourInvoice,
                  "amountToInvoice": services_to_invoice[i].amountToInvoice,
                  "createdBy": this.user.id,
                  "createdDate": new Date(),
                  "updatedBy":this.user.id,
                  "updatedDate": new Date()
               }
            ]
          })
         }
        }

        console.log("JSON PARA BASE DE DATOS: ", json_final);
        

    
    this._services.service_general_post_with_url("RequestInvoice/AddOrdersInvoice", json_final).subscribe((data => {
        if(data.success){
          console.log(data);
           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Save Data"
                },
                width: "350px"
              });
              this.temporalDocument = [];
              this._router.navigateByUrl('editServiceRecord/'+this.data_.serviceRecord);
              localStorage.removeItem('lines_selected');
              localStorage.removeItem('idInvoice');
              this.__loader__.hideLoader();
        }
      }),(err)=>{
          console.log(err);
          this.__loader__.hideLoader();
      })
  }
  //*********************************************************************************//
  //UPDATE A BASE DE DATOS//
  update_DB(){
    this.__loader__.showLoader();
    this.data_.updatedBy = this.user.id
    this.data_.updatedDate = new Date();
    this.data_.documentInvoices = [];
    this.data_.documentInvoices = this.temporalDocument;
    
    for (let i = 0; i < this.immigration_coordinator_table.filteredData.length; i++) {
        this.data_.workOrderInvoices.push({
             "id": this.immigration_coordinator_table.filteredData[i].invoice,
             "invoice": this.data_.id,
             "workOrder": this.immigration_coordinator_table.filteredData[i].workOrderId,
             "service": this.immigration_coordinator_table.filteredData[i].id,
             "serviceLine": 1,
             "toInvoice": this.immigration_coordinator_table.filteredData[i].to_Invoice,
             "hourInvoice": this.immigration_coordinator_table.filteredData[i].hoursToInvoice,
             "comments": this.immigration_coordinator_table.filteredData[i].comments,
             "amountToInvoice": this.immigration_coordinator_table.filteredData[i].amountToInvoice,
             "createdBy": this.user.id,
             "createdDate": new Date(),
             "updatedBy": this.user.id,
             "updatedDate": new Date()
        })
    }

    for (let i = 0; i < this.relocation_standalone_table.filteredData.length; i++) {
        this.data_.workOrderInvoices.push({
             "id": this.relocation_standalone_table.filteredData[i].invoice,
             "invoice": this.data_.id,
             "workOrder": this.relocation_standalone_table.filteredData[i].workOrderId,
             "service": this.relocation_standalone_table.filteredData[i].id,
             "serviceLine": 2,
             "toInvoice": this.relocation_standalone_table.filteredData[i].to_Invoice,
             "hourInvoice": this.relocation_standalone_table.filteredData[i].hoursToInvoice,
             "comments": this.relocation_standalone_table.filteredData[i].comments,
             "amountToInvoice": this.relocation_standalone_table.filteredData[i].amountToInvoice,
             "createdBy": this.user.id,
             "createdDate": new Date(),
             "updatedBy": this.user.id,
             "updatedDate": new Date()
        })
    }
    
    console.log("JSON PARA BASE DE DATOS: ", this.data_);
    let json_final = [];
        json_final.push(this.data_);
        console.log(json_final);
        console.log(JSON.stringify(json_final));
    this._services.service_general_put("RequestInvoice/UpdateOrdersInvoice", json_final).subscribe((data => {
        if(data.success){
          console.log(data);
           const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Update Data"
                },
                width: "350px"
              });
              this.temporalDocument = [];
              localStorage.removeItem('lines_selected');
              localStorage.removeItem('idInvoice');
              this._router.navigateByUrl('editServiceRecord/'+this.data_.serviceRecord);
              this.__loader__.hideLoader();
        }
      }),(err)=>{
          console.log(err);
          this.__loader__.hideLoader();
      })
  }
  //LIMPIA LOCAL STORAGE//
  ngOnDestroy(){
    console.log("ng on destroy");
    localStorage.removeItem('lines_selected');
    localStorage.removeItem('idInvoice'); 
    localStorage.removeItem('supplier'); 
  }
  //NOMBRE PARA CURRENCY//
  getCurrency(id){
    for (let index = 0; index < this.ca_currency.length; index++) {
      if(this.ca_currency[index].id = id){
        return this.ca_currency[index].currency;
      }
    }
  }
}
