import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { HeroFilmsComponent, TopFilmsComponent } from '@mm/shared/films/section';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { MainState } from '@mm/shared/state';
import { RouteTabsetComponent } from '@mm/shared/ui/tabset';
import { TitleDirective } from '@mm/shared/ui/title';
import texts from '@mm/texts';

import { MediaPageVm } from './models';
import { MediaActions, MediaVmSelectors } from './store';
import { MEDIA_TABS } from './constants/media-tabs';
import { MediaDataService } from './services/media-data.service';

@Component({
  selector: 'mm-media',
  imports: [
    AsyncPipe,
    SpinnerDirective,
    HeroFilmsComponent,
    TopFilmsComponent,
    TitleDirective,
    TranslateModule,
    RouteTabsetComponent,
    RouterOutlet,
  ],
  templateUrl: './media.component.html',
  styleUrl: './media.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent implements OnInit, OnDestroy {
  mediaType = input<string>();
  moviePage = input<string>();
  pageContent = input<string>();

  _store = inject(Store<MainState>);
  _mediaDataService = inject(MediaDataService);

  vm$: Observable<MediaPageVm> = this._store.select(MediaVmSelectors.selectMediaViewModel);

  mediaTabs = MEDIA_TABS;
  mediaTexts = texts.mediaPage;

  ngOnInit() {
    this._mediaDataService.setMediaData({ moviePage: this.moviePage(), movieType: this.mediaType() });
    this._store.dispatch(MediaActions.opened({ mediaType: this.mediaType() }));
  }

  ngOnDestroy() {
    this._store.dispatch(MediaActions.closed());
  }
}
