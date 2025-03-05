import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FilmsResponse, FilmsType } from '@mm/shared/films/models';
import { FilmsFeatureKey } from '@mm/shared/films/state';

export const FilmsActions = createActionGroup({
  source: FilmsFeatureKey,
  events: {
    goToSearchPage: props<{ name: string }>(),
    searchFilms: props<{
      name: string;
      mediaType?: FilmsType;
      page?: number;
    }>(),
    nowPlayingFilmsUpdate: props<FilmsResponse>(),
    clearNowPlayingFilms: emptyProps(),
  },
});
