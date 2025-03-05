import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import texts from '@mm/texts';
import { RouterLink } from '@angular/router';
import { FilmResponse } from '@mm/shared/films/models';
import { TitleDirective } from '@mm/shared/ui/title';
import { ButtonDirective } from '@mm/shared/ui/button';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { GenresComponent, RatingComponent } from '@mm/shared/films/ui';

@Component({
  selector: 'mm-top-films',
  imports: [
    CarouselModule,
    TitleDirective,
    ButtonDirective,
    RatingComponent,
    SpinnerDirective,
    GenresComponent,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './top-films.component.html',
  styleUrl: './top-films.component.scss',
})
export class TopFilmsComponent {
  isLoading = input<boolean>(false);
  films = input<FilmResponse[]>();
  mediaType = input<string>();

  topFilmsContent = texts.topFilms;

  topFilmsOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
}
