import { CommonModule, IMAGE_CONFIG } from '@angular/common';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { provideFilmsStore } from '@mm/shared/films/store';
import { provideRootStore } from '@mm/shared/store';
import { uiReducer } from '@mm/shared/reducers';
import { authInterceptor } from '@mm/shared/services';
import { environment } from '@mm/environment';

import { provideFavouriteStore } from './app/favourites';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/routes';
import { provideMmTranslate } from './app/shared/i18n/lib/mm-translate.provider';
import { provideAuthStore } from './app/shared/auth/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideFilmsStore(),
    provideRootStore(),
    provideFavouriteStore(),
    provideAuthStore(),
    provideRouter(appRoutes),
    provideMmTranslate(),
    importProvidersFrom([
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      ToastrModule.forRoot({
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        timeOut: 3000,
        toastClass: 'mm-toast',
      }),
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
      },
    },
    provideStore({
      ui: uiReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: false,
    }),
    provideAnimationsAsync(),
  ],
}).catch(err => console.error(err));
