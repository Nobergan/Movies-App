import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'mm-genres',
  imports: [TitleCasePipe],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss',
})
export class GenresComponent {
  genres = input<string[]>();
}
