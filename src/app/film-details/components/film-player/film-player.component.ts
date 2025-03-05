import { ChangeDetectionStrategy, Component, ElementRef, inject, input, OnInit } from '@angular/core';

import { of } from 'rxjs';

declare var kbox: any;

@Component({
  selector: 'mm-film-player',
  template: '<div class="kinobox_player"></div>',
  styleUrl: './film-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmPlayerComponent implements OnInit {
  imdbId = input<string>();
  title = input<string>();
  poster = input<string>();

  private _elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.initKinoboxPlayer();
  }

  initKinoboxPlayer(): void {
    of(this.imdbId()).subscribe(() => {
      const script = document.createElement('script');
      script.src = 'https://kinobox.tv/kinobox.min.js?1';
      script.onload = () => {
        kbox('.kinobox_player', {
          search: {
            imdb: this.imdbId(),
            title: this.title(),
          },
          menu: {
            default: 'menuList',
            mobile: 'menuButton',
            format: '{N} :: {T} ({Q})',
            limit: 5,
            open: false,
          },
          params: {
            all: {
              poster: 'https://image.tmdb.org/t/p/original/' + this.poster(),
            },
          },
        });
      };
      this._elementRef.nativeElement.appendChild(script);
    });
  }
}
