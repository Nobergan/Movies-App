import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  template: `
    <div class="tooltip-content">
      <ng-content></ng-content>
    </div>

    @if (tooltip()) {
      <div class="tooltip" [attr.data-position]="position()">{{ tooltip() }}</div>
    }
  `,
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  tooltip = input<string>();
  position = input<'top' | 'bottom' | 'right' | 'left'>('bottom');
}
