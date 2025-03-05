import { Component, inject, input, OnDestroy, OnInit, Signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { FilmsWidgetComponent, HeroFilmsComponent } from '@mm/shared/films/section';
import { FilmResponse, FilmsType } from '@mm/shared/films/models';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { MainState } from '@mm/shared/state';
import { TitleDirective } from '@mm/shared/ui/title';
import { FavouriteFilmsService, LocalStorageService } from '@mm/shared/services';
import { toSignal } from '@angular/core/rxjs-interop';
import texts from '@mm/texts';

import { HomePageVm } from './models';
import { HomeActions, HomeVmSelectors } from './store';

@Component({
  selector: 'mm-home',
  imports: [SpinnerDirective, HeroFilmsComponent, FilmsWidgetComponent, TitleDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  _store = inject(Store<MainState>);

  vm: Signal<HomePageVm> = toSignal(this._store.select(HomeVmSelectors.selectHomeViewModel));

  mediaType = input<string>();

  filmsType = FilmsType;
  homeText = texts.home;
  userLocalId = inject(LocalStorageService).get('userLocalId');

  private _favouriteFilmsService = inject(FavouriteFilmsService);

  ngOnInit() {
    this._store.dispatch(HomeActions.opened());
  }

  toggleFavouriteFilm(film: FilmResponse, mediaType?: string) {
    this._favouriteFilmsService.onToggleFavouriteFilm(
      film.filmId,
      film.posterPath,
      film.title,
      film.voteAverage,
      film.releaseDate,
      film.genres,
      film.mediaType || mediaType,
      this.vm().favouriteFilmsIds,
      this.userLocalId,
    );
  }

  ngOnDestroy() {
    this._store.dispatch(HomeActions.closed());
  }
}
