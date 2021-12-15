import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-finished',
  templateUrl: './training-finished.component.html',
  styleUrls: ['./training-finished.component.scss']
})
export class TrainingFinishedComponent implements OnInit {

  constructor(public router: Router, public _routerParams: ActivatedRoute) { }

  public score : any;

  ngOnInit(): void {
    this.score = this._routerParams.snapshot.params.id;
  }

  continue(){
    this.router.navigateByUrl('training');
  }

}
