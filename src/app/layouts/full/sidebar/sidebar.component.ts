import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { MenuItemsSide } from '../../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AppSidebarComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public menuItemsSide: MenuItemsSide,
    public _router: Router,
    public menu: ServiceGeneralService,
    private _permissions: NgxPermissionsService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public menu_structure = [];
  ngOnInit() {
    this.menu.menu = true;
    this.isAnyTabActive();
    let user_data:any = JSON.parse(localStorage.getItem("userData") );
    this._permissions.loadPermissions([user_data.role.role]);
    this.menu_structure = JSON.parse(localStorage.getItem('Menu'));
    //debugger
  }

  public last_section_active:any = {
    tab: '',
    option: ''
  }

  public showTabsSection( event:any, option_selected:string ):void {

    const get_section:any = event.target.parentElement.id,
          section_container = document.getElementById( `section_${ get_section.split('_')[2] }` );

    section_container.classList.contains('display-none') ? 
      section_container.classList.remove('display-none') :
      section_container.classList.add('display-none');

    console.log('Here ==> ', option_selected);

    this.last_section_active.tab = option_selected;

  }

  public goToPage( the_page:string ):void {

    this._router.navigateByUrl( the_page );

  }

  public activeLink( options:any ,option_selected:string ):void {

    options.forEach( (option:any) => {

      if( option.action == option_selected ) {

        option.active = true;

        this.last_section_active.option = option.name;

      } else {

        option.active = false;

      }

    });

    localStorage.setItem('last_section', JSON.stringify( this.last_section_active ));

  }

  public isAnyTabActive():void {

    const get_last_section:any = JSON.parse( localStorage.getItem('last_section') );

   if( get_last_section != undefined ) {

      setTimeout( () => {

        const get_parent_tab:any = document.getElementById(`tab_sec_${ get_last_section.tab }`);

        get_parent_tab.children[0].click();

        const get_children:any = document.getElementById(`section_${ get_last_section.tab }`);

        for( let tab = 0; tab < get_children.children.length; tab += 1 ) {

          const get_active_tab:any = get_children.children[tab];

          if( get_active_tab.children[0].innerHTML == get_last_section.option) {

            get_active_tab.click();

          }

        }

      }, 177);

    }

  }

  //*******************************************************************//
  parametrosPermisos(id_menu, id_subMenu){
    console.log("MENU: ", id_menu);
    console.log("SUBMENU: ", id_subMenu);
    let userData = JSON.parse(localStorage.getItem('userData'));
    let path = '1/1?menu='+id_menu+'&submenu='+id_subMenu+'&role='+userData.role.id;
    console.log("ESTE ES EL PATH DE CONSULTA: ", path);
    localStorage.setItem('url_permisos', path);
  }

}
