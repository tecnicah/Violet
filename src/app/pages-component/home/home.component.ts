import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogTimeoffrequestComponent } from '../dialog/dialog-timeoffrequest/dialog-timeoffrequest.component';
import { LoaderComponent } from 'app/shared/loader';
import { HttpClient } from '@angular/common/http';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DialogStickynoteComponent } from './../dialog/dialog-stickynote/dialog-stickynote.component';
import {DialogPostItComponent } from './../dialog/dialog-post-it/dialog-post-it.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
// import * as $ from 'jquery';
declare var $: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})


export class HomeComponent implements OnInit {

  date = new Date();
  postString: string = "";
  user: any;
  homeLogo: any = {}; //datos del homeLogo
  // variables openweathermap
  apikey = '8440d47f0341f0d1dfa7177f61935122';
  URI: string = '';
  dataClima;
  country_catalogue: any;
  country_city: any;
  coordenadas;
  weather;
  urlIcon;
  converFC;
  meses;
  mesResp;
  activeSlides: SlidesOutputData;

  // public latitude: number;
  // public longitude: number;
  public __loader__: LoaderComponent = new LoaderComponent();
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, private http: HttpClient) {
    // this.URI = `http://api.openweathermap.org/data/2.5/weather?appid=${this.apikey}&q=`;
    // this.URI = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`;
    // http://api.openweathermap.org/data/2.5/weather?lat=20.482669599999998&lon=-86.93235290000001&appid=8440d47f0341f0d1dfa7177f61935122
  }


  ngOnInit(): void {
    this.getSlider();
    this.findMe();
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log('Datos del usuario', this.user);
    this.get_catalogos();
    // $('.owl-carousel').owlCarousel();
    this.getUpcoming();
    // this.coordenadas = this.localizacion;
    // this.getWeather(19.4978, -99.1269);
  }

  ngAfterViewInit() {
    var cardCelebres = { "width": '100%', "height": '100%', "overflow": 'hidden' };
    var caroucelImg = { "width": '100%', "height": '18rem' };
    var frasesCelebres = { "width": '100%', "height": 'auto', "text-align": 'center', "position": 'absolute', "bottom": '5px', "background-color": 'rgba(255, 255, 255, 0.6)' };
    var textFrasesCelebres = { "margin": '8px 5px', "font-size": '15px', "font-weight": 'bold !important', "color": '#9d3292', "text-align": 'center'};

    $(".cardCelebres").addClass(cardCelebres);
    $(".caroucelImg").addClass(caroucelImg);
    $(".frasesCelebres").addClass(frasesCelebres);
    $(".textFrasesCelebres").addClass(textFrasesCelebres);

    ($('.owl-carousel') as any).owlCarousel({
      loop: true,
      autoplay: true,
      margin: 10,
      mouseDrag: true,
      touchDrag: true,
      autoplayTimeout: 7000,
      nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
   })
  }
  tarjetas_iterables = [
    {
      "avatar": "/Files/Pets/2d0a3d38-a34e-4b80-b018-683d4e24bce9.jpg",
      "name": "Lorem Ipsum",
      "title": "Coordinator"
    },
    {
      "avatar": "/Files/Pets/2d0a3d38-a34e-4b80-b018-683d4e24bce9.jpg",
      "name": "Lorem Ipsum",
      "title": "Coordinator"
    },
    {
      "avatar": "/Files/Pets/2d0a3d38-a34e-4b80-b018-683d4e24bce9.jpg",
      "name": "Lorem Ipsum",
      "title": "Coordinator"
    },
  ];
  famousPhrases = [];
  experienceTeam = [];
  upcomigEvent = [];
  imagesId = [];

  async get_catalogos() {
    this.__loader__.showLoader();
    this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
    this.country_city = await this._services.getCatalogueFrom('GetState');
    // this._services.service_general_get('Profile/GetDashboardInicio?userId=2').subscribe(r => {
    //   if (r.success) {
    //     this.homeLogo = r.result;
    //     console.log('Data home logo', this.homeLogo);

    //     this.experienceTeam = r.result.value[0].experience_team;
    //   }
    // })

    this.__loader__.hideLoader();
  }

  public dateDay(date: string): string {
    let result: string = '';
    if (date != null) {
      const date_to_work: string = date,
        date_remove_time: string = date_to_work.split('-')[2];
      // const dateDia = date_remove_time.split('T')[0];
      // console.log('dia', dateDia);
      result = date_remove_time.split('T')[0];
    } else {
      result = 'No Date';
    }
    return result;
  }
  public dateMonth(date){
    this.meses = ['Ene', 'Feb', 'Mar','Abr', 'May', 'Jun', 'Jul', 'Ago','Sep', 'Oct', 'Nov', 'Dic'];
    // let resultM: string = '';
    if (date != null) {
      const dia = date;
      // console.log('dia', date);
      let dateDia = dia.split('T')[3];
      dateDia = new Date();
      // console.log('formatofecha', dateDia);
      // console.log(dia.getDate() + " de " + this.meses[dia.getMonth()] + " de " + dia.getFullYear());
      this.mesResp = this.meses[dateDia.getMonth()];
      // console.log(this.mesResp);

      // const date_to_work_month: string = date,
      // date_remove_month = date_to_work_month.split('-')[1];
      // resultM = date_remove_month;
      // this.mesResp = this.meses.indexOf(resultM);
      // console.log(this.mesResp)
    } else {
      this.mesResp = 'No Date';
    }
    return this.mesResp;
  }
  getUpcoming() {
    this._services.service_general_get('AdminCenter/GetUpcomingEvents').subscribe(respeven => {
      console.log('catalogo upcoming event', respeven);
      if (respeven.success) {
        this.upcomigEvent = respeven.result;
      }
    });
  }
  getSlider() {
    this.imagesId = [];
    this._services.service_general_get('AdminCenter/GetSliderPhrase').subscribe(respeven => {
      console.log('slider', respeven);
      if (respeven.success) {
        this.famousPhrases = respeven.result;
        for (let i = 0; i < this.famousPhrases.length; i++) {
          const element = this.famousPhrases[i];
          // const id = i + 1;
          // const idd = id.toString();
          this.imagesId.push({
            id: element.id.toString(),
            image: this._services.url_images + element.image,
            phrase: element.phrase
          });
        }
      }
    });
  }
   //GET COUNTRY ORIGIN NAME//
  getCountryOriginName(id){
    for(let i = 0; i < this.country_catalogue.length; i++){
      if(this.country_catalogue[i].id == id){
         return this.country_catalogue[i].name;
      }
    }
  }
  getCity(id: number) {
    for (let i = 0; i < this.country_city.length; i++) {
      if (this.country_city[i].id == id) {
        return this.country_city[i].city;
      }
    }
  }

  // funcion que extrae las coordenadas
  findMe() {
    console.log('entrando a findme');
    if (navigator.geolocation) {
      console.log('el navegador soporta geolocalizacion')
    } else {
      console.log('el navegador no soporta geolocalizacion')
    }
    var that = this;
    function localization(posicion) {
      let coorde = [];
      let latitude = posicion.coords.latitude;
      let longitude = posicion.coords.longitude;
        coorde.push({latitude: latitude});
        coorde.push({longitude: longitude});
        console.log('coordenadas', coorde);
        // this.coordenadas;
        // this.coordenadas = coorde;
        // getWeather
        console.log(latitude, longitude);
        localStorage.setItem('latitud', latitude);
        localStorage.setItem('longitud', longitude);
        that.getWeather(coorde[0].latitude, coorde[1].longitude);
        // this.getWeather(coorde[0].latitude, coorde[1].longitude);
      // return coorde;
    }
    // function error() {
    //   console.log('No se pudo obtener la ubicacion',);
    //   // this.getWeather(19.4978, -99.1269);
    // }
    navigator.geolocation.getCurrentPosition(localization, function (error) {
      if (error.code == 0) {
        console.log(error);
        that.getWeather(19.4978, -99.1269);
        // error desconocido.
      }
      else if (error.code == 1) {
        console.log(error);
        that.getWeather(19.4978, -99.1269);
        // El usuario denegó el permiso para la Geolocalización.
      }
      else if (error.code == 2) {
        // La ubicación no está disponible.
        console.log(error);
        that.getWeather(19.4978, -99.1269);

      }
      else if (error.code == 3) {
        // Se ha excedido el tiempo para obtener la ubicación.
        console.log(error);
        that.getWeather(19.4978, -99.1269);

      }
    });
  }
  // trae el pronostico del clima con respecto a coordenadas
  getWeather(lat, lon) {
    if (lat == undefined && lon == undefined) {
      console.log('entrando a getweather');
      this.dataClima = this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${19.4978}&lon=${-99.1269}&appid=${this.apikey}`)
      .subscribe (
        resp => {
          this.weather = resp;
          this.urlIcon = `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
          this.converFC = ((this.weather.main.temp - 273.15)  ).toFixed(0);
          console.log(this.weather);
          console.log('resp clima', resp)
        },
        err => console.log('error clima', err)
      )
      console.log('weather', this.weather);
    }
    else {

      console.log('entrando a getweather');
      this.dataClima = this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}`)
      .subscribe (
        resp => {
          this.weather = resp;
          this.urlIcon = `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
          this.converFC = ((this.weather.main.temp - 273.15)  ).toFixed(0);
          console.log(this.weather);
          console.log('resp clima', resp)
        },
        err => console.log('error clima', err)
      )
      console.log('weather', this.weather);
    }
  }

  openReminders():void{
		const dialogRef = this._dialog.open(DialogTimeoffrequestComponent, {
			width: "95%"
		  });
		  dialogRef.afterClosed().subscribe(result => {})
  }
  // stickynotes
  addStickynote() {
    // comprovar si se inserto
    if (this.postString == '') {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "warning",
          body: "Write a note"
        },
        width: "350px"
      });
    }
    else {
      this.__loader__.showLoader();
      this._services.service_general_post_with_url("PostIt", {
        id: 0,
        post: this.postString,
        color: '',
        createdBy: this.user.id,
        createdDate: new Date(),
        updatedBy: this.user.id,
        updatedDate: new Date()
      }).subscribe(r => {
        console.log(r);
        if (r.success) {
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Insert sticky note"
            },
            width: "350px"
          });
        }
        this.postString = "";
        this.ngOnInit();
        this.__loader__.hideLoader();
      })
    }
  }
  viewStickynote() {
    const dialogRef = this._dialog.open(DialogPostItComponent, {
      data: { id: this.user.id },
      width: "55%",
    });
    dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
      $(document).ready(function () {
        var cardCelebres = { "width": '100%', "height": '100%', "overflow": 'hidden' };
        var caroucelImg = { "width": '100%', "height": '18rem' };
        var frasesCelebres = { "width": '100%', "height": 'auto', "text-align": 'center', "position": 'absolute', "bottom": '5px', "background-color": 'rgba(255, 255, 255, 0.6)' };
        var textFrasesCelebres = { "margin": '8px 5px', "font-size": '15px', "font-weight": 'bold !important', "color": '#9d3292', "text-align": 'center'};

        $(".cardCelebres").addClass(cardCelebres);
        $(".caroucelImg").addClass(caroucelImg);
        $(".frasesCelebres").addClass(frasesCelebres);
        $(".textFrasesCelebres").addClass(textFrasesCelebres);

        ($('.owl-carousel') as any).owlCarousel({
          loop: true,
          autoplay: true,
          margin: 10,
          mouseDrag: true,
          touchDrag: true,
          autoplayTimeout: 7000,
          nav:true,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:1
              },
              1000:{
                  items:1
              }
          }
         })
      });

    })
    //this.ngOnInit();
  }
  getData(data: SlidesOutputData) {
    this.activeSlides = data;
    console.log(this.activeSlides);
  }
}
class SlidesOutputData {
  startPosition?: number;
  slides?: SlideModel[];
};
class SlideModel {
  id: string = '';
  image: string = '';
  phrase: string = '';
}
