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
  @Input() isCorrect: boolean = false;
  constructor(private el: ElementRef, private render: Renderer2) {}
  @HostListener('click') answer() {
    if (this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'background-color', 'green');
    } else {
      this.render.setStyle(this.el.nativeElement, 'background-color', 'red');
    }
  }
}
