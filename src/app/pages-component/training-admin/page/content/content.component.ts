import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { AddElementComponent } from '../../dialog/add-element/add-element.component';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralConfirmationComponent } from 'app/pages-component/dialog/general-confirmation/general-confirmation.component';
import { data } from 'jquery';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

  constructor(public _sanitizer:DomSanitizer ,public sanitizeHtml: DomSanitizer, public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) { }

  public string: any;
  public html_renderizar = [];
  public data_content: any = {};
  public userData: any;
  ngOnInit(): void {
    this.consultaPermisos();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.data_content = JSON.parse(localStorage.getItem('content'));
    if (this.data_content == null) {
      this.data_content = {
        "id": 0,
        "training": 0,
        "title": "",
        "type": Number(localStorage.getItem('tipo_contenido')),
        "order": 0,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updatedBy": this.userData.id,
        "updatedDate": new Date(),
        "evaluations": [],
        "themes": []
      }
    }else{
      localStorage.setItem('tipo_contenido', this.data_content.type);
      setTimeout(() => {
        for (let i = 0; i < this.data_content.themes.length; i++) {
          if(this.data_content.themes[i].element == 5){
            if(this.data_content.themes[i].files.length > 0 && this.data_content.themes[i].id != 0){
             this.data_content.themes[i].image = this._sanitizer.bypassSecurityTrustUrl(this._services.url_images+this.data_content.themes[i].files[0].path);
             let id = 'lead_client_avatar'+i;
             console.log(id); 
             console.log(document.getElementById(id));
             document.getElementById(''+id).setAttribute('src',this.data_content.themes[i].image.changingThisBreaksApplicationSecurity);
            }
          }
        }
      }, 2000);
    }
    console.log(this.data_content);
  }
  //************************************************************//
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
  //*************************************************************//
  addElement() {
    const dialogRef = this._dialog.open(AddElementComponent, {
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        console.log(result);
        if (Number(localStorage.getItem('tipo_contenido')) == 1) {
          this.insertNewElement(result.id);
        } else {
          this.insertNewElementEvaluation(result.id);
        }

      }
    })
  }
  //*************************************************************//
  //FUNCIONA PARA INSERTAR ELEMENTOS DE LA EVALUACION //
  insertNewElementEvaluation(id) {
    this.data_content.evaluations.push({
      "id":0,
      "content": this.data_content.id,
      "element": id,
      "text":"",
      "question":"",
      "required":false,
      "order":0,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "answers":[]
    });
    for (let i = 0; i < this.data_content.themes.length; i++) {
      this.data_content.themes[i].order = i;
    }
  }
  //*************************************************************//
  //FUNCIONA PARA INSERTAR ELEMENTOS DEL TEMA //
  insertNewElement(id) {
    this.data_content.themes.push({
      "content": this.data_content.id,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "element": id,
      "files": [],
      "id": 0,
      "order": 0,
      "text": "",
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "url": ""
    });
    for (let i = 0; i < this.data_content.themes.length; i++) {
      this.data_content.themes[i].order = i;
    }
  }
  //*************************************************************//
  //FUNCION PARA AGREGAR OPCIONES//
  addOption(i){
    this.data_content.evaluations[i].answers.push({
      "id":0,
      "evaluation":this.data_content.evaluations.id,
      "answer1":"",
      "correct":false,
      "order":0,
      "createdBy":this.userData.id,
      "createdDate":new Date(),
      "updatedBy":this.userData.id,
      "updatedDate":new Date(),
    })
  }
  //*************************************************************//
  //FUNCION PARA PONER EN TRUE LA RESPUEST CORRECTA//
  changeTrue(item, o, i,e){
    console.log(e);
    for(let k = 0; k < this.data_content.evaluations[i].answers.length; k++){
      this.data_content.evaluations[i].answers[k] = false;
    }
    this.data_content.evaluations[i].answers[o].correct = true;
    this.data_content.evaluations[i].answers[o].correctid = item.id;
  }
  //*************************************************************//
  //FUNCION PARA ELIMINAR SECCION THEME//
  deleteSection(item, i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this section?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_content.themes.splice(i,1)
      }
    })
  }
   //*************************************************************//
  //FUNCION PARA ELIMINAR SECCION EVALUATION//
  deleteSectionE(item, i){
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this section?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.data_content.evaluations.splice(i,1)
      }
    })
  }
  //*
  //*************************************************************//
  takephoto(i){
    document.getElementById('file'+i).click(); 
  }
  //*************************************************************//
  //FUNCION PARA EDICION DE FOTOGRAFIA//
  img(event, i) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      //this.training_data.photo = encoded;
      //this.training_data.photoExtension = ext[1];
      this.data_content.themes[i].files = [];
      this.data_content.themes[i].files.push({
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "fileExtension": ext[1],
        "fileName": "Document",
        "id": 0,
        "path": encoded,
        "theme": this.data_content.id,
        "updatedBy": this.userData.id,
        "updatedDate": new Date()
      });
      document.getElementById('lead_client_avatar' + i).setAttribute('src', '' + reader.result);
    };
  }
  //*************************************************************//
  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }
  //*************************************************************//
  //FUNCION PARA GUARDAR//
  save() {
    console.log("info a guardar para theme: ", this.data_content);
    window.history.back();
    localStorage.setItem('data_content', JSON.stringify(this.data_content));
  }
  //*************************************************************//
  preview() {
    console.log("info a guardar para theme: ", this.data_content);
    localStorage.setItem('data_content', JSON.stringify(this.data_content));
    this.router.navigateByUrl('/PreviewComponent');
  }
  //*************************************************************//
  //FUNCION PARA REGRESAR//
  goBack(){
    window.history.back();
  }
}
