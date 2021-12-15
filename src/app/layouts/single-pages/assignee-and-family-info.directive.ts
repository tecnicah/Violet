import { Directive, Input, forwardRef } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appAssigneeAndFamilyInfo]',
  providers: [{
    multi: true,
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => AssigneeAndFamilyInfoDirective)
  }]
})
export class AssigneeAndFamilyInfoDirective implements Validator {
  @Input() appAssigneeAndFamilyInfo: ValidatorFn;
  constructor() { }
  validate(control: AbstractControl): { [key: string]: any; } {
    return this.appAssigneeAndFamilyInfo(control);
  }
}
