import { Component, OnInit } from '@angular/core';

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


  constructor( private io: SocketIoService ) { }

  ngOnInit() {
    console.log('dashboard');

    //this.io.sendMessage( this.usuario );

    // this.socket
    //     .getMessage()
    //     .subscribe(msg => {
    //       console.log('msg:', msg);
    //     });
  }

  sendMsg() {
    this.io.sendMessageUser(this.usuario);
    //this.io.sendMessage(this.canalDispositivo,this.dispositivo);
  }



}
