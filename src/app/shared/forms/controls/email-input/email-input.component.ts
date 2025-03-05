import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { AbstractInputComponent } from '../../abstract-input.component';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
  selector: 'mm-email-input',
  imports: [ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailInputComponent),
      multi: true,
    },
  ],
})
export class EmailInputComponent extends AbstractInputComponent<string> {}
