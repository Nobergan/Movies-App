import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import { Observable } from 'rxjs';
import { ApiFilmsGenresResponse, ApiFilmsResponse, FilmsDiscoverPayload, FilmsResponse } from '@mm/shared/films/models';
import { FilmActorsResponse, FilmDetailsResponse, FilmRequest } from '@mm/details';

import { HttpFilmsProvider } from './http-films.provider';

export interface FilmsProvider {
  getFilmDetails(payload: FilmRequest): Observable<FilmDetailsResponse>;
  getFilmActors(payload: FilmRequest): Observable<FilmActorsResponse>;
  getGenresFilmsList(mediaType: string): Observable<ApiFilmsGenresResponse>;
  getTrendAllFilms(): Observable<ApiFilmsResponse>;
  getTrendFilms(): Observable<ApiFilmsResponse>;
  getTrendTv(): Observable<ApiFilmsResponse>;
  getPopularFilmsHomeList(): Observable<ApiFilmsResponse>;
  getPopularTvHomeList(): Observable<ApiFilmsResponse>;
  getUpcomingFilms(): Observable<ApiFilmsResponse>;
  getPopularFilms(mediaType: string): Observable<ApiFilmsResponse>;
  getTopFilms(mediaType: string): Observable<ApiFilmsResponse>;
  discoverMedia(payload: FilmsDiscoverPayload): Observable<ApiFilmsResponse>;
  getFilmsSimilar(payload: FilmRequest): Observable<FilmsResponse>;
  searchFilms(name: string, mediaType?: string, page?: number): Observable<ApiFilmsResponse>;
  getAiringTodayTv(page: number): Observable<ApiFilmsResponse>;
  getNowPlayingFilms(page: number): Observable<ApiFilmsResponse>;
}

export const FilmsProviderToken: InjectionToken<FilmsProvider> = new InjectionToken('FilmsProvider');

export const provideFilmsApi = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: FilmsProviderToken,
      useClass: HttpFilmsProvider,
    },
  ]);
