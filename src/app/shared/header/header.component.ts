import { Component, OnInit } from '@angular/core';
import { UsuarioService ,SidebarService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  fechaHora:any;

  constructor(
    public _usuarioService: UsuarioService,
    public _sidebar: SidebarService,
    public router: Router
  ) { 
    setInterval(()=>{
      this.fechaHora=new Date();
    },1000);
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }

  cargarSubmenu(menu){
    this._sidebar.cargarSubMenu(menu);
  }

}
