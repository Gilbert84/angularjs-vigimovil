import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import {
    ModalUploadService
 } from './service.components.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ModalUploadService
  ],
  declarations: []
})
export class ServiceComponentsModule { }