import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router } from '@angular/router';
import { data } from 'jquery';

@Component({
    selector: 'invoice-edit-so',
    templateUrl: './invoice-edit-so.component.html'
}) export class DialogInvoiceEditComponent implements OnInit {

    constructor( public dialogRef: MatDialogRef<DialogInvoiceEditComponent>, public _services: ServiceGeneralService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public current_so_data:any, public _router: Router) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    
    public invoice_lines:any[] = [];
    public invoice_lines_table:any = null;

    //*************************************************************************************************************//
    //CONSULTA DE LAS WORK ORDER ASOCIADAS A LA SERVICE RECORD//
    ngOnInit() {
        console.log(this.current_so_data);
        this._services.service_general_get(`RequestInvoice/GetOrdersInvoice?sr=${ this.current_so_data.sr_id }`)
            .subscribe( (response:any) => {
                if( response.success ) {
                    this.invoice_lines = response.result.value;
                    this.invoiceLineSettings( this.invoice_lines );
                    this.invoice_lines_table = new MatTableDataSource( this.invoice_lines );
                    this.invoice_lines_table.paginator = this.paginator;
                }
            }, (error:any) => {
                console.log('Error (RequestInvoice/GetOrdersInvoice) => ', error);
            });
    }
    //*************************************************************************************************************//
    //SE RECORRE EL ARREGLO PARA CREAR EL NODO SELECTED EN FALSE//
    public invoiceLineSettings( lines:any[] ):void {
        lines.forEach( (line:any) => {
            line.selected = false;
        });
    }
    //*************************************************************************************************************//
    //WORK ORDER SELECCIONADA//
    public selectThisLine( line_data:any ):void {
        !line_data.selected ? 
            line_data.selected = true : 
            line_data.selected = false;

    }
    //*************************************************************************************************************//
    //FUNCION PARA ALAMECENAR LOS ID'S DE LOS INVOICES//
    public request_table_colums:string[] = ['campo_0','campo_1','campo_2','campo_3','campo_4','campo_5'];
    public continueToRequestInvoice():void {
        localStorage.setItem('lines_selected', this.getInvoicesToFind() );
        localStorage.setItem('invoiceType', this.current_so_data.type);
        localStorage.setItem('sr', this.current_so_data.sr_id);
        this.hideModal();
        this._router.navigateByUrl('requestInvoice');
    }
    //*************************************************************************************************************//
    //FUNCION PARA CREAR LOS INVOICES A CONSULTAR//
    public getInvoicesToFind():string {
        let result:string = '';
        this.invoice_lines.forEach( (line:any) => {
            if( line.selected ) {
                result += `so=${ line.id }&`;
            }
        });
        result = result.substring(0, result.length - 1);
        return result;
    }
    //*************************************************************************************************************//
    //FUNCION PARA CERRAR MODAL//
    public hideModal(): void {
        this.dialogRef.close(true);
    }
    //*************************************************************************************************************//
    public dateWorker( date_in:string ):string {
        return date_in.split('T')[0];
    }

}