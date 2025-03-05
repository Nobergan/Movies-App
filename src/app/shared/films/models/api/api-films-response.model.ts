import { ApiFilmResponse } from './api-film-response.model';

export interface ApiFilmsResponse {
  page: number;
  results: ApiFilmResponse[] | null;
  total_pages: number;
  total_results: number;
}
