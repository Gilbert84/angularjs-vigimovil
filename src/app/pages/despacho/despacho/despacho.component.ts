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

declare function init_plugin_select();

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {
  titulo: string = 'Nueva Ruta';
  ruta: Ruta;
  rutas: Ruta [] = [];
  asignacion: Asignacion;
  viaje = new Viaje();
  cargando: boolean = false;

  lat: number = 6.34462;
  lng: number = -75.562874;
  zoom: number = 12;
  mapDraggable:boolean = false;

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
        this.cargando = false;        
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
      init_plugin_select();
      this.cargando = false;
    });
  }

  cargarViaje(id) {

  }

  guardar(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);

    if (f.invalid) {
      return;
    }

    this.viaje.asignacion = this.asignacion._id;

    console.log(this.viaje);

    this._viajeService.guardar(this.viaje).subscribe(viaje => {
      this.viaje._id = viaje._id;
      this.router.navigate(['/viaje', this.asignacion._id]);
    }, (error) => {
      console.log(error);
    });
  }

  cambiarRuta(id) {
    this._rutaService.cargarRuta(id).subscribe((ruta) => {
        this.ruta = ruta;
        console.log('ruta selecionada:',this.ruta);
    });
  }

  asignarOperario(operario) {
    //console.log(operario);
    this.despachoService.siguiente();
  }
}
