import { Component } from '@angular/core';
import { ServiceGeneralService } from './service/service-general/service-general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  token: boolean;

  constructor(public _services: ServiceGeneralService,) { }

  ngOnInit() {
    //this.token = this._services.getToken();
    this._services.getrol();
  }
}
