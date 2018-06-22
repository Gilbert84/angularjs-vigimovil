import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { DespachoComponent} from './despacho/despacho.component';
// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { OperariosComponent } from './operarios/operarios.component';
import { OperarioComponent } from './operarios/operario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { DispositivosComponent } from './dispositivos/dispositivos.component';
import { DispositivoComponent } from './dispositivos/dispositivo.component';
import { InfoComponent } from './dashboard/info/info.component';
import { VehiculoComponent }  from './vehiculo/vehiculo.component';
import { VehiculosComponent }  from './vehiculo/vehiculos.component';
import { RutasComponent } from './google-map/ruta/rutas/rutas.component';
import { RutaComponent } from './google-map/ruta/ruta.component';
import { MarcadoresComponent } from './google-map/marcadores/marcadores.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { TipoMarcadorComponent } from './google-map/tipo-marcador/tipo-marcador.component';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Seguimiento' }
    },
    { path: 'info-ruta', component: InfoComponent, data: { titulo: 'Informacion' } },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios' }
    },
    { path: 'despacho', component: DespachoComponent, data: { titulo: 'Gestion despacho' } },
    { path: 'empresas', component: EmpresasComponent, data: { titulo: 'Mantenimiento de Empresas' } },
    { path: 'operarios', component: OperariosComponent, data: { titulo: 'Mantenimiento de Operarios' } },
    { path: 'operario/:id', component: OperarioComponent, data: { titulo: 'Mantenimiento Operario' } },
    { path: 'dispositivos', component: DispositivosComponent, data: { titulo: 'Mantenimiento de Dispositivos' } },
    { path: 'dispositivos/:id', component: DispositivoComponent, data: { titulo: 'Actualizar Dispositivo' } },
    { path: 'vehiculos', component: VehiculosComponent, data: { titulo: 'Mantenimiento de Vehiculos' } },
    { path: 'vehiculo/:id', component: VehiculoComponent, data: { titulo: 'Mantenimento vehiculo' } },
    { path: 'rutas', component: RutasComponent, data: { titulo: 'Mantenimiento de rutas' } },
    { path: 'ruta/:id', component: RutaComponent, data: { titulo: 'Mantenimento ruta' } },
    { path: 'google-map', component: GoogleMapComponent, data: { titulo: 'Mantenimiento' } },
    { path: 'marcador/:id', component: MarcadoresComponent, data: { titulo: 'Mantenimento marcador' } },
    { path: 'tipo-marcador', component: TipoMarcadorComponent, data: { titulo: 'Mantenimento de tipo marcador' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
