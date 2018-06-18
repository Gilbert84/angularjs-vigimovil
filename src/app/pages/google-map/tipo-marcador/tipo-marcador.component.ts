import { Component, OnInit } from '@angular/core';
import { TipoMarcador } from '../../../models/google-map/tipo-marcador.model';
import { TipoMarcadorService } from '../../../services/service.index';
import { ModalUploadService } from '../../../components/service.components.index';

declare var swal: any;

@Component({
  selector: 'app-tipo-marcador',
  templateUrl: './tipo-marcador.component.html',
  styleUrls: []
})
export class TipoMarcadorComponent implements OnInit {

  tipoMarcadores: TipoMarcador[] = [];

  constructor(
    public _tipoMarcadorService: TipoMarcadorService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargar();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargar() );
  }

  buscar( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargar();
      return;
    }

    this._tipoMarcadorService.buscar( termino )
            .subscribe( tipoMarcadores => this.tipoMarcadores = tipoMarcadores );

  }

  cargar() {
    this._tipoMarcadorService.cargar()
            .subscribe( tipoMarcadores => this.tipoMarcadores = tipoMarcadores );
  }


  guardar( tipoMarcador: TipoMarcador) {

    this._tipoMarcadorService.actualizar( tipoMarcador )
            .subscribe();

  }

  borrar( tipoMarcador: TipoMarcador ) {

    this._tipoMarcadorService.borrar( tipoMarcador._id )
            .subscribe( () =>  this.cargar() );

  }

  crear() {

    swal({
      title: 'Crear tipo de marcador',
      text: 'Ingrese el nombre del tipo de marcador',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._tipoMarcadorService.crear( valor )
              .subscribe( (resp) => {
                this.cargar() 
                //console.log(resp);
              });

    });

  }

  actualizarImagen( tipoMarcador: TipoMarcador ) {

    this._modalUploadService.mostrarModal( 'tipo-marcadores', tipoMarcador._id );

  }
}
