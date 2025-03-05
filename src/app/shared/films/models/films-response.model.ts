import { FilmResponse } from './film-response.model';

export interface FilmsResponse {
  page: number;
  results: FilmResponse[] | null;
  total_pages: number;
  total_results: number;
}
