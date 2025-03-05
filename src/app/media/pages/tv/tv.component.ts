import { Component } from '@angular/core';

import { FilmsType } from '@mm/shared/films/models';
import { MixMoviePage } from '@mm/shared/common/models';
import texts from '@mm/texts';

import { MediaComponent } from '../../media.component';

@Component({
    selector: 'mm-tv',
    imports: [MediaComponent],
    template: '<mm-media [mediaType]="MediaType.Tv" [moviePage]="MixMoviePage.Tv" [pageContent]="pageContent"></mm-media>'
})
export class TvComponent {
  MediaType = FilmsType;
  MixMoviePage = MixMoviePage;
  pageContent = texts.media.tv;
}
