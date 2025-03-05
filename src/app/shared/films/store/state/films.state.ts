import { ApiFilmsGenresResponse, FilmResponse, FilmsResponse, Genre } from '@mm/shared/films/models';
import { AppError, AsyncActionState } from '@mm/shared/store/models';
import { FilmActorsResponse, FilmDetailsResponse } from '@mm/details';

export const FilmsFeatureKey = 'Films';

export interface FilmsState {
  filmDetailsAction: AsyncActionState<FilmDetailsResponse>;
  filmDetails: FilmDetailsResponse;
  filmActorsAction: AsyncActionState<FilmActorsResponse>;
  filmActors: FilmActorsResponse;
  genresAction: AsyncActionState<ApiFilmsGenresResponse>;
  genres: Genre[];
  genresFilmsAction: AsyncActionState<ApiFilmsGenresResponse>;
  genresFilms: Genre[];
  genresTvAction: AsyncActionState<ApiFilmsGenresResponse>;
  genresTv: Genre[];
  trendAllFilmsAction: AsyncActionState<FilmsResponse>;
  trendAllFilms: FilmResponse[];
  trendFilmsAction: AsyncActionState<FilmsResponse>;
  trendFilms: FilmResponse[];
  trendTvAction: AsyncActionState<FilmsResponse>;
  trendTv: FilmResponse[];
  popularFilmsHomeListAction: AsyncActionState<FilmsResponse>;
  popularFilmsHomeList: FilmResponse[];
  popularTvHomeListAction: AsyncActionState<FilmsResponse>;
  popularTvHomeList: FilmResponse[];
  upcomingFilmsAction: AsyncActionState<FilmsResponse>;
  upcomingFilms: FilmResponse[];
  popularFilmsAction: AsyncActionState<FilmsResponse>;
  popularFilms: FilmResponse[];
  topFilmsAction: AsyncActionState<FilmsResponse>;
  topFilms: FilmResponse[];
  discoveryFilmsAction: AsyncActionState<FilmsResponse>;
  discoveryFilms: FilmsResponse;
  discoveryFilmsFiltersBtn: boolean;
  searchFilmsAction: AsyncActionState<FilmsResponse>;
  searchFilms: FilmsResponse;
  validationErrors: AsyncActionState<AppError>;
  filmsSimilarAction: AsyncActionState<FilmsResponse>;
  filmsSimilar: FilmsResponse;
  nowPlayingFilmsAction: AsyncActionState<FilmsResponse>;
  airingTodayTvAction: AsyncActionState<FilmsResponse>;
  nowPlayingMedia: FilmsResponse;
}
