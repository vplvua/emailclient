import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() inputType: string = '';
  @Input() controlType: string = 'input';

  constructor() {}

  showErrors(): boolean {
    const { dirty, touched, errors } = this.control;
    if (dirty && touched && errors) {
      return true;
    }
    return false;
  }
}
