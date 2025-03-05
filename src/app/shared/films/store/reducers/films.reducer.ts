import { combineReducers, createFeature, createReducer, on } from '@ngrx/store';
import { ApiFilmResponse, FilmsResponse, Genre } from '@mm/shared/films/models';
import { FilmsActions, FilmsApiActions } from '@mm/shared/films/actions';
import { createAsyncActionReducer } from '@mm/shared/helpers';
import { FilmActorsResponse, FilmDetailsResponse } from '@mm/details';

import { FilmsFeatureKey, FilmsState } from '../state/films.state';

const filmsResponseInitialState: FilmsResponse = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const filmActorsInitialState: FilmActorsResponse = {
  id: null,
  actors: [],
  crew: [],
};

const filmDetailsReducer = createReducer<FilmDetailsResponse>(
  null,
  on(FilmsApiActions.filmDetailsAction.succeededAction, (state, { payload }) => payload),
  on(FilmsApiActions.filmDetailsAction.clearAction, () => null),
);

const nowPlayingMediaReducer = createReducer<FilmsResponse>(
  null,
  on(FilmsActions.nowPlayingFilmsUpdate, (state, payload) => payload),
  on(FilmsActions.clearNowPlayingFilms, () => null),
);

const filmActorsReducer = createReducer<FilmActorsResponse>(
  filmActorsInitialState,
  on(FilmsApiActions.filmActorsAction.succeededAction, (state, { payload }) => payload),
  on(FilmsApiActions.filmActorsAction.clearAction, () => null),
);

const genresReducer = createReducer<Genre[]>(
  [],
  on(FilmsApiActions.genresAction.succeededAction, (state, { payload }) => payload.genres),
  on(FilmsApiActions.genresAction.clearAction, () => []),
);

const genresFilmsReducer = createReducer<Genre[]>(
  [],
  on(FilmsApiActions.genresFilmsAction.succeededAction, (state, { payload }) => payload.genres),
  on(FilmsApiActions.genresFilmsAction.clearAction, () => []),
);

const genresTvReducer = createReducer<Genre[]>(
  [],
  on(FilmsApiActions.genresTvAction.succeededAction, (state, { payload }) => payload.genres),
  on(FilmsApiActions.genresTvAction.clearAction, () => []),
);

const trendAllFilmsReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.trendAllFilmsAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.trendAllFilmsAction.clearAction, () => []),
);

const trendFilmsReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.trendFilmsAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.trendFilmsAction.clearAction, () => []),
);

const trendTvReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.trendTvAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.trendTvAction.clearAction, () => []),
);

const popularFilmsHomeListReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.popularFilmsHomeListAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.popularFilmsHomeListAction.clearAction, () => []),
);

const popularTvHomeListReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.popularTvHomeListAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.popularTvHomeListAction.clearAction, () => []),
);

const upcomingFilmsReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.upcomingFilmsAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.upcomingFilmsAction.clearAction, () => []),
);

const nowPlayingFilmsReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.popularFilmsAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.popularFilmsAction.clearAction, () => []),
);

const topFilmsReducer = createReducer<ApiFilmResponse[]>(
  [],
  on(FilmsApiActions.topFilmsAction.succeededAction, (state, { payload }) => payload.results),
  on(FilmsApiActions.topFilmsAction.clearAction, () => []),
);

const discoverFilmsReducer = createReducer<FilmsResponse>(
  filmsResponseInitialState,
  on(FilmsApiActions.discoveryFilmsAction.succeededAction, (state, { payload }) => ({
    ...state,
    ...payload,
  })),
  on(FilmsApiActions.discoveryFilmsAction.clearAction, () => filmsResponseInitialState),
);

const discoverFilmsFiltersBtn = createReducer<boolean>(
  null,
  on(FilmsApiActions.discoveryFilmsAction.succeededAction, (state, { payload }) => payload.isShowFiltersButton),
  on(FilmsApiActions.discoveryFilmsAction.clearAction, () => null),
);

const filmsSimilarReducer = createReducer<FilmsResponse>(
  filmsResponseInitialState,
  on(FilmsApiActions.getFilmsSimilarAction.succeededAction, (state, { payload }) => ({
    ...state,
    ...payload,
  })),
  on(FilmsApiActions.getFilmsSimilarAction.clearAction, () => null),
);

const searchFilmsReducer = createReducer<FilmsResponse>(
  filmsResponseInitialState,
  on(FilmsApiActions.searchFilmsAction.succeededAction, (state, { payload }) => ({
    ...state,
    ...payload,
  })),
  on(FilmsApiActions.searchFilmsAction.clearAction, () => filmsResponseInitialState),
);

export const FilmsFeature = createFeature({
  name: FilmsFeatureKey,
  reducer: combineReducers<FilmsState>({
    filmDetailsAction: createAsyncActionReducer(FilmsApiActions.filmDetailsAction),
    filmDetails: filmDetailsReducer,

    filmActorsAction: createAsyncActionReducer(FilmsApiActions.filmActorsAction),
    filmActors: filmActorsReducer,

    genresAction: createAsyncActionReducer(FilmsApiActions.genresAction),
    genres: genresReducer,

    genresFilmsAction: createAsyncActionReducer(FilmsApiActions.genresFilmsAction),
    genresFilms: genresFilmsReducer,

    genresTvAction: createAsyncActionReducer(FilmsApiActions.genresFilmsAction),
    genresTv: genresTvReducer,

    trendAllFilmsAction: createAsyncActionReducer(FilmsApiActions.trendAllFilmsAction),
    trendAllFilms: trendAllFilmsReducer,

    trendFilmsAction: createAsyncActionReducer(FilmsApiActions.trendFilmsAction),
    trendFilms: trendFilmsReducer,

    trendTvAction: createAsyncActionReducer(FilmsApiActions.trendTvAction),
    trendTv: trendTvReducer,

    popularFilmsHomeListAction: createAsyncActionReducer(FilmsApiActions.popularFilmsHomeListAction),
    popularFilmsHomeList: popularFilmsHomeListReducer,

    popularTvHomeListAction: createAsyncActionReducer(FilmsApiActions.popularTvHomeListAction),
    popularTvHomeList: popularTvHomeListReducer,

    upcomingFilmsAction: createAsyncActionReducer(FilmsApiActions.upcomingFilmsAction),
    upcomingFilms: upcomingFilmsReducer,

    popularFilmsAction: createAsyncActionReducer(FilmsApiActions.popularFilmsAction),
    popularFilms: nowPlayingFilmsReducer,

    topFilmsAction: createAsyncActionReducer(FilmsApiActions.topFilmsAction),
    topFilms: topFilmsReducer,

    discoveryFilmsAction: createAsyncActionReducer(FilmsApiActions.discoveryFilmsAction),
    discoveryFilms: discoverFilmsReducer,
    discoveryFilmsFiltersBtn: discoverFilmsFiltersBtn,

    nowPlayingFilmsAction: createAsyncActionReducer(FilmsApiActions.nowPlayingFilmsAction),
    airingTodayTvAction: createAsyncActionReducer(FilmsApiActions.airingTodayTvAction),
    nowPlayingMedia: nowPlayingMediaReducer,

    searchFilmsAction: createAsyncActionReducer(FilmsApiActions.searchFilmsAction),
    searchFilms: searchFilmsReducer,

    validationErrors: createAsyncActionReducer(FilmsApiActions.validationErrors),

    filmsSimilarAction: createAsyncActionReducer(FilmsApiActions.getFilmsSimilarAction),
    filmsSimilar: filmsSimilarReducer,
  }),
});
