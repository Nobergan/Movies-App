import { Component, input, OnInit, output } from '@angular/core';

import { IconComponent } from '@mm/shared/ui/icon';

@Component({
  selector: 'mm-film-to-favourite',
  templateUrl: './film-to-favourite.component.html',
  imports: [IconComponent],
})
export class FilmToFavouriteComponent implements OnInit {
  isFilmInFavourite = input<boolean>();
  isInFavouritesPage = input<boolean>(false);

  clickedFavouriteButton = output<void>();
  clickedDeleteFavouriteButton = output<void>();

  toggleFavouriteFilm() {
    this.clickedFavouriteButton.emit();
  }

  ngOnInit(): void {}
}
