import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import { Observable } from 'rxjs';
import { FilmResponse } from '@mm/shared/films/models';

import { HttpFavouriteProvider } from './http-favourite.provider';

export interface FavouriteProvider {
  toggleFavouriteFilm(payload: FilmResponse): Observable<FilmResponse>;
  getFavouriteFilms(payload: { userLocalId?: string }): Observable<FilmResponse[]>;
  deleteFavouriteFilm(payload: { userLocalId: string; filmId: number }): Observable<number>;
  deleteAllFavourites(payload: { userLocalId: string }): Observable<[]>;
  deleteFavouritesByMediaType(payload: { userLocalId: string; ids: number[] }): Observable<[]>;
}

export const FavouriteProviderToken: InjectionToken<FavouriteProvider> = new InjectionToken('FavouriteProvider');

export const provideFavouriteFilmsApi = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: FavouriteProviderToken,
      useClass: HttpFavouriteProvider,
    },
  ]);
