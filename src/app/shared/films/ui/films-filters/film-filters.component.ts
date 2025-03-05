import { Component, effect, input, OnInit, output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { FILMS_FILTERS_MIN_YEAR, FilmsFilters, Genre } from '@mm/shared/films/models';
import { ButtonDirective } from '@mm/shared/ui/button';

@Component({
  selector: 'mm-film-filters',
  imports: [NgSelectModule, FormsModule, ButtonDirective],
  templateUrl: './film-filters.component.html',
  styleUrl: './film-filters.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FilmFiltersComponent implements OnInit {
  genres = input<Genre[]>();
  isShowFiltersButton = input<boolean>();
  filters = input<FilmsFilters>();

  clickedFilters = output<FilmsFilters>();
  clickedResetFilters = output<void>();

  years: number[] = [];
  selectedYear: number;
  selectedGenre: string;

  constructor() {
    effect(() => {
      this._handleSelectedFilters();
    });
  }

  ngOnInit(): void {
    this.generateYears();
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = FILMS_FILTERS_MIN_YEAR; year <= currentYear; year++) {
      this.years.push(year);
    }

    this.years.reverse();
  }

  changeFilters(): void {
    const filtersData: FilmsFilters = {};

    if (this.selectedGenre) {
      filtersData.genres = this.selectedGenre;
    }

    if (this.selectedYear) {
      filtersData.year = this.selectedYear;
    }

    this.clickedFilters.emit(filtersData);
  }

  private _handleSelectedFilters(): void {
    this.selectedGenre = this.filters()?.genres ?? null;
    this.selectedYear = this.filters()?.year ?? null;
  }
}
