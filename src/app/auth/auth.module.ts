import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './inicio/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';
import { ComponentsModule } from 'src/shared/components/components.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistroComponent,
    EsqueceuSenhaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ComponentsModule
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule {}
