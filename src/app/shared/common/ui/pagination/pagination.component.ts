import { Component, input, output, ViewEncapsulation } from '@angular/core';

import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'mm-pagination',
    imports: [NgxPaginationModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent {
  maxSize = input<number>();

  pageChange = output<number>();

  previous: string;
  next: string;
}
