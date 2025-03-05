import { Routes } from '@angular/router';

import { SearchComponent } from './search.component';
import { SearchFilmsComponent, SearchTvComponent } from './components';
import { provideSearchStore } from './store';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: 'movies',
        component: SearchFilmsComponent,
      },
      {
        path: 'tv',
        component: SearchTvComponent,
      },
      {
        path: '',
        redirectTo: route => route.queryParams['category'] || 'movies',
        pathMatch: 'full',
      },
    ],
    providers: [provideSearchStore()],
  },
];
