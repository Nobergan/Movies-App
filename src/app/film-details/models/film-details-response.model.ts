export interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguages {
  english_name?: string;
  iso_3166_1: string;
  name: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: number;
  profile_path: string;
}

export interface ExternalIds {
  facebook_id: string;
  freebase_id: string;
  freebase_mid: string;
  imdb_id: string;
  instagram_id: string;
  tvdb_id: number;
  tvrage_id: number;
  twitter_id: string;
  wikidata_id: string;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Networks {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Seasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface FilmDetailsResponse {
  // Films
  adult?: boolean;
  playerPoster?: string;
  externalIds?: ExternalIds;
  belongs_to_collection?: boolean | null;
  budget?: number;
  genres?: string[];
  homepage?: string;
  filmId?: number;
  overview?: string;
  filmImdbId?: string;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  posterPath?: string;
  productionCompanies?: ProductionCompanies[];
  productionCountries?: ProductionCountries[];
  releaseDate?: string;
  revenue?: number;
  filmRuntime?: number;
  spoken_languages?: SpokenLanguages[];
  status?: string;
  tagline?: string;
  title?: string;
  video?: boolean;
  voteAverage?: number;
  vote_count?: number;
  // Series
  created_by?: CreatedBy[];
  episodeRunTime?: number[];
  firstAirDate?: string;
  last_air_date?: string;
  in_production?: boolean;
  languages?: string[];
  last_episode_to_air?: LastEpisodeToAir;
  name?: string;
  next_episode_to_air?: string | null;
  networks?: Networks[];
  numberOfEpisodes?: number;
  numberOfSeasons?: number;
  origin_country?: string[];
  original_name?: string;
  seasons?: Seasons[];
  type?: string;
}
