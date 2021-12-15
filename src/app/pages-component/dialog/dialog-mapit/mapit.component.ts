import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../../app/service/service-general/service-general.service';
import { ActivatedRoute } from '@angular/router';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from '../../../../app/shared/loader';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { param } from 'jquery';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'cluster';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mapit-dialog',
  templateUrl: './mapit.component.html',
  styleUrls: []
})
export class DialogMapit implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  mode = new FormControl('side');
  zoom: number = 12;
  info: string;

  // initial center position for the map19.431404, -99.095741
  latitud: number = Number(localStorage.getItem('latitud'));
  longitud: number = Number(localStorage.getItem('longitud'));
  public screenOptions;

  constructor(
    public dialogRef: MatDialogRef<DialogMapit>,
    public _services: ServiceGeneralService,
    public _routerParams: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public map_data: any,
    public _dialog: MatDialog,
    public mapsAPILoader: MapsAPILoader
  ) { 

    console.log(this.latitud);
    console.log(this.longitud);
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
  public __loader__: LoaderComponent = new LoaderComponent();

  public is_new_mapit: boolean = false;

  ngOnInit() {

    this.getCatalogues();

    if (this.map_data.map_data != null) {

      this.getMapitData();

    } else {

      this.is_new_mapit = true;
      //this.initMapSettings();

    }

  }

  public formGroup: FormGroup = new FormGroup({
    place: new FormControl(''),
    search: new FormControl(''),
  });

  async onSubmit() {
    console.log(this.location_in.address);
    const place = await this.geocode(this.location_in.address);
    console.log(place);
    this.handleAddressChange(place);
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

  public table_location_data: any = undefined;
  public mapit_model: MapitModel = new MapitModel();

  public getMapitData(): void {
    console.log("getMapitData");
    this._services.service_general_get(`MapIt/GetMapItById?id=${this.map_data.map_data.id}`)
      .subscribe((response: any) => {

        if (response.success) {

          this.mapit_model = response.result.value[0];
          console.log('this.mapit_model  ====> ', this.mapit_model);
          for (let i = 0; i < this.mapit_model.locations.length; i++) {
            const element = this.mapit_model.locations[i];
            this.markers.push({
              latitude: element.latitude,
              longitude: element.longitude,
              url: "assets/icons/flag.png",
              nombre: element.address,
              tipo: 0,
              type: 0,
              draggable: true
            })
          }
    
          this.table_location_data = new MatTableDataSource(this.mapit_model.locations);
          this.getSupplier();
          //this.locations = [
          //  ['Bondi Beach', -33.890542, 151.274856, 4],
          //  ['Coogee Beach', -33.923036, 151.259052, 5],
          //  ['Cronulla Beach', -34.028249, 151.157507, 3],
          //  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
          //  ['Maroubra Beach', -33.950198, 151.259302, 1]
          //];

          //this.initMapSettings(this.locations)

        }

      }, (error: any) => {

        console.error('Error (GetMapItById) => ', error);

      });

  }

  public createMapit(): void {
    console.log("createmap")
    this.mapit_model.serviceRecord = this.map_data.id_so;
    for (let i = 0; i < this.mapit_model.locations.length; i++) {
      const element = this.mapit_model.locations[i];
      for (let j = 0; j < this.markers.length; j++) {
        const element = this.markers[j];
        this.mapit_model.locations[i].latitude = this.markers[j].latitude;
        this.mapit_model.locations[i].longitude = this.markers[j].longitude;
      }
    }
    

    this.__loader__.showLoader();

    this._services.service_general_post_with_url('MapIt/PostMapIt', this.mapit_model)
      .subscribe((response: any) => {

        if (response.success) {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Success',
              body: 'Map it has been created successfully.'
            }
          });

          this.hideModal();

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (PostMapIt) => ', error);

        this.__loader__.hideLoader();

      });

  }

  public updateMapit(): void {
   console.log("update map");
    this.__loader__.showLoader();for (let i = 0; i < this.mapit_model.locations.length; i++) {
      const element = this.mapit_model.locations[i];
      for (let j = 0; j < this.markers.length; j++) {
        const element = this.markers[j];
        this.mapit_model.locations[i].latitude = this.markers[j].latitude;
        this.mapit_model.locations[i].longitude = this.markers[j].longitude;
      }
    }

    this._services.service_general_put('MapIt/PutMapIt', this.mapit_model)
      .subscribe((response: any) => {

        if (response.success) {

          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: 'Success',
              body: 'Map it has been updated successfully.'
            }
          });

          this.hideModal();

        }

        this.__loader__.hideLoader();

      }, (error: any) => {

        console.error('Error (PutMapIt) => ', error);

        this.__loader__.hideLoader();

      });

  }

  public show_location_form: boolean = false;
  public showLocationForm(): void {

    !this.show_location_form ?
      this.show_location_form = true :
      this.show_location_form = false;

  }

  public hideModal(): void {

    this.dialogRef.close();

  }

  public location_colums: string[] = ['cam_0', 'cam_1', 'cam_2', 'cam_3'];

  public location_in: LocationsModel = new LocationsModel();
  public addNewLocation(): void {

    this.mapit_model.locations.push(this.location_in);

    this.location_in = new LocationsModel();

    this.table_location_data = new MatTableDataSource(this.mapit_model.locations);

    this.show_location_form = false;

  }

  /* Utilities */
  public serviceline_catalogue: any = [];
  public supplier_catalogue: any = [];
  public locationtype_catalogue: any = [];
  public service_catalogue: any = [];
  public async getCatalogues(): Promise<void> {

    this.serviceline_catalogue = await this._services.getCatalogueFrom('GetServiceLine');
    this.locationtype_catalogue = await this._services.getCatalogueFrom('GetLocationType');

  }

  public able_select_sup: boolean = false;
  public async getSupplier(): Promise<void> {

    this.able_select_sup = true;

    const params: string = `?ServiceLineId=${this.mapit_model.serviceLine}&SR=${this.map_data.id_so}`,
      params_two: string = `?service_record_Id=${this.map_data.id_so}&service_line_id=${this.mapit_model.serviceLine}`;

    //this.supplier_catalogue = await this._services.getCatalogueFrom(`GetSupplierByRecordId${params}`);
    this._services.service_general_get('SupplierPartnerProfile/GetSupplierPartnersBySR/'+this.map_data.id_so).subscribe(r=>{
      if(r.success){
        this.supplier_catalogue = r.result.value;
      }
    })
    this.service_catalogue = await this._services.getCatalogueFrom(`GetServiceBySOId${params_two}`);
    console.log(params, this.supplier_catalogue);
  }

  public getDataFromLocationType(id_in: number): string {

    let result: string = '';

    if (this.locationtype_catalogue.value != undefined) {

      this.locationtype_catalogue.value.forEach((item: any) => {

        if (item.id == id_in) {

          result = item.locationType;

        }

      });

    }

    return result;

  }

  public getDataFromService(id_in: number): string {

    let result: string = '';

    if (this.service_catalogue.value != undefined) {

      this.service_catalogue.value.forEach((item: any) => {

        if (item.id == id_in) {

          result = item.category;

        }

      }, (error: any) => {

        console.error('Error (getDataFromService) => ', error);

      });

    }

    return result;

  }
  //======================> Miserable
  formattedaddress = "";
  options = {
    componentRestrictions: {
      country: []
    }
  }
  public AddressChange(address: any) {
    this.formattedaddress = address.formatted_address
    console.log('Ve tu ========> ', this.formattedaddress);
  }

  //public map: google.maps.Map = undefined;
  //public locations: any[] = [];
  //public initMapSettings(locations_in: any[] = []): void {

  //  let locations: any[] = locations_in,
  //    map = new google.maps.Map(document.getElementById('map'), {
  //      zoom: 10,
  //      center: new google.maps.LatLng(-33.92, 151.25),
  //      mapTypeId: google.maps.MapTypeId.ROADMAP
  //    }),
  //    marker: any = undefined;

  //  const selector_1: number = 1;
  //  for (let i = 0; i < locations.length; i++) {

  //    marker = new google.maps.Marker({
  //      position: new google.maps.LatLng(locations[i][selector_1], locations[i][selector_1 + 1]),
  //      map: map
  //    });

  //  }

  //}

}

class MapitModel {
  id: number = 0;
  serviceRecord: number = 0;
  supplierPartner: string = '';
  serviceLine: string = '';
  startDate: string = '';
  driverName: string = '';
  driverContact: string = '';
  vehicle: string = '';
  plateNumber: string = '';
  comments: string = '';
  createdBy: number = 0;
  createdDate: Date = undefined;
  updatedBy: number = 0;
  updatedDate: Date = undefined;
  locations: LocationsModel[] = [];
}

class LocationsModel {
  id: number = 0;
  mapItId: number = 0;
  locationType: number = 0;
  service: number = 0;
  locationName: string = '';
  address: string = '';
  longitude: string = '';
  latitude: string = '';
}

// just an interface for type safety.
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
