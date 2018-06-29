import { Component, OnInit } from '@angular/core';
import { AsignacionService, SocketIoService } from '../../../services/service.index';

declare function init_plugins();

@Component({
  selector: 'app-despachos',
  templateUrl: './despachos.component.html',
  styleUrls: ['./despachos.component.css']
})
export class DespachosComponent implements OnInit {

  cargando = false;

  constructor(
    private _asignacionService:AsignacionService,
    private _socketIoService:SocketIoService
  ) {

  }

  ngOnInit() {
    init_plugins();
    this.cargando=true;
    this._socketIoService.enviarEvento('obtenerAsignaciones')
        .then((asignaciones:any)=>{
          this._asignacionService.asignaciones=asignaciones;
          console.log('obteniendo asignaciones:',asignaciones);
          this.cargando=false;

    });
  }

}
