import { Directive, HostBinding, input } from '@angular/core';

import { ButtonUiSize, ButtonUiType } from '../models';

@Directive({
  selector: '[mmButton]',
  host: {
    '[class.mm-button_disabled]': 'this.linkDisabled()',
    '[class.mm-button_only-icon]': 'this.onlyIcon()',
    '[class.mm-button_pressed]': 'this.isPressed()',
    '[class.mm-button_full-width]': 'this.fullWidth()',
  },
})
export class ButtonDirective {
  /**
   * Button size
   */
  size = input<ButtonUiSize>('s');

  /**
   * Button type
   */
  mmType = input<ButtonUiType>('primary');

  /**
   * Is disabled
   * Use only for links, for button disabled attr should be used
   */
  linkDisabled = input<boolean>(false);

  /**
   * If button has only icon
   */
  onlyIcon = input<boolean>(false);

  /**
   * If button has pressed state
   */
  isPressed = input<boolean>(false);

  /**
   * If button should take full width
   */
  fullWidth = input<boolean>(false);

  @HostBinding('class')
  private get _parentClassList() {
    return `mm-button mm-button_${this.size()} mm-button_${this.mmType()}`;
  }
}
