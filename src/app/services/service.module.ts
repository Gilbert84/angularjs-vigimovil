import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



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
  VehiculoService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    EmpresaService,
    OperarioService,
    VerificaTokenGuard,
    SocketIoService,
    DispositivoService,
    VehiculoService
  ],
  declarations: []
})
export class ServiceModule { }
