import { Component } from '@angular/core';

import { SettingsService } from './services/service.index';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public _ajustes: SettingsService , private electronService: ElectronService) {}

  abrirEnNavegador() {
    this.electronService.shell.openExternal('http://localhost:4200');
  }

}

