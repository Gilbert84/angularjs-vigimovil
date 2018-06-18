import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MarcadorRef } from '../../../interfaces/google-map.interface';
import { Marcador ,TipoMarcador } from '../../../class/google-maps.class';
import { MarcadorService, TipoMarcadorService } from '../../../services/service.index';
import { InfoWindow } from '@agm/core/services/google-maps-types' // option

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit {
  
  lat: number = 6.344620;
  lng: number = -75.562874;
  zoom:number = 13;


  marcadores:Marcador[]=[];
  tipoMarcadores:TipoMarcador[]=[];
  marcador:Marcador;
  tipoMarcador:TipoMarcador= new TipoMarcador();
  posicion:number;

  marcadorSel:any;
  arrastable:string="1";



  desde: number = 0;

  totalMarcadores: number = 0;

  public dir = undefined;


  public waypoints: object = [];

  constructor(
      private snakbar:MatSnackBar,
      private marcadorService:MarcadorService,
      private _tipoMarcadorService:TipoMarcadorService
    ) { 
    this.cargarSorage();
  }

  ngOnInit() {
    this._tipoMarcadorService.cargar().subscribe((tipoMarcadores)=>{
      this.tipoMarcadores=tipoMarcadores;
      //console.log('tipo:',this.tipoMarcadores);
    });
    this.cargarSorage();
    //this.obtenerDireccion();
  }

  public infoWindow: InfoWindow = undefined

  public obtainInfowindow(window: InfoWindow) {
    this.infoWindow = window
    console.log('infowindow map',this.infoWindow);
  }

  public renderOptions: any = {
    draggable: true,
    suppressMarkers: true,
    suppressInfoWindows: true,
    //markerOptions: { // effect all markers
    //    icon: 'your-icon-url',
    //},
  }

  agregarMarcador( evento ){
    this.posicion=undefined;
    const coords:{lat:number,lng:number}=evento.coords;
    //let nuevoMarcador = new Marcador(coords.lat,coords.lng);
    //this.marcadores.push(nuevoMarcador);
    //this.guardarStorage();
    //this.snakbar.open('Nuevo marcador agregado', 'cerrar',{ duration:3000 });
    this.obtenerDireccion(coords.lat,coords.lng);
  }

  actualizarMarcador(){
    console.log(this.marcadores);
    this.guardarStorage();
    this.snakbar.open('Marcador actualizado', 'cerrar',{ duration:3000 });
  }


  borrarMarcador(posicion){
    this.marcadores.splice(posicion,1);
    this.guardarStorage();
    this.marcadorSel=null;
    this.snakbar.open('Marcador borrado', 'cerrar',{ duration:3000 });
  }


  buscarMarcador( termino){

  }


  marcadorClick(marcador:MarcadorRef,pos:number){
    this.marcadorSel=marcador;
    if(this.marcadorSel.arrastable){
      this.arrastable="1";
    }else{
      this.arrastable="0";
    }

  }

  cambiarArrastable(){
    if(this.arrastable=="1"){
      this.marcadorSel.arrastable=true;
      this.snakbar.open('Marcador ya se puede mover', 'cerrar',{ duration:3000 });
    }else{
      this.marcadorSel.arrastable=false;
      this.snakbar.open('El marcador no se puede mover  ', 'cerrar',{ duration:3000 });
    }
  }

  cambiarTipo( _id: string){

    this._tipoMarcadorService.obtener(_id).subscribe((tipoMarcador)=>{
      this.tipoMarcador=tipoMarcador;
      this.marcadorSel.tipo._id=tipoMarcador._id;
      this.marcadorSel.tipo.nombre=tipoMarcador.nombre;
      this.marcadorSel.tipo.img=tipoMarcador.img;
      console.log('se cambio tipo:',this.marcadorSel);
    })
    //console.log('tipo');
  }

  marcadorMovido(marcador:MarcadorRef,evento,posicion?:number){
    //cuando se mueve el marcador se dispara esta funcion
    //actualizamos el marcador
    //console.log(evento);
    this.posicion=posicion;
    console.log('nueva pos:',this.posicion);
    marcador.lat=evento.coords.lat;
    marcador.lng=evento.coords.lng;

    this.obtenerDireccion(evento.coords.lat,evento.coords.lat);

    this.guardarStorage();
    this.snakbar.open('Marcador Movido', 'cerrar',{ duration:3000 });

  }


  obtenerDireccion(lat:number,lng:number) {
    this.dir = {
      origin: { lat: lat, lng: lng },
      //destination: { lat: 6.348308, lng: -75.566374 }
      destination: { lat: lat, lng: lng },
    }
  }

  actualizarDireccion(evento){

    let route=evento.routes["0"].legs["0"];
    let coords=evento.routes["0"].overview_path["0"];
    let direccion= route.end_address;
    let lat= coords.lat();
    let lng= coords.lng();

    if(this.posicion===undefined){
        //nuevo
      let nuevoMarcador = new Marcador(lat,lng,direccion);
      this.marcadores.push(nuevoMarcador);
      console.log(nuevoMarcador);
    }else{
      console.log('actualizando');
      //lo editar
      this.obtenerDireccion(lat,lng);
    }
  }


  guardarStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores));
  }

  cargarSorage(){
    if(localStorage.getItem('marcadores')){
      this.marcadores= JSON.parse(localStorage.getItem('marcadores'));
    }
  }




}
