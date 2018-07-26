import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/url-servicios.config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      if(tipo==='tipo-marcadores') {
        return url + '/tipo-marcadores/xxx';
      }
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'operario':
        url += '/operarios/' + img;
      break;

      case 'empresa':
         url += '/empresas/' + img;
      break;

      case 'vehiculo':
        url += '/vehiculos/' + img;
      break;

      case 'dispositivo':
        url += '/dispositivos/' + img;
      break;

      case 'tipo-marcadores':
        url += '/tipo-marcadores/' + img;
      break;

      default:
        //console.log('tipo de imagen no existe, usuario, operarios, empresas, dispositivos,tipo-marcadores');
        url += '/usurios/xxx';
    }

    return url;
  }

}
