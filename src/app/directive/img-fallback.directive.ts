import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[imgFallback]'
})
export class ImgFallbackDirective {

  placeholder = 'http://placehold.it/200x200';

  constructor(private elementRef: ElementRef) {
    this.setupFallback();
  }


  private setupFallback(): void {
    this.elementRef.nativeElement.onerror = () => {
      this.elementRef.nativeElement.src = this.placeholder;
    };
  }

}



