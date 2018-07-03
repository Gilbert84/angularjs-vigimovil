import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Vehiculo } from '../../models/vehiculo.model';

import swal from 'sweetalert';

@Injectable()
export class VehiculoService {

  totalVehiculos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarVehiculos(desde: number = 0) {

    let url = URL_SERVICIOS + '/vehiculo?desde=' + desde;

    return this.http.get( url )
              .map( (resp: any) => {
                this.totalVehiculos = resp.total;
                return resp.vehiculos;
              });

  }

  cargarVehiculo( id: string ) {

    let url = URL_SERVICIOS + '/vehiculo/' + id;

    return this.http.get( url )
              .map( (resp: any) => resp.vehiculo );

  }

  buscarVehiculos( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/vehiculos/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.vehiculos );

  }

  borrarVehiculo( id: string ) {

    let url = URL_SERVICIOS + '/vehiculo/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal( 'Vehiculo Borrado', 'Vehiculo borrado correctamente', 'success' );
                return resp;
              });

  }

  guardarVehiculo( vehiculo: Vehiculo ) {

    let url = URL_SERVICIOS + '/vehiculo';
    if ( vehiculo._id ) {
      // actualizando
      url += '/' + vehiculo._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, vehiculo )
                .map( (resp: any) => {
                  swal('Vehiculo Actualizado', vehiculo.placa, 'success');
                  return resp.vehiculo;

                })
                .catch( err => {
                  swal( err.error.mensaje, err.error.errors.message, 'error' );
                  return err;
                });
      

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, vehiculo )
              .map( (resp: any) => {
                swal('Vehiculo Creado', vehiculo.placa, 'success');
                return resp.vehiculo;
              })
              .catch( err => {
                swal( err.error.mensaje, err.error.errors.message, 'error' );
                return err;
              });
    }


  }

}
