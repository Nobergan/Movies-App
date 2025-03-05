import { inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@mm/environment';
import {
  ApiFilmsGenresResponse,
  ApiFilmsResponse,
  FilmsDiscoverPayload,
  FilmsFilters,
  FilmsResponse,
  FilmsType,
} from '@mm/shared/films/models';
import {
  ApiFilmActorsResponse,
  ApiFilmDetailsResponse,
  FilmActorsResponse,
  FilmDetailsResponse,
  FilmRequest,
  GetFilmActorsAdapter,
  GetFilmDetailsAdapter,
} from '@mm/details';

import { FilmsAdapter } from './adapters';

@Injectable()
export class HttpFilmsProvider {
  tmdbAPIKey = environment.tmdbAPIKey;
  tmdbBaseFilmsUrlAPI = environment.tmdbBaseFilmsUrlAPI;

  private _httpClient = inject(HttpClient);
  private _injector = inject(Injector);

  getFilmDetails(payload: FilmRequest): Observable<FilmDetailsResponse> {
    return this._httpClient
      .get<ApiFilmDetailsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}${payload.mediaType}/${payload.filmId}?language=uk-UK&api_key=${this.tmdbAPIKey}&append_to_response=external_ids`,
      )
      .pipe(map(res => GetFilmDetailsAdapter.fromApiGetFilmDetails(res)));
  }

  getFilmActors(payload: FilmRequest): Observable<FilmActorsResponse> {
    return this._httpClient
      .get<ApiFilmActorsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}${payload.mediaType}/${payload.filmId}/credits?language=uk-UK&api_key=${this.tmdbAPIKey}`,
      )
      .pipe(map(res => GetFilmActorsAdapter.fromApiGetFilmActors(res)));
  }

  getTrendAllFilms(): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(`${this.tmdbBaseFilmsUrlAPI}trending/all/week?language=uk-UK&api_key=${this.tmdbAPIKey}`)
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getTrendFilms(): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(`${this.tmdbBaseFilmsUrlAPI}trending/movie/week?language=uk-UK&api_key=${this.tmdbAPIKey}`)
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getTrendTv(): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(`${this.tmdbBaseFilmsUrlAPI}trending/tv/week?language=uk-UK&api_key=${this.tmdbAPIKey}`)
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getPopularFilmsHomeList(): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}discover/movie?language=uk-UK&page=1&sort_by=popularity.desc&vote_average.gte=8&with_origin_country=US&api_key=${this.tmdbAPIKey}`,
      )
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getPopularTvHomeList(): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}discover/tv?language=uk-UK&page=1&sort_by=popularity.desc&vote_average.gte=8&with_origin_country=US&api_key=${this.tmdbAPIKey}`,
      )
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getUpcomingFilms(): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(`${this.tmdbBaseFilmsUrlAPI}movie/upcoming?language=uk-UK&page=1&api_key=${this.tmdbAPIKey}`)
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getPopularFilms(mediaType: string): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}discover/${mediaType}?include_adult=false&include_video=false&language=uk-UK&page=1&sort_by=vote_count.desc&api_key=${this.tmdbAPIKey}`,
      )
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getTopFilms(media_type: string): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}${media_type}/top_rated?include_adult=false&include_video=false&language=uk-UK&page=1&sort_by=popularity.desc&api_key=${this.tmdbAPIKey}`,
      )
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getGenresFilmsList(media_type: string): Observable<ApiFilmsGenresResponse> {
    return this._httpClient.get<ApiFilmsGenresResponse>(
      `${this.tmdbBaseFilmsUrlAPI}genre/${media_type}/list?language=uk-UK&api_key=${this.tmdbAPIKey}`,
    );
  }

  discoverMedia(payload: FilmsDiscoverPayload): Observable<ApiFilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}discover/${payload.mediaType}?include_adult=false&include_video=false&language=uk-UK&page=${payload.page}&sort_by=vote_count.desc&vote_average.gte=6&api_key=${this.tmdbAPIKey}`,
        {
          params: this._getDiscoverParams(payload.mediaType, payload.filters),
        },
      )
      .pipe(map(res => FilmsAdapter.fromApiDiscoverFilms(res, this._injector, payload.moviePage, payload.route)));
  }

  getFilmsSimilar(payload: FilmRequest): Observable<FilmsResponse> {
    return this._httpClient
      .get<FilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}${payload.mediaType}/${payload.filmId}/similar?language=uk-UK&api_key=${this.tmdbAPIKey}`,
      )
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  searchFilms(name: string, mediaType: string = 'multi', page: number = 1): Observable<FilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(
        `${this.tmdbBaseFilmsUrlAPI}search/${mediaType}?include_adult=false&language=uk-UK&page=${page}&api_key=${this.tmdbAPIKey}&query=${name}`,
      )
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getNowPlayingFilms(page: string): Observable<FilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(`${this.tmdbBaseFilmsUrlAPI}movie/now_playing?language=uk-UK&page=${page}&api_key=${this.tmdbAPIKey}`)
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  getAiringTodayTv(page: string): Observable<FilmsResponse> {
    return this._httpClient
      .get<ApiFilmsResponse>(`${this.tmdbBaseFilmsUrlAPI}tv/airing_today?language=uk-UK&page=${page}&api_key=${this.tmdbAPIKey}`)
      .pipe(map(res => FilmsAdapter.fromApiFilms(res)));
  }

  private _getDiscoverParams(media_type: string, filters: FilmsFilters): HttpParams {
    let params = new HttpParams();

    filters?.genres ? (params = params.set('with_genres', filters.genres)) : '';

    filters?.year
      ? (params = params.set(media_type === FilmsType.Movie ? 'primary_release_year' : 'first_air_date_year', filters.year))
      : '';

    return params;
  }
}
