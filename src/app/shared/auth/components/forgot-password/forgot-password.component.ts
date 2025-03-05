import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { EmailInputComponent, FormControlNames } from '@mm/shared/forms';
import { ButtonDirective } from '@mm/shared/ui/button';
import { IconComponent } from '@mm/shared/ui/icon';
import { MainState } from '@mm/shared/state';
import { AuthPopupType, ForgotPasswordRequest } from '@mm/auth/models';
import { AuthActions } from '@mm/auth/actions';
import { emailValidatorsGroup } from '@mm/shared/validators';
import texts from '@mm/texts';

import { AuthVmModel, AuthVmSelectors } from '../../store';

@Component({
  selector: 'mm-forgot-password',
  imports: [CommonModule, ReactiveFormsModule, EmailInputComponent, ButtonDirective, IconComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../auth-common.component.scss',
})
export class ForgotPasswordComponent implements OnInit {
  _store = inject(Store<MainState>);

  vm: Signal<AuthVmModel> = toSignal(this._store.select(AuthVmSelectors.selectAuthViewModel));

  controlName: typeof FormControlNames = FormControlNames;
  forgotPasswordText = texts.forgotPassword;
  form: FormGroup;
  authPopupType = AuthPopupType;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', emailValidatorsGroup],
    });
  }

  onSubmit(): void {
    const request: ForgotPasswordRequest = this.form.value;
    this._store.dispatch(AuthActions.forgotPassword({ request }));
  }

  openAuthPopup(type: AuthPopupType): void {
    this._store.dispatch(AuthActions.openAuthPopup({ popupType: type }));
  }

  closeForgotPasswordPopup() {
    this._store.dispatch(AuthActions.closeAuthPopup());
  }
}
