import { FilmsResponse } from './films-response.model';

export interface FilmsDiscoverResponse extends FilmsResponse {
  isShowFiltersButton: boolean;
}
