import { Component, computed, inject, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FilmCardComponent } from '@mm/shared/films/ui';
import { FilmResponse } from '@mm/shared/films/models';
import { CurrentUser, MainState } from '@mm/shared/state';
import { UiActions } from '@mm/shared/actions';
import { IconComponent } from '@mm/shared/ui/icon';
import { ButtonDirective } from '@mm/shared/ui/button';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { SearchInputComponent } from '@mm/shared/ui/search-input';
import { NotFoundComponent } from '@mm/shared/ui/not-found';
import { ForgotPasswordComponent, LoginComponent, RegisterComponent } from '@mm/auth/components';
import { TooltipComponent } from '@mm/shared/ui/tooltip';
import { AuthPopupType } from '@mm/auth/models';
import { CommonMediaQueries, MediaScreenService } from '@mm/shared/services';
import texts from '@mm/texts';

import { ScrollBackgroundDirective } from './directives/header.directive';

@Component({
  selector: 'mm-header',
  imports: [
    IconComponent,
    ButtonDirective,
    RouterLink,
    ScrollBackgroundDirective,
    FormsModule,
    FilmCardComponent,
    SpinnerDirective,
    SearchInputComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    TooltipComponent,
    RouterLinkActive,
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected router = inject(Router);
  protected mediaScreenService = inject(MediaScreenService);

  searchFilms = input<FilmResponse[]>();
  isLoadingSearchFilms = input<boolean>();
  isSearchButton = input<boolean>();
  isButtonSearchIcon = input<boolean>();
  isBlockSearchVisible = input<boolean>();
  isLoginPopupOpen = input<AuthPopupType>();
  isRegisterPopupOpen = input<AuthPopupType>();
  isForgotPasswordPopupOpen = input<AuthPopupType>();
  isLoggedIn = input<boolean>();
  isAnonymous = input<boolean>();
  currentUser = input<CurrentUser>();
  isLoading = input<any>();
  isMobileMenuVisible = input<boolean>(false);

  currentRoute = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
    ),
    { initialValue: this.router.url },
  );
  isXl = toSignal(inject(MediaScreenService).mediaMatcher(CommonMediaQueries.XL));

  activeMediaRoute = computed<'all' | 'now-playing'>(() => {
    const currentUrl = this.currentRoute();
    if (currentUrl.includes('now-playing')) {
      return 'now-playing';
    }
    return 'all';
  });

  openLoginClicked = output<void>();
  openRegisterClicked = output<void>();
  logoutClicked = output<void>();
  clickedBtnSearch = output<string>();
  searchFilmsInputed = output<string>();

  searchTerm: string;
  isVisibleSearchBlock: boolean = false;
  headerContent = texts.header;
  authPopupType = AuthPopupType;

  private store = inject(Store<MainState>);

  handleSearchFilms(term: string): void {
    this.searchTerm = term;

    if (this.searchTerm.length > 3) {
      this.searchFilmsInputed.emit(this.searchTerm);
    }
  }

  onSearchClick() {
    this.clickedBtnSearch.emit(this.searchTerm);
    this.searchTerm = '';
    this.isVisibleSearchBlock = !this.isVisibleSearchBlock;
  }

  toggleSearchBlock() {
    this.isVisibleSearchBlock = !this.isVisibleSearchBlock;
    this.store.dispatch(
      UiActions.setIsSearchBlockVisible({
        isVisible: this.isVisibleSearchBlock,
      }),
    );
  }
}
