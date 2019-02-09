import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './inicio/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'src/shared/components/components.module';
import { RegistroModule } from './registro/registro.module';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { NgxMaskModule } from 'ngx-mask';
import { EsqueceuSenhaModule } from './esqueceu-senha/esqueceu-senha.module';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ComponentsModule,
    RegistroModule,
    NgxMaskModule,
    ReactiveFormsModule,
    EsqueceuSenhaModule,
  ],
  providers: [
    SessionStorageService,
    LocalStorageService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule {}
