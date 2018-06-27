import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/service.index';
import { ModalUploadService } from '../../../components/service.components.index';

declare var swal: any;

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: []
})
export class EstadosComponent implements OnInit {

  estados: Estado[] = [];

  constructor(
    public _estadoService: EstadoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargar();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargar() );
  }

  cargar() {
    this._estadoService.cargar()
            .subscribe( estados => this.estados = estados );
  }

  crear() {

    swal({
      title: 'Crear estado',
      text: 'Ingrese el nombre del estado',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._estadoService.crear( valor )
              .subscribe( (resp) => {
                this.cargar() 
                //console.log(resp);
              });

    });

  }


  guardar( estado: Estado) {

    this._estadoService.actualizar( estado )
            .subscribe();

  }

  borrar( estado: Estado ) {

    this._estadoService.borrar( estado._id )
            .subscribe( () =>  this.cargar() );

  }

  buscar( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargar();
      return;
    }

    this._estadoService.buscar( termino )
            .subscribe( estados => this.estados = estados );

  }
}
