import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Operario } from '../../models/operario.model';

import swal from 'sweetalert';

@Injectable()
export class OperarioService {

  totalOperarios: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarOperarios() {

    let url = URL_SERVICIOS + '/operario';

    return this.http.get( url )
              .map( (resp: any) => {

                this.totalOperarios = resp.total;
                return resp.operarios;
              });

  }

  cargarOperario( id: string ) {

    let url = URL_SERVICIOS + '/operario/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.operario );

  }

  buscarOperarios( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/operarios/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.operarios );

  }

  borrarOperario( id: string ) {

    let url = URL_SERVICIOS + '/operario/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Operario Borrado', 'Operario borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarOperario( operario: Operario ) {

    let url = URL_SERVICIOS + '/operario';

    if ( operario._id ) {
      // actualizando
      url += '/' + operario._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, operario )
                .map( (resp: any) => {
                  swal('Operario Actualizado', operario.nombre, 'success');
                  return resp.operario;

                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, operario )
              .map( (resp: any) => {
                swal('Operario Creado', operario.nombre, 'success');
                return resp.operario;
              });
    }




  }

}
