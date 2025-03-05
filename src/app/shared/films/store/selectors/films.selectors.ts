import { createSelector } from '@ngrx/store';
import { FilmResponse, FilmsType } from '@mm/shared/films/models';
import { mapGenresToFilms } from '@mm/shared/films/utils';

import { FilmsFeature } from '../reducers/films.reducer';

const {
  selectFilmDetailsAction,
  selectFilmDetails,

  selectFilmActorsAction,
  selectFilmActors,

  selectGenresAction,
  selectGenres,

  selectGenresFilmsAction,
  selectGenresFilms,

  selectGenresTvAction,
  selectGenresTv,

  selectTrendAllFilmsAction,
  selectTrendAllFilms,

  selectTrendFilmsAction,
  selectTrendFilms,

  selectTrendTvAction,
  selectTrendTv,

  selectPopularFilmsHomeListAction,
  selectPopularFilmsHomeList,

  selectPopularTvHomeListAction,
  selectPopularTvHomeList,

  selectUpcomingFilmsAction,
  selectUpcomingFilms,

  selectPopularFilmsAction,
  selectPopularFilms,

  selectTopFilmsAction,
  selectTopFilms,

  selectDiscoveryFilmsAction,
  selectDiscoveryFilms,
  selectDiscoveryFilmsFiltersBtn,

  selectSearchFilmsAction,
  selectSearchFilms,

  selectValidationErrors,

  selectFilmsSimilarAction,
  selectFilmsSimilar,

  selectNowPlayingFilmsAction,
  selectAiringTodayTvAction,
  selectNowPlayingMedia,
} = FilmsFeature;

const selectSearchResultsFilms = createSelector(selectSearchFilms, (searchFilmsResponse): FilmResponse[] => {
  const searchFilmsResults = searchFilmsResponse?.results;

  return searchFilmsResults ? [...searchFilmsResults].filter(film => film.mediaType !== FilmsType.Person) : [];
});

const selectUpdatedSearchFilms = createSelector(
  selectSearchFilms,
  selectSearchResultsFilms,
  selectGenres,
  (searchFilmsResponse, searchResultsFilms, genres) => ({
    ...searchFilmsResponse,
    results: mapGenresToFilms(searchResultsFilms, genres),
  }),
);

const selectUpdatedTrendAllFilms = createSelector(
  selectTrendAllFilms,
  selectGenresFilms,
  selectGenresTv,
  (trendAllFilms, genresFilms, genresTv) => mapGenresToFilms(trendAllFilms, [...genresFilms, ...genresTv]),
);

const selectUpdatedTrendFilms = createSelector(selectTrendFilms, selectGenresFilms, (trendFilms, genres) =>
  mapGenresToFilms(trendFilms, genres),
);

const selectUpdatedTrendTv = createSelector(selectTrendTv, selectGenresTv, (trendTv, genres) => mapGenresToFilms(trendTv, genres));

const selectUpdatedPopularFilmsHomeList = createSelector(selectPopularFilmsHomeList, selectGenresFilms, (popularFilmsList, genres) =>
  mapGenresToFilms(popularFilmsList, genres),
);

const selectUpdatedPopularTvHomeList = createSelector(selectPopularTvHomeList, selectGenresTv, (popularTvList, genres) =>
  mapGenresToFilms(popularTvList, genres),
);

const selectUpdatedUpcomingFilms = createSelector(selectUpcomingFilms, selectGenresFilms, (upcomingFilms, genres) =>
  mapGenresToFilms(upcomingFilms, genres),
);

const selectDiscoveryResultsFilms = createSelector(
  selectDiscoveryFilms,
  (discoveryFilmsResponse): FilmResponse[] => discoveryFilmsResponse?.results,
);

const selectUpdatedDiscoveryFilms = createSelector(
  selectDiscoveryFilms,
  selectDiscoveryResultsFilms,
  selectGenres,
  (discoveryFilmsResponse, discoveryResultsFilms, genres) => ({
    ...discoveryFilmsResponse,
    results: mapGenresToFilms(discoveryResultsFilms, genres),
  }),
);

const selectUpdatedNowPlayingMedia = createSelector(selectNowPlayingMedia, selectGenres, (nowPlayingMedia, genres) => ({
  ...nowPlayingMedia,
  results: mapGenresToFilms(nowPlayingMedia?.results, genres),
}));

const selectUpdatedPopularFilms = createSelector(selectPopularFilms, selectGenres, (popularFilms, genres) =>
  mapGenresToFilms(popularFilms, genres),
);

const selectUpdatedTopFilms = createSelector(selectTopFilms, selectGenres, (topFilms, genres): FilmResponse[] =>
  mapGenresToFilms(topFilms, genres),
);

const selectSimilarFilmsResults = createSelector(selectFilmsSimilar, (filmsSimilar): FilmResponse[] => filmsSimilar?.results.slice(0, 4));

const selectUpdatedSimilarFilms = createSelector(
  selectFilmsSimilar,
  selectSimilarFilmsResults,
  selectGenres,
  (similarFilms, similarFilmsResults, genres) => ({
    ...similarFilms,
    results: mapGenresToFilms(similarFilmsResults, genres),
  }),
);

export const FilmsSelectors = {
  selectFilmDetailsAction,
  selectFilmDetails,
  selectFilmActorsAction,
  selectFilmActors,
  selectGenresAction,
  selectGenres,
  selectGenresFilmsAction,
  selectGenresFilms,
  selectGenresTvAction,
  selectGenresTv,
  selectTrendAllFilmsAction,
  selectUpdatedTrendAllFilms,
  selectTrendAllFilms,
  selectTrendFilmsAction,
  selectUpdatedTrendFilms,
  selectTrendFilms,
  selectTrendTvAction,
  selectUpdatedTrendTv,
  selectTrendTv,
  selectPopularFilmsHomeListAction,
  selectUpdatedPopularFilmsHomeList,
  selectPopularFilmsHomeList,
  selectPopularTvHomeListAction,
  selectUpdatedPopularTvHomeList,
  selectPopularTvHomeList,
  selectUpcomingFilmsAction,
  selectUpdatedUpcomingFilms,
  selectUpcomingFilms,
  selectPopularFilmsAction,
  selectUpdatedPopularFilms,
  selectTopFilmsAction,
  selectUpdatedTopFilms,
  selectDiscoveryFilmsAction,
  selectUpdatedDiscoveryFilms,
  selectDiscoveryFilmsFiltersBtn,
  selectSearchFilmsAction,
  selectSearchFilms,
  selectSearchResultsFilms,
  selectUpdatedSearchFilms,
  selectValidationErrors,
  selectFilmsSimilarAction,
  selectUpdatedSimilarFilms,
  selectNowPlayingFilmsAction,
  selectAiringTodayTvAction,
  selectUpdatedNowPlayingMedia,
};
