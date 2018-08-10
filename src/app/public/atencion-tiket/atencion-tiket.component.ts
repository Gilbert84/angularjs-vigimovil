import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-atencion-tiket',
  templateUrl: './atencion-tiket.component.html',
  styleUrls: ['./atencion-tiket.component.css']
})
export class AtencionTiketComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(event) {

  }

}
