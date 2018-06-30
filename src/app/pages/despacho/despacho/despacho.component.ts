import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  DespachoService,
  RutaService,
  ViajeService,
  AsignacionService
} from '../../../services/service.index';
import { Asignacion, Viaje } from '../../../models/despacho/despacho.model';
import { Ruta } from '../../../class/google-maps.class';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: []
})
export class DespachoComponent implements OnInit {
  titulo: string = 'Nueva Ruta';
  ruta: Ruta;
  rutas: Ruta [] = [];
  asignacion: Asignacion;
  viaje = new Viaje();
  cargando: boolean = false;

  renderOptions: any = {
    draggable: false,
    suppressMarkers: true,
    suppressInfoWindows: true
  };

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private despachoService: DespachoService,
    private _rutaService: RutaService,
    private _viajeService: ViajeService,
    private _asignacionService: AsignacionService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id']; 
      this.cargando = true;
      this._asignacionService.obtener(id)
      .subscribe(asignacion => {
        this.asignacion = asignacion;
        console.log('asignacion', asignacion);
        this._rutaService.cargarRutas().subscribe((rutas) => {
          console.log('rutas', rutas);
          this.rutas = rutas;
          this.cargando = false;
        });
        
      }, (error) => {
        console.log('error', error);
      });
    });


  }

  ngOnInit() {
    this.cargando = true;
    this._rutaService.cargarRutas().subscribe((rutas) => {
      console.log('rutas', rutas);
      this.rutas = rutas;
      this.cargando = false;
    });
  }

  cargarViaje(id) {

  }

  guardar() {

  }

  cambiarRuta(id) {
    this._rutaService.cargarRuta(id).subscribe((ruta) => {
        this.ruta = ruta;
    });
  }

  asignarOperario(operario) {
    //console.log(operario);
    this.despachoService.siguiente();
  }
}
