import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/url-servicios.config';
import { Usuario } from '../../models/usuario.model';
import { Operario } from '../../models/operario.model';
import { Empresa } from '../../models/empresa.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  operarios: Operario[] = [];
  empresas: Empresa[] = [];


  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
      .subscribe( params => {
        let termino = params['termino'];
        this.buscar( termino );
      });

  }

  ngOnInit() {
  }

  buscar( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {

          //console.log( resp );
          this.empresas = resp.empresas;
          this.operarios = resp.operarios;
          this.usuarios = resp.usuarios;
        });

  }

}
