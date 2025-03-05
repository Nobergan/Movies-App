import { Routes } from '@angular/router';

import { FavouriteComponent } from './favourite.component';
import { provideFavouriteStore } from './store';
import { FavouriteAllComponent, FavouriteFilmsComponent, FavouriteTvComponent } from './components';

export const routes: Routes = [
  {
    path: 'favourites',
    component: FavouriteComponent,
    children: [
      {
        path: 'all',
        component: FavouriteAllComponent,
      },
      {
        path: 'movies',
        component: FavouriteFilmsComponent,
      },
      {
        path: 'tv',
        component: FavouriteTvComponent,
      },
      {
        path: '',
        redirectTo: route => route.queryParams['type'] || 'all',
        pathMatch: 'full',
      },
    ],
    providers: [provideFavouriteStore()],
  },
];
