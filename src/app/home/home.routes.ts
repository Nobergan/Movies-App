import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { provideHomeStore } from './store';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [provideHomeStore()],
  },
];
