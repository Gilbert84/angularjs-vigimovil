import {Directive, ElementRef, HostListener , OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';


// declare var $: any;
// declare var jQuery: any;
// declare function init_plugin_clockpicker();

@Directive({
   selector: '[appClockPicker]'
})
export class ClockPickerDirective implements OnInit {

  //@Input() hora: any;

  //valor: Observable<any>;
   constructor(private el: ElementRef) {
     //console.log('directiva');
   }

   ngOnInit(): void {
    //init_plugin_clockpicker();



    //this.valor = new Observable(observar => {
    //   $(this.el.nativeElement).clockpicker({
    //     placement: 'top',
    //     align: 'left',
    //     autoclose: true,
    //     'default': 'now',
    //     donetext: 'Done'
    //   }).find('input').change(function() {
    //       observar.next(this.value);
    //   });
    // });

    // this.valor.subscribe(valor => {
    //   console.log(valor);
    //   this.hora = this.valor;
    // });

   }

  
}
