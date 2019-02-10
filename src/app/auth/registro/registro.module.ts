import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { RegistroRoutingModule } from './registro-routing.module';
import { ContaComponent } from './conta/conta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ContatoComponent } from './contato/contato.component';
import { ConfirmarCelularComponent } from './confirmar-celular/confirmar-celular.component';
import { ConfirmarSMSComponent } from './confirmar-sms/confirmar-sms.component';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmacaoResolver } from '../confirmacao/confirmacao.resolver';
import { AuthService } from '../service/auth.service';
import { ConfirmarSmsResolver } from './confirmar-sms/confirmar-sms.resolver';

@NgModule({
  declarations: [
      ContaComponent,
      PerfilComponent,
      ContatoComponent,
      ConfirmarCelularComponent,
      ConfirmarSMSComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RegistroRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
  providers: [
    ConfirmacaoResolver,
    AuthService,
    ConfirmarSmsResolver,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegistroModule {}
