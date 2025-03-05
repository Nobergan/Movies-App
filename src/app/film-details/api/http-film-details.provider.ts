import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '@mm/environment';

import { CheckFilmVotedByUserAdapter, GetFilmCommentsAdapter, GetFilmVotesAdapter } from './adapters';
import { FilmComment, FilmIsVotedRequest, FilmVotesRequest, FilmVotesResponse, IsFilmVotedRequest, IsFilmVotedResponse } from '../models';

@Injectable()
export class HttpFilmDetailsProvider {
  firebaseDatabaseURL = environment.firebaseConfig.databaseURL;

  private _httpClient = inject(HttpClient);

  addFilmComment(payload: FilmComment) {
    return this._httpClient.post<FilmComment>(`${this.firebaseDatabaseURL}/films/${payload.filmId}/comments.json`, {
      comment: payload.comment,
      date: payload.date,
    });
  }

  getFilmComments(filmId: number) {
    return this._httpClient
      .get<FilmComment>(`${this.firebaseDatabaseURL}/films/${filmId}/comments.json`)
      .pipe(map(res => GetFilmCommentsAdapter.fromApiGetFilmComments(res)));
  }

  addFilmVote(payload: FilmVotesRequest): Observable<FilmVotesResponse> {
    return this._httpClient.patch<FilmVotesResponse>(`${this.firebaseDatabaseURL}/films/${payload.filmId}/votes.json`, {
      filmId: payload.filmId,
      likes: payload.likes,
      dislikes: payload.dislikes,
    });
  }

  addFilmVotedUser(payload: FilmIsVotedRequest): Observable<IsFilmVotedResponse> {
    return this._httpClient.patch<IsFilmVotedResponse>(
      `${this.firebaseDatabaseURL}/users/${payload.userLocalId}/likedFilms/${payload.filmId}.json`,
      { isLiked: payload.isLiked, isDisliked: payload.isDisliked },
    );
  }

  getFilmVotes(filmId: number): Observable<FilmVotesResponse> {
    return this._httpClient
      .get<FilmVotesResponse>(`${this.firebaseDatabaseURL}/films/${filmId}/votes.json`)
      .pipe(map(res => GetFilmVotesAdapter.fromApiGetFilmVotes(res)));
  }

  checkFilmVotedByUser(payload: IsFilmVotedRequest): Observable<IsFilmVotedResponse> {
    return this._httpClient
      .get<IsFilmVotedResponse>(`${this.firebaseDatabaseURL}/users/${payload.userLocalId}/likedFilms/${payload.filmId}.json`)
      .pipe(map(res => CheckFilmVotedByUserAdapter.fromApiCheckFilmVotedByUser(res)));
  }
}
