import { Component, OnInit ,OnChanges} from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { SocketIoService } from '../../services/service.index';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent  {

  label: string = '';
  servidor={
    online:false,
    mensaje:''
  };

  constructor(
    private router: Router,
    public title: Title,
    public meta: Meta,
    private socketIoService:SocketIoService
   ) {


    this.getDataRoute()
      .subscribe( data => {

        this.label = data.titulo;
        this.title.setTitle( this.label );

        let metaTag: MetaDefinition = {
          name: 'description',
          content: this.label
        };

        this.meta.updateTag(metaTag);

      });
      

  }

  getDataRoute() {

    return this.router.events
        .filter( evento => evento instanceof ActivationEnd  )
        .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
        .map( (evento: ActivationEnd) => evento.snapshot.data );

  }


}
