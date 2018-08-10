import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Nacionalidad } from '../../models/nacionalidad.model';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert';

@Injectable()
export class NacionalidadService {

  totalNaciones: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarNacionalidad() {

    let url = URL_SERVICIOS + '/nacionalidad';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalNaciones = resp.total;
                return resp.nacionalidads;
              });

  }

  obtenerNacionalidad( id: string ) {

    let url = URL_SERVICIOS + '/nacionalidad/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.nacionalidad );

  }

  borrarNacionalidad( id: string ) {

    let url = URL_SERVICIOS + '/nacionalidad/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Nacionalidad Borrada', 'Eliminado correctamente', 'success') );

  }

  crearNacionalidad( nombre: string ) {

    let url = URL_SERVICIOS + '/nacionalidad';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) =>{
                return resp.nacionalidad;
              }  )
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });;

  }

  buscarNacionalidad( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/nacionalidad/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.nacionalidad );

  }

  actualizarnacionalidad( nacionalidad: Nacionalidad ) {

    let url = URL_SERVICIOS + '/nacionalidad/' + nacionalidad._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, nacionalidad )
              .map( (resp: any) => {

                swal('Nacionalidad Actualiada', nacionalidad.nombre, 'success');
                return resp.nacionalidad;
              });

  }

}
