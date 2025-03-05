import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpFilmDetailsProvider } from './http-film-details.provider';
import { FilmComment, FilmIsVotedRequest, FilmVotesRequest, FilmVotesResponse, IsFilmVotedRequest, IsFilmVotedResponse } from '../models';

export interface FilmDetailsProvider {
  addFilmComment(payload: FilmComment): Observable<FilmComment>;
  getFilmComments(filmId: number): Observable<FilmComment[]>;
  addFilmVote(payload: FilmVotesRequest): Observable<FilmVotesResponse>;
  addFilmVotedUser(payload: FilmIsVotedRequest): Observable<IsFilmVotedResponse>;
  checkFilmVotedByUser(payload: IsFilmVotedRequest): Observable<IsFilmVotedResponse>;
  getFilmVotes(filmId: number): Observable<FilmVotesResponse>;
}

export const FilmDetailsProviderToken: InjectionToken<FilmDetailsProvider> = new InjectionToken('FilmDetailsProvider');

export const provideFilmDetailsApi = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: FilmDetailsProviderToken,
      useClass: HttpFilmDetailsProvider,
    },
  ]);
