import { LetDirective } from './let.directive';

export interface PuContextWithImplicit<T> {
  $implicit: T;
}

/**
 * @internal
 */
export class LetContext<T> implements PuContextWithImplicit<T> {
  constructor(
    private readonly _internalDirectiveInstance: LetDirective<T>,
  ) {}

  get $implicit(): T {
    return this._internalDirectiveInstance.puLet;
  }

  get puLet(): T {
    return this._internalDirectiveInstance.puLet;
  }
}
