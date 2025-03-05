import { FilmActors } from './film-actors.model';
import { FilmCrew } from './film-crew.model';

export interface FilmActorsResponse {
  id: number;
  actors: FilmActors[];
  crew: FilmCrew[];
}
