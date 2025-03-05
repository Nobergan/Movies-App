import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { letterValidationPattern, lowerCaseValidationPattern, numberValidationPattern, upperCaseValidationPattern } from '@mm/shared/utils';

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 14;

/**
 * Validator checks entered value contains uppercase and lowercase letters
 */
const lowerAndUpperCase = (control: AbstractControl): ValidationErrors => {
  const hasUpper = upperCaseValidationPattern.test(control.value);
  const hasLower = lowerCaseValidationPattern.test(control.value);
  const valid = hasUpper && hasLower;

  if (!valid) {
    return { lowerAndUpperCase: true };
  }

  return null;
};

/**
 * Validator checks entered value contains number and letter
 */
const numberAndLetter = (control: AbstractControl): ValidationErrors => {
  const hasNumber = numberValidationPattern.test(control.value);
  const hasLetter = letterValidationPattern.test(control.value);
  const valid = hasNumber && hasLetter;

  if (!valid) {
    return { numberAndLetter: true };
  }

  return null;
};

/**
 * Validator match new password and repeat password inputs
 */
const matchPasswords = (controlName: string, matchingControlName: string) => {
  return (formGroup: AbstractControl): ValidatorFn => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (matchingControl.errors && !matchingControl.errors['matchPasswords']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matchPasswords: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
};

/**
 * Validator checks if entered value has a whitespace
 */
const whitespacePresented = (control: AbstractControl): ValidationErrors => {
  if (control.value?.includes(' ')) {
    console.log('Whitespace detected in value:', control.value);
    return { whitespacePresented: true };
  }

  return null;
};

/**
 * Ready to use combined group
 */
export const passwordValidatorsGroup = [
  Validators.required,
  Validators.minLength(PASSWORD_MIN_LENGTH),
  Validators.maxLength(PASSWORD_MAX_LENGTH),
  whitespacePresented,
];

export const PasswordValidators = {
  lowerAndUpperCase,
  numberAndLetter,
  matchPasswords,
};
