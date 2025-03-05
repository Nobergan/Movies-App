import { Component, computed, DestroyRef, inject, OnDestroy, OnInit, output, Signal, ViewEncapsulation } from '@angular/core';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';

import { Store } from '@ngrx/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilmsType } from '@mm/shared/films/models';
import texts from '@mm/texts';
import { IsInArrayPipe } from '@mm/shared/pipes';
import { FavouriteFilmsService, LocalStorageService } from '@mm/shared/services';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { BreadcrumbsComponent } from '@mm/shared/ui/breadcrumbs';
import { ButtonDirective } from '@mm/shared/ui/button';
import { FilmsListComponent } from '@mm/shared/films/section';
import { MainState } from '@mm/shared/state';
import { GenresComponent } from '@mm/shared/films/ui';
import { AuthPopupType } from '@mm/auth/models';
import { AuthActions } from '@mm/auth/actions';
import { TooltipComponent } from '@mm/shared/ui/tooltip';

import { FilmActorsComponent, FilmCommentsComponent, FilmLikesComponent, FilmPlayerComponent } from './components';
import { FilmDescriptionDirective } from './directives';
import { FilmDetailsActions, FilmDetailsPageVmModel, FilmDetailsVmSelectors } from './store';
import { AddVotes, FilmDetailsResponse } from './models';
import { FilmToFavouriteComponent } from '../shared/films/ui/film-to-favourite';

@Component({
  selector: 'mm-film-details',
  templateUrl: './film-details.component.html',
  styleUrl: './film-details.component.scss',
  imports: [
    NgxPaginationModule,
    SpinnerDirective,
    FormsModule,
    FilmPlayerComponent,
    BreadcrumbsComponent,
    DatePipe,
    MatTabGroup,
    MatTab,
    TitleCasePipe,
    FilmDescriptionDirective,
    ButtonDirective,
    DecimalPipe,
    FilmActorsComponent,
    FilmCommentsComponent,
    FilmLikesComponent,
    MatTabLabel,
    FilmToFavouriteComponent,
    IsInArrayPipe,
    GenresComponent,
    FilmsListComponent,
    TooltipComponent,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FilmDetailsComponent implements OnInit, OnDestroy {
  _store = inject(Store<MainState>);
  _localStorageService = inject(LocalStorageService);

  vm: Signal<FilmDetailsPageVmModel> = toSignal(this._store.select(FilmDetailsVmSelectors.selectFilmDetailsViewModel));

  numberOfComments = computed(() => this.vm().comments?.length);

  onAddFavouriteFilm = output<FilmDetailsResponse>();

  id: number;
  mediaType: string;
  showActors: boolean = false;
  showComments: boolean = false;
  userLocalId = this._localStorageService.get('userLocalId');
  filmsType = FilmsType;
  detailsText = texts.filmDetails.details;
  authPopupType = AuthPopupType;

  private _destroyRef = inject(DestroyRef);
  private _route = inject(ActivatedRoute);
  private _favouriteFilmsService = inject(FavouriteFilmsService);

  ngOnInit(): void {
    this.initValues();
    this._store.dispatch(
      FilmDetailsActions.opened({
        filmId: this.id,
        mediaType: this.mediaType,
      }),
    );
  }

  initValues(): void {
    this._route.params.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((params: Params) => {
      this.id = params['id'];
      this.mediaType = params['mediaType'];
      this._localStorageService.set('filmId', this.id);
    });
  }

  tabChanged(tabIndex: number): void {
    if (tabIndex === 1) {
      this.showActorsTabContent();
    }

    if (tabIndex === 2) {
      this.showCommentsTabContent();
    }
  }

  showActorsTabContent(): void {
    this.showActors = true;
  }

  showCommentsTabContent(): void {
    this.showComments = true;
  }

  handleAddVotes(vote: AddVotes): void {
    this._store.dispatch(
      FilmDetailsActions.addFilmVote({
        filmId: this.id,
        ...vote,
      }),
    );
  }

  toggleFavouriteFilm(details: FilmDetailsResponse) {
    this._favouriteFilmsService.onToggleFavouriteFilm(
      details.filmId,
      details.posterPath,
      details.title,
      details.voteAverage,
      details.releaseDate,
      details.genres,
      this.mediaType,
      this.vm().favouriteFilmsIds,
      this.userLocalId,
    );
  }

  openAuthPopup(type: AuthPopupType): void {
    this._store.dispatch(AuthActions.openAuthPopup({ popupType: type }));
  }

  ngOnDestroy(): void {
    this._store.dispatch(FilmDetailsActions.closed());
  }
}
