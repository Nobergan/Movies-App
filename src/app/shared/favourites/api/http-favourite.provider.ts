import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '@mm/environment';
import { FilmsAdapter } from '@mm/shared/films/api';
import { FilmResponse } from '@mm/shared/films/models';

@Injectable()
export class HttpFavouriteProvider {
  firebaseDatabaseURL = environment.firebaseConfig.databaseURL;

  private _httpClient = inject(HttpClient);

  toggleFavouriteFilm(payload: FilmResponse): Observable<FilmResponse> {
    return this._httpClient.put<FilmResponse>(
      `${this.firebaseDatabaseURL}/users/${payload.userLocalId}/favouriteFilms/${payload.filmId}.json`,
      {
        filmId: payload.filmId,
        posterPath: payload.posterPath,
        title: payload.title,
        voteAverage: payload.voteAverage,
        releaseDate: payload.releaseDate,
        genres: payload.genres,
        mediaType: payload.mediaType,
      },
    );
  }

  getFavouriteFilms(payload: { userLocalId: string | null }): Observable<FilmResponse[]> {
    return this._httpClient.get<FilmResponse[]>(`${this.firebaseDatabaseURL}/users/${payload.userLocalId}/favouriteFilms.json`);
  }

  deleteFavouriteFilm(payload: { userLocalId: string; filmId: string }): Observable<number> {
    return this._httpClient.delete<number>(
      `${this.firebaseDatabaseURL}/users/${payload.userLocalId}/favouriteFilms/${payload.filmId}.json`,
    );
  }

  deleteAllFavourites(payload: { userLocalId: string }): Observable<[]> {
    return this._httpClient.delete<[]>(`${this.firebaseDatabaseURL}/users/${payload.userLocalId}/favouriteFilms.json`);
  }

  deleteFavouritesByMediaType(payload: { userLocalId: string; ids: number[] }): Observable<[]> {
    return this._httpClient.patch<[]>(
      `${this.firebaseDatabaseURL}/users/${payload.userLocalId}/favouriteFilms.json`,
      FilmsAdapter.toApiFavouriteFilmIdsToDelete(payload.ids),
    );
  }
}
