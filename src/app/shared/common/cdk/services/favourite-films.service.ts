import { inject, Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { MainState } from '@mm/shared/state';
import { FavouriteActions } from '@mm/favourites/actions';

@Injectable({
  providedIn: 'root',
})
export class FavouriteFilmsService {
  private _store = inject(Store<MainState>);

  onToggleFavouriteFilm(
    filmId: number,
    posterPath: string,
    title: string,
    voteAverage: number,
    releaseDate: string,
    genres: string[],
    mediaType: string,
    favouriteFilmsIds: number[],
    userLocalId: string,
  ) {
    const isFilmInFavourite = favouriteFilmsIds.includes(filmId);

    if (isFilmInFavourite) {
      this._store.dispatch(
        FavouriteActions.deleteFavouriteFilm({
          userLocalId,
          filmId,
        }),
      );
    } else {
      this._store.dispatch(
        FavouriteActions.addFavouriteFilm({
          filmId,
          posterPath,
          title,
          voteAverage,
          releaseDate,
          genres,
          mediaType,
        }),
      );
    }
  }
}
