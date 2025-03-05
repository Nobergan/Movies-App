import { Routes } from '@angular/router';

import { FilmDetailsComponent } from './film-details.component';
import { provideFilmDetailsStore } from './store';

export const routes: Routes = [
  {
    path: ':mediaType/:id',
    component: FilmDetailsComponent,
    providers: [provideFilmDetailsStore()],
  },
];
