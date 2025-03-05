import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollBackground]',
})
export class ScrollBackgroundDirective {
  private readonly header: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.header = this.el.nativeElement;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    const alpha = Math.min(scrollPosition / 200, 1); // 50 is the scroll threshold, adjust as needed

    const backgroundColor = `rgba(5, 6, 9, ${alpha})`;
    this.renderer.setStyle(this.header, 'background-color', backgroundColor);
  }
}
