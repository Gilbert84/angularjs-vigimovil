import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Empresa } from '../../../models/empresa.model';
import { Vehiculo } from '../../../models/vehiculo.model';
import { Dispositivo } from '../../../models/dispositivo.model';
import { MarcadorService, RutaService } from '../../../services/service.index';

import { ModalUploadService } from '../../../components/service.components.index';
import { Marcador, Ruta } from '../../../class/google-maps.class';

@Component({
  selector: 'app-estado-ruta',
  templateUrl: './estado-ruta.component.html',
  styleUrls: ['./estado-ruta.component.css']
})
export class EstadoRutaComponent implements OnInit {
  titulo: string = 'Nueva Ruta';
  marcadores: Marcador[] = [];
  ruta;
  
  direccion = undefined;

  cargando: boolean;

  lat: number = 6.34462;
  lng: number = -75.562874;
  zoom: number = 12;
  opacidad: number = 0.5;
  visible = true;

  origen: Marcador = new Marcador(this.lat, this.lng, '', '');
  destino: Marcador = new Marcador(this.lat, this.lng, '', '');

  estado= {
    origen: false,
    destino: false
  };



  optimizeWaypoints: boolean = false; // default: true
  provideRouteAlternatives: boolean = false; // default: false

  renderOptions: any = {
    draggable: true,
    suppressMarkers: true,
    suppressInfoWindows: true
  };

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _marcadorService: MarcadorService,
    public _rutaService: RutaService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
        this.cargarRuta(id);
    });
  }

  ngOnInit() {
  }

  marcadorSelOrigen() {}

  marcadorSelDestino() {}

  cargarMarcadores() {
    this.cargando = true;
    return new Promise((resolve, reject) => {
      this._marcadorService.cargar().subscribe(
        marcadores => {
          this.marcadores = marcadores;
          this.cargando = false;
          resolve(true);
        },
        error => {
          resolve(false);
        }
      );
    });
  }

  cargarRuta(id: string) {
    this.cargando = true;
    this._rutaService.cargarRuta(id).subscribe(ruta => {
      this.cargando = false;
      this.ruta = ruta;
      this.titulo = this.ruta.nombre;
      //console.log('ruta se cargo:', ruta);
    });
  }


}
