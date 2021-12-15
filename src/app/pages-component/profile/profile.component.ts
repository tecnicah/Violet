import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  edit: boolean = false;
  displayedColumns: string[] = ['Contact Name', 'Relationship', 'Phone Number', 'Home Number', 'Location'];
  
  ELEMENT_DATA: any[] = [
    {position: 'Lorem Ipsum dolor', name: 'Brother', weight: '00 00 00  00 00', symbol: '002020202', location: 'CDMX'},
    {position: 'Lorem Ipsum dolor', name: 'Friend', weight: '00 00 00  00 00', symbol: '002020202', location: 'CDMX'}
  ];

  constructor(public _services: ServiceGeneralService) { }

  userData: any = {};

  caCountry: any[] = [];

  ngOnInit(){
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
    this.catalogs();
  }

  async catalogs(){
     this.caCountry = await this._services.getCatalogueFrom('GetCountry');
  }

}