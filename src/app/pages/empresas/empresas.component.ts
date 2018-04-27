import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styles: []
})
export class EmpresasComponent implements OnInit {

  empresas: Empresa[] = [];

  constructor(
    public _empresaService: EmpresaService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarEmpresas();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarEmpresas() );
  }

  buscarEmpresa( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarEmpresas();
      return;
    }

    this._empresaService.buscarEmpresa( termino )
            .subscribe( empresas => this.empresas = empresas );

  }

  cargarEmpresas() {
    this._empresaService.cargarEmpresas()
            .subscribe( empresas => this.empresas = empresas );
  }


  guardarEmpresa( empresa: Empresa) {

    this._empresaService.actualizarEmpresa( empresa )
            .subscribe();

  }

  borrarEmpresa( empresa: Empresa ) {

    this._empresaService.borrarEmpresa( empresa._id )
            .subscribe( () =>  this.cargarEmpresas() );

  }

  crearEmpresa() {

    swal({
      title: 'Crear empresa',
      text: 'Ingrese el nombre del empresa',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._empresaService.crearEmpresa( valor )
              .subscribe( () => this.cargarEmpresas() );

    });

  }

  actualizarImagen( empresa: Empresa ) {

    this._modalUploadService.mostrarModal( 'empresas', empresa._id );

  }

}
