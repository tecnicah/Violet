
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app-routing/app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SinglePageAssigneeFamilyInfo } from './layouts/single-pages/assignee-and-family-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import {matMenuAnimations, MatMenuModule} from '@angular/material/menu';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AssigneeAndFamilyInfoDirective } from './layouts/single-pages/assignee-and-family-info.directive';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxIconCalendarModule } from 'ngx-icon-calendar'
import {TranslateModule} from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatBadgeModule } from '@angular/material/badge';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { EditorModule } from '@progress/kendo-angular-editor';
import { NgxMaskModule } from 'ngx-mask';
import { FilterPipeModule } from 'ngx-filter-pipe';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    SinglePageAssigneeFamilyInfo,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AssigneeAndFamilyInfoDirective
  ],
  imports: [
    OrderModule,
    NgxIconCalendarModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    CarouselModule,
    OwlModule,
    HttpClientModule,
    SharedModule,
    FilterPipeModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, relativeLinkResolution: 'legacy' }),
    NgxMaskModule.forRoot({
      validation: true,
    }),
    TranslateModule.forRoot(),
    MatMenuModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBF-AEeoIsOV8elnHA3zQ5h5lgFMp5TaF4',
      libraries: ["places"]
    }),
    GooglePlaceModule,
    NgxPermissionsModule.forRoot(),
    MatTableExporterModule,
    EditorModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
