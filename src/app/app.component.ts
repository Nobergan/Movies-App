import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DOCUMENT } from '@angular/common';

import { auditTime, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FooterComponent, HeaderComponent } from '@mm/shared/core';
import { LetDirective } from '@mm/shared/directives';
import { MainState } from '@mm/shared/state';
import { FilmsActions } from '@mm/shared/films/actions';
import { RootActions, UiActions } from '@mm/shared/actions';
import { AuthActions } from '@mm/auth/actions';
import { AuthPopupType } from '@mm/auth/models';
import { WA_WINDOW } from '@ng-web-apis/common';
import { CommonMediaQueries, MediaScreenService } from '@mm/shared/services';

import { AppVmModel, AppVmSelectors } from './store';

const SCROLL_DEBOUNCE = 200;
const SCROLL_THRESHOLD = 100;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LetDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _store = inject(Store<MainState>);
  private _document = inject(DOCUMENT);
  private _destroyRef = inject(DestroyRef);
  private _window = inject(WA_WINDOW);
  private _currentScrollPosition = 0;

  vm: Signal<AppVmModel> = toSignal(this._store.select(AppVmSelectors.selectAppViewModel));
  isXl = toSignal(inject(MediaScreenService).mediaMatcher(CommonMediaQueries.XL));

  authPopupType = AuthPopupType;

  ngOnInit(): void {
    this._store.dispatch(RootActions.appInitialized());

    if (!this.isXl()) {
      fromEvent(this._document, 'scroll')
        .pipe(
          auditTime(SCROLL_DEBOUNCE),
          tap(() => {
            this._calculateNavbarVisibility();
          }),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe();
    }
  }

  openAuthPopup(type: AuthPopupType): void {
    console.log('openAuthPopup');
    this._store.dispatch(AuthActions.openAuthPopup({ popupType: type }));
  }

  logout(): void {
    this._store.dispatch(AuthActions.logOut());
  }

  searchFilms(name: string): void {
    this._store.dispatch(FilmsActions.searchFilms({ name }));
  }

  handleSearchClicked(name: string) {
    this._store.dispatch(FilmsActions.goToSearchPage({ name }));
  }

  private _calculateNavbarVisibility(): void {
    console.log('calculateNavbarVisibility');
    const scroll = this._window.scrollY;
    if (scroll < this._currentScrollPosition) {
      this._store.dispatch(UiActions.elementsScrollVisibilityChanged({ isMobileMenuVisible: true }));
    } else if (scroll > SCROLL_THRESHOLD) {
      this._store.dispatch(UiActions.elementsScrollVisibilityChanged({ isMobileMenuVisible: false }));
    }
    this._currentScrollPosition = scroll;
  }
}
