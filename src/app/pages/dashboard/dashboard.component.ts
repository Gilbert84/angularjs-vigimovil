import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lat: number = 6.344620;
  lng: number = -75.562874;
  zoom:number = 13;

  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = false;
  mostrar={
    anterior:false,
    siguiente:true
  }


  constructor( ) { 
    

  }

  ngOnInit() {

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


  }


}
