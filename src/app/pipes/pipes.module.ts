import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { ImagenMapPipe } from './imagen-map.pipe';
import { VariablePipe } from './variables.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    ImagenMapPipe,
    VariablePipe
  ],
  exports: [
    ImagenPipe,
    ImagenMapPipe,
    VariablePipe
  ]
})
export class PipesModule { }
