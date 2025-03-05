import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

export const authInterceptor: HttpInterceptorFn = (request, next): Observable<HttpEvent<any>> => {
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get('accessToken');

  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(clonedRequest);
};
