import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';

import { Store } from '@ngrx/store';
import { RouteTabsetComponent } from '@mm/shared/ui/tabset';
import { SearchInputComponent } from '@mm/shared/ui/search-input';
import { TitleDirective } from '@mm/shared/ui/title';
import { MainState } from '@mm/shared/state';
import { FilmsActions } from '@mm/shared/films/actions';

import { SearchService } from './services';
import { SEARCH_TABS } from './constants';
import { SearchActions } from './store/actions';

@Component({
    selector: 'mm-search',
    imports: [RouterOutlet, RouteTabsetComponent, SearchInputComponent, TitleDirective],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    providers: [SearchService]
})
export class SearchComponent implements OnInit {
  nameFilm: string;
  mediaType: string;
  queryParams: Params = {};
  searchTabs = SEARCH_TABS;

  private _destroyRef = inject(DestroyRef);
  private _searchService = inject(SearchService);
  private _route = inject(ActivatedRoute);
  private _store = inject(Store<MainState>);

  ngOnInit() {
    this._route.queryParams.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((params: Params) => {
      this.nameFilm = params['name'];
      this.queryParams = { ...params };
      this._searchService.setTerm(this.nameFilm);
    });
  }

  searchFilms(name: string): void {
    if (this.nameFilm !== name) {
      this._store.dispatch(FilmsActions.goToSearchPage({ name }));
    } else {
      this._store.dispatch(SearchActions.searchClickedAfterLoad());
    }
  }
}
