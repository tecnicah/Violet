import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogAddpaymentComponent } from '../dialog-addpayment/dialog-addpayment.component';
import { DialogDocumentsComponent } from '../dialog-documents/dialog-documents.component';
import { DialogRequestPaymentComponent } from '../dialog-request-payment/dialog-request-payment.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogPaymentConceptComponent } from '../dialog-payment-concept/dialog-payment-concept.component';
import { DialogDeletepaymentconceptComponent } from '../dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { DialogDocumentsView } from '../dialog-documents-view/dialog-documents-view.component';
import { DialogRequestPaymentNewComponent } from '../dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentsRelocationComponent } from '../dialog-documents-relocation/dialog-documents-relocation.component';
import { DialogPaymentRentalComponent } from '../dialog-payment-rental/dialog-payment-rental.component';
import { switchMap } from 'rxjs/operators';
import { DialogStatusDetailComponent } from '../dialog-status-detail/dialog-status-detail.component';
import { forkJoin } from 'rxjs';
import { WorkPartnerI } from 'app/interfaces/dtoWork.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogTimeExtensionsComponent } from '../dialog-time-extensions/dialog-time-extensions.component';
import { DialogRelatedPaymentsComponent } from '../dialog-related-payments/dialog-related-payments.component';
import { DialogPaymentsMethodsComponent } from '../dialog-payments-methods/dialog-payments-methods.component';


