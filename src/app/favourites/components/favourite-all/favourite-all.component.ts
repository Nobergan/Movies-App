import { Component } from '@angular/core';

import { FilmCardComponent } from '@mm/shared/films/ui';
import { ButtonDirective } from '@mm/shared/ui/button';
import { IconComponent } from '@mm/shared/ui/icon';
import { NotFoundComponent } from '@mm/shared/ui/not-found';
import { SpinnerDirective } from '@mm/shared/ui/spinner';

import { FavouriteBaseComponent } from '../favourite-base.component';

@Component({
  selector: 'mm-favourites-all',
  imports: [ButtonDirective, IconComponent, FilmCardComponent, NotFoundComponent, SpinnerDirective],
  templateUrl: './favourite-all.component.html',
  styleUrl: '../favourite-base.component.scss',
})
export class FavouriteAllComponent extends FavouriteBaseComponent {}
