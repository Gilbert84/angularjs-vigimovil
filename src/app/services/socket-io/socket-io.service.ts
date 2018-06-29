import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'; 
import { promise } from 'protractor';

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

  public server={
    online:false,
    mensaje:''
  };

  constructor( public io: Socket ) {
    this.io.on('connect',()=>{
      //console.log('conectado');
      this.server={
        online:true,
        mensaje:'En linea'
      }

    });
    this.io.on('disconnect',()=>{
      //console.log('desconectado');
      this.server={
        online:false,
        mensaje:'Fuera de linea'
      }
    });
    
  }

  //enviar informacion
  
  enviarEvento(audiencia:string,msg?: object) {
    return new Promise((resolve,reject)=>{
      this.io.emit(audiencia, msg, ( resp: any ) => {
        resolve(resp);
      });
    });
  }
  

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

  observarInfo(evento:string) {
    return this.io.fromEvent<any>(evento)
        .map(data =>{
          return data; 
        });
  }
    
  close() {
      this.io.disconnect();
  }



}
