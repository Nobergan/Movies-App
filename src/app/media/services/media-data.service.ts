import { signal } from '@angular/core';

import { MediaData } from '../models/media-data.model';

export class MediaDataService {
  mediaData = signal<MediaData>(null);

  setMediaData(mediaData: MediaData) {
    this.mediaData.set(mediaData);
  }
}
