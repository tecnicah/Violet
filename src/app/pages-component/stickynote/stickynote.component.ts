import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-stickynote',
  templateUrl: './stickynote.component.html',
  styleUrls: ['./stickynote.component.css']
})
export class StickynoteComponent implements OnInit {
  recognition:any;

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor(private el: ElementRef) {
    const {webkitSpeechRecognition} : IWindow = <any>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      console.log(event.results[0][0].transcript)
      document.getElementById('toolbar').focus();
    };
   }

  ngOnInit(): void {
  }
  onDismiss(event){
    this.dismiss.emit(event);
  }

  onFocusOut(event){
    this.focusout.emit(event)
  }


}
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

