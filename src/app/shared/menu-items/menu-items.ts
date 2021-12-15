import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const side_menu = [
  {
    name: 'Operations', 
    icon: 'operations-icon.png', 
    type: 'tab',
    action: '#', 
    tabs_name: 'operations',
    tab_options: [
      //{name: 'Teams', action: 'teams', active: false},
      {name: 'My Dashboard', action: 'dashboard', active: false, number: 1},
      {name: 'Reports', action: 'reports', active: false, number: 2},
      {name: 'Activity', action: 'activity', active: false, number: 3},
      {name: 'Service Records', action: 'serviceRecord', active: false, number: 4},
      {name: 'Pending Authorizations', action: 'PendingAuthorizations', active: false},
      {name: 'Service Calendar', action: 'serviceCalendar', active: false},
      {name: 'Experience Surveys', action: 'experienceSurveys', active: false},
      {name: 'Supplier Partners', action: 'supplierPartners', active: false},
      {name: 'Training', action: 'training', active: false},
    ]
  },
  {
    name: 'Partner & Clients', 
    icon: 'partner-client-icon.png', 
    type: 'tab',
    action: 'partner', 
    active: false,
    tabs_name: 'pclients',
    tab_options: []
  },
  {
    name: 'Finance', 
    icon: 'finance-icon.png', 
    type: 'tab',
    action: 'finance', 
    active: false, 
    tabs_name: 'finance',
    tab_options: []
  },
  {
    name: 'Admin Center', 
    icon: 'admin-center.png', 
    type: 'tab',
    action: 'admin', 
    active: false, 
    tabs_name: 'admin',
    tab_options: []
  }
]

const MENUITEMS = [
  { state: 'dashboard', name: 'Operations', type: 'link', icon: 'av_timer' },
  { state: 'button', type: 'link', name: 'Parther & Clients', icon: 'crop_7_5' },
  { state: 'grid', type: 'link', name: 'Finance', icon: 'view_comfy' },
  { state: 'lists', type: 'link', name: 'Admin Center', icon: 'view_list' },
  //{ state: 'menu', type: 'link', name: 'Condóminos', icon: 'view_headline' },
  //{ state: 'tabs', type: 'link', name: 'Calendario / Eventos', icon: 'tab' },
  //{ state: 'stepper', type: 'link', name: 'Avisos importantes', icon: 'web' },
  //{
  //  state: 'expansion',
  //  type: 'link',
  //  name: 'Expansion Panel',
  //  icon: 'vertical_align_center'
  //},
  //{ state: 'chips', type: 'link', name: 'Pago de cuotas', icon: 'vignette' },
  //{ state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  //{
  //  state: 'progress-snipper',
  //  type: 'link',
  //  name: 'Progress snipper',
  //  icon: 'border_horizontal'
  //},
  //{
  //  state: 'progress',
  //  type: 'link',
  //  name: 'Progress Bar',
  //  icon: 'blur_circular'
  //},
  //{
  //  state: 'dialog',
  //  type: 'link',
  //  name: 'Dialog',
  //  icon: 'assignment_turned_in'
  //},
  //{ state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  //{ state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  //{ state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  //{
  //  state: 'slide-toggle',
  //  type: 'link',
  //  name: 'Slide Toggle',
  //  icon: 'all_inclusive'
  //}
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

@Injectable()
export class MenuItemsSide {
  getMenuitem():any {
    return side_menu;
  }
}