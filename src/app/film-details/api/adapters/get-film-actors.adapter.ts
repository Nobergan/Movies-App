import { ApiFilmActorsResponse, FilmActorsResponse } from '../../models';

const fromApiGetFilmActors = (actors: ApiFilmActorsResponse): FilmActorsResponse => ({
  id: actors && actors.id ? actors.id : null,
  actors: actors && actors.cast ? actors.cast : [],
  crew: actors && actors.crew ? actors.crew : [],
});

export const GetFilmActorsAdapter = {
  fromApiGetFilmActors,
};
