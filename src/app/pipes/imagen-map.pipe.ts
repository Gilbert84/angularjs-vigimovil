import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/url-servicios.config';

@Pipe({
  name: 'imagen-map'
})
export class ImagenMapPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/tipo-marcadores/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {

      case 'tipo-marcadores':
        url += '/tipo-marcadores/' + img;
      break;

      default:
        //console.log('tipo de imagen no existe, usuario, operarios, empresas, dispositivos,tipo-marcadores');
        url += '/tipo-marcadores/xxx';
    }

    return url;
  }


}
