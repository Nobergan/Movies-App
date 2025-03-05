import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FilmResponse, FilmsType } from '@mm/shared/films/models';

export const FavouriteFeatureKey = 'Favourite';

export const FavouriteActions = createActionGroup({
  source: FavouriteFeatureKey,
  events: {
    opened: emptyProps(),
    closed: emptyProps(),
    addFavouriteFilm: props<FilmResponse>(),
    deleteFavouriteFilm: props<{
      userLocalId: string;
      filmId: number;
    }>(),
    deleteAllFavourites: props<{ userLocalId: string }>(),
    deleteFavouritesByMediaType: props<{
      userLocalId: string;
      mediaType: FilmsType;
    }>(),
  },
});
