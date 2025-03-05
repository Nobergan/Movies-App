import { createAsyncAction } from '@mm/shared/helpers';

import {
  FilmComment,
  FilmIsVotedRequest,
  FilmVotesRequest,
  FilmVotesResponse,
  IsFilmVotedRequest,
  IsFilmVotedResponse,
} from '../../models';

const addFilmCommentAction = createAsyncAction<FilmComment, FilmComment>(`Add Film Comments`);
const getFilmCommentsAction = createAsyncAction<{ filmId: number }, FilmComment[]>(`Get Film Comments`);
const addFilmVoteAction = createAsyncAction<FilmVotesRequest, FilmVotesResponse>(`Add Film Vote`);
const addFilmVotedUserAction = createAsyncAction<FilmIsVotedRequest, IsFilmVotedResponse>(`Add Film Liked User`);
const checkFilmVotedByUserAction = createAsyncAction<IsFilmVotedRequest, IsFilmVotedResponse>(`Check If Film Liked`);
const getFilmVotesAction = createAsyncAction<{ filmId: number }, FilmVotesResponse>(`Get Film Likes`);

export const FilmDetailsApiActions = {
  addFilmCommentAction,
  getFilmCommentsAction,
  addFilmVoteAction,
  addFilmVotedUserAction,
  checkFilmVotedByUserAction,
  getFilmVotesAction,
};
