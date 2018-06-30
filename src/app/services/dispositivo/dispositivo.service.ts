import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { UsuarioService } from '../usuario/usuario.service';
import { Dispositivo } from '../../models/dispositivo.model';

@Injectable()
export class DispositivoService {
  public totalDispositivos: number = 0;

  constructor(
    public http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  obtenerDispositivo(id: string) {
    let url = URL_SERVICIOS + '/dispositivo/' + id;
    return this.http.get(url).map((resp: any) => resp.dispositivo);
  }

  cargarDispositivos(desde: number = 0) {
    let url = URL_SERVICIOS + '/dispositivo?desde=' + desde;

    return this.http.get(url).map((resp: any) => {
      this.totalDispositivos = resp.total;
      return resp;
    });
  }

  cargarDispositivo(id: string) {
    let url = URL_SERVICIOS + '/dispositivo/' + id;

    return this.http.get(url).map((resp: any) => resp.dispositivo);
  }

  buscarDispositivo(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/dispositivos/' + termino;
    return this.http.get(url).map((resp: any) => {
      return resp.dispositivos;
    });
  }

  borrarDispositivo(id: string) {
    let url = URL_SERVICIOS + '/dispositivo/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url).map(resp => {
      //console.log('dispositivo actualizado', resp);
      swal(
        'Dispositivo Borrado',
        'Dispositivo borrado correctamente',
        'success'
      );
      return resp;
    });
  }

  actualizarDispositivo(dispositivo: Dispositivo) {
    let url = URL_SERVICIOS + '/dispositivo';

    if (dispositivo._id) {
      // actualizando
      url += '/' + dispositivo._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, dispositivo).map((resp: any) => {
        swal('Dispositivo Actualizado', dispositivo.nombre, 'success');
        return resp.dispositivo;
      });
    }
  }
}
