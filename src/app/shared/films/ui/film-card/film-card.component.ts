import { Component, inject, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Store } from '@ngrx/store';
import { FilmResponse } from '@mm/shared/films/models';
import { MainState } from '@mm/shared/state';
import { RouterActions } from '@mm/shared/actions';
import { IsInArrayPipe } from '@mm/shared/pipes';
import { hostBinding } from '@mm/shared/utils';
import { TooltipComponent } from '@mm/shared/ui/tooltip';
import texts from '@mm/texts';

import { ApiFilmResponse } from '../../models/api';
import { RatingComponent } from '../rating';
import { GenresComponent } from '../genres';
import { FilmToFavouriteComponent } from '../film-to-favourite';

@Component({
  selector: 'mm-film-card',
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss',
  imports: [CommonModule, RatingComponent, GenresComponent, FilmToFavouriteComponent, IsInArrayPipe, TooltipComponent, NgOptimizedImage],
})
export class FilmCardComponent {
  film = input<FilmResponse>();
  mediaType = input<string>();
  isSimply = input<boolean>(false);
  favouriteFilmsIds = input<number[]>();
  isInFavouritesPage = input<boolean>(false);
  isLoggedIn = input<boolean>();

  onAddFavouriteFilm = output<ApiFilmResponse>();

  filmCardText = texts.ui;

  private store = inject(Store<MainState>);

  constructor() {
    hostBinding('class.film-card_simplified', this.isSimply);
  }

  navigateToFilmDetails() {
    const url = `${this.mediaType()}/${this.film().filmId}`;

    this.store.dispatch(
      RouterActions.navigateByUrl({
        url: url,
        skipLocalization: true,
      }),
    );
  }
}
