import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

const NUMBER_OF_EMAIL_PARTS = 2;
const MIN_AMOUNT_OF_SUB_DOMAIN = 2;
const MAX_AMOUNT_OF_SUB_DOMAIN = 4;
const LOCAL_PART_LENGTH = 31;
const DOMAIN_PART_LENGTH = 32;
const EMAIL_MAX_LENGTH = 64;
const AT_SEPARATION_SIGN = '@';
const NOT_ALLOWED_SIGN_COMBINATION = '..';
const SUB_DOMAIN_SEPARATION_SIGN = '.';
const EMAIL_VALIDATION_PATTERN = /^[a-zA-Z0-9_.-]{1,31}@[a-zA-Z0-9](?:[_.-]?[a-zA-Z0-9]){2,32}$/;

function isEmailValid(email: string): boolean {
  if (email.length > EMAIL_MAX_LENGTH) {
    return false;
  }

  const parts = email.split(AT_SEPARATION_SIGN);

  if (parts.length !== NUMBER_OF_EMAIL_PARTS) {
    return false;
  }

  const localPart = parts[0];
  const domainPart = parts[1];

  if (localPart.length > LOCAL_PART_LENGTH || domainPart.length > DOMAIN_PART_LENGTH) {
    return false;
  }

  if (email.includes(NOT_ALLOWED_SIGN_COMBINATION)) {
    return false;
  }

  const subDomains = domainPart.split(SUB_DOMAIN_SEPARATION_SIGN);

  if (subDomains.length > MAX_AMOUNT_OF_SUB_DOMAIN || subDomains.length < MIN_AMOUNT_OF_SUB_DOMAIN) {
    return false;
  }

  return !!email.match(EMAIL_VALIDATION_PATTERN);
}

const emailFullCombinationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  return isEmailValid(control.value) ? null : { email: true };
};

export const emailValidatorsGroup = [Validators.required, emailFullCombinationValidator];
