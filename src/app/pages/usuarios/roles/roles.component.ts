import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/service.index';
import { ModalUploadService } from '../../../components/service.components.index';

declare var swal: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: []
})
export class RolesComponent implements OnInit {

  roles: Role[] = [];

  constructor(
    public _roleService: RoleService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargar();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargar() );
  }

  cargar() {
    this._roleService.cargar()
            .subscribe( roles => this.roles = roles );
  }

  crear() {

    swal({
      title: 'Crear role',
      text: 'Ingrese el nombre del rol',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._roleService.crear( valor )
              .subscribe( (resp) => {
                this.cargar() 
                //console.log(resp);
              });

    });

  }


  guardar( role: Role) {

    this._roleService.actualizar( role )
            .subscribe();

  }

  borrar( role: Role ) {

    this._roleService.borrar( role._id )
            .subscribe( () =>  this.cargar() );

  }

  buscar( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargar();
      return;
    }

    this._roleService.buscar( termino )
            .subscribe( roles => this.roles = roles );

  }
}
