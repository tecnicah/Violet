import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogAddCuntryComponent } from '../dialog-add-cuntry/dialog-add-cuntry.component';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DialogApplyAllScopeComponent } from '../dialog-apply-all-scope/dialog-apply-all-scope.component';
import { MatOption } from '@angular/material/core';



@Component({
  selector: 'app-dialog-add-service',
  templateUrl: './dialog-add-service.component.html',
  styleUrls: ['./dialog-add-service.component.scss']
})
export class DialogAddServiceComponent implements OnInit {

  @ViewChild('allSelected') private allSelected: MatOption;
  searchUserForm: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<DialogAddServiceComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog, private fb: FormBuilder) { }
    countries:any;
    GetService: any[] = [];
    cuatro: string[] = ['uno', 'dos', 'tres', 'cuatro'];
    serviceLocationCountries: any;
  caCountry: any[] = [];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  caCounty: any[] = [];
  GetCountry: any[] = [];
  public getDataCountryScopeDoc: any[] = [];
  toppings = new FormControl();


  ngOnInit(): void {
    debugger;
    console.log('data que recibe service', this.data);
    this.searchUserForm = this.fb.group({
      userType: new FormControl('')
    });

    if(this.data.id != 0){
      this.searchUserForm.controls.userType.setValue(this.data.idService);
    }
    this.catalogos();
    this.consultaPermisos();
  
    //
    if(this.data.id == 0){
      let data: any[] = [];
      for (const iterator of this.data.obj_guardar.servicelocationcountries[0].countries) {
        data.push({
          idCountry: iterator,
          scopeDescription: this.data.obj_guardar.servicelocationcountries[0].scopeDescription,
          documentLocationCountries: this.data.obj_guardar.servicelocationcountries[0].documentLocationCountries,
        })
      }
      this.serviceLocationCountries = new MatTableDataSource(data);
    }else{
      this.serviceLocationCountries = new MatTableDataSource(this.data.serviceLocationCountries);
    }
    console.log('this.serviceLocationCountries', this.serviceLocationCountries);
    // /AdminCenter/Services/ClientPartner
    // this._services.service_general_get("Catalogue/GetServiceByServiceLine?idServiceLine="+this.data.sl).subscribe
    this.getCountryApplyScope();
  }

  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
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

  async catalogos(){
    //let im = await this._services.getCatalogueFrom('GetCataegoryByServiceLineId?serviceLineId='+this.data.sl);
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    this.GetCountry = await this._services.getCatalogueFrom('GetCountry');
    console.log(this.GetCountry)
    this._services.service_general_get(`AdminCenter/Services/ClientPartner/${this.data.sl}`+'?idPartner='+this.data.partnerId).subscribe((data => {
      if (data.result) {
        debugger;
        this.GetService = data.result;
        console.log(this.GetService);
        this.data.services?.forEach(element => {
          this.GetService?.forEach((service, index) => {
            //console.log("2",element,"3",service);
            if(element.servicesName.toLowerCase() == service.service.toLowerCase()){
              console.log(element.servicesName.toLowerCase(), '==', service.service.toLowerCase());
              this.GetService.splice(index, 1);
            }
          });
        });
      }
    }));
  }

  getCountry(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].name;
      }
    }
  }
    //////////////////////////////////////////////////////////////////////////////////////
  //office information
  addCountry(data, i) {
    console.log('data form', data);

    // opcion cuando se crea un servicio nuevo y puede elegir muchos paises
    if (this.data.id == 0 && data == null) {
     debugger;

      console.log('multicheck id servicios', this.searchUserForm.controls.userType.value);
      data= {
        id : 0, 
        action: "new", 
        idService: this.searchUserForm.controls.userType.value, 
        standarScopeDocuments: 0, 
        serviceLine: this.data.sl, 
        idServiceLocation : this.data.id};
    }
    // opcion cuando es un servicio ya creado y se le quiere agregar un pais nuevo ya no hay multicheck
    else if (this.data.id != 0 && data == null) {
      // mandar id de servicio que tiene desde admin center
      let getIdService;
      for (let i = 0; i < this.GetService.length; i++) {
        const service = this.GetService[i];
        if (service.service1 == this.data.idService) {
          getIdService = service.id;
        }
      }
      // aqui se envia el id de service location para evitar duplicidad de countries
      data = {id : 0, action: 0, idService: getIdService, standarScopeDocuments: 0, serviceLine: this.data.sl, idServiceLocation : this.data.id};
    }
    //opcion cuando editas un country
    else {
      // mandar id de servicio que tiene desde admin center
      let getIdService;
      for (let i = 0; i < this.GetService.length; i++) {
        const service = this.GetService[i];
        if (service.service1 == this.data.idService) {
          data.idService = service.id;
          data.serviceLine = this.data.sl
          data.idServiceLocation = this.data.id
        }
      }
      data.action = i;
    }
    const dialogRef = this._dialog.open(DialogAddCuntryComponent, {
      data: data,
      width: '90%'
  });

  dialogRef.afterClosed().subscribe(result => {
    debugger;
    if (result.success) {
      console.log('data save', result);
      let user = JSON.parse(localStorage.getItem('userData'));
      result.updatedBy = user.id;
      result.updatedDate = new Date();
      //  si es un create el campo country se va en 0 ya que
      if(result.action == "new"){
        // result.idServiceLocation = this.data.id;
        // this.data.servicelocationcountries.push(result);
        result.countries = result.idCountry;
        result.idCountry = 0;
        result.idServiceLocation = this.data.id;
        result.createdBy= user.id;
        result.createdDate= new Date();
        this.data.servicelocationcountries.push(result);
        setTimeout(() => {
          this.getCountryNoSave();  
        }, 100);
        
      }
      //  si es un update de un service y se agrega un nuevo country
      else if (result.action == 0 && result.id == 0) {
        // push a la data
        this.data.servicelocationcountries = [];
        result.countries = [];
        result.countries = result.idCountry;
        result.idCountry = result.idCountry[0];
        // result.serviceCountryLeaders = [];
        result.idServiceLocation = this.data.id;
        result.createdBy = user.id;
        result.createdDate= new Date();
        this.data.servicelocationcountries.push(result);
        this.addCountryUpdate();
      }
      else {
        // this.data.servicelocationcountries[result.action] = result;
        result.countries = [];
        if (result.documentLocationCountries.length == 0) {
          result.documentLocationCountries = [];
        }
        // this.serviceLocationCountries.push(result);
        this.data.servicelocationcountries[result.action] = result;
        // this.serviceLocationCountries[result.action] = result;
      }

        console.log(this.data.servicelocationcountries);
        console.log(this.serviceLocationCountries);

        // this.serviceLocationCountries = new MatTableDataSource(this.data.servicelocationcountries);
      }

    });
  }
  // este methodo es para pintar la tabla de countrys cuando aun no estan guardados los datos
  getCountryNoSave() {
    let valorTabla = [];
    this.serviceLocationCountries = [];
    this._services.service_general_get('Catalogue/GetCountry').subscribe(r=>{
      if(r.success){
        this.caCounty= r.result;
        for (let i = 0; i < this.data.servicelocationcountries[0].countries.length; i++) {
          const element = this.data.servicelocationcountries[0].countries[i];
          for (let j = 0; j < this.caCounty.length; j++) {
            const elementc = this.caCounty[j];
            if(element ==  elementc.id){
              // this.data.serviceCountries[i].namec = elementc.name;
              valorTabla.push({
                namec: elementc.name,
                scopeDescription: this.data.servicelocationcountries[0].scopeDescription,
                documentLocationCountries: this.data.servicelocationcountries[0].documentLocationCountries,
                standarScopeDocuments: this.data.servicelocationcountries[0].standarScopeDocuments,

              });
            }
          }
        }
        this.serviceLocationCountries = new MatTableDataSource(valorTabla);
      }
    })
  }
  //
  addCountryUpdate() {
    // metodo que agrega nombre y ciudad a la tabla cuando aun no se guarda los countries que se agregaron
    let valorTabla = [];
    for (let c = 0; c < this.data.servicelocationcountries.length; c++) {
      const dataTableCountry = this.data.servicelocationcountries[c];
      for (let j = 0; j < this.GetCountry.length; j++) {
        const elementc = this.GetCountry[j];
        if(dataTableCountry.idCountry ==  elementc.id){
          valorTabla.push({
            id: dataTableCountry.id,
            idCountry: dataTableCountry.idCountry,
            name: elementc.name,
            scopeDescription: dataTableCountry.scopeDescription,
            idServiceLocation: dataTableCountry.idServiceLocation,
            documentLocationCountries: dataTableCountry.documentLocationCountries,
            standarScopeDocuments: dataTableCountry.standarScopeDocuments
          });
        }
      }
    }
    // this.serviceLocationCountries = new MatTableDataSource(valorTabla);
    this.serviceLocationCountries.data.push(valorTabla[0]);
    // se manda a llamar ngonit para que se pinte el registro
    this.ngOnInit();

  }

  //trae los countries que tienen scope documents local para aplicar scope doc.
  getCountryApplyScope(){
    this._services.service_general_get(`Catalogue/Country-Service-Location/All/${this.data.id}`).subscribe((data => {
      if (data.result) {
        this.getDataCountryScopeDoc = data.result.value;
        console.log('getDataCountryScopeDoc', this.getDataCountryScopeDoc);
      }
    }));
  }
  // Este metodo sirve para cambiar el scope documents en todos los paises agregados
  applyScope(){
    console.log('data para aplicar Scope Documents');

    const dialogRef = this._dialog.open(DialogApplyAllScopeComponent, {
      data: this.data,
      width: '90%'
  });
  }


  // banderas de seleccion y unselect
  allComplete: boolean = false;

  // metodo que selecciona todos los servicios en el multicheck
  toggleAllSelection() {
    debugger;

    if (this.allSelected.selected) {
      this.searchUserForm.controls.userType
        .patchValue([...this.GetService.map(item => item.service1),0]);
    } else {
      this.searchUserForm.controls.userType.patchValue([]);
    }
    console.log(this.searchUserForm);
  }

  valid_service: boolean = false;
  valid_country: boolean = false;
  // valid_nickname: boolean = false;

  validar(){

    if (this.searchUserForm.controls.userType.value == undefined ||
      this.searchUserForm.controls.userType.value == null || this.searchUserForm.controls.userType.value == '') {
      this.valid_service = true;
    }
    else {
      this.valid_service = false;
    }
    if (this.serviceLocationCountries.data.length == 0 ) {
      this.valid_country = true;
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Country",
          body: "Required a country"
        },
        width: "350px"
      });
      return ;
    }
    else {
      this.valid_country = false;
    }


    if(this.valid_service == false && this.valid_country == false){
      this.save();
    }

  }
  save() {

    // quitar los registros de la tabla cuando tienen id 0  ya que estos solo son para pintar al cliente
    if(this.data.action != 'new'){
      var value = 0
      this.data.serviceLocationCountries = this.data.serviceLocationCountries.filter(function(item) {
        return item.id !== value
      })
    }
    // validar el nickname no se puede ir vacio
    if (this.data.nickName == undefined || this.data.nickName.length == 0) {
      this.data.nickName = '--';
    }
    
    if(this.data.action == 'new'){
      this.data.idService = this.searchUserForm.controls.userType.value;
      this.data.idService.forEach((element, index) => {
        if(element == 0){
          this.data.idService.splice(index, 1);
        }
      });
    }

    this.data.success = true;
    this.data.catalogServices = this.GetService;
    console.log('data ', this.data);
    this.dialogRef.close(this.data);
  }

}
