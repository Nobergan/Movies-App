import { Component, input } from '@angular/core';

import { IconSize } from './models';

@Component({
  selector: 'mm-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: { '[class.mm-icon]': 'true' },
})
export class IconComponent {
  iconName = input<string>();
  size = input<IconSize>();
}
