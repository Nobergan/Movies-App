import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { distinctUntilChanged, first, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions, AuthApiActions } from '@mm/auth/actions';
import { LocalStorageService } from '@mm/shared/services';

export const register = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(AuthActions.register),
      map(action => AuthApiActions.registerAction.action({ payload: action.request })),
    ),
  { functional: true },
);

export const login = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(AuthActions.login),
      distinctUntilChanged(),
      tap(() => console.log('[Auth Effects] AuthActions.login caught')),
      map(action => AuthApiActions.loginAction.action({ payload: action.request })),
    ),
  { functional: true },
);

export const forgotPassword = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(AuthActions.forgotPassword),
      map(action => AuthApiActions.forgotPasswordAction.action({ payload: action.request })),
    ),
  { functional: true },
);

export const logout = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService), router = inject(Router)): any =>
    actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => {
        localStorageService.remove('accessToken');
        localStorageService.remove('userLocalId');
        router.navigateByUrl('/').then(() => {});
      }),
    ),
  { dispatch: false, functional: true },
);
