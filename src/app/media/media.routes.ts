import { Routes } from '@angular/router';

import { provideMediaStore } from './store';
import { FilmsComponent, TvComponent } from './pages';
import { MediaAllComponent } from './components/media-all/media-all.component';
import { MediaNowPlayingComponent } from './components/media-popular/media-now-playing.component';
import { MediaDataService } from './services/media-data.service';

export const routes: Routes = [
  {
    path: 'movies',
    component: FilmsComponent,
    providers: [provideMediaStore(), MediaDataService],
    children: [
      { path: 'all', component: MediaAllComponent },
      { path: 'now-playing', component: MediaNowPlayingComponent },
      {
        path: '',
        redirectTo: route => route.queryParams['section'] || 'all',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'tv',
    component: TvComponent,
    providers: [provideMediaStore(), MediaDataService],
    children: [
      { path: 'all', component: MediaAllComponent },
      { path: 'now-playing', component: MediaNowPlayingComponent },
      {
        path: '',
        redirectTo: route => route.queryParams['section'] || 'all',
        pathMatch: 'full',
      },
    ],
  },
];
