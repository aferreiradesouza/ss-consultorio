import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { RegistroRoutingModule } from './registro-routing.module';
import { ContaComponent } from './conta/conta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ContatoComponent } from './contato/contato.component';

@NgModule({
  declarations: [
      ContaComponent,
      PerfilComponent,
      ContatoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RegistroRoutingModule
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegistroModule {}
