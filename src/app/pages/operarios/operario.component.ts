import { Component, OnInit } from '@angular/core';
import { Operario } from '../../models/operario.model';
import { OperarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Empresa } from '../../models/empresa.model';
import { EmpresaService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-operario',
  templateUrl: './operario.component.html',
  styles: []
})
export class OperarioComponent implements OnInit {

  empresas: Empresa[] = [];
  operario: Operario = new Operario('', '', '', '', '');
  empresa: Empresa = new Empresa('');

  constructor(
    public _operarioService: OperarioService,
    public _empresaService: EmpresaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarOperario( id );
      }

    });

  }

  ngOnInit() {

    this._empresaService.cargarEmpresas()
          .subscribe( empresas => this.empresas = empresas );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.operario.img = resp.operario.img;
          });

  }

  cargarOperario( id: string ) {
    this._operarioService.cargarOperario( id )
          .subscribe( operario => {

            console.log( operario );
            this.operario = operario;
            this.operario.empresa = operario.empresa._id;
            this.cambioEmpresa( this.operario.empresa );
          });
  }

  guardarOperario( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._operarioService.guardarOperario( this.operario )
            .subscribe( operario => {

              this.operario._id = operario._id;

              this.router.navigate(['/operario', operario._id ]);

            });

  }

  cambioEmpresa( id: string ) {

    this._empresaService.obtenerEmpresa( id )
          .subscribe( empresa => this.empresa = empresa );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'operarios', this.operario._id );

  }


}
