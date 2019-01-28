import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { EsqueceuSenhaRoutingModule } from './esqueceu-senha-routing.module';
import { DadosComponent } from './dados/dados.component';
import { ConfirmarSMSComponent } from './confirmar-sms/confirmar-sms.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';

@NgModule({
  declarations: [
      DadosComponent,
      ConfirmarSMSComponent,
      NovaSenhaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    EsqueceuSenhaRoutingModule
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EsqueceuSenhaModule {}
