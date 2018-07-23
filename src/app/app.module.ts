import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
// import { PagesModule } from './pages/pages.module';

// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';


// pluguins

import { SocketIoModule } from 'ng-socket-io';
import { config } from './config/socket-io.config';

//ngx-electron
import { NgxElectronModule } from 'ngx-electron';


//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
import { AtencionTiketComponent } from './public/atencion-tiket/atencion-tiket.component';
import { MarcadorDirective } from './directives/marcador.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
    AtencionTiketComponent,
    MarcadorDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    SocketIoModule.forRoot(config),
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
