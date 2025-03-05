import { inject } from '@angular/core';

import { distinctUntilChanged, of, switchMap, take, throwError } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '@mm/auth/actions';
import { LocalStorageService, ToastType } from '@mm/shared/services';
import { RouterActions, ToastActions } from '@mm/shared/actions';
import { createAsyncActionEffect } from '@mm/shared/helpers';

import { AuthProviderToken } from '../../api/auth.provider';

export const handleRegister = createEffect(
  (actions$ = inject(Actions), authProvider = inject(AuthProviderToken)): any =>
    actions$.pipe(
      ofType(AuthApiActions.registerAction.action),
      switchMap(({ payload }) => createAsyncActionEffect(authProvider.register(payload), AuthApiActions.registerAction, null, true)),
    ),
  { functional: true },
);

export const handleLogin = createEffect(
  (actions$ = inject(Actions), authProvider = inject(AuthProviderToken)): any =>
    actions$.pipe(
      ofType(AuthApiActions.loginAction.action),
      switchMap(({ payload }) => {
        return createAsyncActionEffect(authProvider.login(payload), AuthApiActions.loginAction, null, true);
      }),
    ),
  { functional: true },
);

export const handleForgotPassword = createEffect(
  (actions$ = inject(Actions), authProvider = inject(AuthProviderToken), store = inject(Store)): any =>
    actions$.pipe(
      ofType(AuthApiActions.forgotPasswordAction.action),
      switchMap(({ payload }) =>
        authProvider.checkIfEmailExists(payload.email).pipe(
          switchMap((emailExists: boolean) => {
            if (!emailExists) {
              return of(AuthApiActions.forgotPasswordAction.failedAction({ error: { message: 'EMAIL_NOT_FOUND' } }));
            }

            return createAsyncActionEffect(authProvider.forgotPassword(payload), AuthApiActions.forgotPasswordAction, null, true);
          }),
        ),
      ),
    ),
  { functional: true },
);

export const getCurrentUser = createEffect(
  (actions$ = inject(Actions), authProvider = inject(AuthProviderToken), localStorageService = inject(LocalStorageService)): any =>
    actions$.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() => {
        const userToken = localStorageService.get('accessToken');

        if (!userToken) {
          return of(AuthApiActions.getCurrentUserAction.failedAction({ error: { message: 'Failed to fetch current user' } }));
        }

        return createAsyncActionEffect(authProvider.getCurrentUser(userToken), AuthApiActions.getCurrentUserAction);
      }),
    ),
  { functional: true },
);

export const handleGoogleAuth = createEffect(
  (actions$ = inject(Actions), authProvider = inject(AuthProviderToken)): any =>
    actions$.pipe(
      ofType(AuthActions.googleAuth),
      switchMap(() => createAsyncActionEffect(authProvider.authWithGoogle(), AuthApiActions.googleAuthAction, null, true)),
    ),
  { functional: true },
);

export const showSuccessForgotPasswordToaster = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthApiActions.forgotPasswordAction.succeededAction),
      map(() =>
        ToastActions.showToast({
          toastType: ToastType.Success,
          message: 'Вам відправлено листа на пошту',
        }),
      ),
    ),
  { functional: true },
);

export const showErrorForgotPasswordToaster = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthApiActions.forgotPasswordAction.failedAction),
      map(() =>
        ToastActions.showToast({
          toastType: ToastType.Error,
          message: 'Така пошта не зареєстрована',
        }),
      ),
    ),
  { functional: true },
);

export const handleGoogleAuthError = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthApiActions.googleAuthAction.failedAction),
      map(({ error }) => {
        console.log(error.code);
        const message = error.code;

        return ToastActions.showExtendedErrorToast({
          message,
        });
      }),
    ),
  { functional: true },
);

export const handleAuthSuccess = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)): any =>
    actions$.pipe(
      ofType(
        AuthApiActions.registerAction.succeededAction,
        AuthApiActions.loginAction.succeededAction,
        AuthApiActions.googleAuthAction.succeededAction,
      ),
      tap(({ payload }) => {
        localStorageService.set('accessToken', payload.idToken);
        localStorageService.set('userLocalId', payload.localId);
      }),
      mergeMap(() => [
        RouterActions.navigate({ url: '/' }),
        AuthActions.closeAuthPopup(),
        ToastActions.showToast({
          toastType: ToastType.Success,
          message: 'Ви у своєму профілі',
        }),
      ]),
    ),
  { functional: true },
);

export const handleAuthError = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(AuthApiActions.registerAction.failedAction, AuthApiActions.loginAction.failedAction),
      map(({ error }) => {
        const message = error.error.error.message;

        return ToastActions.showExtendedErrorToast({
          message,
        });
      }),
    ),
  { functional: true },
);
