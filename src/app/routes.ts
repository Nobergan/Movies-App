import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/home/index').then(({ routes }) => routes),
  },
  {
    path: 'search',
    loadChildren: () => import('src/app/search/index').then(({ routes }) => routes),
  },
  {
    path: '',
    loadChildren: () => import('src/app/favourites/index').then(({ routes }) => routes),
  },
  {
    path: '',
    loadChildren: () => import('src/app/media/index').then(({ routes }) => routes),
  },
  {
    path: '',
    loadChildren: () => import('src/app/film-details/index').then(({ routes }) => routes),
  },
];
