import { Component, OnInit } from '@angular/core';
import { Asignacion } from '../../../models/despacho/despacho.model';
import { AsignacionService } from '../../../services/service.index';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {
  asignaciones: Asignacion[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = false;
  mostrar = {
    anterior: false,
    siguiente: true
  };

  constructor(public _asignacionService: AsignacionService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;

    this._asignacionService
      .cargar(this.desde)
      .subscribe((asignaciones: any) => {
        this.totalRegistros = asignaciones.total;
        this.asignaciones = asignaciones;
        console.log('asignaciones', asignaciones);
        this.cargando = false;
      });
  }

  buscar(termino: string) {
    if (termino.length <= 0) {
      this.cargar();
      return;
    }

    this._asignacionService
      .buscar(termino)
      .subscribe(asignaciones => (this.asignaciones = asignaciones));
  }

  borrar(asignacion: Asignacion) {
    this._asignacionService
      .borrar(asignacion._id)
      .subscribe(() => this.cargar());
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      //no hay mas registros
      this.mostrar.siguiente = false;
      this.mostrar.anterior = true;
      return;
    }

    if (desde < 0) {
      //primera pagina
      this.mostrar.siguiente = true;
      this.mostrar.anterior = false;
      return;
    }
    this.mostrar.siguiente = true;
    this.mostrar.anterior = true;
    this.desde += valor;
    this.cargar();
  }
}
