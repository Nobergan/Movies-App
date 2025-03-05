import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { LetContext } from './let-context';

/**
 * Works like *ngIf but does not have a condition — use it to declare
 * the result of pipes calculation (i.e. async pipe)
 */
@Directive({
  selector: '[puLet]',
})
export class LetDirective<T> {
  @Input()
  puLet!: T;

  constructor(@Inject(ViewContainerRef) viewContainer: ViewContainerRef, @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }

  /**
   * Asserts the correct type of the context for the template that `PuLet` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `PuLet` structural directive renders its template with a specific context type.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ngTemplateContextGuard<T>(_dir: LetDirective<T>, _ctx: any): _ctx is LetDirective<T> {
    return true;
  }
}
