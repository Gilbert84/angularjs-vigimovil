import { Component, OnInit, ElementRef} from '@angular/core';
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


declare function init_plugin_select();
declare function init_plugin_clockpicker();
declare function init_plugin_material_clock();




@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css'],
  
})
export class DespachoComponent implements OnInit {


  
  titulo: string = 'Nueva Ruta';
  ruta: Ruta;
  rutas: Ruta [] = [];
  asignacion: Asignacion;
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

  contador: number = 60000;
  horaSalida: any;
  hora: number;
  min: number;

  reloj: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private despachoService: DespachoService,
    private _rutaService: RutaService,
    private _viajeService: ViajeService,
    private _asignacionService: AsignacionService,
    private _socketIoService: SocketIoService,
    private elem: ElementRef
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id']; 
      this.cargando = true;
      this._asignacionService.obtener(id)
      .subscribe(asignacion => {
        this.asignacion = asignacion;
        this.cargando = false;        
      }, (error) => {
        console.log('error', error);
      });
    });



    const salir = setInterval(() => {
      this.contador -= 1;
      if (this.contador <= 0) {
        this.router.navigate(['/viajes']);
        clearInterval(salir);
      }
    }, 1000);
    

  }

  ngOnInit() {


  
    this.cargando = true;
    this._rutaService.cargarRutas().subscribe((rutas) => {
      this.rutas = rutas;
      init_plugin_select();
      init_plugin_clockpicker();
      init_plugin_material_clock();
      this.cargando = false;
    });
  }

  guardar(f: NgForm) {
    console.log(f);
    //console.log(f.valid);
    console.log('value', f.value);
    console.log('hora salida', this.horaSalida);
    console.log('viaje', this.viaje);

    f.control.controls.horaSalida.valueChanges.subscribe((data) => {
      console.log('data', data );
    });

    if (f.invalid) {
      return;
    }
    this.viaje.horaSalidaAsignada = new Date();
    //this.viaje.horaSalidaAsignada.setHours(this.horaSalida.hora, this.horaSalida.min);

     console.log('viaje', this.viaje);
    

    // this._viajeService.guardar(this.viaje).subscribe(viaje => {
    //   this.viaje._id = viaje._id;

    //   this._viajeService.obtener(this.viaje._id).subscribe((viajeActual) => {
    //       console.log('viaje atual', viajeActual);
    //       let para: any = this.asignacion.vehiculo;

    //       let mensaje = {
    //         para: para.dispositivo.socket_id,
    //         viaje: viajeActual,
    //       };
    
    //       this._socketIoService.enviarEvento('asignarNuevoViaje', mensaje).then((resp) => {
    //         console.log('resp', resp);
    //       });
    //   });

    //   this.router.navigate(['/viaje', this.asignacion._id]);
    // }, (error) => {
    //   console.log(error);
    // });
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
  otroclick() {
    console.log('otro clck');
  }

  cambiarHoraSalidaAsignada(reloj) {
  console.log('hora', reloj);
  }
}
