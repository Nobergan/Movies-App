import { ApiFilmDetailsResponse, FilmDetailsResponse } from '../../models';

const fromApiGetFilmDetails = (details: ApiFilmDetailsResponse): FilmDetailsResponse => ({
  filmImdbId: details.external_ids.imdb_id,
  title: details.title || details.name,
  posterPath: details.poster_path,
  playerPoster: details.backdrop_path,
  filmId: details.id,
  releaseDate: details.release_date || details.first_air_date,
  genres: details.genres.map(genre => genre.name),
  overview: details.overview,
  voteAverage: details.vote_average,
  productionCountries: details.production_countries,
  budget: details.budget,
  numberOfEpisodes: details.number_of_episodes,
  numberOfSeasons: details.number_of_seasons,
  filmRuntime: details.runtime,
  productionCompanies: details.production_companies,
  status: details.status,
});

export const GetFilmDetailsAdapter = {
  fromApiGetFilmDetails,
};
