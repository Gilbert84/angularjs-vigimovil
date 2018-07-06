import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-atencion-tiket',
  templateUrl: './atencion-tiket.component.html',
  styleUrls: ['./atencion-tiket.component.css']
})
export class AtencionTiketComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
