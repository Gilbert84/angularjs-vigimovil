import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehiculo } from '../../../models/vehiculo.model';
import { Operario } from '../../../models/operario.model';
import { Asignacion } from '../../../models/despacho/despacho.model';

declare function init_plugin_select();

import {
  VehiculoService,
  OperarioService,
  AsignacionService,
  SocketIoService
} from '../../../services/service.index';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  titulo: string = 'Nuevo vehiculo';
  show: boolean = true;

  vehiculos: Vehiculo;
  operarios: Operario;

  asignacion = new Asignacion();
  vehiculo = new Vehiculo('', '', '', '');
  operario = new Operario();

  cargando: boolean = false;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _vehiculoService: VehiculoService,
    public _operarioService: OperarioService,
    public _asignacionService: AsignacionService,
    private _socketIoService:SocketIoService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nueva') {
        this.titulo = 'Actualizar asignacion';
        this.cargar(id);
      } else {
        this.titulo = 'Nueva asignacion';
      }
    });
  }

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.cargando = true;
    this._vehiculoService.cargarVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
      //console.log('vehiculos', this.vehiculos);

      this._operarioService.cargarOperarios().subscribe(resp => {
        this.operarios = resp.operarios;
        //console.log('operarios', this.operarios);
        this.cargando = false;
        init_plugin_select(); // se debe iniciar cuando ya este cargado todo los objetos !importante
      });
    });
  }

  cargar(id: string) {
    this.cargando = true;
    this._asignacionService.obtener(id).subscribe(asignacion => {
      this.asignacion = asignacion;
      console.log(asignacion);
      this.asignacion.operario = asignacion.operario._id;
      this.asignacion.vehiculo = asignacion.vehiculo._id;
      this.cambiarVehiculo(this.asignacion.vehiculo);
      this.cambiarOperario(this.asignacion.operario);
      this.cargando = false;
    });
  }

  guardar(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._asignacionService.guardar(this.asignacion).subscribe(asignacion => {
      
      this.asignacion._id = asignacion._id;
      this._asignacionService.cargar().subscribe((asignaciones)=>{
        this._socketIoService.enviarEvento('actualizarAsignaciones',asignaciones).then((resp)=>{console.log('resp:',resp)});
      });
      this.router.navigate(['/asignacion', asignacion._id]);
    });
  }

  cambiarVehiculo(id: string) {
    if (id === '') {
      return;
    }
    this._vehiculoService.cargarVehiculo(id)
      .subscribe(vehiculo =>{
        this.vehiculo = vehiculo;
        this.asignacion.vehiculo = this.vehiculo._id; 
      });
  }

  cambiarOperario(id: string) {
    if (id === '') {
      return;
    }
    
    this._operarioService.cargarOperario(id)
      .subscribe(operario => {
        this.operario = operario;
        this.asignacion.operario = this.operario._id;
      });
  }
}
