import { Component } from '@angular/core';

import { FilmsType } from '@mm/shared/films/models';
import { MixMoviePage } from '@mm/shared/common/models';
import texts from '@mm/texts';

import { MediaComponent } from '../../media.component';

@Component({
    selector: 'mm-films',
    imports: [MediaComponent],
    template: '<mm-media [mediaType]="MediaType.Movie" [moviePage]="MixMoviePage.Movies" [pageContent]="pageContent"></mm-media>'
})
export class FilmsComponent {
  MediaType = FilmsType;
  MixMoviePage = MixMoviePage;
  pageContent = texts.media.films;
}
