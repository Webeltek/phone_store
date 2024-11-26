import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { posNumValidator } from '../utils/posNum.validator';

@Directive({
  selector: '[appPosNum]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PosNumDirective
    }
  ]
})
export class PosNumDirective implements Validator{
  
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validatorFn =  posNumValidator();
     return validatorFn(control);

  }

}