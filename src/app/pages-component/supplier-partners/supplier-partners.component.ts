import { NewSupplierComponent } from '../dialog/new-supplier/new-supplier.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogExportComponent } from '../dialog/dialog-export/dialog-export.component';
import { PdfMakeWrapper, Table } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-supplier-partners',
  templateUrl: './supplier-partners.component.html',
  styleUrls: ['./supplier-partners.component.css']
})
export class SupplierPartnersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('Supplier') Supplier: MatPaginator;
  // @ViewChild(MatPaginator, {static: true}) Supplier: MatPaginator;
  @ViewChild(MatPaginator, {static: true})Supplier: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;


  loader:LoaderComponent = new LoaderComponent();
  //displayedColumns: string[] = ['SupplierCategory', 'SupplierPartner', 'SupplierPartnerType', 'VIP', 'Country', 'City', 'ContactName', 'Phone', 'TotalServices', 'Experience', 'Contact'];
  //displayedColumns: string[] = ['SupplierPartner','SupplierCategory', 'SupplierPartnerType', 'VIP', 'City', 'ContactName', 'Phone', 'TotalServices', 'Experience', 'Contact'];
  displayedColumns: string[] = ['SupplierPartner','SupplierCategory', 'SupplierPartnerType', 'VIP', 'City', 'ContactName', 'Phone', 'Status'];
  supplier: any;
  ca_country: any[] = [];
  ca_city: any[] = [];
  ca_status: any[] = [];
  ca_supplierType: [] = [];
  ca_supplierCategory: any[] = [];
  search: any = {
    status: '',
    supplierCategory: '',
    partnerType: '',
    country: '',
    city:''
  };
  public filterSPT: any = { supplierType: '' };
  public filterCountry: any = { name: '' };
  public filterCity: any = { city: '' };
  public filterStatus: any = { status: '' };
  public cat: any = { id: 1, category: 'Consultant supplier compan', type: 1 };
  public cat1: any = { id: 2, category: 'Service Provider Profile', type: 2 };
  public cat2: any = { id: 3, category: 'Premier Consultant', type: 3 };
  public cat4: any = { id: 0, category: 'All Categories', type: 0 };
  public cat3: any = { id: 4, category:'Consultant of a company', type: 4 };

  filteruno: boolean = false;

  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public router: Router) {}


  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
  public permission_edit: boolean = false;
  maxall: number = 20;

	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//
  async ngOnInit() {
    console.log('perfil', this.__userlog__ );
    this.consultaPermisos();
    this.loader.showLoader();
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartners').subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        let filterSupplier;
        filterSupplier =  data.result.value.sort(function (a, b) {
          return b.createdDate.localeCompare(a.createdDate);
        });
        this.supplier =  new MatTableDataSource(filterSupplier);
        this.supplier.paginator = this.Supplier;
        this.supplier.sort = this.sort;
      }
    }));

    this._services.service_general_get('Catalogue/GetSupplierTypeCatalogue?id=5&id=10&id=6&id=7&id=8&id=13&id=11&id=12&id=1&id=2&id=3&id=4&id=9&id=14&id=15&id=16&id=17&id=18&id=19&id=20&id=21&id=22&id=23&id=24&id=25&id=26&id=27&id=28&id=29&id=30&id=31&id=32&id=33&id=34&id=35&id=36').subscribe((data => {
      if (data.success) {
        this.ca_supplierType = data.result;
      }
    }))
    this.catalogos();
  }

  getPageSizeOptions() {
    if (this.supplier?.paginator.length > this.maxall) {
      return [10, 20, this.supplier?.paginator.length];
    }
    else {
      return [10, 20];
    }
  }

  //*************************************************************//
  async catalogos() {
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.validarCountry();
    console.log('catalog country', this.ca_country );
    this.ca_status = await this._services.getCatalogueFrom('GetSupplierPartnerProfileStatus');
    //this.ca_supplierCategory = await this._services.getCatalogueFrom('GetSupplierType');
    this.setCategorys();
    console.log("============ CATEGORIA ");
    console.log(this.ca_supplierCategory);
    this.loader.hideLoader();
    // validar country
  }

  setCategorys() {
    // this.ca_supplierCategory[0] = this.cat;
    // this.ca_supplierCategory[1] = this.cat1;
    // this.ca_supplierCategory[2] = this.cat2;
    // this.ca_supplierCategory[3] = this.cat3;
    // this.ca_supplierCategory[4] = this.cat4;

     this.ca_supplierCategory[0] = this.cat1;
     this.ca_supplierCategory[1] = this.cat2;
     this.ca_supplierCategory[2] = this.cat4;
    // this.ca_supplierCategory[4] = this.cat4;
  }

  // si es consultant solo debe de ver el country y las ciudades donde este se encuentra
  validarCountry() {
    if (this.__userlog__.role.id == 3) {
      let country = this.ca_country;
      let countryConsultant: any[] = [];
      this.ca_country = [];
      for (let i = 0; i < country.length; i++) {
        const element = country[i];
        if (element.id == this.__userlog__.profileUsers[0].country) {
          // country.splice(i, 1);
          countryConsultant.push(element);
        }
      }
      this.ca_country = countryConsultant;
      this.search.country = this.ca_country[0].id;
      this.searchData();
      this.getCity();
    }
    else {
      return
    }
  }

  //*************************************************************//
  getCity() {
    let data = this.search.country;
    console.log("consulta ciudad: ", data);
    this._services.service_general_get('Catalogue/GetState?country=' + data).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    }))
  }
  //*************************************************************//
  searchData() {
   let service_record_params_selected:string = '';;
   let params = '';
   for( let item in this.search ) {
    if( this.search[item] != '' ) {
        service_record_params_selected += `${ item }=${ this.search[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
    }
   }
   console.log("PARAMETROS DE BUSQUEDA: ", params)
   this.getServiceRecordTableData(params);
  }
  //*************************************************************//
  public getServiceRecordTableData(params: string = ''): void {
    this.loader.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartners' + params_in).subscribe((data: any) => {
        if (data.success) {
          this.supplier = new MatTableDataSource(data.result.value);
          this.supplier.paginator = this.Supplier;
          this.supplier.sort = this.sort;
          this.loader.hideLoader();
        }
      });
  }
  //*************************************************************//
  newSupplier() {
    const dialogRef = this._dialog.open(NewSupplierComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.type == 1) {
        this.router.navigateByUrl('supplierConsultant/nuevo');
      } else if (result.type == 2) {
        this.router.navigateByUrl('supplierServices/nuevo');
      } else if (result.type == 3) {
        this.router.navigateByUrl('profileconsultant/New');
      }
    });
  }
  //*************************************************************//
  viewSupplier(data) {
    console.log("viewSupplier: ", data);
    if(data.supplierCategory == 'Service Provider Profile'){
      this.router.navigateByUrl('supplierConsultant/' + data.id);
    }
    if(data.supplierCategory == 'Service Provider Profile'){
      this.router.navigateByUrl('supplierServices/' + data.id);
    }
    if(data.supplierCategory != 'Consultant supplier company' && data.supplierCategory != 'Service Provider Profile'){
      this.router.navigateByUrl('profileconsultant/' + data.id);
    }
  }
  //*************************************************************//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.supplier.filter = filterValue.trim().toLowerCase();
    console.log(this.supplier);
  }
  //*************************************************************//
  showExportDialog() {
    const dialogRef = this._dialog.open(DialogExportComponent, {
      data: "",
      width: "40%"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        document.getElementById("excel").click();
      }
      if (result === 2) {
        //let tabla = [[ 'Supplier Partner','Supplier Category', 'Supplier Partner Type', 'VIP', 'Country', 'City', 'Contact Name', 'Phone', 'Total Services', 'Experience', 'Contact']];
        let tabla = [[ 'Supplier Partner','Supplier Category', 'Supplier Partner Type', 'VIP', 'Country', 'City', 'Contact Name', 'Phone']];
        for (let i = 0; i < this.supplier.filteredData.length; i++) {
          const element = this.supplier.filteredData[i];
          if(element.luxuryVip == true){
            element.luxuryVip = "Yes";
          }else if(element.luxuryVip == false){
            element.luxuryVip = "No";
          }
          tabla.push([
            element.supplierCategory,
            element.supplierPartner,
            element.supplierPartnerType,
            element.luxuryVip,
            element.name,
            element.city,
            element.contactName,
            element.phone
            // , element.totalServices,
            // element.experience,
            // element.contact
          ])
        }
        console.log(tabla);
        // Set the fonts to use
        PdfMakeWrapper.setFonts(pdfFonts);

        const pdf = new PdfMakeWrapper();

        pdf.pageMargins([30, 30, 30, 30]);
        pdf.pageOrientation('landscape');
        pdf.defaultStyle({
          fontSize: 10,
          alignment: 'center'
        });
        pdf.add(new Table(tabla).layout('lightHorizontalLines').end);

        pdf.create().download('Supplier Partner.pdf');
      }
    });
  }
  //****************************************************************//
  public cleanFilter(): void {
    this.filterSPT = { supplierType: '' }; ///acá en vez de meter el type se va a meter la categoria 
    this.filterCountry = { name: '' };
    this.filterCity = { city: '' };
    this.filterStatus = { status: '' };

    this.search = {
      status: '',
      supplierCategory: '',
      partnerType: '',
      country: '',
      city:''
    };
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();

  }

  public info_country: any = {};
    viewCity(data) {
        this.info_country.country = data.name;
        this.info_country.city = data.city;
    }


}
