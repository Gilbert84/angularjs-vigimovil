import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../../services/service.index';
import { Asignacion, Viaje } from '../../../models/despacho/despacho.model';
import { Ruta } from '../../../class/google-maps.class';



@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {
  cargando = false;
  asignaciones: Asignacion;
  total: number;


  constructor(
    private _socketIoService: SocketIoService,
  ) {
    this.observar();
  }

  ngOnInit() {
    this.cargando = true;
    this._socketIoService
      .enviarEvento('obtenerAsignaciones')
      .then((resp: any) => {
        this.total = resp.total;
        this.asignaciones = resp.asignaciones;
        this.cargando = false;
      });
  }

  buscar(termino: string) {

  }


  observar() {
    this._socketIoService.observarInfo('asigancionesActulaes')
    .subscribe((resp) => {
      this.total = resp.total;
      this.asignaciones = resp.asignaciones;
    });
  }


}
