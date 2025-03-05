import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BREADCRUMBS_FILMS, BREADCRUMBS_TV, FilmsMedia, FilmsType } from '@mm/shared/films/models';

@Component({
  selector: 'mm-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit {
  title = input<string>();
  mediaType = input<string>();

  contentType: string;
  baseUrl: string;
  filmsType = FilmsType;
  filmsMedia = FilmsMedia;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initValues();
    this.baseUrl = window.location.origin;
  }

  initValues() {
    switch (this.mediaType()) {
      case this.filmsType.Movie:
        this.contentType = BREADCRUMBS_FILMS;
        break;
      case this.filmsType.Tv:
        this.contentType = BREADCRUMBS_TV;
        break;
    }
  }

  goToMedia(): void {
    const url = this.mediaType() === this.filmsType.Movie ? this.filmsMedia.Movies : this.filmsMedia.Tv;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
