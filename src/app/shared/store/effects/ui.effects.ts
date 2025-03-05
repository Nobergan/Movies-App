import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { filter } from 'rxjs';
import { UiActions } from '@mm/shared/actions';
import { FilmsApiActions } from '@mm/shared/films/actions';

export class UIEffects {
  hideSearchBlockOnBtnInvisible = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) =>
      actions$.pipe(
        ofType(UiActions.setIsSearchBtnVisible),
        filter(({ isVisible }) => !isVisible),
        switchMap(() => [UiActions.setIsSearchBlockVisible({ isVisible: false }), FilmsApiActions.searchFilmsAction.clearAction()]),
      ),
    { functional: true },
  );
}
