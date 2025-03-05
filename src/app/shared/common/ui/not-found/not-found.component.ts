import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  /**
   * Not found description text
   */
  text = input<string>();
}
