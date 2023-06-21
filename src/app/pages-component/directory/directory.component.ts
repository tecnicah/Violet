import { Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  public __loader__: LoaderComponent = new LoaderComponent();
  dataSource:any;
  displayedColumns: string[] = ['ContactName', 'Title', 'Office', 'Country','City', 'Phone', 'E-mail', 'Contact'];
  filteruno: boolean = false;
  data_directory : any = {};
  user:any;
  @ViewChild('sort') sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) DataFollow: MatPaginator;
  // @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;

  constructor(public _services: ServiceGeneralService, public router: Router) { }
  maxall: number = 20;


  ngOnInit(): void {
    this.__loader__.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    this._services.service_general_get('Profile/GetDirectory').subscribe((data => {
      if (data.success) {
        console.log(data.result.value);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.DataFollow;
        this.dataSource.sort = this.sort;
        this.__loader__.hideLoader();
      }
      }));
      this.catalogos();
  }
  getPageSizeOptions() {
    if (this.dataSource.paginator?.length > this.maxall) {
      return [10, 20, this.dataSource.paginator?.length];
    }
    else {
      return [10, 20];
    }
  }
  //**********************************************//
  //CATALOGOS//
  ca_title = [];
  ca_country = [];
  ca_company:any[] = [];
  ca_office = [];
  async catalogos(){
    this._services.service_general_get('Catalogue/GetCompany').subscribe(async data => {
      if (data.success) {
        console.log('DATA CONSULTA: ', data);
        this.ca_company = data.result.value;
      }
    });
    this.ca_country = await this._services.getCatalogueFrom('GetCountry');
    this.ca_office = await this._services.getCatalogueFrom('GetOffice');
    this.ca_title = await this._services.getCatalogueFrom('GetTitle');
  }
  //*************************************************//
  ca_city = [];
  getCity(){
    this._services.service_general_get('Catalogue/GetState?country=' + this.data_directory.country).subscribe((data => {
      if (data.success) {
          this.ca_city = data.result;
      }
    }))
  }
  //*************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CAMPO ABIERTO//
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //*************************************************//
  //BUSQUEDA DE INFORMACION A TRAVES DE CATALOGOS//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.data_directory) {
      if (this.data_directory[item] != '') {
        service_record_params_selected += `${ item }=${ this.data_directory[item] }&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.consultaInformacionPorFiltro(params);
  }
  //*************************************************//
  //CONSULTA INFORMACION POR FILTRO//
  public consultaInformacionPorFiltro(params: string = ''): void {
    this.__loader__.showLoader();
    const params_in: string = params == '' ? '' : `?${ params }`;
    console.log(params_in);
    this._services.service_general_get('Profile/GetDirectory' + params_in).subscribe((data: any) => {
      if (data.success) {
        let eventos = data.result.value;
        console.log("ESTOS SON LOS EVENTOS FILTRADOS:  ", eventos);
        this.dataSource = new MatTableDataSource(data.result.value);
        this.dataSource.paginator = this.DataFollow;
        this.dataSource.sort = this.sort;
        this.__loader__.hideLoader();
      }
    });
  }
  //*************************************************//
  //ENTRA A LIMPIAR FILTROS DE BUSQUEDA//
  public cleanFilter():void {
    this.data_directory = { };
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
  //*************************************************//
  //FUNCION PARA ENVIAR MENSAGE Y REDIRIGIR AL CHAT//
  sendMessage(data){
    console.log(data);
    let data_send = {
      "userid": this.user.id,
      "userList": [ data.user_id ],
      "message": "Hello " + data.user,
      "file": "qwertyiteasynotworry",
      "fileExtension": "",
      "group": false
    }

    console.log("Objeto que se enviara: ", data_send);

    this._services.service_general_post_with_url('Chat/SentNewMessage', data_send).subscribe(n => {
      console.log(n.result);
      localStorage.setItem('conversationId', n.result[0].messages[0].conversation);
      this.router.navigateByUrl('/messenger-center')
    },err=>{
      console.log("Error al realizar envio de nuevo mensaje: ", err);
    })
  }
  //*************************************************//
  //FUNCION PARA CONSULTA DE PROFILE//
  openProfile(element){
    console.log(element);
    if(element.role == "Coordinator"){
       this.router.navigateByUrl('/profilecoordinator/'+element.id);
    }

    if(element.role == "Supplier"){
      this.router.navigateByUrl('/profileconsultant/'+element.id);
    }

    if(element.title_id == "Manager"){
      this.router.navigateByUrl('/profilemanager/'+element.id);
    }

  }
}
