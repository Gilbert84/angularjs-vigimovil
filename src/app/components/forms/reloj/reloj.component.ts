import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var $: any;
declare var jQuery: any;
declare function init_plugin_clockpicker();

@Component({
  selector: 'app-reloj',
  templateUrl: './reloj.component.html',
  styleUrls: ['./reloj.component.css']
})
export class RelojComponent implements OnInit {

  @Output() cambioValor: EventEmitter<string> = new EventEmitter();

  reloj: Observable<any>;

  constructor() { }

  ngOnInit() {
    init_plugin_clockpicker();
    this.reloj = new Observable(observar => {
      $('.clockpicker').clockpicker({
        placement: 'top',
        align: 'left',
        autoclose: true,
        'default': 'now',
        donetext: 'Done'
      }).find('input').change(function() {
          observar.next(this.value);
      });
    });

    this.reloj.subscribe(hora => {
      console.log(hora);
      this.cambioValor.emit(hora);
    });

  }

}
