import { Component, OnInit, Inject } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-emergency-contact',
  templateUrl: './dialog-emergency-contact.component.html',
  styleUrls: ['./dialog-emergency-contact.component.css']
})
export class DialogEmergencyContactComponent implements OnInit {

  data:any = {};

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data_: any,public _services : ServiceGeneralService, public _dialog: MatDialog, ) { }

  typePrefix = {
    countriesName: '',
  }
  typePrefixPersonal = {
    countriesName: '',
  }
  public prefix;
  public prefixPersonal;
  public prefixCatalog;

  validaNumericos(event){
    console.log("valid");
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || 
       event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
       event.key == 'Backspace' ){
       return true;
    }
  
     return false;
  }

  ngOnInit(): void {
    // limpiar buscadorprefix
    this.typePrefix.countriesName = '';
    this.typePrefixPersonal.countriesName = '';
    console.log("data modal: ", this.data_);
    if(this.data_ != null){
      this.data = this.data_;

      // separar prefix de phone number
          // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
          if (this.data.phoneNumber != '' && this.data.phoneNumber != null)
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.data.phoneNumber.indexOf(search);
            // obtener el valor de prefix
            this.prefix = this.data.phoneNumber.substr(0, posicion);
            // obtener valor phone
            this.data.phoneNumber = this.data.phoneNumber.substr(posicion + 1);
          }
          //home  phone
          if (this.data.homeNumber != null  && this.data.homeNumber != '')
          {
            let search = '+';
            // obtener la posicion de +
            let posicion = this.data.homeNumber.indexOf(search);
            // obtener el valor de prefix
            this.prefixPersonal = this.data.homeNumber.substr(0, posicion);
            // obtener valor phone
            this.data.homeNumber = this.data.homeNumber.substr(posicion + 1);
          }

    }
    this.catalogos();
  }
  //***********************************************************************************//
  ca_relation = [];
  async catalogos() {
    this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');

    // this.ca_relation = await this._services.getCatalogueFrom('GetRelationship');
    this._services.service_general_get('AdminCenter/GetRelationshipContact').subscribe(resp => {
      if (resp.success) {
        console.log('get emergency contact', resp);
        this.ca_relation = resp.result;
      }
    });

  }
  //***********************************************************************************//
  close() {
     // concatenar prefix de telefono
     if ( this.data.phoneNumber != '' &&this.prefix) {
      this.data.phoneNumber = `${this.prefix}+${this.data.phoneNumber}`
    }
    console.log('numero con prefix', this.data.phoneNumber);
    if ( this.data.homeNumber != '' &&this.prefixPersonal) {
      this.data.homeNumber = `${this.prefixPersonal}+${this.data.homeNumber}`
    }
    this.dialogRef.close(this.data);
  }
  save() {
    // concatenar prefix de telefono
    if ( this.data.phoneNumber != '' &&this.prefix) {
      this.data.phoneNumber = `${this.prefix}+${this.data.phoneNumber}`
    }
    console.log('numero con prefix', this.data.phoneNumber);
    if ( this.data.homeNumber != '' &&this.prefixPersonal) {
      this.data.homeNumber = `${this.prefixPersonal}+${this.data.homeNumber}`
    }
    console.log('numero con prefix', this.data.homeNumber);
    this.data.success = true;
    this.dialogRef.close(this.data);
  }

  activeName: boolean = false;
  activeRelation: boolean = false;
  activePrefix: boolean = false;
  activeNumber: boolean = false;
  active_Prefix: boolean = false;
  active_Numberp: boolean = false;
  // activeLocation: boolean = false;
  contador = 0;
 valida_form(){
   if(this.data.contactName == undefined || this.data.contactName == null || this.data.contactName == ''){
    this.activeName = true;
    this.contador++;
  }
  if(this.data.relationship == undefined || this.data.relationship == null || this.data.relationship == ''){
    this.activeRelation = true;
    this.contador++;
  }
  if(this.prefix == undefined || this.prefix == null || this.prefix == ''){
    this.activePrefix = true;
    this.contador++;
  }
  if(this.data.phoneNumber == undefined || this.data.phoneNumber == null || this.data.phoneNumber == ''){
    this.activeNumber = true;
    this.contador++;
  }
  if(this.prefixPersonal == undefined || this.prefixPersonal == null || this.prefixPersonal == ''){
    this.active_Prefix = true;
    this.contador++;
  }
  if(this.data.homeNumber == undefined || this.data.homeNumber == null || this.data.homeNumber == ''){
    this.active_Numberp = true;
    this.contador++;
  }
  // if(this.data.location == undefined || this.data.location == null || this.data.location == ''){
  //   this.activeLocation = true;
  //   this.contador++;
  // }

  if(this.contador == 0){
     this.save();
  }else{
    window.scrollTo(0,0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Warning",
        body: "To save it is necessary to save all the requested fields"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
    
    })
    this.contador = 0;
    return;
  }
 }



}
