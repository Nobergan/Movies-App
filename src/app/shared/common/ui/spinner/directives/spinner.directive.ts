import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { SpinnerComponent } from '../spinner.component';

/**
 * Directive to replace view with an inline spinner
 */
@Directive({
  selector: '[uiSpinner]',
})
export class SpinnerDirective {
  /**
   * Unset by default, this forces it to evaluate upon first render.
   */
  private _isSpinning: boolean = null;

  private _templateRef = inject(TemplateRef<any>);
  private _viewContainer = inject(ViewContainerRef);

  @Input() set uiSpinner(condition: boolean) {
    if (condition !== this._isSpinning) {
      this._isSpinning = null;
      this._viewContainer.clear();
      this._isSpinning = condition;

      if (condition) {
        this._addSpinner();
      } else {
        this._viewContainer.createEmbeddedView(this._templateRef);
      }
    }
  }

  private _addSpinner() {
    const textNode = document.createTextNode('');
    const { instance } = this._viewContainer.createComponent(SpinnerComponent, {
      projectableNodes: [[textNode]], // Передаємо порожній текстовий вузол
    });
  }
}
