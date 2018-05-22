import { Component, OnInit ,OnChanges} from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import { Socket } from 'ng-socket-io';

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
    private io:Socket
   ) {

    this.io.on('connect',()=>{
      this.servidor={
        online:true,
        mensaje:'En linea'
      }

    });
    this.io.on('disconnect',()=>{
      this.servidor={
        online:false,
        mensaje:'Fuera de linea'
      }
    });

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
