import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Empresa } from '../../models/empresa.model';

import swal from 'sweetalert';

@Injectable()
export class EmpresaService {

  totalEmpresas: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarEmpresas() {

    let url = URL_SERVICIOS + '/empresa';
    return this.http.get( url )
              .map( (resp: any) => {
                this.totalEmpresas = resp.total;
                return resp.empresas;
              });

  }

  obtenerEmpresa( id: string ) {

    let url = URL_SERVICIOS + '/empresa/' + id;
    return this.http.get( url )
                .map( (resp: any) => resp.empresa );

  }

  borrarEmpresa( id: string ) {

    let url = URL_SERVICIOS + '/empresa/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
                .map( resp => swal('Empresa Borrada', 'Eliminado correctamente', 'success') );

  }

  crearEmpresa( nombre: string ) {

    let url = URL_SERVICIOS + '/empresa';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.empresa );

  }

  buscarEmpresa( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/empresas/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.empresas );

  }

  actualizarEmpresa( empresa: Empresa ) {

    let url = URL_SERVICIOS + '/empresa/' + empresa._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, empresa )
              .map( (resp: any) => {

                swal('Empresa Actualiada', empresa.nombre, 'success');
                return resp.empresa;
              });

  }

}
