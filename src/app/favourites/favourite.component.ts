import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TitleDirective } from '@mm/shared/ui/title';
import { RouteTabsetComponent } from '@mm/shared/ui/tabset';
import texts from '@mm/texts';

import { FAVOURITES_TABS } from './constants';

@Component({
    selector: 'mm-favourites',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.scss'],
    imports: [TitleDirective, RouteTabsetComponent, RouterOutlet]
})
export class FavouriteComponent {
  favouriteTabs = FAVOURITES_TABS;
  favouriteText = texts.favourites;
}
