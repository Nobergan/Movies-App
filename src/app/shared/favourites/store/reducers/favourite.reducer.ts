import { combineReducers, createFeature, createReducer, on } from '@ngrx/store';
import { FilmResponse } from '@mm/shared/films/models';
import { favouriteFilmsFeatureKey, FavouriteFilmsStateModel } from '@mm/shared/state';
import { createAsyncActionReducer } from '@mm/shared/helpers';

import { FavouriteApiActions } from '../actions';

const addFavouriteFilmReducer = createReducer<FilmResponse>(
  null,
  on(FavouriteApiActions.addFavouriteFilmAction.succeededAction, (state, { payload }) => payload),
  on(FavouriteApiActions.addFavouriteFilmAction.clearAction, () => null),
);

const getFavouriteFilmsReducer = createReducer<FilmResponse[]>(
  [],
  on(FavouriteApiActions.getFavouriteFilmsAction.succeededAction, (state, { payload }) => payload),
  on(FavouriteApiActions.getFavouriteFilmsAction.clearAction, () => null),
);

export const favouriteFeature = createFeature({
  name: favouriteFilmsFeatureKey,
  reducer: combineReducers<FavouriteFilmsStateModel>({
    addFavouriteFilmAction: createAsyncActionReducer(FavouriteApiActions.getFavouriteFilmsAction),
    addFavouriteFilm: addFavouriteFilmReducer,

    getFavouriteAllAction: createAsyncActionReducer(FavouriteApiActions.getFavouriteFilmsAction),
    getFavouriteAll: getFavouriteFilmsReducer,
  }),
});
