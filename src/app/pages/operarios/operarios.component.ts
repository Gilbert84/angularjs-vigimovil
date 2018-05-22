import { Component, OnInit } from '@angular/core';
import { Operario } from '../../models/operario.model';
import { OperarioService } from '../../services/service.index';


declare var swal: any;

@Component({
  selector: 'app-operarios',
  templateUrl: './operarios.component.html',
  styles: []
})
export class OperariosComponent implements OnInit {

  operarios: Operario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  mostrar={
    anterior:false,
    siguiente:true
  }

  constructor(
    public _operarioService: OperarioService
  ) { }

  ngOnInit() {
    this.cargarOperarios();
  }

  cargarOperarios() {

    this.cargando = true;

    this._operarioService.cargarOperarios( this.desde )
          .subscribe( (resp:any) => {
            this.totalRegistros = resp.total;
            this.operarios = resp.operarios 
            this.cargando = false;
            console.log('operarios: ',resp);
          });
            
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

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      //no hay mas registros
      this.mostrar.siguiente=false;
      this.mostrar.anterior=true;
      return;
    }

    if ( desde < 0 ) {
      //primera pagina
      this.mostrar.siguiente=true;
      this.mostrar.anterior=false;
      return;
    }
    this.mostrar.siguiente=true;
    this.mostrar.anterior=true;
    this.desde += valor;
    this.cargarOperarios();

  }

}