@Component({
  selector: 'app-dialog-rental-furniture',
  templateUrl: './dialog-rental-furniture.component.html',
  styleUrls: ['./dialog-rental-furniture.component.scss']
})
export class DialogRentalFurnitureComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();
  show: boolean = false;
  id: number = 0;
  dataRentalForniture: any = {};
  authoDate: string = '';
  authoAcceptanceDate: string = '';
  wosId: number = 0;
  servideId: string = '';
  country_name: string = '';
  location: string = '';
  statusText: string = '';
  catId: number = 0;
  statusWorkOrder = {} as any;
  user: any;
  serviceCompletionDate: string = '';
  ca_duracion: any[] = [];
  ca_currency: any[] = [];
  supplier_get: any[] = [];
  contactSupplier: any[] = [];
  ca_responsible: any[] = [];
  isVisible: boolean = false;
  extensionformations: any;
  relatedformations: any;
  paymentsformations: any;
  viewtableExtension: boolean = false
  viewtableRelated: boolean = false
  viewtablePayments: boolean = false
  dataPaymentMethods: any = {};

  cardsList: WorkPartnerI = {
    workOrderServicesId: 0,
    partner_id: 0
  };
  @ViewChild(MatSort) sort: MatSort;
  /*   @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginator1: MatPaginator; */

  @ViewChild('extensionPaginator') extensionPaginator: MatPaginator;
  @ViewChild('relatedPaginator') relatedPaginator: MatPaginator;

  extension: string[] = ['final', 'days', 'coments', 'edit'];
  related: string[] = ['payment', 'amount', 'responsible', 'currency', 'edit'];

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }


  ngOnInit(): void {
    console.log(this.data);
    this.id = this.data.data.service[0].id
    this.cardsList.partner_id = this.data.data.partnerId
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.__loader__.showLoader();
    this.ListFuntionTableExtencion()
    this.ListFuntionTableRelated()
    this.getListNumber()
    this.getListSelect()
    this.listfurniture();
    this.show = true;

  }

  ListFuntionTableExtencion() {
    const urlPaymentsRentalFurList = 'RelocationServices/GetStayExtensionRentalFurnList?id=' + this.id
    this._services.service_general_get(urlPaymentsRentalFurList).subscribe((responsePaymentsRentalFurList) => {
      console.log('responsePaymentsRentalFurList', responsePaymentsRentalFurList);
      if (responsePaymentsRentalFurList.success) {
        let datosTablaExtension = responsePaymentsRentalFurList.stayExtensionRentalFurnitureCoordinations
        this.extensionformations = new MatTableDataSource(datosTablaExtension)
        this.extensionformations.paginator = this.extensionPaginator;
        this.extensionformations.paginator.length = datosTablaExtension.length
        datosTablaExtension.length == 0 ? this.viewtableExtension = false : this.viewtableExtension = true;
        console.log('table Extensions', this.extensionformations);
      }
    })
  }
  ListFuntionTableRelated() {
    const urlPaymentsRelated = 'RelocationServices/GetPaymentsRentalFurList?id=' + this.id
    this._services.service_general_get(urlPaymentsRelated).subscribe((responsePaymentsRelated) => {
      console.log('responsePaymentsRelated', responsePaymentsRelated);
      if (responsePaymentsRelated.success) {
        let datosTablaRelated = responsePaymentsRelated.res_
        this.relatedformations = new MatTableDataSource(datosTablaRelated)
        this.relatedformations.paginator = this.relatedPaginator;
        this.relatedformations.paginator.length = datosTablaRelated.length
        datosTablaRelated.length == 0 ? this.viewtableRelated = false : this.viewtableRelated = true;
        console.log('table Related', this.relatedformations);
      }
    })
  }
  getListNumber(): number[] {
    const listNumber = [];
    for (let index = 0; index <= 10; index++) {
      listNumber.push(index);
    }
    return listNumber;
  }
  async getListSelect() {
    this.ca_duracion = await this._services.getCatalogueFrom('GetDuration');
    console.log('ca_duracion', this.ca_duracion);
    this.ca_currency = await this._services.getCatalogueFrom('GetCurrency');
    console.log('ca_currency', this.ca_currency);
    this.ca_responsible = await this._services.getCatalogueFrom('GetResponsablePayment');
    console.log('ca_responsible', this.ca_responsible);
  }
  listfurniture() {
    const urlfurniture = 'RelocationServices/GetRentalFurnitureCoordinationById?id=' + this.id
    this._services.service_general_get(urlfurniture).pipe(
      switchMap((dataRentalFornitureResponse) => {
        if (dataRentalFornitureResponse.success == true) {
          console.log('dataRentalFornitureResponse', dataRentalFornitureResponse);
          this.dataRentalForniture = dataRentalFornitureResponse?.result ?? {};
          const { statusId, authoDate, authoAcceptanceDate, workOrderServicesId, serviceCompletionDate, } = this.dataRentalForniture;

          this.authoDate = authoDate
          this.authoAcceptanceDate = authoAcceptanceDate
          this.wosId = workOrderServicesId
          this.serviceCompletionDate = serviceCompletionDate
          this.cardsList.workOrderServicesId = this.wosId
          console.log("cardslist", this.cardsList);
          this.getContactSupplier(dataRentalFornitureResponse.result.supplierPartner);
          this.getStatusByUser(statusId);
          this.getserviceBasicId()
          const urlSupplierPather = this._services.service_general_get("SupplierPartnerProfile/GetServiceProviderByServiceId?workOrderService=" + this.wosId);
          return forkJoin([urlSupplierPather]);
        }
      })).subscribe(([dataSupplierPather]) => {
        if (dataSupplierPather.success) {
          this.supplier_get = dataSupplierPather.result.value;
          console.log('dataSupplierPather', dataSupplierPather);
        }

      })
  }
  addPaymentsMethods() {
    const dialogRef = this._dialog.open(DialogPaymentsMethodsComponent, {
      data: {
        wosId :this.wosId
      },
      width: '70%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true || result == undefined) return;
      this.listfurniture()

    })
  }

  getStatusByUser(status_Id: number) {
    this.catId = 18;
    const statusWorkOrderUrl = `Catalogue/GetStatusWorkOrder?category=${this.catId}`;
    this._services.service_general_get(statusWorkOrderUrl).subscribe((responseStatus: any) => {
      console.log('listStatusWorkOrder: ', responseStatus)
      this.statusWorkOrder = responseStatus;
      const resultFilter = this.statusWorkOrder.result.filter(element => status_Id === element.id);
      const [statusItem] = resultFilter;
      console.log(resultFilter);
      console.log(statusItem);
      if (statusItem) {
        const { status } = statusItem;
        this.statusText = status

      }
    })
  }
  getserviceBasicId() {
    const service = `ServiceRecord/GetBasicServiceDataByWosId?wos_id=${this.wosId}`
    this._services.service_general_get(service).subscribe(consultor => {
      console.log("service basic id: ", consultor.atributos_generales.value[0])
      const listProperties = consultor.atributos_generales.value[0];
      const { service_number, country_name, location } = listProperties;

      this.servideId = service_number;
      this.country_name = country_name;
      this.location = location;
      this.isVisible = true;
      this.__loader__.hideLoader();

    })
  }
  getContactSupplier(supplierPartner: number) {
    if (!supplierPartner) return;
    console.log('supplierPartner', supplierPartner);
    this._services.service_general_get("SupplierPartnerProfile/GetAdmintContactsServiceProv?supplierPartner=" + supplierPartner + "&workOrderService=" + this.wosId)
      .subscribe((dataContactSupplierPather) => {
        if (dataContactSupplierPather.success) {
          this.contactSupplier = dataContactSupplierPather.result.value;
          console.log('dataContactSupplierPather', dataContactSupplierPather);
        }
      })
  }
  change_status_detail() {
    const dialogRef = this._dialog.open(DialogStatusDetailComponent, {
      data: {
        header: "Confirmation",
        body: "What is the status of the service?",
        rol: this.user.role.id,
        category: 18,
        type: "home_findig",
        type_id: 23,
        srId: this.data.sr,
        wos_id: this.wosId,
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.dataRentalForniture.statusId = result.id
        this.getStatusByUser(this.dataRentalForniture.statusId);
      }
    })
  }
  getNameResponsible(id: number): string {
    const responsible = this.ca_responsible.find((element) => element.id === id);
    return responsible ? responsible.responsable : '';
  }
  getNameCurrency(id: number): string {
    const currency = this.ca_currency.find((element) => element.id === id);
    return currency ? currency.currency : ''; // Devuelve el nombre si se encuentra el elemento, o una cadena vacía si no se encuentra.
  }
  dialogTimeExtension(param: any) {
    const dialogRef = this._dialog.open(DialogTimeExtensionsComponent, {
      data: {
        param: param,
        idRentalFurniture: this.id
      },
      width: '67%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true || result == undefined) return;
      this.__loader__.showLoader();
      this.ListFuntionTableExtencion()
      this.__loader__.hideLoader()
    })
  }
  dialogPaymentType(param: any) {
    const dialogRef = this._dialog.open(DialogRelatedPaymentsComponent, {
      data: {
        param: param,
        idRelated: this.id
      },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == true || result == undefined) return;
      this.__loader__.showLoader();
      this.ListFuntionTableRelated()
      this.__loader__.hideLoader()
    })
  }
}
