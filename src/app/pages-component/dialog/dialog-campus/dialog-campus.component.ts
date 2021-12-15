import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-dialog-campus',
  templateUrl: './dialog-campus.component.html',
  styleUrls: ['./dialog-campus.component.css']
})
export class DialogCampusComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  mode = new FormControl('side');
  zoom: number = 12;
  info: string;
  latitud: number = Number(localStorage.getItem('latitud'));
  longitud: number = Number(localStorage.getItem('longitud'));
  public screenOptions;
  public location_in:any={};

  constructor(
    public dialogRef: MatDialogRef<DialogCampusComponent>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public map_data: any,
    public _dialog: MatDialog,
    public mapsAPILoader: MapsAPILoader
  ) { 

  }

  mapClicked($event: MouseEvent) {
    //this.markers.push({
    //  latitud: $event.coords.lat,
    //  longitud: $event.coords.lng,
    //  draggable: true
    //});
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker:${label} ${index}`);
    this.info = label;
  }

  markerDragEnd(m: marker, $event: MouseEvent, index : number) {
    console.log('dragEnd', m, $event);
    this.longitud = $event.coords.lng ;
    this.latitud = $event.coords.lat;

    this.markers[index].latitude = $event.coords.lat;
    this.markers[index].longitude = $event.coords.lng;
  }

  markers: any[] = [];
  ngOnInit() {
    console.log("DATA QUE RECIBE EL MODAL ",this.map_data);
    if(this.map_data != null || this.map_data != undefined){
      this.location_in = this.map_data;
      this.markers.push({
        latitude: this.location_in.latitude,
        longitude: this.location_in.longitude,
        url: "assets/icons/flag.png",
        nombre: this.location_in.address,
        tipo: 0,
        type: 0,
        draggable: true
      })
    }
  }

  private async geocode(address: string): Promise<google.maps.GeocoderResult> {
    return new Promise((resolve, reject) => {
      new google.maps.Geocoder().geocode({ address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        status === google.maps.GeocoderStatus.OK ? resolve(results[0]) : reject();
      });
    });
  }

  public handleAddressChange(address) {
    console.log("entra");
    console.log(address.geometry.location.lng());
    this.longitud = address.geometry.location.lng();
    this.latitud = address.geometry.location.lat();
    this.location_in.latitude = this.latitud;
    this.location_in.longitude = this.longitud;
    this.zoom = 15;
    this.markers.push({
      latitude: address.geometry.location.lat(),
      longitude: address.geometry.location.lng(),
      url: "assets/icons/flag.png",
      nombre: address.formatted_address,
      tipo: 0,
      type: 0,
      draggable: true
    });
    console.log(this.markers);
  }

  public options_found:string[] = [];
  public createAutoCompleteData( event_data:any ):void {

    console.log('Aqui cainal ===> ', event_data);

    const options_container:any = document.getElementsByClassName('pac-container')[0],
      options_in:any = options_container.querySelectorAll('.pac-item');

    this.options_found = [];

    options_in.forEach( (option:any) => {
      const option_created:any = {
        option: option.innerText,
        selected: false
      };

      setTimeout( () => {

        if( option.classList.contains('pac-item-selected') ) option_created.selected = true;

      }, 70);

      this.options_found.push( option_created );

    });

    if( event_data.keyCode == 13 ) this.options_found = [];

    console.log(this.options_found);

  }

  async onSubmit() {
    console.log(this.location_in.address);
    const place = await this.geocode(this.location_in.address);
    console.log(place);
    this.handleAddressChange(place);
  }

  save(){
    console.log(this.location_in);
    this.location_in.success = true;
    this.dialogRef.close(this.location_in);
  }

}


interface marker {
  id?: number;
  latitud: number;
  longitud: number;
  nombre?: string;
  actividad?: string;
  direccion?: string;
  no_personas?: string;
  region?: string;
  fuente?: string;
  riesgo?: string;
  riesgo_1?: string;
  riesgo_2?: string;
  riesgo_3?: string;
  riesgo_4?: string;
  riesgo_5?: string;
  riesgo_6?: string;
  riesgo_7?: string;
  riesgo_8?: string;
  riesgo_9?: string;
  riesgo_10?: string;
  riesgo_11?: string;
  riesgo_12?: string;
  riesgo_13?: string;
  riesgo_14?: string;
  riesgo_15?: string;
  riesgo_16?: string;
  riesgo_17?: string;
  riesgo_18?: string;
  riesgo_19?: string;
  riesgo_20?: string;
  riesgo_21?: string;
  riesgo_22?: string;
  riesgo_23?: string;
  riesgo_24?: string;
  riesgo_25?: string;
  riesgo_26?: string;
  riesgo_27?: string;
  riesgo_28?: string;
  riesgo_29?: string;
  riesgo_30?: string;
  riesgo_31?: string;
  riesgo_32?: string;
  tipo: number;
  type: number;
  url: string;
  draggable: boolean;
}