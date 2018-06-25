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
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {
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

      if (id !== 'nueva') {
        this.titulo = 'Actualizar ruta';
        this.cargarRuta(id);
      } else {
        this.titulo = 'Nueva ruta';
        this.cargando = true;
        this.cargarMarcadores().then(() => {
          this.ruta = new Ruta(this.marcadores['0'], this.marcadores['1']);
          this.cargando = false;
          //console.log('ruta:', this.ruta);
        });
      }
    });
  }

  ngOnInit() {
    this.cargarMarcadores().then();
  }

    
  marcadorSel(marcador) {}

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
      //console.log('ruta se cargo:', ruta);
    });
  }

  guardarRuta(f: NgForm) {
    //console.log(f.valid);
    //console.log(f.value);

    if (f.invalid) {
      return;
    }
    this.origen = this.ruta.origen;
    this.destino = this.ruta.destino;
    this.ruta.origen = this.ruta.origen._id;
    this.ruta.destino = this.ruta.destino._id;

    
    //console.log('guardando ruta', this.ruta);

    this._rutaService.guardarRuta(this.ruta).subscribe(ruta => {
      //console.log('server :', ruta);
      this.ruta._id = ruta._id;
      this.ruta.origen = this.origen;
      this.ruta.destino = this.destino; 
      this.router.navigate(['/ruta', ruta._id]);
    });
  }


  borrar() {

  }

  cambiarOrigen(id) {
    
    this.estado.origen = true;
    if (this.estado.origen && this.estado.destino) {
      this.ruta.visible = true;
    }
    this._marcadorService.obtener(id).subscribe(origen => {
      this.origen = origen;
      //console.log('origen :', this.origen);
      this.ruta.origen = this.origen;
      this.ruta.nombre = this.origen.nombre + '>>' + this.destino.nombre;
      this.ruta.codigo = this.origen.codigo + '::' + this.destino.codigo;
      //console.log('ruta', this.ruta);
    });
  }

  cambiarDestino(id) {
    this.estado.destino = true;
    if (this.estado.origen && this.estado.destino) {
      this.ruta.visible = true;
    }
    this._marcadorService.obtener(id).subscribe(destino => {
      this.destino = destino;
      this.ruta.destino = this.destino;
      this.ruta.nombre = this.origen.nombre + '>>' + this.destino.nombre;
      this.ruta.codigo = this.origen.codigo + '::' + this.destino.codigo;
      //console.log('ruta', this.ruta);
    });
  }

  cambiarPuntosRef(evento) {
    this.ruta.puntosRef = evento.request.waypoints;
  }
}
