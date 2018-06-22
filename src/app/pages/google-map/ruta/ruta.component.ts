import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Empresa } from '../../../models/empresa.model';
import { Vehiculo } from '../../../models/vehiculo.model';
import { Dispositivo } from '../../../models/dispositivo.model';
import { MarcadorService , RutaService } from '../../../services/service.index';

import { ModalUploadService } from '../../../components/service.components.index';
import { Marcador, Ruta } from '../../../class/google-maps.class';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {

  titulo:string="Nueva Ruta";
  marcadores: Marcador[] = [];
  ruta;

  cargando:boolean;

  origen:Marcador = new Marcador(0,0,'','');
  destino:Marcador  = new Marcador(0,0,'','');;


  lat: number = 6.344620;
  lng: number = -75.562874;
  zoom: number = 12;
  opacidad: number = 0.5;
  visible=true; 

  public optimizeWaypoints: boolean = true // default: true
  public provideRouteAlternatives: boolean = true // default: false

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

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nueva' ) {
        this.titulo="Actualizar ruta";
        this.cargarRuta( id );
      }else{
        this.titulo="Nueva ruta";
        this.cargando = true;
        this.cargarMarcadores().then(()=>{
          this.ruta= new Ruta(this.marcadores['0'],this.marcadores['1']);
          this.cargando = false ;
          console.log('ruta:',this.ruta);
        });
      }

    });

  }

  ngOnInit() {
    this.cargarMarcadores().then();
  }

  marcadorSel( marcador ) {

  }


  marcadorSelOrigen() {

  }

  marcadorSelDestino() {
    
  }



  cargarMarcadores(){
    return new Promise((resolve,reject)=>{
      this._marcadorService.cargar().subscribe((marcadores)=>{
        this.marcadores =  marcadores;
        console.log(marcadores);
        resolve(true);
      },(error)=>{
        resolve(false);
      })
    });
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

    this._marcadorService.obtener(id)
        .subscribe((origen)=>{
          
          this.origen = origen;
          console.log('origen :',this.origen);
          this.ruta.origen = this.origen._id;
          this.ruta.nombre = this.origen.nombre + '>>' + this.destino.nombre;
          this.ruta.codigo = this.origen.codigo + '::' + this.destino.codigo;
          console.log('ruta', this.ruta);
        });
  }

  cambiarDestino(id){

    this._marcadorService.obtener(id)
    .subscribe((destino)=>{

      this.destino = destino;
      console.log('destino :',this.destino);
      this.ruta.destino = this.destino._id;
      this.ruta.nombre = this.origen.nombre + '>>' + this.destino.nombre;
      this.ruta.codigo = this.origen.codigo + '::' + this.destino.codigo;
      console.log('ruta', this.ruta);
    });
  }

  cambiarPuntosRef(evento) {
    this.ruta.puntosRef = evento.request.waypoints;
    console.log('ruta',this.ruta);
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
