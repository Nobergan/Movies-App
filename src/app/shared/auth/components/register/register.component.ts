import { Component, ElementRef, inject, OnInit, Signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { EmailInputComponent, FormControlNames, PasswordInputComponent } from '@mm/shared/forms';
import { IconComponent } from '@mm/shared/ui/icon';
import { ButtonDirective } from '@mm/shared/ui/button';
import { MainState } from '@mm/shared/state';
import { AuthPopupType, AuthRequest } from '@mm/auth/models';
import { AuthActions } from '@mm/auth/actions';
import { emailValidatorsGroup, passwordValidatorsGroup } from '@mm/shared/validators';
import texts from '@mm/texts';

import { AuthVmModel, AuthVmSelectors } from '../../store';

@Component({
  selector: 'mm-register',
  imports: [IconComponent, CommonModule, EmailInputComponent, ButtonDirective, PasswordInputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: '../auth-common.component.scss',
})
export class RegisterComponent implements OnInit {
  _store = inject(Store<MainState>);

  googleButton = viewChild.required<ElementRef>('googleButton');

  vm: Signal<AuthVmModel> = toSignal(this._store.select(AuthVmSelectors.selectAuthViewModel));

  controlName: typeof FormControlNames = FormControlNames;
  signUpText = texts.signUp;
  form: FormGroup;
  authPopupType = AuthPopupType;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', emailValidatorsGroup],
      password: ['', passwordValidatorsGroup],
    });
  }

  onSubmit(): void {
    if (this.googleButton().nativeElement === document.activeElement) {
      this._store.dispatch(AuthActions.googleAuth());
    } else {
      const request: AuthRequest = this.form.value;
      this._store.dispatch(AuthActions.register({ request }));
    }
  }

  openAuthPopup(type: AuthPopupType): void {
    this._store.dispatch(AuthActions.openAuthPopup({ popupType: type }));
  }

  closeRegisterPopup() {
    this._store.dispatch(AuthActions.closeAuthPopup());
  }
}
