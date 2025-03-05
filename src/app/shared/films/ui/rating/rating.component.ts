import { Component, input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { IconComponent } from '@mm/shared/ui/icon';

@Component({
  selector: 'mm-rating',
  imports: [CommonModule, IconComponent, DecimalPipe],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  rating = input<number>();
}
