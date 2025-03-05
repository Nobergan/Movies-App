import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FilmsDiscoverPayload, FilmsFilters } from '@mm/shared/films/models';
import { MixMovieContentRoute } from '@mm/shared/common/models';

export const MediaAllFeatureKey = 'MediaAllSection';

export const MediaAllActions = createActionGroup({
  source: MediaAllFeatureKey,
  events: {
    opened: props<{
      mediaType: string;
      moviePage: string;
      filters: FilmsFilters;
      route: MixMovieContentRoute.All;
      page: number;
    }>(),
    discoveryFilms: props<{ payload: FilmsDiscoverPayload }>(),
    closed: emptyProps(),
  },
});
