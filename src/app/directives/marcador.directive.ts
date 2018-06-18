import { Directive ,ElementRef , HostListener } from '@angular/core';

@Directive({
  selector: '[appMarcador]'
})
export class MarcadorDirective {

  constructor(
    private element:ElementRef
  ) { }


  @HostListener('mouseenter') mouseEntro(){
    this.element.nativeElement.style.backgroudColor ="blue";
  }

}
