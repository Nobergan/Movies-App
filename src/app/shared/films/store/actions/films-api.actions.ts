import {
  ApiFilmsGenresResponse,
  ApiFilmsResponse,
  FilmsDiscoverPayload,
  FilmsDiscoverResponse,
  FilmsResponse,
} from '@mm/shared/films/models';
import { createAsyncAction, createAsyncActionNoProps } from '@mm/shared/helpers';
import { AppError } from '@mm/shared/store/models';
import { FilmActorsResponse, FilmDetailsResponse, FilmRequest } from '@mm/details';

const filmDetailsAction = createAsyncAction<FilmRequest, FilmDetailsResponse>(`Film Details`);
const filmActorsAction = createAsyncAction<FilmRequest, FilmActorsResponse>(`Film Actors`);
const genresAction = createAsyncAction<{ mediaType: string }, ApiFilmsGenresResponse>(`Genres`);
const genresFilmsAction = createAsyncAction<{ mediaType: string }, ApiFilmsGenresResponse>(`Genres Films`);
const genresTvAction = createAsyncAction<{ mediaType: string }, ApiFilmsGenresResponse>(`Genres Tv`);
const trendAllFilmsAction = createAsyncActionNoProps<ApiFilmsResponse>(`All trend films`);
const trendFilmsAction = createAsyncActionNoProps<ApiFilmsResponse>(`Trend Films`);
const trendTvAction = createAsyncActionNoProps<ApiFilmsResponse>(`Trend TV`);
const popularFilmsHomeListAction = createAsyncActionNoProps<ApiFilmsResponse>(`Popular Films Home List`);
const popularTvHomeListAction = createAsyncActionNoProps<ApiFilmsResponse>(`Popular TV Home List`);
const upcomingFilmsAction = createAsyncActionNoProps<ApiFilmsResponse>(`Upcoming Films`);
const popularFilmsAction = createAsyncAction<{ mediaType: string }, ApiFilmsResponse>(`Popular Films`);
const topFilmsAction = createAsyncAction<{ mediaType: string }, ApiFilmsResponse>(`Top Films`);
const nowPlayingFilmsAction = createAsyncAction<{ page: number }, ApiFilmsResponse>(`Now Playing Films`);
const airingTodayTvAction = createAsyncAction<{ page: number }, ApiFilmsResponse>(`Airing Today TV`);
const discoveryFilmsAction = createAsyncAction<FilmsDiscoverPayload, FilmsDiscoverResponse>(`Discovery films`);
const searchFilmsAction = createAsyncAction<{ name: string; mediaType?: string; page?: number }, FilmsResponse>('Search films');
const validationErrors = createAsyncAction<string, AppError>(`Errors`);
const getFilmsSimilarAction = createAsyncAction<FilmRequest, FilmsResponse>(`Get Films Similar`);

export const FilmsApiActions = {
  filmDetailsAction,
  filmActorsAction,
  genresAction,
  genresFilmsAction,
  genresTvAction,
  trendAllFilmsAction,
  trendFilmsAction,
  trendTvAction,
  popularFilmsHomeListAction,
  popularTvHomeListAction,
  upcomingFilmsAction,
  discoveryFilmsAction,
  popularFilmsAction,
  topFilmsAction,
  searchFilmsAction,
  validationErrors,
  getFilmsSimilarAction,
  nowPlayingFilmsAction,
  airingTodayTvAction,
};
