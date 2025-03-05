import { Component, ElementRef, inject, OnInit, Signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { EmailInputComponent, FormControlNames, PasswordInputComponent } from '@mm/shared/forms';
import { ButtonDirective } from '@mm/shared/ui/button';
import { IconComponent } from '@mm/shared/ui/icon';
import { MainState } from '@mm/shared/state';
import { AuthPopupType, AuthRequest } from '@mm/auth/models';
import { AuthActions } from '@mm/auth/actions';
import { AuthVmSelectors } from '@mm/auth/selectors';
import { emailValidatorsGroup, passwordValidatorsGroup } from '@mm/shared/validators';
import texts from '@mm/texts';

import { AuthVmModel } from '../../store';

@Component({
  selector: 'mm-login',
  imports: [CommonModule, ReactiveFormsModule, EmailInputComponent, PasswordInputComponent, ButtonDirective, IconComponent],
  templateUrl: './login.component.html',
  styleUrl: '../auth-common.component.scss',
})
export class LoginComponent implements OnInit {
  _store = inject(Store<MainState>);

  googleButton = viewChild.required<ElementRef>('googleButton');

  vm: Signal<AuthVmModel> = toSignal(this._store.select(AuthVmSelectors.selectAuthViewModel));

  controlName: typeof FormControlNames = FormControlNames;
  signInText = texts.signIn;
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
      this._store.dispatch(AuthActions.login({ request }));
    }
  }

  openAuthPopup(type: AuthPopupType): void {
    this._store.dispatch(AuthActions.openAuthPopup({ popupType: type }));
  }

  closeLoginPopup() {
    this._store.dispatch(AuthActions.closeAuthPopup());
  }
}
