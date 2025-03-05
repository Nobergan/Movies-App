import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MixMovieContentRoute } from '@mm/shared/common/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilmFiltersComponent } from '@mm/shared/films/ui';
import { FilmsListComponent } from '@mm/shared/films/section';
import { CURRENT_PAGE_KEY, FILMS_DEFAULT_PAGE, FilmsFilters, FILTERS_KEY } from '@mm/shared/films/models';

import { MediaAllActions } from '../../store/actions/media-all.actions';
import { MediaVmSelectors } from '../../store';
import { MediaAllVm } from '../../models/media-all-vm.model';
import { MediaBaseComponent } from '../media-base.component';

@Component({
  selector: 'mm-media-all',
  templateUrl: './media-all.component.html',
  styleUrls: ['../media-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, FilmFiltersComponent, FilmsListComponent],
})
export class MediaAllComponent extends MediaBaseComponent implements OnInit, OnDestroy {
  _store = inject(Store);

  vm$: Observable<MediaAllVm> = this._store.select(MediaVmSelectors.selectMediaAllViewModel);

  currentFilters: FilmsFilters;

  ngOnInit() {
    this.initValues();
    this.loadSelectedFilters();
    this.loadCurrentPage(MixMovieContentRoute.All);
    this._store.dispatch(
      MediaAllActions.opened({
        mediaType: this.mediaData().movieType,
        moviePage: this.mediaData().moviePage,
        route: MixMovieContentRoute.All,
        filters: this.currentFilters,
        page: this.currentPage,
      }),
    );
  }

  ngOnDestroy() {
    this._store.dispatch(MediaAllActions.closed());
  }

  loadSelectedFilters(): void {
    this.currentFilters = this._localSessionService.get(this.mediaData().moviePage + MixMovieContentRoute.All + FILTERS_KEY)
      ? this._localSessionService.get(this.mediaData().moviePage + MixMovieContentRoute.All + FILTERS_KEY)
      : this.currentFilters;
  }

  loadFilmsByFilters(filters?: FilmsFilters) {
    this.currentFilters = filters;
    this.currentFilters
      ? this._localSessionService.set(this.mediaData().moviePage + MixMovieContentRoute.All + FILTERS_KEY, this.currentFilters)
      : this._localSessionService.remove(this.mediaData().moviePage + MixMovieContentRoute.All + FILTERS_KEY);
    this.currentPage = FILMS_DEFAULT_PAGE;
    this._localSessionService.remove(this.mediaData().moviePage + MixMovieContentRoute.All + CURRENT_PAGE_KEY);

    this._handleLoadDiscoverFilms();
  }

  loadFilmsByPage(page: number) {
    this.saveCurrentPage(MixMovieContentRoute.All, page);

    this._handleLoadDiscoverFilms();
  }

  private _handleLoadDiscoverFilms() {
    this._store.dispatch(
      MediaAllActions.discoveryFilms({
        payload: {
          page: this.currentPage,
          filters: this.currentFilters,
          mediaType: this.mediaData().movieType,
          moviePage: this.mediaData().moviePage,
          route: MixMovieContentRoute.All,
        },
      }),
    );

    this.scrollToTopOnLoad(this.vm$, '.mm-media__container');
  }
}
