import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/service.index';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: []
})
export class VehiculosComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = false;
  mostrar = {
    anterior: false,
    siguiente: true
  };

  constructor(public _vehiculoService: VehiculoService) {}

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.cargando = true;

    this._vehiculoService
      .cargarVehiculos(this.desde)
      .subscribe((vehiculos: any) => {
        this.totalRegistros = vehiculos.total;
        this.vehiculos = vehiculos;
        console.log('vehiculos', vehiculos);
        this.cargando = false;
      });
  }

  buscarVehiculo(termino: string) {
    if (termino.length <= 0) {
      this.cargarVehiculos();
      return;
    }

    this._vehiculoService
      .buscarVehiculos(termino)
      .subscribe(vehiculos => (this.vehiculos = vehiculos));
  }

  borrarOperario(vehiculo: Vehiculo) {
    this._vehiculoService
      .borrarVehiculo(vehiculo._id)
      .subscribe(() => this.cargarVehiculos());
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
    this.cargarVehiculos();
  }
}
