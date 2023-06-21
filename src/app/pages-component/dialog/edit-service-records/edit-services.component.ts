import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { NewServiceOrderDialog } from '../new-services-record-dialogs/new-service-order.component';
import { LoaderComponent } from 'app/shared/loader';
import { GeneralConfirmationComponent } from './../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from './../general-message/general-message.component';



@Component({
    selector: 'edit-services-record',
    templateUrl: './edit-services.component.html'
}) export class DialogEditServices implements OnInit {
  public USERDATA: any;
  servicios_sr:any;
  
    constructor(
        public dialogRef: MatDialogRef<DialogEditServices>,
        public _services: ServiceGeneralService,
        public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(MAT_DIALOG_DATA) public current_so_data:any
    ) {}

    ngOnInit() {
      console.log('data que recibe modal', this.data);
        this.initPage();
        const user_in = localStorage.getItem('userData');
        this.USERDATA = JSON.parse(user_in);
      console.log(this.USERDATA);

    }

    public __loader__:LoaderComponent = new LoaderComponent();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    public get_so:any = null;
    public so_gotted:any = null;
    public is_any_so:boolean = false;
    public initPage():void {

        this.get_so = this.current_so_data;

        this.__loader__.showLoader();

        //if( this.get_so.so.length == 0 ) {

            this._services.service_general_get('ServiceOrder/GetOrders?sr=' + this.get_so.id)
                .subscribe( (response:any) => {

                    console.log('Aqui mise ===> ', response);

                    if( response.success ) {

                        this.so_gotted = response.result.value;

                        if( this.so_gotted == null ) this.so_gotted = [];

                        this.dataSource = new MatTableDataSource( this.so_gotted );
                        this.dataSource.paginator = this.paginator;

                        this.so_gotted.length == 0 ?
                            this.is_any_so = false : this.is_any_so = true;

                        this.__loader__.hideLoader();

                    }

                }, (error:any) => {

                    console.error('Error (GetOrders) => ', error);

                });

        //} else {

            //this.is_any_so = false;

        //}

    }

    public displayedColumns: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3', 'cam_4','cam_5','cam_6'];
    public dataSource;
    public hideModal(): void {

        this.dialogRef.close();

    }

    public performServiceRecord( id_selected:number = null ):void {

      const data_in: any = this.so_gotted;
      console.log('data que envia edit partnerID', this.data.partner );

        const dialogRef = this.dialog.open(NewServiceOrderDialog, {
          data: {
            id_so: id_selected,
            id_sr: this.get_so.id,
            id_user: this.current_so_data.user_id,
            new_sr: false,
            partnerID: this.data.partner,
            clientID: this.data.client,
            close: true,
            isnew: false,
            home_country: this.data.home_contry,
            home_city: this.data.home_city,
            host_country: this.data.host_country,
            host_city: this.data.host_city
          },width: "95%"
        });

        dialogRef.afterClosed().subscribe(result => {

            this.hideModal();
            this.initPage();

        });

  }
  // delete service
  deleteService(id) {
    // /ServiceOrder/DeleteOrder?id=1074
      const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Delete confirmation",
          body: "Are you sure to delete this work order?"
        },
        width: "350px"
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this._services.service_general_delete(`ServiceOrder/DeleteOrder?id=${id}`).subscribe((data) =>{
            console.log('respuesta de eliminacion', data);
            if (data.success) {
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: `Deleted Work Order`
                },
                width: "350px"
              });
              this.ngOnInit();
            }
          }, (error) => {
              console.error('error con el delete', error);
              const dialog2 = this.dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Warning",
                body: `The work order is in use.`
              },
              width: "350px"
              });
              this.ngOnInit();
          })
        }
      });

  }

    public dateWorker( date_in:string ):string {

        return date_in.split('T')[0];

    }

}
