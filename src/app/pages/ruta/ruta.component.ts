import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Empresa } from '../../models/empresa.model';
import { Vehiculo } from '../../models/vehiculo.model';
import { Dispositivo } from '../../models/dispositivo.model';
import { MarcadorService , RutaService } from '../../services/service.index';

import { ModalUploadService } from '../../components/service.components.index';
import { Marcador, Ruta } from '../../class/google-maps.class';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {

  titulo:string="Nueva Ruta";
  marcadores: Marcador[] = [];
  ruta;

  origen:Marcador;
  destino:Marcador;


  lat: number = 6.344620;
  lng: number = -75.562874;
  zoom: number = 12;

  public optimizeWaypoints: boolean = true // default: true
  public provideRouteAlternatives: boolean = true // default: false
  public visible=true;

  public renderOptions: any = {
    draggable: true,
    suppressMarkers: true,
    suppressInfoWindows: true,
  }


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _marcadorService:MarcadorService,
    public _rutaService:RutaService
  ) {

    this.marcadores=this._marcadorService.marcadores;
    this.ruta= new Ruta(this.marcadores['0'],this.marcadores['1']);
    console.log('ruta:',this.ruta);
    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nueva' ) {
        this.titulo="Actualizar ruta";
        this.cargarRuta( id );
      }else{
        this.titulo="Nueva ruta";
        this.ruta= {};
      }

    });

        //let nuevaRuta= new Ruta(this.origin1,this.destination1);
    //this.rutas.push(nuevaRuta);
    //nuevaRuta= new Ruta(this.origin1,this.destination1);
    //this.rutas.push(nuevaRuta);
    //console.log(this.rutas);

  }

  ngOnInit() {

    this._marcadorService.cargar()
          .subscribe( marcadores =>{
            this.marcadores = marcadores;
            console.log('marcadores',this.marcadores);
          });


  }

  public cambiarPuntosRef(event: any, posicion, ruta) {
    this.ruta.puntosRef = event.request.waypoints;
    //console.log('pos:',posicion);
    //console.log(this.rutas);
  }

  cargarRuta( id: string ) {
    this._rutaService.cargarRuta( id )
          .subscribe( ruta => {
            this.ruta = ruta;
            console.log('ruta se cargo:' ,ruta);
            // this.vehiculo.empresa = vehiculo.empresa._id;
            // this.vehiculo.dispositivo= vehiculo.dispositivo._id;
            // this.cambiarEmpresa( this.vehiculo.empresa );
            // this.cambiarDispositivo(this.vehiculo.dispositivo);
          });
  }

  guardarRuta( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    console.log('guardando ruta', this.ruta);

    this._rutaService.guardarRuta( this.ruta )
            .subscribe( ruta => {
              console.log('server :',ruta)
              this.ruta._id = ruta._id;
              this.router.navigate(['/ruta', ruta._id ]);
            });

  }

  cambiarOrigen(id){
    console.log('cambiar origen',id);
    console.log('ruta origen',this.ruta);
    this._marcadorService.obtener(id)
        .subscribe((origen)=>{
          console.log('server origen ruta', origen);
        });
  }

  cambiarDestino(id){
    console.log('cambiar destino',id);
    console.log('ruta desino',this.ruta);
    this._marcadorService.obtener(id)
    .subscribe((destino)=>{
      console.log('server destino ruta', destino);
    });
  }

  // cambiarEmpresa( id: string ) {

  //   this._empresaService.obtenerEmpresa( id )
  //         .subscribe( empresa => this.empresa = empresa );

  // }

  // cambiarDispositivo(id: string ){
  //   this._dispositivoService.obtenerDispositivo( id )
  //     .subscribe( dispositivo => this.dispositivo = dispositivo );
  // }

  // cambiarFoto(ruta:string,id) {

  //   this._modalUploadService.mostrarModal(ruta,id );

  //}

}
