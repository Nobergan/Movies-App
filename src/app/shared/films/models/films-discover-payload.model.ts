import { MixMovieContentRoute } from '@mm/shared/common/models';

import { FilmsFilters } from './films-filters.model';

export interface FilmsDiscoverPayload {
  page: number;
  filters: FilmsFilters;
  route: MixMovieContentRoute;
  mediaType: string;
  moviePage: string;
}
