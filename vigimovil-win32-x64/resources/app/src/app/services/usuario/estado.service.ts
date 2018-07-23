import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Estado } from '../../models/estado.model';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert';

@Injectable()
export class EstadoService {

  totalEstados: number = 0;
  estados: Estado []= [];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargar() {

    let url = URL_SERVICIOS + '/estado';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalEstados = resp.total;
                this.estados = resp.estados;
                return resp.estados;
              });

  }

  obtener( id: string ) {

    let url = URL_SERVICIOS + '/estado/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.estado );

  }

  borrar( id: string ) {

    let url = URL_SERVICIOS + '/estado/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Estado Borrada', 'Eliminado correctamente', 'success') );

  }

  crear( nombre: string ) {

    let url = URL_SERVICIOS + '/estado';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) =>{
                return resp.estado;
              }  )
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });;

  }

  buscar( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/estado/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.estados );

  }

  actualizar( estado: Estado ) {

    let url = URL_SERVICIOS + '/estado/' + estado._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, estado )
              .map( (resp: any) => {

                swal('Estado Actualiado', estado.nombre, 'success');
                return resp.estado;
              });

  }

}
