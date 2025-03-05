import { inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilmsType } from '@mm/shared/films/models';
import { MainState } from '@mm/shared/state';
import { FilmsActions } from '@mm/shared/films/actions';

import { SearchActions } from '../store/actions';

export class SearchService {
  private _store = inject(Store<MainState>);

  searchName = signal<string>(null);

  setTerm(name: string): void {
    this.searchName.set(name);
  }

  openPage(mediaType: FilmsType, nameFilm: string, page: number): void {
    this._store.dispatch(
      SearchActions.opened({
        mediaType,
        nameFilm,
        page,
      }),
    );
  }

  loadFilms(mediaType: FilmsType, page: number, name: string): void {
    this._store.dispatch(
      FilmsActions.searchFilms({
        page,
        name,
        mediaType,
      }),
    );
  }
}
