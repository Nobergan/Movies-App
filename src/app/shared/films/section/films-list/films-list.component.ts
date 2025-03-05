import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';
import { FilmCardComponent } from '@mm/shared/films/ui';
import { ApiFilmResponse, FILMS_DEFAULT_PAGE, FilmsResponse } from '@mm/shared/films/models';
import { PaginationComponent } from '@mm/shared/ui/pagination';
import { TitleDirective } from '@mm/shared/ui/title';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import texts from '@mm/texts';

@Component({
  selector: 'mm-films-list',
  imports: [FilmCardComponent, NgxPaginationModule, PaginationComponent, TitleDirective, SpinnerDirective],
  templateUrl: './films-list.component.html',
  styleUrl: './films-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsListComponent {
  isLoading = input<boolean>(false);
  films = input<FilmsResponse>();
  isVisibleTitle = input<boolean>(true);
  mediaType = input<string>();
  currentPage = input<number>();
  itemsPerPage = input<number>(FILMS_DEFAULT_PAGE);
  favouriteFilmsIds = input<number[]>();
  isDetails = input<boolean>(false);
  isLoggedIn = input<boolean>();

  clickedPaginationBtn = output<number>();
  clickedFavouriteButton = output<ApiFilmResponse>();

  recommendationsContent = texts.recommendations;

  onPageChange(page: number): void {
    this.clickedPaginationBtn.emit(page);
  }

  FILMS_DEFAULT_PAGE = FILMS_DEFAULT_PAGE;
}
