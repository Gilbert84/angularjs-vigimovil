import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceComponentsModule } from '../components/service.components.module';



import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  EmpresaService,
  OperarioService,
  VerificaTokenGuard,
  SocketIoService,
  DispositivoService,
  VehiculoService,
  NacionalidadService,
  DespachoService,
  MarcadorService,
  TipoMarcadorService,
  RutaService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ServiceComponentsModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    EmpresaService,
    OperarioService,
    VerificaTokenGuard,
    SocketIoService,
    DispositivoService,
    VehiculoService,
    NacionalidadService,
    DespachoService,
    MarcadorService,
    TipoMarcadorService,
    RutaService
  ],
  declarations: []
})
export class ServiceModule { }
