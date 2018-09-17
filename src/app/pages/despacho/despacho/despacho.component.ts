import { Component, OnInit,OnDestroy, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  DespachoService,
  RutaService,
  ViajeService,
  AsignacionService,
  SocketIoService
} from '../../../services/service.index';
import { Asignacion, Viaje } from '../../../models/despacho/despacho.model';
import { Ruta } from '../../../class/google-maps.class';
import { Subscription } from 'rxjs/Subscription';


declare function init_plugin_select();
declare function init_plugin_clockpicker();
declare function init_plugin_material_clock();
import swal from 'sweetalert';




@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css'],
  
})
export class DespachoComponent implements OnInit ,OnDestroy{


  
  titulo: string = 'Nueva Ruta';
  ruta: Ruta;
  rutas: Ruta [] = [];
  asignacion: any;
  viaje: Viaje = new Viaje();
  cargando: boolean = false;

  lat: number = 6.34462;
  lng: number = -75.562874;
  zoom: number = 12;
  mapDraggable: boolean = false;

  renderOptions: any = {
    draggable: false,
    suppressMarkers: true,
    suppressInfoWindows: true
  };

  contador: number = 180;
  horaSalida: any;
  hora: number;
  min: number;

  reloj: any;

  confirmacion: Subscription = new Subscription();

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private despachoService: DespachoService,
    private rutaService: RutaService,
    private viajeService: ViajeService,
    private asignacionService: AsignacionService,
    private socketIoService: SocketIoService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id']; 
      this.cargando = true;
      this.asignacionService.obtener(id)
      .subscribe(asignacion => {
        this.asignacion = asignacion;
        this.viaje.asignacion = this.asignacion._id;
        this.cargando = false;        
      }, (error) => {

      });
    });



    const salir = setInterval(() => {
      this.contador -= 1;
      if (this.contador <= 0) {
        this.router.navigate(['/despachos']);
        clearInterval(salir);
      }
    }, 1000);
    

  }

  ngOnInit() {


  
    this.cargando = true;
    this.rutaService.cargarRutas(0,0).subscribe((rutas) => {
      this.rutas = rutas;
      init_plugin_select();
      init_plugin_clockpicker();
      init_plugin_material_clock();
      this.cargando = false;
    });

    this.confirmacion = this.socketIoService.observar('confirmacionAsignacion').subscribe(res =>{
      this.viajeService.guardar(this.viaje).subscribe((viajeGuardado)=>{
        console.log(viajeGuardado);
        swal( 'Confirmacion despacho', 'al vehiculo le llego el despacho con exito', 'success' );
      });
    });

  }

  ngOnDestroy(){
    this.confirmacion.unsubscribe();
  }

  guardar(f: NgForm) {
    //console.log(f);
    //console.log(f.valid);
    if (f.invalid) {
      return;
    }

    this.cambiarHoraLlegadaAsignada(this.viaje.horaSalidaAsignada.getHours(), 
                                    this.viaje.horaSalidaAsignada.getMinutes(), 
                                    this.viaje.horaSalidaAsignada.getSeconds(),
                                    this.ruta.duraccion.value );

    this.asignacionService.obtener(this.asignacion._id)
    .subscribe(asignacion => {

      this.asignacion.vehiculo.dispositivo.socket_id = asignacion.vehiculo.dispositivo.socket_id;

      if(!asignacion.vehiculo.dispositivo.disponible){
        swal( 'Sin conexion', 'el vehiculo actualmente no se encuentra en linea', 'info' );
        return;
      }


      this.viajeService.guardar(this.viaje).subscribe(viaje => {
        this.viaje._id = viaje._id;
  
        this.viajeService.obtener(this.viaje._id).subscribe((viajeActual) => {
            //console.log('viaje atual', viajeActual);
            let para: any = this.asignacion.vehiculo;
            this.viaje = viajeActual;
  
            let mensaje = {
              para: para.dispositivo.socket_id,
              viaje: this.viaje
            };
      
            this.socketIoService.enviarEvento('asignarNuevoViaje', mensaje).then((resp:any) => {
              console.log('resp', resp);
              this.viaje.numeroDespacho = resp.server.despacho;
              console.log(this.viaje);
            });
        });
  
        this.router.navigate(['/despacho', this.asignacion._id]);
      }, (error) => {
        console.log(error);
      }); 

    }, (error) => {
      console.log('error', error);
    });



  }

  cambiarRuta(id) {
    this.rutaService.cargarRuta(id).subscribe((ruta) => {
        this.ruta = ruta;
    });
  }

  asignarOperario(operario) {
    //console.log(operario);
    this.despachoService.siguiente();
  }

  cambiarHoraSalidaAsignada(reloj) {
    this.viaje.horaSalidaAsignada = new Date();
    this.viaje.horaSalidaAsignada.setHours(reloj.hora, reloj.minuto);
  }

  private cambiarHoraLlegadaAsignada(hora, min, seg, sumaSeg) {
    let horas = hora;
    let minutos = min;
    let segundos = seg;
     
    let  horas_Segundos = hora * 3600;
    let minutos_Segundos = min * 60;
    segundos = horas_Segundos + minutos_Segundos + segundos + sumaSeg;
     
    horas = segundos / 3600;
    this.viaje.horaLlegadaAsignada = new Date();
    
    if (horas >= 24) {
      segundos -= 24 * 3600;
      let dia = this.viaje.horaLlegadaAsignada.getDate() + 1;
      this.viaje.horaLlegadaAsignada.setDate(dia);
    }
    horas = Math.floor( segundos / 3600 );
    minutos = Math.floor( (segundos % 3600) / 60 );
    segundos = segundos % 60;

    this.viaje.horaLlegadaAsignada.setHours(horas, minutos, segundos);
  }
}
