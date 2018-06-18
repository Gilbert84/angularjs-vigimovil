
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
import { ChartsModule } from 'ng2-charts';


import { FormasModule } from './forms/forms.module'


import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
//import { ModalUploadComponent } from './modal-upload/modal-upload.component';

import { PipesModule } from '../pipes/pipes.module'

@NgModule({
    declarations: [
        // Componentes personalizados
        IncrementadorComponent,
        GraficoDonaComponent,
        //ModalUploadComponent
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent,
        //ModalUploadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PipesModule,
        FormasModule,
    ],
    providers: [

    ]
})
export class ComponentsModule { }
