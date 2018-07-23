
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { NombreForma } from './nombre/nombre.component';
import { RelojComponent } from './reloj/reloj.component';

@NgModule({
    declarations: [
        // Formularios personalizados
        NombreForma,
        RelojComponent

    ],
    exports: [
        NombreForma,
        RelojComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

    ],
    providers: [

    ]
})
export class FormasModule { }
