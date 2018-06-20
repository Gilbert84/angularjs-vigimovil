import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MarcadorRef } from '../../../interfaces/google-map.interface';
import { Marcador ,TipoMarcador } from '../../../class/google-maps.class';
import { MarcadorService, TipoMarcadorService } from '../../../services/service.index';
import { InfoWindow } from '@agm/core/services/google-maps-types' // option

import swal from 'sweetalert';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements OnInit {
  
  lat: number = 6.344620;
  lng: number = -75.562874;
  zoom:number = 12;


  marcadores:Marcador[]=[];
  marcadorSel:any;
  tipoMarcadores:TipoMarcador[]=[];

  tipoMarcador:TipoMarcador= new TipoMarcador();
  posicion:number;
  arrastable:string="1";

  cargando: boolean = false;
  estado:boolean=false;

  dir = undefined;


  waypoints: object = [];

  constructor(
      private snakbar:MatSnackBar,
      private _marcadorService:MarcadorService,
      private _tipoMarcadorService:TipoMarcadorService
    ) { 
    this.cargarStorage();
  }

  ngOnInit() {
    this.cargar();
    //this.cargarStorage();
    //this.obtenerDireccion();
  }

  cargar(){
    this.cargando = true;
    this._tipoMarcadorService.cargar().subscribe((tipoMarcadores)=>{
      this.tipoMarcadores=tipoMarcadores;
      this.cargando = false;
      //console.log('tipo:',this.tipoMarcadores);
    });
    this.cargando = true;
    this._marcadorService.cargar().subscribe((marcadores)=>{
      this.marcadores=marcadores;
      console.log(this.marcadores);
      this.cargando = false;
    });
  }

  crear(nuevoMarcador:MarcadorRef){
    this._marcadorService.crear(nuevoMarcador).subscribe((marcador)=>{
      this.marcadorSel=marcador;
      this.marcadores.splice(this.posicion,1,this.marcadorSel);
      console.log('server:',marcador);
    });
  }

  actualizar(marcadorSel:MarcadorRef){
    this._marcadorService.actualizar( marcadorSel )
            .subscribe( marcador=> {
              this.marcadorSel = marcador;
            });
    this.snakbar.open('Marcador actualizado', 'cerrar',{ duration:3000 });
  }

  guardar( f: NgForm ) {

    //console.log( f.valid );
    //console.log( f.value );

    if ( f.invalid ) {
      return;
    }
    console.log('guardando...',this.marcadorSel);
    this.guardarMarcador(this.marcadorSel,this.estado);

  }





  infoWindow: InfoWindow = undefined

  obtainInfowindow(window: InfoWindow) {
    this.infoWindow = window
    console.log('infowindow map',this.infoWindow);
  }

  renderOptions: any = {
    draggable: true,
    suppressMarkers: true,
    suppressInfoWindows: true,
    //markerOptions: { // effect all markers
    //    icon: 'your-icon-url',
    //},
  }

  marcadorClick(marcador:MarcadorRef,posicion:number){//editar marcador
    this.posicion=posicion;
    console.log(posicion);
    this.marcadorSel=marcador;
    console.log(this.marcadorSel);
    if(this.marcadorSel.arrastable){
      this.arrastable="1";
    }else{
      this.arrastable="0";
    }

  }

  agregarMarcador( evento ){
    this.posicion=undefined;
    this.obtenerDireccion(evento.coords.lat,evento.coords.lng);//dispara la funcion actualizar direcion
    //this.snakbar.open('Creando marcador', 'cerrar',{ duration:3000 });
  }

  actualizarDireccion( evento ) {
    let route=evento.routes["0"].legs["0"];
    let coords=evento.routes["0"].overview_path["0"];
    let direccion= route.end_address;
    let lat:number= coords.lat();
    let lng= coords.lng();

    if(direccion===''){
      swal('Marcador', 'Selecione otro punto donde se pueda obtener bien la direccion', 'info');
      return;
    }

    let key= lat.toString().split('.');
    key= key['1'];
    key= key.slice(0,5);
    let codigo = direccion.split(',');
    codigo='P:'+key+','+ codigo['0'];


    if(this.posicion===undefined){
        //nuevo marcador
      this.estado=true;
      let nuevoMarcador = new Marcador(lat,lng,direccion,codigo);
      this.marcadores.push(nuevoMarcador);
      this.snakbar.open('Nuevo marcador agregado', 'cerrar',{ duration:3000 });
    }else{
      //editar marcador
      this.marcadorSel.codigo=codigo;
      this.estado=false;
      this.marcadores.splice(this.posicion,1,this.marcadorSel);
      this.snakbar.open('Marcador actualizado', 'cerrar',{ duration:3000 });
    }
  }



  guardarMarcador( marcador:MarcadorRef, estado:boolean ){
    if(estado){
      //creando marcador
      this.crear(marcador);
      this.snakbar.open('Creando marcador', 'cerrar',{ duration:3000 });
    }else{
      //actualizando marcador
      this.actualizar(marcador);
      this.snakbar.open('Actualizando marcador', 'cerrar',{ duration:3000 });
    }
  }
 

  borrarMarcador(posicion){
    this.marcadores.splice(posicion,1);
    //this.guardarStorage();
    this.marcadorSel=null;
    this.snakbar.open('Marcador borrado', 'cerrar',{ duration:3000 });
  }


  buscarMarcador( termino){

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

  marcadorMovido(marcador:MarcadorRef,evento,posicion:number){
    //cuando se mueve el marcador se dispara esta funcion
    //actualizamos el marcador
    //console.log(evento);
    this.posicion=posicion;
    this.marcadorSel=marcador;
    let codigo=posicion+':'+ this.marcadorSel.codigo;
    this.marcadorSel.codigo=codigo;
    this.obtenerDireccion(evento.coords.lat,evento.coords.lng);
    //this.guardarStorage();
    this.snakbar.open('Marcador Movido', 'cerrar',{ duration:3000 });

  }


  obtenerDireccion(lat:number,lng:number) {
    this.dir = {
      origin: { lat: lat, lng: lng },
      destination: { lat: lat, lng: lng },
    }
  }

  guardarStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores));
  }

  cargarStorage(){
    if(localStorage.getItem('marcadores')){
      this.marcadores= JSON.parse(localStorage.getItem('marcadores'));
    }
  }




}
