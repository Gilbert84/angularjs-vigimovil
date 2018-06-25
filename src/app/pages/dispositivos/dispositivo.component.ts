import { Component, OnInit } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { DispositivoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styles: []
})
export class DispositivoComponent implements OnInit {


  dispositivo: Dispositivo = {};

  constructor(
    public dispositivoService: DispositivoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarDispositivo( id );
      }

    });

  }

  ngOnInit() {

  }

  cargarDispositivo( id: string ) {
    this.dispositivoService.cargarDispositivo( id )
          .subscribe( dispositivo => {
            this.dispositivo = dispositivo;
          });
  }

  guardarCambios( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }
    this.dispositivoService.actualizarDispositivo( this.dispositivo )
            .subscribe( dispositivo => {
              this.router.navigate(['/dispositivos']);
            });

  }




}
