import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '@mm/shared/services';
import { AuthActions } from '@mm/auth/actions';
import { RootActions } from '@mm/shared/actions';

export const getDataOnInit = createEffect(
  (actions$ = inject(Actions), localStorage = inject(LocalStorageService), store = inject(Store)) =>
    actions$.pipe(
      ofType(RootActions.appInitialized),
      tap(() => store.dispatch(AuthActions.getCurrentUser())),
    ),
  { functional: true, dispatch: false },
);

export const handleLanguageOnInit = createEffect(
  (actions$ = inject(Actions), translateService = inject(TranslateService)) =>
    actions$.pipe(
      ofType(RootActions.appInitialized),
      tap(() => translateService.use('uk')),
    ),
  { functional: true, dispatch: false },
);
