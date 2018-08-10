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

  constructor(private viajeService:ViajeService) { }

  ngOnInit() {
    this.cargando = true;
    this.viajeService.cargar(0,0).subscribe((viajes)=>{
      this.cargando = false;
      //console.log(viajes);
      this.viajes = viajes;
    });
  }

  buscar(termino){

  }

}
