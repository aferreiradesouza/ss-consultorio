import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { NgxMaskModule } from 'ngx-mask';
import { ContatoComponent } from './inicio/contato.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoService } from './services/contato.service';
import { UtilContatoService } from './services/util.service';

@NgModule({
  declarations: [
    ContatoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxMaskModule,
    ReactiveFormsModule,
    ContatoRoutingModule
  ],
  providers: [
    SessionStorageService,
    LocalStorageService,
    ContatoService,
    UtilContatoService
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContatoModule {}
