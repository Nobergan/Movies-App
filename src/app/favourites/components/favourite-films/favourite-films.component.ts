import { Component } from '@angular/core';

import { FilmCardComponent } from '@mm/shared/films/ui';
import { SpinnerDirective } from '@mm/shared/ui/spinner';
import { ButtonDirective } from '@mm/shared/ui/button';
import { IconComponent } from '@mm/shared/ui/icon';
import { NotFoundComponent } from '@mm/shared/ui/not-found';

import { FavouriteBaseComponent } from '../favourite-base.component';

@Component({
  selector: 'mm-favourites-films',
  imports: [SpinnerDirective, ButtonDirective, IconComponent, FilmCardComponent, NotFoundComponent],
  templateUrl: './favourite-films.component.html',
  styleUrl: '../favourite-base.component.scss',
})
export class FavouriteFilmsComponent extends FavouriteBaseComponent {}
