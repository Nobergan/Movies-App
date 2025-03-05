import { FilmResponse, FilmsType } from '@mm/shared/films/models';
import { createAsyncAction } from '@mm/shared/helpers';

const addFavouriteFilmAction = createAsyncAction<FilmResponse, FilmResponse>(`Add Favourite Film`);
const getFavouriteFilmsAction = createAsyncAction<
  {
    userLocalId: string;
  },
  FilmResponse[]
>(`Get Favourite Films`);
const deleteFavouriteFilmAction = createAsyncAction<{ userLocalId: string; filmId: number }, number>(`Delete Favourite Film`);
const deleteAllFavouritesAction = createAsyncAction<
  {
    userLocalId: string;
  },
  []
>(`Delete All Favourite Films`);
const deleteFavouritesByMediaTypeAction = createAsyncAction<{ userLocalId: string; mediaType: FilmsType }, []>(
  `Delete Favourites By Media Type`,
);

export const FavouriteApiActions = {
  addFavouriteFilmAction,
  getFavouriteFilmsAction,
  deleteFavouriteFilmAction,
  deleteAllFavouritesAction,
  deleteFavouritesByMediaTypeAction,
};
