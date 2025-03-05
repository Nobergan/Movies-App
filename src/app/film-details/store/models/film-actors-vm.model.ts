import { FilmActors, FilmCrew } from '../../models';

export interface FilmActorsViewModel {
  id: number;
  actors: FilmActors[];
  crew: FilmCrew[];
  isLoading: boolean;
}
