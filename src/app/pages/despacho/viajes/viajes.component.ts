import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../../../services/service.index';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  viajes= [];
  cargando:boolean;


  desde: number = 0;

  totalRegistros: number = 0;
  mostrar={
    anterior:false,
    siguiente:true
  }


  constructor(private viajeService:ViajeService) { }

  ngOnInit() {
    this.cargarViajes();
  }

  buscarViaje( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarViajes();
      return;
    }

    this.viajeService.buscar(termino).subscribe((viajes) =>{
      this.viajes = viajes;
    })

  }

  cargarViajes() {
    this.cargando = true;
    this.viajeService.cargar(this.desde,5).subscribe((viajes)=>{
      this.cargando = false;
      //console.log(viajes);
      this.viajes = viajes;
    });          
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
    this.cargarViajes();

  }

}
