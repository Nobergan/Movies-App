import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { map, Observable } from 'rxjs';

export enum CommonMediaQueries {
  XS = 320,
  SM = 375,
  MD = 768,
  XL = 1280,
  XXL = 1921,
}

@Injectable({
  providedIn: 'root',
})
export class MediaScreenService {
  private _breakpointObserver = inject(BreakpointObserver);

  mediaMatcher = (breakpoint: CommonMediaQueries | number): Observable<boolean> =>
    this._breakpointObserver.observe(`(min-width: ${breakpoint}px)`).pipe(map(({ matches }: BreakpointState) => matches));

  isMatched = (breakpoint: CommonMediaQueries | number): boolean => this._breakpointObserver.isMatched(`(min-width: ${breakpoint}px)`);
}
