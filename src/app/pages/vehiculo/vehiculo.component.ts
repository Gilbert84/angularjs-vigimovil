import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Empresa } from '../../models/empresa.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { Dispositivo } from '../../models/dispositivo.model';
import {
  EmpresaService,
  VehiculoService,
  DispositivoService
} from '../../services/service.index';

import { ModalUploadService } from '../../components/service.components.index';

declare function init_plugin_select(); 

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: []
})
export class VehiculoComponent implements OnInit {
  titulo: string = 'Nuevo vehiculo';
  empresas: Empresa[] = [];
  dispositivos: Dispositivo[] = [];
  vehiculo: Vehiculo = new Vehiculo('', '', '', '', '', '', '', '', '');
  empresa: Empresa = new Empresa('');
  dispositivo: Dispositivo = new Dispositivo('');

  cargando:boolean = false;

  constructor(
    public _vehiculoService: VehiculoService,
    public _empresaService: EmpresaService,
    public _dispositivoService: DispositivoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.titulo = 'Actualizar vehiculo';
        this.cargarVehiculo(id);
      } else {
        this.titulo = 'Nuevo vehiculo';
        this.vehiculo = {};
      }
    });
  }

  ngOnInit() {

    this._empresaService.cargarEmpresas()
      .subscribe(empresas => {
        this.empresas = empresas;
        this._dispositivoService.cargarDispositivos().subscribe(resp => {
          this.dispositivos = resp.dispositivos;
          init_plugin_select();
        });
      });


    this._modalUploadService.notificacion.subscribe(resp => {
      this.vehiculo.img = resp.vehiculo.img;
    });
  }

  cargarVehiculo(id: string) {
    this._vehiculoService.cargarVehiculo(id).subscribe(vehiculo => {
      this.vehiculo = vehiculo;
      this.vehiculo.empresa = vehiculo.empresa._id;
      this.vehiculo.dispositivo = vehiculo.dispositivo._id;
      this.cambiarEmpresa(this.vehiculo.empresa);
      this.cambiarDispositivo(this.vehiculo.dispositivo);
    });
  }

  guardarVehiculo(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._vehiculoService.guardarVehiculo(this.vehiculo).subscribe(vehiculo => {
      this.vehiculo._id = vehiculo._id;
      this.router.navigate(['/vehiculo', vehiculo._id]);
    });
  }

  cambiarEmpresa(id: string) {
    if (id==='')return;
    this._empresaService
      .obtenerEmpresa(id)
      .subscribe(empresa => (this.empresa = empresa));
  }

  cambiarDispositivo(id: string) {
    if (id==='')return;
    this._dispositivoService
      .obtenerDispositivo(id)
      .subscribe(dispositivo => (this.dispositivo = dispositivo));
  }

  cambiarFoto(ruta: string, id) {
    if (id==='')return;
    this._modalUploadService.mostrarModal(ruta, id);
  }
}
