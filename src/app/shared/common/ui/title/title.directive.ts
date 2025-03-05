import { Directive, HostBinding, input } from '@angular/core';

import { TitleLevel } from './models';

@Directive({
  selector: '[mmTitle]',
  host: {
    '[class.mm-title_accent]': 'this.isAccentText()',
  },
})
export class TitleDirective {
  /**q
   * Title level
   */
  level = input<TitleLevel>(1);

  /**
   * If title has accent text
   */
  isAccentText = input<boolean>(false);

  @HostBinding('class')
  private get _parentClassList() {
    return `mm-title mm-title_h${this.level()}`;
  }
}
