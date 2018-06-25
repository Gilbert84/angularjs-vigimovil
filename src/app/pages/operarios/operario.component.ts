import { Component, OnInit } from '@angular/core';
import { Operario } from '../../models/operario.model';
import { Empresa } from '../../models/empresa.model';
import { OperarioService, EmpresaService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/service.components.index';

@Component({
  selector: 'app-operario',
  templateUrl: './operario.component.html',
  styles: []
})
export class OperarioComponent implements OnInit {
  titulo:string="Nuevo operario";
  empresas: Empresa[] = [];
  operario: Operario = new Operario('', '', '',false, '', '');
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
        this.titulo="Actualizar Operario";
        this.cargarOperario( id );
      }else{
        this.titulo="Nuevo Operario";
        this.operario={};
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
    console.log('guardando operario');
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

  cambiarFoto(ruta:string,id) {

    this._modalUploadService.mostrarModal( ruta, id );

  }


}
