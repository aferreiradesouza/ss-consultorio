import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { NgxMaskModule } from 'ngx-mask';
import { PerfilComponent } from './inicio/perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxMaskModule,
    ReactiveFormsModule,
    PerfilRoutingModule
  ],
  providers: [
    SessionStorageService,
    LocalStorageService,
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PerfilModule {}
