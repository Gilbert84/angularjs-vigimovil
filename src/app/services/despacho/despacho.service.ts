import { Injectable } from '@angular/core';
import { SocketIoService } from '../socket-io/socket-io.service';


interface Despacho{
    actual?:any
}

@Injectable()
export class DespachoService {

    despacho:Despacho={};

    constructor(
            private io:SocketIoService
        ){
    }

    siguiente(){

        if(this.io.server.online){
            this.io.enviarEvento('siguienteTiket',{})
                .then((resp)=>{
                    //console.log('server:',resp);
                    this.despacho.actual=resp;
                });
        }
    }

    estadoActual(){
        this.io.observarInfo('estadoActual')
            .subscribe((resp)=>{
                this.despacho=resp;
                //console.log('estado actual:', this.despacho);
            })
    }



}
