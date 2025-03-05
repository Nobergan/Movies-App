import { combineReducers, createFeature, createReducer, on } from '@ngrx/store';

import { createAsyncActionReducer } from '@mm/shared/helpers';
import { filmDetailsFeatureKey, FilmDetailsState } from '@mm/shared/state';

import { FilmDetailsApiActions } from '../actions';
import { FilmComment, FilmVotesResponse, IsFilmVotedResponse } from '../../models';

const votesInitialState: FilmVotesResponse = {
  likes: null,
  dislikes: null,
};

const isVotedInitialState: IsFilmVotedResponse = {
  isLiked: null,
  isDisliked: null,
};

const filmCommentsReducer = createReducer<FilmComment>(
  null,
  on(FilmDetailsApiActions.addFilmCommentAction.succeededAction, (state, { payload }) => payload),
  on(FilmDetailsApiActions.addFilmCommentAction.clearAction, () => null),
);

const getFilmCommentsReducer = createReducer<FilmComment[]>(
  null,
  on(FilmDetailsApiActions.getFilmCommentsAction.succeededAction, (state, { payload }) => payload),
  on(FilmDetailsApiActions.getFilmCommentsAction.clearAction, () => null),
);

const addFilmVoteReducer = createReducer<FilmVotesResponse>(
  null,
  on(FilmDetailsApiActions.addFilmVoteAction.succeededAction, (state, { payload }) => payload),
  on(FilmDetailsApiActions.addFilmVoteAction.clearAction, () => null),
);

const getFilmVotesReducer = createReducer<FilmVotesResponse>(
  votesInitialState,
  on(FilmDetailsApiActions.getFilmVotesAction.succeededAction, (state, { payload }) => payload),
  on(FilmDetailsApiActions.getFilmVotesAction.clearAction, (): FilmVotesResponse => votesInitialState),
);

const filmVotedReducer = createReducer<IsFilmVotedResponse>(
  isVotedInitialState,
  on(FilmDetailsApiActions.checkFilmVotedByUserAction.succeededAction, (state, { payload }) => payload),
  on(FilmDetailsApiActions.checkFilmVotedByUserAction.clearAction, () => isVotedInitialState),
  on(FilmDetailsApiActions.addFilmVotedUserAction.succeededAction, (state, { payload }) => payload),
  on(FilmDetailsApiActions.addFilmVotedUserAction.clearAction, () => isVotedInitialState),
);

export const filmDetailsFeature = createFeature({
  name: filmDetailsFeatureKey,
  reducer: combineReducers<FilmDetailsState>({
    addFilmCommentAction: createAsyncActionReducer(FilmDetailsApiActions.addFilmCommentAction),
    addFilmComment: filmCommentsReducer,

    filmCommentsAction: createAsyncActionReducer(FilmDetailsApiActions.getFilmCommentsAction),
    filmComments: getFilmCommentsReducer,

    addFilmVoteAction: createAsyncActionReducer(FilmDetailsApiActions.addFilmVoteAction),
    addFilmVote: addFilmVoteReducer,

    getFilmVotesAction: createAsyncActionReducer(FilmDetailsApiActions.getFilmVotesAction),
    getFilmVotes: getFilmVotesReducer,

    filmVotedAction: createAsyncActionReducer(FilmDetailsApiActions.checkFilmVotedByUserAction),
    filmVoted: filmVotedReducer,
  }),
});
