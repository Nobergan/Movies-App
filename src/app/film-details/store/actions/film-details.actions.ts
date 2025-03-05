import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FilmResponse } from '@mm/shared/films/models';

import { AddVotes, FilmRequest } from '../../models';

export const FilmDetailsActions = createActionGroup({
  source: 'Film Details',
  events: {
    opened: props<FilmRequest>(),
    closed: emptyProps(),
    addFilmComment: props<{
      filmId: number;
      comment: string;
    }>(),
    addFilmVote: props<AddVotes>(),
    addFavouriteFilm: props<FilmResponse>(),
  },
});
