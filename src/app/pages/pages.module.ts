
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

import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { FormasModule } from '../components/forms/forms.module';


//import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
//import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { OperariosComponent } from './operarios/operarios.component';
import { OperarioComponent } from './operarios/operario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DespachoComponent } from './despacho/despacho/despacho.component';
import { DespachosComponent } from './despacho/despacho/despachos.component';
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
import { IndexUsuariosComponent } from './usuarios/index-usuarios/index-usuarios.component';
import { RolesComponent } from './usuarios/roles/roles.component';
import { EstadosComponent } from './usuarios/estados/estados.component';
import { IndexDashboardComponent } from './dashboard/index-dashboard/index-dashboard.component';
import { EstadoRutaComponent } from './dashboard/estado-ruta/estado-ruta.component';
import { IndexDespachoComponent } from './despacho/index-despacho/index-despacho.component';
import { AsignacionComponent } from './despacho/asignacion/asignacion.component';
import { AsignacionesComponent } from './despacho/asignaciones/asignaciones.component';

import { ClockPickerDirective } from '../directives/clockpicker.directive';
import { ViajesComponent } from './despacho/viajes/viajes.component';
import { MdrvBpcr2Component } from './monitoreo/mdrv-bpcr2/mdrv-bpcr2.component';
import { IndexMonitoreoComponent } from './monitoreo/index-monitoreo/index-monitoreo.component';



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
        IndexUsuariosComponent,
        RolesComponent,
        EstadosComponent,
        IndexDashboardComponent,
        EstadoRutaComponent,
        IndexDespachoComponent,
        AsignacionComponent,
        DespachosComponent,
        DespachoComponent,
        AsignacionesComponent,
        ClockPickerDirective,
        ViajesComponent,
        MdrvBpcr2Component,
        IndexMonitoreoComponent,
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
