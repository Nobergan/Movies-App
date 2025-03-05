import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { FilmsListComponent } from '@mm/shared/films/section';
import { FilmResponse, FILMS_DEFAULT_PAGE, FilmsType } from '@mm/shared/films/models';
import texts from '@mm/texts';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { NotFoundComponent } from '@mm/shared/ui/not-found';
import { MainState } from '@mm/shared/state';
import { FavouriteFilmsService, LocalStorageService } from '@mm/shared/services';

import { SearchService } from '../../services';
import { SearchVm } from '../../models';
import { SearchVmSelectors } from '../../store/selectors';
import { SearchActions } from '../../store/actions';

@Component({
  selector: 'mm-search-films',
  imports: [SpinnerDirective, FilmsListComponent, NotFoundComponent, TranslateModule],
  templateUrl: './search-films.component.html',
  styleUrl: './search-films.component.scss',
})
export class SearchFilmsComponent implements OnInit, OnDestroy {
  _store = inject(Store<MainState>);

  vm: Signal<SearchVm> = toSignal(this._store.select(SearchVmSelectors.selectSearchViewModel));

  nameFilm = computed(() => this._searchService.searchName());

  mediaType = FilmsType;
  currentPage: number;
  searchTexts = texts.search;
  userLocalId = inject(LocalStorageService).get('userLocalId');

  private _searchService = inject(SearchService);
  private _favouriteFilmsService = inject(FavouriteFilmsService);

  ngOnInit() {
    this._searchService.openPage(FilmsType.Movie, this.nameFilm(), FILMS_DEFAULT_PAGE);
  }

  loadSearchFilms(page: number, name: string): void {
    this.currentPage = page;

    this._searchService.loadFilms(FilmsType.Movie, page, name);
  }

  toggleFavouriteFilm(film: FilmResponse, mediaType: string): void {
    this._favouriteFilmsService.onToggleFavouriteFilm(
      film.filmId,
      film.posterPath,
      film.title,
      film.voteAverage,
      film.releaseDate,
      film.genres,
      mediaType,
      this.vm().favouriteFilmsIds,
      this.userLocalId,
    );
  }

  ngOnDestroy() {
    this._store.dispatch(SearchActions.closed());
  }
}
