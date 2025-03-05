import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { CURRENT_PAGE_KEY, FilmResponse, FILMS_DEFAULT_PAGE } from '@mm/shared/films/models';
import { filter, Observable } from 'rxjs';
import { FavouriteFilmsService, LocalStorageService, SessionStorageService } from '@mm/shared/services';
import { scrollToTopBlock } from '@mm/shared/films/utils';

import { MediaDataService } from '../services/media-data.service';

@Component({
  template: '',
  styleUrls: ['./media-base.component.scss'],
})
export class MediaBaseComponent {
  mediaData = computed(() => this._mediaDataService.mediaData());

  currentPage: number;
  userLocalId: string;

  protected _mediaDataService = inject(MediaDataService);
  protected _localSessionService = inject(SessionStorageService);
  protected _localStorageService = inject(LocalStorageService);
  protected _favouriteFilmsService = inject(FavouriteFilmsService);
  protected _destroyRef = inject(DestroyRef);

  initValues(): void {
    this.userLocalId = this._localStorageService.get('userLocalId');
  }

  loadCurrentPage(route: string): void {
    this.currentPage = this._localSessionService.get(this.mediaData().moviePage + route + CURRENT_PAGE_KEY)
      ? this._localSessionService.get(this.mediaData().moviePage + route + CURRENT_PAGE_KEY)
      : FILMS_DEFAULT_PAGE;
  }

  saveCurrentPage(route: string, page: number): void {
    this.currentPage = page;
    this._localSessionService.set(this.mediaData().moviePage + route + CURRENT_PAGE_KEY, this.currentPage);
  }

  protected scrollToTopOnLoad(vm$: Observable<any>, selector: string) {
    vm$
      .pipe(
        filter(vm => !vm.isLoading),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        const element = document.querySelector(selector);

        if (element) {
          scrollToTopBlock(element as HTMLElement);
        }
      });
  }

  toggleFavouriteFilm(film: FilmResponse, favouriteFilmsIds: number[]) {
    this._favouriteFilmsService.onToggleFavouriteFilm(
      film.filmId,
      film.posterPath,
      film.title,
      film.voteAverage,
      film.releaseDate,
      film.genres,
      this.mediaData().movieType,
      favouriteFilmsIds,
      this.userLocalId,
    );
  }
}
