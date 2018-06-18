import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { ImagenMapPipe } from './imagen-map.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    ImagenMapPipe
  ],
  exports: [
    ImagenPipe,
    ImagenMapPipe
  ]
})
export class PipesModule { }
