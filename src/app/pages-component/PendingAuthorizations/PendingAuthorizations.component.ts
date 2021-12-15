import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router } from '@angular/router';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";

@Component({
    selector: 'pending-authorizations-component',
    templateUrl: './PendingAuthorizations.component.html',
    styleUrls: ['./PendingAuthorizations.component.scss']
})
export class PendingAuthorizationsComponent implements OnInit {

    constructor(
        public _router: Router,
        public dialog: MatDialog,
        public _services: ServiceGeneralService
    ) { }

    @ViewChild('sortpending') sortpending: MatSort;
    // @ViewChild('pagpending') pagpending: MatPaginator;
    // @ViewChild(MatPaginator, { static: true }) pagpending: MatPaginator;
    @ViewChild(MatPaginator, {static: true}) pagpending: MatPaginator;
    // @ViewChild('paginatorElement', { read: ElementRef }) paginatorHtmlElement: ElementRef;


    //   @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
    // @ViewChild(MatSort) sort:MatSort;

    public __imagesPath__: string = this._services.url_images;
    public __loader__: LoaderComponent = new LoaderComponent();
    public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
    pendingAcceptance: boolean = false;
    pendingAssignments: boolean = true;
    public filterCountry: any = { name: '' };
    public filterCity: any = { city: '' };
    public filterServiceRecord: any = { numberServiceRecord: '' };
    maxall: number = 20;


    ngOnInit() { this.initPageBehavior(); }

