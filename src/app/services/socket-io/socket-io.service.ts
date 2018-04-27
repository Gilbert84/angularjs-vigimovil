import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class SocketIoService {

  usuario = {
    nombre: 'angular',
    sala: 'desarrollo'
  };

  dispositivo = {
    nombre: 'tablet',
    ruta: 'san-feliz'
  };

  constructor( private io: Socket ) {
    console.log('constructor socket');
    
  }

  //enviar informacion

  sendMessageUser(msg: object) {
        this.io.emit('entrarChat', msg, ( resp: any ) => {
          console.log('Usuarios : ', resp);
        });
  }

  sendMessageDev(msg: object) {
    this.io.emit('entrarDev', msg, ( resp: any ) => {
      console.log('Dispositivos : ', resp);
    });
}
 
  //escuchar informacion  

  getMessage() {
        return this.io
            .fromEvent<any>('crearMensaje')
            .map(data => data );
  }
    
  close() {
      this.io.disconnect();
  }


}
