import { ChangeDetectionStrategy, Component, inject, input, OnInit, Signal, ViewEncapsulation } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { Store } from '@ngrx/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { FilmsApiActions } from '@mm/shared/films/actions';
import { MainState } from '@mm/shared/state';

import { FilmActorsViewModel, FilmDetailsVmSelectors } from '../../store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'mm-film-actors',
    templateUrl: './film-actors.component.html',
    styleUrl: './film-actors.component.scss',
    imports: [CarouselModule, SpinnerDirective, NgOptimizedImage],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmActorsComponent implements OnInit {
  _store = inject(Store<MainState>);

  vm: Signal<FilmActorsViewModel> = toSignal(this._store.select(FilmDetailsVmSelectors.selectFilmActorsViewModel));

  id = input<number>();
  mediaType = input<string>();

  actorsOptions: OwlOptions = {
    loop: false,
    dots: false,
    autoplay: false,
    items: 6,
    margin: 24,
    nav: true,
    navText: [''],
  };

  ngOnInit(): void {
    this._store.dispatch(
      FilmsApiActions.filmActorsAction.action({
        payload: {
          filmId: this.id(),
          mediaType: this.mediaType(),
        },
      }),
    );
  }
}