    public initPageBehavior(): void {

        this.requestCataloguesData();
        this.requestTablePendingAuthoData();

        this._services.service_general_get('Catalogue/GetServiceRecord/' + this.__userlog__.id)
            .subscribe((response: any) => {
                if (response.success) {
                    this.service_record = response.result;
                    console.log(this.service_record)
                }
                this.__loader__.hideLoader();
            }, (error: any) => {
                this.__loader__.hideLoader();
            });
        //this.filterByPendingAcceptance();
        this.filterByPendingAssingments();
  }
  getPageSizeOptions() {
    if (this.pending_table_data?.paginator.length > this.maxall) {
      return [10, 20, this.pending_table_data?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }

    //public pending_table_colums:string[] = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13'];
    public pending_table_colums: string[] = ['c1', 'c2', 'c3', 'c4', 'c5',  'c7', 'c9', 'c10', 'c11', 'c12', 'c13'];
    public pending_table_data: any = undefined;
    //public pending_autho_obj:PendingAuthoData = new PendingAuthoData();
    public pending_autho_obj: any;
    public requestTablePendingAuthoData(url_params: string = ''): void {
        this.__loader__.showLoader();
        console.log('url_params => ', url_params);
        this._services.service_general_get(`ServiceRecord/GetPendingAuthorizations/${this.__userlog__.id + url_params}`)
            .subscribe((response: any) => {
                console.log('Response ===> ', response);
                if (response.success) {
                    this.pending_autho_obj = response.result.result.value;
                    debugger
                    this.pending_table_data = new MatTableDataSource(this.pending_autho_obj.pendingAuthorizations);
                    this.pending_table_data.paginator = this.pagpending;
                    this.pendingAcceptance = false;
                    this.pendingAssignments = true;

                    setTimeout(() => {
                        this.pending_table_data.sort = this.sortpending;
                        console.log('===> ', this.pending_table_data);
                    }, 3000);
                    console.log('this.pending_autho_obj ===> ', this.pending_autho_obj);
                }
                this.__loader__.hideLoader();
            }, (error: any) => {
                console.error('Error (GetPendingAuthorizations) => ', error);
                this.__loader__.hideLoader();
            });
    }


    public filter_data: FilterDataModel = new FilterDataModel();
    public updatePendingAuthoTableData(): void {

        let url_params: string = '';

        for (let field in this.filter_data) {

            if (this.filter_data[field] != '') {

                url_params += `&${field}=${this.filter_data[field]}`;

            }

        }

        this.requestTablePendingAuthoData('?' + url_params.substring(1));

    }

    public serchByText(event: Event) {

        const filterValue = (event.target as HTMLInputElement).value;

        this.pending_table_data.filter = filterValue.trim().toLowerCase();

    }

    public resetPendingAuthoTableFilter(): void {
        this.filterCountry = { name: '' };
        this.filterCity = { city: '' };
        this.filterServiceRecord = { numberServiceRecord: '' };
        const pending_serch_input: any = document.getElementById('pending_serch_text');

        pending_serch_input.value = '';

        this.filter_data = new FilterDataModel();

        this.requestTablePendingAuthoData();
    }

    public showExportDialog() {

        const dialogRef = this.dialog.open(DialogExportComponent, {
            data: this.pending_table_data.filteredData,
            width: "40%"
        });

        dialogRef.afterClosed().subscribe(result => {

            console.log('Response ===> ', result);

            if (result === 1) {

                document.getElementById("excel").click();

            }

            if (result === 2) {

                let tabla = [['Service Record', 'VIP', 'Autho Date', 'Service Line', 'Country', 'City', 'Partner', 'Client', 'Assignee Name', 'Arrival Date', 'Services', 'Coordinator', 'Consultant']];

                for (let i = 0; i < this.pending_table_data.filteredData.length; i++) {

                    const element = this.pending_table_data.filteredData[i];
                    tabla.push([
                        element.numberServiceRecord,
                        element.vip,
                        this.formatDate(element.inithialAuthoAcceptance),
                        element.serviceLine,
                        element.country,
                        element.city,
                        element.partner,
                        element.client,
                        element.assigneeName,
                        this.formatDate(element.initialArrival),
                        element.services,
                        element.coordinator,
                        element.supplier
                    ])

                }

                PdfMakeWrapper.setFonts(pdfFonts);

                const pdf = new PdfMakeWrapper();

                pdf.pageMargins([30, 30, 30, 30]);
                pdf.pageOrientation('landscape');
                pdf.defaultStyle({
                    fontSize: 9,
                    alignment: 'center'
                });
                pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

                pdf.create().download('Pending-Authorizations.pdf');

            }

        });

    }

    /*****************************************************************************************/
    /*****************************************************************************************/
    /*****************************************************************************************/
    /************************** Funciones Generales ******************************************/
    /*****************************************************************************************/
    /*****************************************************************************************/
    public country_catalogue: any = [];
    public city_catalogue: any[] = [];
    public serviceline_catalogue: any[] = [];
    public tablesr_catalogue: any[] = [];
    public service_record: any[] = [];
    public async requestCataloguesData(): Promise<void> {

        this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
        this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
        this.tablesr_catalogue = await this._services.getCatalogueFrom(`GetServiceRecord/${this.__userlog__.id}`);

    }

    public able_city_filter: boolean = false;
    public ableCityField(): void {

        if (this.filter_data.country != '') {

            this.able_city_filter = true;

            this._services.service_general_get(`Catalogue/GetState?country=${this.filter_data.country}`)
                .subscribe((response: any) => {

                    if (response.success) {

                        this.city_catalogue = response.result;

                    }

                }, (error: any) => {

                    console.error('Error ==> ', error);

                });

        } else {

            this.able_city_filter = false;

        }

    }

    public formatDate(fecha) {

        let date = new Date(fecha),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            montstring = "";

        switch (month) {
            case 1: montstring = "Ene"; break;
            case 2: montstring = "Feb"; break;
            case 3: montstring = "Mar"; break;
            case 4: montstring = "Abr"; break;
            case 5: montstring = "May"; break;
            case 6: montstring = "Jun"; break;
            case 7: montstring = "Jul"; break;
            case 8: montstring = "Ago"; break;
            case 9: montstring = "Sep"; break;
            case 10: montstring = "Oct"; break;
            case 11: montstring = "Nov"; break;
            case 12: montstring = "Dic"; break;
        }

        return day + " " + montstring + " " + year;

    }

    goToSR(data) {
        console.log(data);
        this._router.navigate(['editServiceRecord/' + data.id]);
    }

    filterByPendingAcceptance() {
        console.log("Entra a pending acceptance");
        let data_filtrada;
        let data_final: any;
        this._services.service_general_get(`ServiceRecord/GetPendingAuthorizations/${this.__userlog__.id}`)
            .subscribe((response: any) => {
                console.log('Response ===> ', response);
                if (response.success) {
                    data_final = {
                        pendingAcceptance: response.result.result.value.pendingAcceptance,
                        pendingAssignments: response.result.result.value.pendingAssignments,
                        pendingAuthorizations: response.result.result.value.pendingAuthorizations.acceptance
                    }
                    this.pending_autho_obj = data_final;
                    this.pending_table_data = new MatTableDataSource(this.pending_autho_obj.pendingAuthorizations);
                    this.pending_table_data.paginator = this.pagpending;
                    this.pending_table_data.sort = this.sortpending;
                    console.log('this.pending_autho_obj ===> ', this.pending_autho_obj);
                    this.pendingAcceptance = true;
                    this.pendingAssignments = false;
                }
                this.__loader__.hideLoader();
            }, (error: any) => {
                console.error('Error (GetPendingAuthorizations) => ', error);
                this.__loader__.hideLoader();
            });
    }

    filterByPendingAssingments() {
        console.log("Entra a pending Assigment");
        let data_filtrada;
        let data_final: any;
        this._services.service_general_get(`ServiceRecord/GetPendingAuthorizations/${this.__userlog__.id}`)
            .subscribe((response: any) => {
                console.log('Response ===> ', response);
                if (response.success) {

                    data_final = {
                        pendingAcceptance: response.result.result.value.pendingAcceptance,
                        pendingAssignments: response.result.result.value.pendingAssignments,
                        pendingAuthorizations: response.result.result.value.pendingAuthorizations.assigment
                    }
                    this.pending_autho_obj = data_final;
                    this.pending_table_data = new MatTableDataSource(this.pending_autho_obj.pendingAuthorizations);
                    this.pending_table_data.paginator = this.pagpending;
                    this.pending_table_data.sort = this.sortpending;
                    console.log('this.pending_autho_obj ===> ', this.pending_autho_obj);
                    this.pendingAssignments = true;
                    this.pendingAcceptance = false;
                }
                this.__loader__.hideLoader();
            }, (error: any) => {
                console.error('Error (GetPendingAuthorizations) => ', error);
                this.__loader__.hideLoader();
            });
    }

    public info_row: any = {};
    viewData(data) {
        this.info_row.assignee = data.assigneeName;
        this.info_row.coordinator = data.coordinator;
    }

    public info_country: any = {};
    viewCity(data) {
        this.info_country.country = data.country;
        this.info_country.city = data.city;
    }

    public info_partner: any = {};
    viewPartner(data) {
        this.info_partner.partner = data.partner;
        this.info_partner.client = data.client;
    }


    SR_WO :any;
    consulta(element){
        let WO = [];
        this.SR_WO = [];
        this._services.service_general_get('ServiceRecord/GetServices/'+element.id+'?type=1').subscribe((response: any) => {
            response.map.value.home.forEach(E => {
                WO.push(E);
            });
            response.map.value.host.forEach(E => {
                WO.push(E);
            });
            this._services.service_general_get('ServiceRecord/GetServices/'+element.id+'?type=2').subscribe((response: any) => {
                response.map.value.home.forEach(E => {
                    WO.push(E);
                });
                response.map.value.host.forEach(E => {
                    WO.push(E);
                });

                console.log("ESTAS SON LAS WO", WO)
                this.SR_WO = WO;
            })
        })
    }
}

class FilterDataModel {
    country: string = '';
    city: string = '';
    service_line: string = '';
    sr: string = '';
}
/*
class PendingAuthoData {
    pendingAcceptance:number = 0;
    pendingAssignments:number = 0;
    pendingAuthorizations:any[] = [];
}
*/
