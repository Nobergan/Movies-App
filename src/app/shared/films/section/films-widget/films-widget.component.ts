import { Component, inject, input, output } from '@angular/core';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { ApiFilmResponse, FilmResponse } from '@mm/shared/films/models';
import { FilmCardComponent } from '@mm/shared/films/ui';
import { Store } from '@ngrx/store';
import { MainState } from '@mm/shared/state';

@Component({
  selector: 'mm-films-widget',
  imports: [CarouselModule, SpinnerDirective, FilmCardComponent],
  templateUrl: './films-widget.component.html',
  styleUrl: './films-widget.component.scss',
})
export class FilmsWidgetComponent {
  _store = inject(Store<MainState>);

  isLoading = input<boolean>(false);
  films = input<FilmResponse[]>();
  mediaType = input<string>();
  isLoggedIn = input<boolean>();
  favouriteFilmsIds = input<number[]>();

  clickedFavouriteButton = output<ApiFilmResponse>();

  filmsOptions: OwlOptions = {
    loop: true,
    margin: 24,
    nav: true,
    dots: false,
    navText: [''],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };
}
