
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


// ng2-charts
//import { ChartsModule } from 'ng2-charts';

//mapas
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';   // agm-direction //http://robby570.tw/Agm-Direction-Docs/


import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { FormasModule }  from '../components/forms/forms.module'


//import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
//import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { OperariosComponent } from './operarios/operarios.component';
import { OperarioComponent } from './operarios/operario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DespachoComponent } from './despacho/despacho.component';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { DispositivoComponent } from './dispositivos/dispositivo.component';
import { InfoComponent } from './dashboard/info/info.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import { VehiculosComponent } from './vehiculo/vehiculos.component';
import { RutaComponent } from './google-map/ruta/ruta.component';
import { RutasComponent } from './google-map/ruta/rutas/rutas.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MarcadoresComponent } from './google-map/marcadores/marcadores.component';
import { TipoMarcadorComponent } from './google-map/tipo-marcador/tipo-marcador.component';

import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        //GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        EmpresasComponent,
        OperariosComponent,
        OperarioComponent,
        BusquedaComponent,
        DespachoComponent,
        DispositivosComponent,
        DispositivoComponent,
        InfoComponent,
        VehiculoComponent,
        VehiculosComponent,
        RutaComponent,
        RutasComponent,
        GoogleMapComponent,
        MarcadoresComponent,
        TipoMarcadorComponent,
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        //ChartsModule,
        PipesModule,
        ComponentsModule,
        FormasModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB_m-EEppdQobezGoeB3wCFYWqSt8FcDqY'
        }),
        AgmDirectionModule,
        MatTabsModule
    ]
})
export class PagesModule { }
