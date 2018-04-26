import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 

@Injectable()
export class SocketIoService {

  constructor( private io: Socket ) {
    console.log('constructor socket');
    
  }

  connect() {
    this.io.connect();
  }

  sendMessageUser(msg: object) {
        this.io.emit('entrarChat', msg, ( resp: any ) => {
          console.log('Usuarios conectados', resp);
        });
  }

  sendMessageDev(msg: object) {
    this.io.emit('entrarDev', msg, ( resp: any ) => {
      console.log('Usuarios conectados', resp);
    });
}
 
  getMessage() {
        return this.io
            .fromEvent<any>('message')
            .map(data => data.msg );
  }
    
  close() {
      this.io.disconnect();
  }


}
