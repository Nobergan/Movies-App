import { Component, input, viewChild } from '@angular/core';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ButtonDirective } from '@mm/shared/ui/button';
import { TitleDirective } from '@mm/shared/ui/title';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { FilmResponse } from '@mm/shared/films/models';
import { GenresComponent, RatingComponent } from '@mm/shared/films/ui';

@Component({
  selector: 'mm-hero-films',
  imports: [
    ButtonDirective,
    CarouselModule,
    DatePipe,
    RatingComponent,
    TitleDirective,
    SpinnerDirective,
    RouterLink,
    GenresComponent,
    NgOptimizedImage,
  ],
  templateUrl: './hero-films.component.html',
  styleUrl: './hero-films.component.scss',
})
export class HeroFilmsComponent {
  owlFilms = viewChild.required<any>('owlFilms');
  owlNav = viewChild.required<any>('owlNav');

  isLoading = input<boolean>(false);
  films = input<FilmResponse[]>();
  mediaType = input<string>();

  activeSlideIndex: number = 0;

  filmsOptions: OwlOptions = {
    loop: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
  };

  navigationFilmsOptions: OwlOptions = {
    loop: true,
    smartSpeed: 1500,
    autoplay: true,
    mouseDrag: false,
    items: 5,
    margin: 12,
    center: true,
    navText: ['', ''],
    nav: true,
    dots: false,
  };

  onFilmCarouselChanged(event: SlidesOutputData) {
    if (this.owlNav()) {
      this.activeSlideIndex = event.startPosition;

      this.owlNav().to(this.activeSlideIndex.toString(), 300);
    }
  }

  onNavigationCarouselChanged(event: SlidesOutputData) {
    if (this.owlFilms()) {
      this.activeSlideIndex = event.startPosition;

      this.owlFilms().to(this.activeSlideIndex.toString(), 300);
    }
  }

  onNavigationItemClick(index: number) {
    if (this.owlFilms()) {
      this.owlFilms().to(index.toString(), 300);
    }
  }
}
