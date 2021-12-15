import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  active:number;
  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog,public dialogRef: MatDialogRef<AddElementComponent>, public _routerParams: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("add element");
    this.getCatalogos();
  }
  //***************************************************//
  //FUNCION PARA CONSULTA DE ELEMENTOS//
  public element:any;
  getCatalogos(){
    let id = Number(localStorage.getItem('tipo_contenido'));
    this._services.service_general_get('Catalogue/GetElement?content='+id).subscribe((data => {
      if(data.success){
        this.element = data.result;
      }
    }))
  }
  //***************************************************//
  //FUNCION PARA AGREGAR ELEMENTOS//
  public elemento : any;
  addElement(item, i){
    item.success = true;
    this.elemento = item;
    this.active = i;
  }
  //***************************************************//
  //FUNCION PARA INSERTAR//
  save(){
    this.dialogRef.close(this.elemento);
  }

}
