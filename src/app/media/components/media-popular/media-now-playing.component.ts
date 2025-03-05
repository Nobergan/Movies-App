import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { FilmsListComponent } from '@mm/shared/films/section';
import { MixMovieContentRoute } from '@mm/shared/common/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaVmSelectors } from '../../store';
import { MediaNowPlayingActions } from '../../store/actions/media-now-playing.actions';
import { MediaNowPlayingVm } from '../../models/media-now-playing-vm.model';
import { MediaBaseComponent } from '../media-base.component';

@Component({
  selector: 'mm-media-now-playing',
  templateUrl: './media-now-playing.component.html',
  styleUrls: ['../media-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FilmsListComponent, AsyncPipe],
})
export class MediaNowPlayingComponent extends MediaBaseComponent implements OnInit, OnDestroy {
  _store = inject(Store);

  vm$: Observable<MediaNowPlayingVm> = this._store.select(MediaVmSelectors.selectMediaNowPlayingViewModel);

  ngOnInit() {
    this.initValues();
    this.loadCurrentPage(MixMovieContentRoute.NowPlaying);
    this._store.dispatch(
      MediaNowPlayingActions.opened({
        mediaType: this.mediaData().movieType,
        page: this.currentPage,
      }),
    );
  }

  ngOnDestroy() {
    this._store.dispatch(MediaNowPlayingActions.closed());
  }

  loadFilmsByPage(page: number) {
    this.saveCurrentPage(MixMovieContentRoute.NowPlaying, page);

    this._store.dispatch(
      MediaNowPlayingActions.loadNowPlayingFilmsTriggered({ mediaType: this.mediaData().movieType, page: this.currentPage }),
    );

    this.scrollToTopOnLoad(this.vm$, '.mm-media__container');
  }
}
