import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { MenuItemsSide } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
   ],
  providers: [ MenuItems, MenuItemsSide ]
})
export class SharedModule { }
