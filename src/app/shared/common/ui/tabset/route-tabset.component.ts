import { Component, input } from '@angular/core';
import { Params, RouterLink, RouterLinkActive } from '@angular/router';

import { UiRouteTab } from './models';

@Component({
    selector: 'ui-route-tabset',
    imports: [RouterLinkActive, RouterLink],
    templateUrl: './route-tabset.component.html',
    styleUrl: './route-tabset.component.scss'
})
export class RouteTabsetComponent {
  /**
   * Tabs configuration
   */
  tabs = input<UiRouteTab[]>();
  queryParams = input<Params | undefined>();

  getQueryParamsWithData(tab: UiRouteTab): Params {
    if (tab.data) {
      return {
        ...this.queryParams(),
        ...tab.data,
      };
    }

    return this.queryParams();
  }
}
