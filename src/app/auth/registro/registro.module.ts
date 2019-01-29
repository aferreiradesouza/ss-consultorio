import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { RegistroRoutingModule } from './registro-routing.module';
import { ContaComponent } from './conta/conta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ContatoComponent } from './contato/contato.component';
import { ConfirmarCelularComponent } from './confirmar-celular/confirmar-celular.component';
import { ConfirmarSMSComponent } from './confirmar-sms/confirmar-sms.component';

@NgModule({
  declarations: [
      ContaComponent,
      PerfilComponent,
      ContatoComponent,
      ConfirmarCelularComponent,
      ConfirmarSMSComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RegistroRoutingModule,
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegistroModule {}
