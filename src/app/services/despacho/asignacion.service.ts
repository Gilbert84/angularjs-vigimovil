import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Asignacion } from '../../models/despacho/despacho.model';

import swal from 'sweetalert';

@Injectable()
export class AsignacionService {

    total: number = 0;

    constructor(
      public http: HttpClient,
      public _usuarioService: UsuarioService
    ) { }
  
    cargar(desde: number = 0) {
  
      let url = URL_SERVICIOS + '/despacho/asignacion?desde=' + desde;
  
      return this.http.get( url )
                .map( (resp: any) => {
                  this.total = resp.total;
                  return resp.asignaciones;
                });
  
    }
  
    obtener( id: string ) {
  
      let url = URL_SERVICIOS + '/despacho/asignacion/' + id;
  
      return this.http.get( url )
                .map( (resp: any) => resp.asignacion );
  
    }
  
    buscar( termino: string ) {
  
      let url = URL_SERVICIOS + '/busqueda/coleccion/asignacion/' + termino;
      return this.http.get( url )
                  .map( (resp: any) => {
                    return resp.asignaciones; 
                  });
  
    }
  
    borrar( id: string ) {
  
      let url = URL_SERVICIOS + '/despacho/asignacion/' + id;
      url += '?token=' + this._usuarioService.token;
  
      return this.http.delete( url )
                .map( resp => {
                  swal( 'asignacion Borrada', 'asignacion borrada correctamente', 'success' );
                  return resp;
                });
  
    }
  
    guardar( asignacion: Asignacion ) {
  
      let url = URL_SERVICIOS + '/despacho/asignacion';
      if ( asignacion._id ) {
        // actualizando
        url += '/' + asignacion._id;
        url += '?token=' + this._usuarioService.token;
  
        return this.http.put( url, asignacion )
                  .map( (resp: any) => {
                    swal('Asignacion Actualizada', resp.asignacion.fechaHora, 'success');
                    return resp.asignacion;
  
                  });
  
      }else {
        // creando
        url += '?token=' + this._usuarioService.token;
        return this.http.post( url, asignacion )
                .map( (resp: any) => {
                  swal('Asignacion Creada', asignacion.fechaHora.toLocaleDateString(), 'success');
                  return resp.asignacion;
                });
      }
  
  
    }

}
