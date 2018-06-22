import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { TipoMarcador } from '../../models/google-map/tipo-marcador.model';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert';

@Injectable()
export class TipoMarcadorService {

  totalTipoMarcadores: number = 0;
  tipoMarcadores: TipoMarcador []=[];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargar() {

    let url = URL_SERVICIOS + '/google-map/tipo-marcador';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalTipoMarcadores = resp.total;
                this.tipoMarcadores = resp.tipoMarcadores;
                return resp.tipoMarcadores;
              });

  }

  obtener( id: string ) {

    let url = URL_SERVICIOS + '/google-map/tipo-marcador/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.tipoMarcador );

  }

  borrar( id: string ) {

    let url = URL_SERVICIOS + '/google-map/tipo-marcador/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('TipoMarcador Borrada', 'Eliminado correctamente', 'success') );

  }

  crear( nombre: string ) {

    let url = URL_SERVICIOS + '/google-map/tipo-marcador';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) =>{
                return resp.tipoMarcador;
              }  )
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });;

  }

  buscar( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/tipo-marcadores/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.tipoMarcadores );

  }

  actualizar( tipoMarcador: TipoMarcador ) {

    let url = URL_SERVICIOS + '/google-map/tipo-marcador/' + tipoMarcador._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, tipoMarcador )
              .map( (resp: any) => {

                swal('Tipo marcador Actualiado', tipoMarcador.nombre, 'success');
                return resp.tipoMarcador;
              });

  }

}
