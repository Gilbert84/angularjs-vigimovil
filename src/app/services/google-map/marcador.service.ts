import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs/Observable';
import swal from 'sweetalert';

import { MarcadorRef } from '../../interfaces/google-map.interface';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';


@Injectable()
export class MarcadorService {

  totalMarcadores: number = 0;
  marcadores:MarcadorRef[]=[];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargar() {

    let url = URL_SERVICIOS + '/google-map/marcador';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalMarcadores = resp.total;
                this.marcadores=resp.marcadores;
                return resp.marcadores;
              });

  }

  obtener( id: string ) {

    let url = URL_SERVICIOS + '/google-map/marcador/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.tipoMarcador );

  }

  borrar( id: string ) {

    let url = URL_SERVICIOS + '/google-map/marcador/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Marcador Borrado', 'Eliminado correctamente', 'success') );

  }

  crear( marcador: MarcadorRef ) {

    let url = URL_SERVICIOS + '/google-map/marcador';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, marcador )
              .map( (resp: any) =>{
                swal('Marcador Creado', marcador.nombre, 'success');
                return resp.marcador;
              }  )
              .catch( err => {
                console.log(err);
                swal( err.error.mensaje, err.error.errors.errmsg, 'error' );
                return Observable.throw( err );
              });;

  }

  buscar( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/marcador/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.tipoMarcadores );

  }

  actualizar( marcador: MarcadorRef ) {

    let url = URL_SERVICIOS + '/google-map/marcador/' + marcador._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, marcador )
              .map( (resp: any) => {

                swal('Marcador Actualiado', marcador.nombre, 'success');
                return resp.marcador;
              });

  }
}
