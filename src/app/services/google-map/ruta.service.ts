import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Ruta } from '../../class/google-maps.class';

import swal from 'sweetalert';

@Injectable()
export class RutaService {

  totalRutas: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarRutas(desde: number = 0) {

    let url = URL_SERVICIOS + '/google-map/ruta?desde=' + desde;

    return this.http.get( url )
              .map( (resp: any) => {
                this.totalRutas = resp.total;
                return resp.rutas;
              });

  }

  cargarRuta( id: string ) {

    let url = URL_SERVICIOS + '/google-map/ruta/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.ruta );

  }

  buscarRutas( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/rutas/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.rutas );

  }

  borrarRuta( id: string ) {

    let url = URL_SERVICIOS + '/google-map/ruta/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'ruta Borrada', 'ruta borrada correctamente', 'success' );
                return resp;
              });

  }

  guardarRuta( ruta: Ruta ) {

    let url = URL_SERVICIOS + '/google-map/ruta';
    if ( ruta._id ) {
      // actualizando
      url += '/' + ruta._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, ruta )
                .map( (resp: any) => {
                  swal('Ruta Actualizada', ruta.nombre, 'success');
                  return resp.ruta;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, ruta )
              .map( (resp: any) => {
                swal('Ruta Creada', ruta.nombre, 'success');
                return resp.ruta;
              });
    }


  }

}
