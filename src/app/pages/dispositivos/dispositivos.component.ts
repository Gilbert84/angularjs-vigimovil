import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { DispositivoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styles: []
})
export class DispositivosComponent implements OnInit {

  dispositivos: Dispositivo[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  mostrar={
    anterior:false,
    siguiente:true
  }

  constructor(
                private dispositivoService:DispositivoService,
                public router: Router 
              ) { }

  ngOnInit() {
    this.cargarDispositivos();
  }

  cargarDispositivos() {
    this.dispositivoService.cargarDispositivos(this.desde)
          .subscribe( (resp:any) => {
            this.totalRegistros = resp.total;
            this.dispositivos = resp.dispositivos; 
            this.cargando = false;
            console.log('dispositivos: ',this.dispositivos);
          });
            
  }

  buscarDispositivo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarDispositivos();
      return;
    }

    this.dispositivoService.buscarDispositivo( termino )
            .subscribe( dispositivos =>  this.dispositivos = dispositivos );
  }

  borrarDispositivo( dispositivo: Dispositivo ) {

    this.dispositivoService.borrarDispositivo( dispositivo._id )
             .subscribe( () =>  this.cargarDispositivos() );

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      //no hay mas registros
      this.mostrar.siguiente=false;
      this.mostrar.anterior=true;
      return;
    }

    if ( desde < 0 ) {
      //primera pagina
      this.mostrar.siguiente=true;
      this.mostrar.anterior=false;
      return;
    }
    this.mostrar.siguiente=true;
    this.mostrar.anterior=true;
    this.desde += valor;
    this.cargarDispositivos();

  }

  guardarCambios( dispositivo: Dispositivo ){
    this.dispositivoService.actualizarDispositivo(dispositivo)
            .subscribe( dispositivo => {
              //this.router.navigate(['/dispositivos', dispositivo._id ]);
            });
  }

}
