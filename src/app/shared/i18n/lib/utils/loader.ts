import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function translateLoaderFactory(injector: Injector) {
  const http = injector.get(HttpClient);

  return new TranslateHttpLoader(
    http,
    './assets/texts/',
    '.json',
  );
}
