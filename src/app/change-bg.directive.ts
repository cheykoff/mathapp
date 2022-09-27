import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  @Input('appChangeBg') isCorrect: boolean = false;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('click') answer() {
    this.render.setStyle(
      this.el.nativeElement,
      'background-color',
      this.isCorrect ? 'green' : 'red'
    );
  }
}
