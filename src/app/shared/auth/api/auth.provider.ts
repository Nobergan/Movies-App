import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

import { Observable } from 'rxjs';
import { CurrentUser } from '@mm/shared/state';
import { AuthRequest, ForgotPasswordRequest, ForgotPasswordResponse } from '@mm/auth/models';

import { HttpAuthProvider } from './http-auth.provider';

export interface FilmDetailsProvider {
  getCurrentUser(token: string): Observable<CurrentUser | null>;
  register(data: AuthRequest): Observable<CurrentUser>;
  login(data: AuthRequest): Observable<CurrentUser>;
  authWithGoogle(): Observable<CurrentUser>;
  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;
  checkIfEmailExists(email: string): Observable<boolean>;
}

export const AuthProviderToken: InjectionToken<FilmDetailsProvider> = new InjectionToken('AuthProvider');

export const provideAuthApi = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: AuthProviderToken,
      useClass: HttpAuthProvider,
    },
  ]);
