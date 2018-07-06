import { Component, OnInit, OnDestroy } from '@angular/core';
import { RutaService } from '../../../services/service.index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  rutas = [];

  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = false;
  mostrar = {
    anterior: false,
    siguiente: true
  };

  constructor(
    private _rutaService: RutaService
  ) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando = true;
    this._rutaService.cargarRutas( this.desde ).subscribe(rutas => {
      this.totalRegistros = this._rutaService.totalRutas;
      this.rutas = rutas;
      this.cargando = false;
    });
  }



  buscar( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargar();
      return;
    }

    this._rutaService.buscarRutas( termino )
            .subscribe( rutas => {
              this.rutas = rutas;
            });
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
