import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Role } from '../../models/role.model';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert';

@Injectable()
export class RoleService {

  totalRoles: number = 0;
  roles: Role []= [];

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargar() {

    let url = URL_SERVICIOS + '/role';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalRoles = resp.total;
                this.roles = resp.roles;
                return resp.roles;
              });

  }

  obtener( id: string ) {

    let url = URL_SERVICIOS + '/role/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.role );

  }

  borrar( id: string ) {

    let url = URL_SERVICIOS + '/role/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('TipoMarcador Borrada', 'Eliminado correctamente', 'success') );

  }

  crear( nombre: string ) {

    let url = URL_SERVICIOS + '/role';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) =>{
                return resp.role;
              }  )
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return Observable.throw( err );
              });;

  }

  buscar( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/roles/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.roles );

  }

  actualizar( role: Role ) {

    let url = URL_SERVICIOS + '/role/' + role._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, role )
              .map( (resp: any) => {

                swal('role Actualiado', role.nombre, 'success');
                return resp.role;
              });

  }

}
