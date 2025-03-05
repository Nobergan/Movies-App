import { Component, ElementRef, inject, input, OnInit, output, signal, viewChild } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControlDirective, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { ControlTypes } from './models';

@Component({
  template: '',
  standalone: false,
})
export abstract class AbstractInputComponent<T> implements OnInit, ControlValueAccessor {
  /**
   * Form control directive
   * @internal
   */
  formControlDirective = viewChild(FormControlDirective);

  placeholder = input<string>();
  controlTypes = input(ControlTypes);
  formGroup = input<any>(FormGroup);
  formControlName = input<string>();
  formControl = input<FormControl<T>>();
  showValidationMessage = input<boolean>(true);

  /**
   * Is focused
   * Needed for floating label
   * @internal
   */
  isFocused = signal(false);

  focused = output();

  control: FormControl<T>;

  private _controlContainer = inject(ControlContainer, { skipSelf: true, optional: true });
  private _elementRef = inject(ElementRef);

  ngOnInit() {
    this.control = this.formControl() || (this._controlContainer.control.get(this.formControlName()) as FormControl<T>);
    this._toggleDisabledAttr(this.control.disabled);
  }

  /**
   * Register a function that will be called when the control is touched
   * @param fn - A function that is called when the control is touched.
   * @internal
   */
  registerOnTouched(fn: () => void): void {
    this.formControlDirective().valueAccessor.registerOnTouched(fn);
  }

  /**
   * Register a callback function that will be called when the value of the input changes
   * @param fn - A function that is called when the value changes.
   * @internal
   */
  registerOnChange(fn: (value: T) => void): void {
    this.formControlDirective().valueAccessor.registerOnChange(fn);
  }

  /**
   * Write the value of the form control to the form control's value accessor
   * @param {string} value - The value to be written to the model.
   * @internal
   */
  writeValue(value: T): void {
    this.formControlDirective().valueAccessor.writeValue(value);
  }

  /**
   * Set the disabled state of the control
   * @param {boolean} isDisabled - boolean
   * @internal
   */
  setDisabledState(isDisabled: boolean): void {
    this.formControlDirective().valueAccessor.setDisabledState(isDisabled);
    this._toggleDisabledAttr(isDisabled);
  }

  /**
   * Sets is focused
   * @param isFocused
   * @internal
   */
  setIsFocused(isFocused: boolean): void {
    this.isFocused.set(isFocused);

    if (isFocused) {
      this.focused.emit();
    }
  }

  /**
   * Set the disabled attribute of the control native element
   * @param {boolean} isDisabled - boolean
   */
  private _toggleDisabledAttr(isDisabled: boolean) {
    if (isDisabled) {
      this._elementRef.nativeElement.setAttribute('disabled', isDisabled);
    } else {
      this._elementRef.nativeElement.removeAttribute('disabled');
    }
  }
}
