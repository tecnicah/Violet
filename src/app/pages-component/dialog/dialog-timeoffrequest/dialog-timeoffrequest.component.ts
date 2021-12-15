import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-timeoffrequest',
  templateUrl: './dialog-timeoffrequest.component.html',
  styleUrls: ['./dialog-timeoffrequest.component.css']
})
export class DialogTimeoffrequestComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
