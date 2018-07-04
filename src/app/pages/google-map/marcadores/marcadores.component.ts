import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Marcador, TipoMarcador } from '../../../class/google-maps.class';
import {
  MarcadorService,
  TipoMarcadorService
} from '../../../services/service.index';
import { InfoWindow } from '@agm/core/services/google-maps-types'; // option

import swal from 'sweetalert';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit {
  lat: number = 6.34462;
  lng: number = -75.562874;
  zoom: number = 12;

  marcadores: Marcador[] = [];
  marcadorSel: any;
  tipoMarcadores: TipoMarcador[] = [];

  tipoMarcador: TipoMarcador = new TipoMarcador();
  posicion: number;
  arrastable: string = '1';

  cargando: boolean = false;
  dir = undefined;

  waypoints: object = [];

  renderOptions: any = {
    draggable: true,
    suppressMarkers: true,
    suppressInfoWindows: true
    //markerOptions: { // effect all markers
    //    icon: 'your-icon-url',
    //},
  };

  constructor(
    private snakbar: MatSnackBar,
    private _marcadorService: MarcadorService,
    private _tipoMarcadorService: TipoMarcadorService
  ) {
    //this.cargarStorage();
    //this.tipoMarcadores = this._tipoMarcadorService.tipoMarcadores;
  }

  ngOnInit() {
    this.cargarTipoMarcadores();
    this.cargarMarcadores();
    //this.cargarStorage();
    //this.obtenerDireccion();
  }


  cargarMarcadores() {
    return new Promise((resolve, reject) => {
      this._marcadorService.cargar().subscribe(
        marcadores => {
          this.marcadores = marcadores;
          resolve(true);
        },
        error => {
          resolve(false);
        }
      );
    });
  }

  cargarTipoMarcadores() {
    return new Promise((resolve, reject) => {
      this._tipoMarcadorService.cargar().subscribe(
        tipoMarcadores => {
          this.tipoMarcadores = tipoMarcadores;
          resolve(true);
        },
        error => {
          resolve(false);
        }
      );
    });
  }

  crear(nuevoMarcador: Marcador) {
    this._marcadorService.crear(nuevoMarcador).subscribe(respMarcador => {
      this._marcadorService.obtener(respMarcador._id).subscribe(marcador => {
        this.marcadorSel = marcador;
        this.cargarMarcadores().then(() => {
          this.snakbar.open(
            'Nuevo marcador :' + this.marcadorSel.codigo + ' agregado',
            'cerrar',
            { duration: 3000 }
          );
        });
      });
    });
  }

  actualizar(marcadorSel: Marcador) {
    this._marcadorService.actualizar(marcadorSel).subscribe(marcador => {
      //this.marcadorSel = marcador;
      this.cargarMarcadores();
    });
    this.snakbar.open('Marcador actualizado', 'cerrar', { duration: 3000 });
  }

  guardar(f: NgForm) {
    //console.log( f.valid );
    //console.log( f.value );

    if (f.invalid || !this.marcadorSel._id === undefined) {
      return;
    }

    this.actualizar(this.marcadorSel);
  }



  marcadorClick(marcador: Marcador, posicion: number) {
    //editar marcador
    this.posicion = posicion;
    this.marcadorSel = marcador;
    if (this.marcadorSel.arrastable) {
      this.arrastable = '1';
    } else {
      this.arrastable = '0';
    }
  }

  agregarMarcador(evento) {
    //se dispara cuando se hace click en el mapa
    this.posicion = undefined;
    this.obtenerDireccion(evento.coords.lat, evento.coords.lng); //dispara la funcion actualizar direcion
    //this.snakbar.open('Creando marcador', 'cerrar',{ duration:3000 });
  }

  actualizarDireccion(evento) {
    let route = evento.routes['0'].legs['0'];
    let coords = evento.routes['0'].overview_path['0'];
    let direccion = route.end_address;
    let lat: number = coords.lat();
    let lng: number = coords.lng();

    if (direccion === '') {
      swal(
        'Marcador',
        'Selecione otro punto donde se pueda obtener bien la direccion',
        'info'
      );
      return;
    }

    let key = lat.toString().split('.');
    key = key['1'];
    key = key.slice(0, 5);
    let codigo = 'P:' + key;

    if (this.posicion === undefined) {
      //nuevo marcador
      this.cargarMarcadores().then(() => {
        this._tipoMarcadorService.cargar().subscribe(tipoMarcadores => {
          this.tipoMarcadores = tipoMarcadores;
          if (this.tipoMarcadores.length <= 0) {
            swal(
              'Marcador',
              'No se puede crear porque no hay tipos de marcadores',
              'info'
            );
            return;
          }

          this.marcadorSel = null;
          let nuevoMarcador = new Marcador(lat, lng, direccion, codigo);
          let nombre = this._marcadorService.totalMarcadores + 1;
          nuevoMarcador.nombre = nombre.toString();
          nuevoMarcador.tipo = this.tipoMarcadores['0'];
          this.crear(nuevoMarcador);
        });
      });
    } else {
      this.marcadorSel.lat = lat;
      this.marcadorSel.lng = lng;
      this.marcadorSel.direccion = direccion;
      this.snakbar.open('Marcador reubicado', 'cerrar', { duration: 3000 });
    }
  }

  borrarMarcador(id) {
    //this.marcadores.splice(posicion,1);
    //this.guardarStorage();
    this._marcadorService.borrar(id).subscribe(() => {
      this.cargarMarcadores();
      this.marcadorSel = null;
    });
  }

  buscarMarcador(termino) {}

  cambiarArrastable() {
    if (this.arrastable === '1') {
      this.marcadorSel.arrastable = true;
      this.snakbar.open('Marcador ya se puede mover', 'cerrar', {
        duration: 3000
      });
    } else {
      this.marcadorSel.arrastable = false;
      this.snakbar.open('El marcador no se puede mover  ', 'cerrar', {
        duration: 3000
      });
    }
  }

  cambiarTipo(_id: string) {
    this._tipoMarcadorService.obtener(_id).subscribe(tipoMarcador => {
      this.tipoMarcador = tipoMarcador;
      this.marcadorSel.tipo._id = tipoMarcador._id;
      this.marcadorSel.tipo.nombre = tipoMarcador.nombre;
      this.marcadorSel.tipo.img = tipoMarcador.img;
    });
  }

  marcadorMovido(marcador: Marcador, evento, posicion: number) {
    //cuando se mueve el marcador se dispara esta funcion
    //actualizamos el marcador
    //console.log(evento);
    this.posicion = posicion;
    this.marcadorSel = marcador;
    this.obtenerDireccion(evento.coords.lat, evento.coords.lng);
    this.snakbar.open('Marcador Movido', 'cerrar', { duration: 3000 });
  }

  obtenerDireccion(lat: number, lng: number) {
    this.dir = {
      origin: { lat: lat, lng: lng },
      destination: { lat: lat, lng: lng }
    };
  }

  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  cargarStorage() {
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }
}
