import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FilmsType } from '@mm/shared/films/models';

export const SearchFeatureKey = 'Search';

export const SearchActions = createActionGroup({
  source: SearchFeatureKey,
  events: {
    opened: props<{
      mediaType: FilmsType;
      nameFilm: string;
      page: number;
    }>(),
    closed: emptyProps(),
    searchClickedAfterLoad: emptyProps(),
  },
});
