
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { NombreForma }  from './nombre/nombre.component'

@NgModule({
    declarations: [
        // Formularios personalizados
        NombreForma

    ],
    exports: [
        NombreForma
    ],
    imports: [
        CommonModule,
        FormsModule,

    ],
    providers: [

    ]
})
export class FormasModule { }
