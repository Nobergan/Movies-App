import { FilmActors } from '../film-actors.model';
import { FilmCrew } from '../film-crew.model';

export interface ApiFilmActorsResponse {
  id: number;
  cast: FilmActors[];
  crew: FilmCrew[];
}
