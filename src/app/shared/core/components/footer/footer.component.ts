import { Component, computed, inject, input } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { filter } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@mm/shared/ui/icon';
import { ButtonDirective } from '@mm/shared/ui/button';
import { TooltipComponent } from '@mm/shared/ui/tooltip';
import texts from '@mm/texts';

@Component({
  selector: 'mm-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [IconComponent, RouterLink, ButtonDirective, TooltipComponent, TranslateModule, NgOptimizedImage, RouterLinkActive],
})
export class FooterComponent {
  protected router = inject(Router);

  footerContent = texts.footer;

  isLoggedIn = input<boolean>();

  currentRoute = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => (event as NavigationEnd).url),
    ),
    { initialValue: this.router.url },
  );

  activeMediaRoute = computed<'all' | 'now-playing'>(() => {
    const currentUrl = this.currentRoute();
    if (currentUrl.includes('now-playing')) {
      return 'now-playing';
    }
    return 'all';
  });
}
