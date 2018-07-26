import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Viaje } from '../../models/despacho/despacho.model';

import swal from 'sweetalert';
import { SocketIoService } from '../socket-io/socket-io.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ViajeService {

  total: number = 0;

  confirmacionAsignacionViaje: Subscription = new Subscription();

  

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    private socketIoService: SocketIoService,
    private snackBar:MatSnackBar
  ) { }

  eventoAsignarNuevoViaje(mensaje) {
    this.socketIoService.enviarEvento('asignarNuevoViaje', mensaje).then((resp) => {
      //('resp', resp);
    });
  }

  observarConfirmacionAsignacion() {
      this.confirmacionAsignacionViaje =this.socketIoService.observar('confirmacionAsignacion').subscribe((res) => {
        //console.log(res);
        this.snackBar.open(
          'Dispositivo dice :' + 'despacho recibido',
          'Aceptar',
          { duration: 10000 }
        );        
      });   

  }

  cargar(desde: number = 0) {

    let url = URL_SERVICIOS + '/despacho/viaje?desde=' + desde;

    return this.http.get( url )
              .map( (resp: any) => {
                this.total = resp.total;
                return resp.viajes;
              });

  }

  obtener( id: string ) {

    let url = URL_SERVICIOS + '/despacho/viaje/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.viaje );

  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/viaje/' + termino;
    return this.http.get( url )
                .map( (resp: any) => {
                  return resp.viajes; 
                });

  }

  borrar( id: string ) {

    let url = URL_SERVICIOS + '/despacho/viaje/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'viaje Borrado', 'viaje borrada correctamente', 'success' );
                return resp;
              });

  }

  guardar( viaje: Viaje ) {

    let url = URL_SERVICIOS + '/despacho/viaje';
    if ( viaje._id ) {
      // actualizando
      url += '/' + viaje._id;
      url += '?token=' + this._usuarioService.token;
      viaje.estado.codigo = 1;
      viaje.estado.mensaje = 'Actualizando viaje';

      return this.http.put( url, viaje )
                .map( (resp: any) => {
                  swal('Viaje Actualizado', viaje.ruta, 'success');
                  return resp.viaje;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, viaje )
              .map( (resp: any) => {
                swal('Viaje Creado', viaje.ruta, 'success');
                return resp.viaje;
              })
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return err;
              });
    }


  }

}
