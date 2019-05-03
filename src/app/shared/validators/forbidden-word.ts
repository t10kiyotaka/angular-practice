import { AbstractControl, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export function forbiddenWordValidator(word: string): ValidatorFn {
  return (control: AbstractControl): {[kye: string]: any} | null => {
    const forbidden = control.value.includes(word);
    return forbidden ? {'forbiddenWord': {value: control.value}}: null;
  };
}

@Directive({
  selector: '[appForbiddenWord]',
  providers: [{provide: NG_VALIDATORS, useExisting: forbiddenWordValidatorDirective, multi: true}]
})

export class forbiddenWordValidatorDirective implements Validator {
  @Input('appForbiddenWord') forbiddenWord: string;

  validate(control: AbstractControl): {[kye: string]: any} | null {
    return this.forbiddenWord ? forbiddenWordValidator(this.forbiddenWord)(control)
      : null
  }
}