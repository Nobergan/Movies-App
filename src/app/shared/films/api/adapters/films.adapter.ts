import { Injector } from '@angular/core';

import { ApiFilmsResponse, FilmsDiscoverResponse, FilmsResponse } from '@mm/shared/films/models';
import { shouldShowFiltersButton } from '@mm/shared/films/utils';
import { MixMovieContentRoute } from '@mm/shared/common/models';

const fromApiFilms = (films: ApiFilmsResponse): FilmsResponse => ({
  ...films,
  results: films?.results.map(film => ({
    filmId: film.id,
    title: film.title || film.name,
    overview: film.overview,
    backdropPath: film.backdrop_path,
    posterPath: film.poster_path,
    voteAverage: film.vote_average,
    voteCount: film.vote_count,
    releaseDate: film.release_date || film.first_air_date,
    genreIds: film.genre_ids,
    genres: film.genre_names,
    mediaType: film.media_type,
  })),
});

const fromApiDiscoverFilms = (
  films: ApiFilmsResponse,
  injector: Injector,
  moviePage: string,
  route: MixMovieContentRoute,
): FilmsDiscoverResponse => ({
  ...fromApiFilms(films),
  isShowFiltersButton: shouldShowFiltersButton(injector, moviePage, route),
});

const toApiFavouriteFilmIdsToDelete = (ids: number[]) =>
  ids.reduce((acc, id) => {
    acc[id] = null;
    return acc;
  }, {});

export const FilmsAdapter = {
  fromApiFilms,
  fromApiDiscoverFilms,
  toApiFavouriteFilmIdsToDelete,
};
