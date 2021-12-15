import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-training-curso',
  templateUrl: './training-curso.component.html',
  styleUrls: ['./training-curso.component.scss']
})
export class TrainingCursoComponent implements OnInit {

  public trainingId:Number;
  public userData:any;
  public training:any;
  public section = [];
  public __loader__: LoaderComponent = new LoaderComponent();
  public active:number;
  constructor(public _sanitizer: DomSanitizer,public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) { }
  //**************************************************************************************//
  //FUNCION DE CONSULTA DE INFORMACION DEL CURSO O EVALUACION/
  ngOnInit(): void {
    this.__loader__.showLoader();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    let id_ = this._routerParams.snapshot.params.id;
    this._services.service_general_get('Training/'+id_+'/MyTraining').subscribe((data => {
      if(data.success){
        console.log(data.result.value);
        this.training = data.result.value;
        this.trainingId = this.training.training.id;
        this.section = this.training.training.contents;
        console.log(this.training);
        this.__loader__.hideLoader();
      }
     }))
  }
  //**************************************************************************************//
  @ViewChild("myimg") elementView: ElementRef;
  obtenerRespuesta(item){
    console.log(item);
    let valor = this.elementView.nativeElement.value;
    console.log(valor);
    //this.respuestas_guardar(item, respuesta)
  ;
  }
  //**************************************************************************************//
  //FUNCION PARA CONTINUAR O EMPEZAR EVALUACION//
  continuar(){
    let pos = this.posicion + 1;
    this.active = pos;
    this.contenido(this.section[pos], pos);
  }
  //**************************************************************************************//
  //FUNCION PARA LLENAR LAS VARIABLES QUE MUESTRAS LA  ESTRUCTURA HTML EN VISTA//
  public renderizarHTML : any;
  public show_theme:boolean = false;
  public show_evaluation:boolean = false;
  public contenido_seccion:any;
  public posicion:number = 0;
  contenido(item, i){
    console.log(item);
    this.posicion = i;
    this.contenido_seccion = item;
    if(item.type == 1){
      this.show_theme = true;
      this.show_evaluation = false;
      for (let i = 0; i < item.themes.length; i++) {
        if(item.themes[i].element == 5){
          if(item.themes[i].files.length > 0){
           item.themes[i].image = this._sanitizer.bypassSecurityTrustUrl(this._services.url_images+item.themes[i].files[0].path);
          }
        }
      }
      this.renderizarHTML = item.themes;

    }else{
      this.show_theme = false;
      this.show_evaluation = true;
      this.renderizarHTML = item.evaluations;
    }
    this.active = i;
  }
  //**************************************************************************************//
  //FUNCION PARA MOSTRAR VIDEO//
  getVideoIframe(url) {
    var video, results;
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);  
  } 
  //**************************************************************************************//
  //FUNCION PARA REGRESAR//
  goBack(){
    window.history.back();
  }
  //**************************************************************************************//
  //FUNCION PARA DOCUMENTO//
  viewDocument(item){
    console.log(item);
    const server_url: string = this._services.url_images + item.files[0].path;;
    window.open(server_url);
  }
  //**************************************************************************************//
  public respuestas = [];
  public radio:any = [];
  respuestas_guardar(pregunta, respuesta){
    console.log(pregunta);
    console.log(respuesta);
    let contador = 0;
    for (let i = 0; i < this.respuestas.length; i++) {
      if(this.respuestas[i].question ==  pregunta.id){
        this.respuestas[i].answer = respuesta.id;
      }else{
        contador++;
      }  
    }
    if(contador == this.respuestas.length){
      this.respuestas.push(  {
        "id": 0,
        "participantContent": 0,
        "question": pregunta.id,
        "answer": respuesta.id,
        "correct": respuesta.correct,
        "createdBy": this.userData.id,
        "createdDate": new Date(),
        "updatedBy": this.userData.id,
        "updatedDate": new Date()
      })
    }
    
    console.log(this.respuestas);

  }
  //**************************************************************************************//
  //FUNCION PARA GUARDAR TEST COMPLETO//
  save(){
    let data = {
      "id": 0,
      "participant": this.training.training.participants[0].id,
      "content": this.contenido_seccion.id,
      "complete": true,
      "score": 0,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "participantEvaluations": this.respuestas
    }
    console.log(JSON.stringify(data));
    console.log(data);
    this._services.service_general_post_with_url('Training/'+this.trainingId+'/CompleteContent', data).subscribe((data => {
      console.log("save", data);
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Save Data"
          },
          width: "350px"
        });
        this.router.navigateByUrl('/trainingFinish/'+data.result.score);
      }
    }))
  }
  //**************************************************************************************//
  //FUNCION PARA GUARDAR TEST COMPLETO//
  save_incomplete(){
    let data = {
      "id": 0,
      "participant": this.training.training.participants[0].id,
      "content": this.contenido_seccion.id,
      "complete": false,
      "score": 0,
      "createdBy": this.userData.id,
      "createdDate": new Date(),
      "updatedBy": this.userData.id,
      "updatedDate": new Date(),
      "participantEvaluations": this.respuestas
    }
    console.log();
    this._services.service_general_post_with_url('Training/'+this.trainingId+'/CompleteContent', data).subscribe((data => {
      console.log("save", data);
      if (data.success) {
        console.log(data);
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Save Data"
          },
          width: "350px"
        });
      }
    }))
  }
}




