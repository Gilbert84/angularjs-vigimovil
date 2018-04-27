import { Component, OnInit, OnDestroy } from '@angular/core';

import { SocketIoService } from '../../services/socket-io/socket-io.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  usuario = {
    nombre: 'angular',
    sala: 'desarrollo'
  };

  dispositivo = {
    nombre: 'tablet',
    ruta: 'san-feliz'
  };


  constructor( private io: SocketIoService ) { 
    

  }

  ngOnInit() {
    this.io
    .getMessage()
    .subscribe(msg => {
      console.log('servidor:', msg);
    });
  }


}
