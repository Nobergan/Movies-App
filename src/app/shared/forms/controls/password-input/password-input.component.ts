import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { IconComponent } from '@mm/shared/ui/icon';

import { AbstractInputComponent } from '../../abstract-input.component';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
  selector: 'mm-password-input',
  imports: [ReactiveFormsModule, IconComponent, ValidationMessageComponent],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent extends AbstractInputComponent<string> {
  showToggle = true;
  isPasswordVisible = false;

  toggleVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
