import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogViewEscalation } from '../dialog/dialog-view-escalation/viewEscalation.component';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'app-escalations',
  templateUrl: './escalations.component.html',
  styleUrls: ['./escalations.component.scss']
})
export class EscalationsComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();
  ca_status:any[]=[];
  ca_cliente:any[]=[];
  supplier_catalogue:any[]=[];
  ca_serviceLine:any[]=[];
  ca_country:any[]=[];
  ca_city:any[]=[];
  ca_partner:any[]=[];
  data:any={};
  public range = new FormGroup({
    rangeDate1: new FormControl(),
    rangeDate2: new FormControl()
  });
  @ViewChild('sortescalation') sortescalation: MatSort;
  // @ViewChild('pagescalation') pagescalation: MatPaginator;
  @ViewChild(MatPaginator, {static: true})pagescalation: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  public filterPartner: any = { coordinator: '' };
  public filterOffice: any = { office: '' };
  public filterClient: any = { name: '' };
  public filterCountry: any = { name: '' };
  public filterCity: any = { city: '' };
  public filterSuplierPartner: any = { comercialName: '' };

  filteruno: boolean = false;
  user: any;
  data_table: any;
  displayedColumns: string[] = ['ServiceRecord', 'VIP', 'EscalationLevel', 'ServiceLine', 'Status', 'AuthoDate',  'City', 'Client', 'AssigneeName', 'Coordinator', 'Supplier'];
  data_level:any = {
    level1: '',
    level2: '',
    level3: '',
    level4: '',
    level5: ''
  };
  data_filter : any = {
    partner: '',
    client: '',
    supplierPartner: '',
    status: '',
    serviceLine: '',
    country: '',
    city: '',
    level:''
  }
  maxall: number = 20;


  constructor(public _services: ServiceGeneralService,public _dialog: MatDialog) { }

  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('MyDashboard/GetEscalation/'+this.user.id).subscribe((data => {
      if (data.success) {
        console.log(data.result);
        console.log(data.map.value);
        this.data_table = new MatTableDataSource(data.map.value.escalation);
        this.data_table.paginator = this.pagescalation;
        this.data_table.sort = this.sortescalation;
        this.data_level = data.map.value;
      }
      }));
    this.catalogos();
  }
  goBack() {
    window.history.back();
  }
  getPageSizeOptions() {
    if (this.data_table?.paginator.length > this.maxall) {
      return [10, 20, this.data_table?.paginator.length];
    }
    else {
      return [10, 20];
    }

  }
  //***********************************//
  public data_partner:any= {
    partner:"",
    client:""
  };;
  public info_country: any = {};
    viewCity(data) {
        this.info_country.country = data.country;
        this.info_country.city = data.city;
    }
  //***********************************//
  public ca_office = [];
  async catalogos(){
    this.ca_status = await this._services.getCatalogueFrom('GetStatus');
    //this.ca_cliente = await this._services.getCatalogueFrom('GetClient');
    //this.supplier_catalogue = await this._services.getCatalogueFrom('GetSupplier');
    this.ca_serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_partner = await this._services.getCatalogueFrom('GetPartner');
    this.ca_office = await this._services.getCatalogueFrom('GetOffice');
    this.__loader__.hideLoader();
  }
  //***********************************//
  getClient(){
    console.log("consulta Cliente");
	  this._services.service_general_get('Catalogue/GetClient/' + this.data_filter.partner).subscribe((data => {
		  if (data.success) {
			this.ca_cliente = data.result.value;
		  }
	  }))
  }
  //***********************************//
  getSupplierPartner(){
		if(this.data_filter.serviceLine== "" || this.data_filter.country == "" || this.data_filter.city == ""){
			 return true;
		}
		this._services.service_general_get("SupplierPartnerProfile/GetSupplierPartnerConsultant?country="+this.data_filter.country+"&city="+this.data_filter.city+"&serviceLine="+this.data_filter.serviceLine).subscribe((data =>{
			if(data.success){
				console.log("select supplier: ", data.result.value);
				this.supplier_catalogue = data.result.value;
			}
		}));
	}
  //***********************************//
  getCity() {
    console.log("consulta ciudad");
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_filter.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
  }
  //***********************************//
  openEscalation(escalation: any){
    const add_call_dialog = this._dialog.open(DialogViewEscalation, {
      data: {
        id_so: escalation.id,
        escalation: escalation
      },
      width: "95%"
    });

    add_call_dialog.afterClosed().subscribe(result => {

    });
  }
  //********************************************//
  searchData() {
    let service_record_params_selected:string = '';;
    let params = '';
    for( let item in this.data_filter ) {
     if( this.data_filter[item] != '' ) {
         service_record_params_selected += `${ item }=${ this.data_filter[item] }&`;
         params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
     }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
   }
   //********************************************//
   public getServiceRecordTableData(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('MyDashboard/GetEscalation/'+this.user.id + params_in).subscribe((data: any) => {
        if (data.success) {
          this.data_table = new MatTableDataSource(this.dataDashboardFilterByCards(data.map.value.escalation));
          this.data_table.paginator = this.pagescalation;
          this.data_table.sort = this.sortescalation;
          this.data_level = data.map.value;
          this.__loader__.hideLoader();
        }
      });
  }

  public dash_table_params:string = '';
  // filter cards
  public filter_cards_selected:string[] = [];
	public filterTableByCard( card_selector:string ):void {
    console.log('card select', card_selector);
		const is_filter_active:boolean = (this.filter_cards_selected.indexOf( card_selector ) > - 1),
			card_container:any = document.getElementById(`${ card_selector }_filter_card`),
			params_used:string = this.dash_table_params == '' ? '' : `?${ this.dash_table_params.substring(1) }`;
            debugger
		if( is_filter_active ) {

			card_container.classList.remove('filterCard__card--active');
			this.filter_cards_selected.splice( this.filter_cards_selected.indexOf( card_selector ), 1 );
			this.getServiceRecordTableData( params_used );

		} else {

			card_container.classList.add('filterCard__card--active');
			this.filter_cards_selected.push( card_selector );
			this.getServiceRecordTableData( params_used );

		}

  }

  public dataDashboardFilterByCards( table_rows:any ):any[] {
		const rows_in:any[] = table_rows;
		let rows_selected:any[] = [];
		rows_in.forEach( (row:any) => {
			if( this.filter_cards_selected.length != 0 ) {
				this.filter_cards_selected.forEach( (filter_condition:string) => {
					if( filter_condition == 'level1' ) {
						if( row.escalationLevel == 1 ) {
							rows_selected.push( row );
							console.log( 'rows_selected ===> ', rows_selected );
						}
					}
					if( filter_condition == 'level2' ) {
						if( row.escalationLevel == 2 ) {
							rows_selected.push( row );
						}
					}
					if( filter_condition == 'level3' ) {
						if( row.escalationLevel == 3) {
							rows_selected.push( row );
						}
					}
					if( filter_condition == 'level4' ) {
						if( row.escalationLevel == 4 ) {
							rows_selected.push( row );
						}
          }
          if( filter_condition == 'level5' ) {
						if( row.escalationLevel == 5 ) {
							rows_selected.push( row );
						}
					}
				});
			} else {
				rows_selected.push( row );
			}
		});
		table_rows = [];
		return rows_selected;

	}


   //********************************************//
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_table.filter = filterValue.trim().toLowerCase();
   }
   //********************************************//
  public cleanFilter(): void {
    this.filterPartner = { coordinator: '' };
    this.filterClient = { name: '' };
    this.filterCountry = { name: '' };
    this.filterCity = { city: '' };
    this.filterSuplierPartner = { comercialName: '' };
    this.filterOffice = { office: '' };
    this.range.reset({
      rangeDate1: '',
      rangeDate2: ''
    });
      this.data_filter = {
        sr: '',
        coordinator: ''
      };
      this.filter_cards_selected = [];
      let level1 = document.getElementById('level1_filter_card');
      let level2 =document.getElementById('level2_filter_card');
      let level3 =document.getElementById('level3_filter_card');
      let level4 =document.getElementById('level4_filter_card');
      let level5 =document.getElementById('level5_filter_card');
      level1.classList.remove('filterCard__card--active');
      level2.classList.remove('filterCard__card--active');
      level3.classList.remove('filterCard__card--active');
      level4.classList.remove('filterCard__card--active');
      level5.classList.remove('filterCard__card--active');


      this.filteruno = true;
      setTimeout(() => {
        this.filteruno = false;
      }, 2000);
      this.ngOnInit();

    }
    //*********************************************//
    showExportDialog(){
      const dialogRef = this._dialog.open(DialogExportComponent, {
          data: this.data_table.filteredData,
          width: "40%"
      });

      dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if(result === 1){
              document.getElementById("excel").click();
          }

          if(result === 2){
              let tabla = [['ServiceRecord', 'VIP', 'Escalations', 'EscalationLevel', 'ServiceLine', 'Status', 'AuthoDate', 'Country', 'City', 'Partner', 'Client', 'AssigneeName', 'Coordinator', 'Supplier']]
              for (let i = 0; i < this.data_table.filteredData.length; i++) {
                  const element = this.data_table.filteredData[i];
                  if(element.status){
                    element.status = 'Active';
                  }else{
                    element.status = 'Inactive';
                  }
                  tabla.push([
                      element.numberServiceRecord,
                      element.vip,
                      element.escalations,
                      element.escalationLevel,
                      element.serviceLine,
                      element.status,
                      element.initialAutho,
                      element.country,
                      element.state,
                      element.partner,
                      element.client,
                      element.assigneeName,
                      element.coordinator,
                      element.supplier
                  ])
              }
              console.log(tabla);
                // Set the fonts to use
              PdfMakeWrapper.setFonts(pdfFonts);

              const pdf = new PdfMakeWrapper();

              pdf.pageMargins([30,30,30,30]);
              pdf.pageOrientation('landscape');
              pdf.defaultStyle({
                  fontSize: 8,
                  alignment: 'center'
              });
              pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

              pdf.create().download('escalations.pdf');
          }
      });
  }

}
