import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, fetchSignInMethodsForEmail, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { from, map, Observable, switchMap } from 'rxjs';
import { environment } from '@mm/environment';
import { CurrentUser } from '@mm/shared/state';
import { AuthRequest, AuthResponse, ForgotPasswordRequest, ForgotPasswordResponse } from '@mm/auth/models';

@Injectable()
export class HttpAuthProvider {
  firebaseApiKey = environment.firebaseConfig.apiKey;
  firebaseRegisterAPI = environment.firebaseRegisterAPI;
  firebaseLoginAPI = environment.firebaseLoginAPI;
  firebaseForgotPasswordAPI = environment.firebaseForgotPasswordAPI;
  firebaseGetCurrentUserAPI = environment.firebaseGetCurrentUserAPI;

  private _httpClient = inject(HttpClient);
  private auth = inject(Auth);

  getCurrentUser(token: string): Observable<CurrentUser | null> {
    return this._httpClient.post(this.firebaseGetCurrentUserAPI + `${this.firebaseApiKey}`, { idToken: token }).pipe(
      map((response: any) => {
        const currentUser: CurrentUser = {
          localId: response.users[0].localId,
          email: response.users[0].email,
          displayName: response.users[0].displayName,
          photoUrl: response.users[0].photoUrl,
        };
        return currentUser;
      }),
    );
  }

  register(data: AuthRequest): Observable<CurrentUser> {
    return this._httpClient.post<AuthResponse>(this.firebaseRegisterAPI + `${this.firebaseApiKey}`, data);
  }

  authWithGoogle(): Observable<CurrentUser> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(userCredential => {
        const user = userCredential.user;
        return from(user.getIdToken()).pipe(
          map((idToken: string) => ({
            idToken,
            email: user.email,
            refreshToken: user.refreshToken,
            localId: user.uid,
          })),
        );
      }),
    );
  }

  login(data: AuthRequest): Observable<CurrentUser> {
    return this._httpClient.post<AuthResponse>(this.firebaseLoginAPI + `${this.firebaseApiKey}`, data);
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    const headers = {
      'X-Firebase-Locale': 'uk_UA',
    };

    return this._httpClient.post<ForgotPasswordResponse>(
      this.firebaseForgotPasswordAPI + `${this.firebaseApiKey}`,
      {
        ...data,
        requestType: 'PASSWORD_RESET',
      },
      { headers },
    );
  }

  checkIfEmailExists(email: string): Observable<boolean> {
    return from(fetchSignInMethodsForEmail(this.auth, email)).pipe(map((signInMethods: string[]) => signInMethods.length > 0));
  }
}
