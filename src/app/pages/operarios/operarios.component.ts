import { Component, OnInit } from '@angular/core';
import { Operario } from '../../models/operario.model';
import { OperarioService } from '../../services/service.index';

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styles: []
})
export class OperariosComponent implements OnInit {

  operarios: Operario[] = [];

  constructor(
    public _operarioService: OperarioService
  ) { }

  ngOnInit() {
    this.cargarOperarios();
  }

  cargarOperarios() {
    this._operarioService.cargarOperarios()
          .subscribe( operarios => this.operarios = operarios );
  }

  buscarOperario( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarOperarios();
      return;
    }

    this._operarioService.buscarOperarios( termino )
            .subscribe( operarios =>  this.operarios = operarios );
  }

  borrarOperario( operario: Operario ) {

    this._operarioService.borrarOperario( operario._id )
            .subscribe( () =>  this.cargarOperarios() );

  }

}
