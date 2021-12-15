import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  constructor() { }

  public show_theme: boolean = false;
  public show_evaluation: boolean = false;
  public renderizarHTML = [];
  ngOnInit(): void {
    let data = JSON.parse(localStorage.getItem('data_content'));
    console.log(data);
    if(data.type == 1){
      this.show_theme = true;
      this.show_evaluation = false;
      this.renderizarHTML = data.themes;
    }else if(data.type == 2){
      this.show_theme = false;
      this.show_evaluation = true;
      this.renderizarHTML = data.evaluations;
    }
  }
  //*************************************************************//
  //FUNCION PARA REGRESAR//
  goBack(){
    window.history.back();
  }
}
