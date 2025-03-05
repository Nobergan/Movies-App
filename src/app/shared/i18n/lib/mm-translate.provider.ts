import { EnvironmentProviders, importProvidersFrom, Injector, makeEnvironmentProviders } from '@angular/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { translateLoaderFactory } from './utils/loader';

export const provideMmTranslate = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: translateLoaderFactory,
          deps: [Injector],
        },
        extend: true,
      }),
    ]),
  ]);
