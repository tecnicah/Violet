import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'search-profile-dialog',
    templateUrl: './search-profile.component.html',
    styleUrls: []
})
export class DialogSearchProfileComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogSearchProfileComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {},
        public _services: ServiceGeneralService,
        public _router: Router,
    ) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    public dataSource;
    public loader:LoaderComponent = new LoaderComponent();

    public table_example:any = [
        {
            deliver_to: 'Example',
            deliver_in: 'Example',
            service_nu: 'Example',
            location: 'Example',
            accept_date: 'Example',
            coordination: 'Example',
            autho_time: 'Example',
            projected_fee: 'Example'
        }
    ];

    public profile_table:string[] = ['campo_0','campo_1','campo_2','campo_3','campo_4','campo_5','campo_6','campo_7','campo_8'];

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

        this.getProfiles();

    }

    public getProfiles():void {

        this.loader.showLoader();

        this._services.service_general_get('ServiceRecord/GetProfile/1/100')
            .subscribe( (response:any) => {

                if( response.success ) {

                    for (let i = 0; i < response.map.value.length; i++) {
                        const element = response.map.value[i];
                        if(element.serviceLine.length >= 1){
                            response.map.value[i].serviceLine =  response.map.value[i].serviceLine[0];
                        }
                    }

                    this.dataSource = new MatTableDataSource( response.map.value );
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;


                    console.log('The Data => ', response.map.value);

                }

                this.loader.hideLoader();

            }, (error:any) => {

                console.log('Error WS => ', error);

            });

    }

    public hideModal(): void {

        this.dialogRef.close();

    }

    public toggleModalOver():void {

        

    }

    public applyFilter( $event:Event ):void {

        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

    }

    public goToServiceRecordSelected( sr_selected:string = null ):void {

        const sr_number:string = sr_selected.split('-')[1];

        this._router.navigateByUrl( `editServiceRecord/${ sr_number }` );

        this.hideModal();

    }

}