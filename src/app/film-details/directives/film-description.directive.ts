import { Directive, ElementRef, HostListener, inject, input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mmDescription]',
  exportAs: 'mmInteractiveContent',
})
export class FilmDescriptionDirective implements OnInit, OnChanges {
  mmDescription = input<string>();

  isExpanded: boolean = false;
  isVisibleMoreButton: boolean;

  private _element = inject(ElementRef);
  private _renderer = inject(Renderer2);

  ngOnInit(): void {
    this.updateDescription();
  }

  ngOnChanges(): void {
    this.updateDescription();
  }

  @HostListener('click')
  onClick(): void {
    if (this._element.nativeElement.classList.contains('film-details__description-more')) {
      this.toggleDescription();
    }
  }

  updateDescription(): void {
    const description = this.mmDescription();

    description.length > 250 ? (this.isVisibleMoreButton = true) : (this.isVisibleMoreButton = false);

    if (description) {
      let displayedDescription: string;

      if (this.isExpanded || description.length <= 250) {
        displayedDescription = description;
      } else {
        displayedDescription = description.slice(0, 250) + '...';
      }

      this._renderer.setProperty(this._element.nativeElement, 'textContent', displayedDescription);
    }
  }

  toggleDescription(): void {
    this.isExpanded = !this.isExpanded;
    this.updateDescription();
  }
}
