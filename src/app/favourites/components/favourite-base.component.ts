import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { MainState } from '@mm/shared/state';
import { FavouriteFilmsService, LocalStorageService } from '@mm/shared/services';
import { FilmResponse, FilmsType } from '@mm/shared/films/models';
import { FavouritePageVmModel } from '@mm/shared/favourites/models';
import { FavouriteFilmsVmSelectors } from '@mm/favourites/selectors';
import { FavouriteActions } from '@mm/favourites/actions';
import texts from '@mm/texts';

@Component({
  selector: 'mm-favourites-base',
  template: ``,
  styleUrl: './favourite-base.component.scss',
})
export class FavouriteBaseComponent implements OnInit, OnDestroy {
  _store = inject(Store<MainState>);

  vm: Signal<FavouritePageVmModel> = toSignal(this._store.select(FavouriteFilmsVmSelectors.selectFavouriteViewModel));

  userLocalId = inject(LocalStorageService).get('userLocalId');
  filmsType = FilmsType;
  favouriteText = texts.favourites;

  private _favouriteFilmsService = inject(FavouriteFilmsService);

  ngOnInit(): void {
    this._store.dispatch(FavouriteActions.opened());
  }

  deleteAllFavourites(): void {
    this._store.dispatch(
      FavouriteActions.deleteAllFavourites({
        userLocalId: this.userLocalId,
      }),
    );
  }

  deleteFavouritesByMediaType(mediaType: FilmsType): void {
    this._store.dispatch(
      FavouriteActions.deleteFavouritesByMediaType({
        userLocalId: this.userLocalId,
        mediaType: mediaType,
      }),
    );
  }

  toggleFavouriteFilm(film: FilmResponse) {
    this._favouriteFilmsService.onToggleFavouriteFilm(
      film.filmId,
      film.posterPath,
      film.title,
      film.voteAverage,
      film.releaseDate,
      film.genres,
      film.mediaType,
      this.vm().favouriteIds,
      this.userLocalId,
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(FavouriteActions.closed());
  }
}
