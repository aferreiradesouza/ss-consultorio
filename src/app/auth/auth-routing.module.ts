import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './inicio/auth.component';
import { LoginComponent } from './login/login.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { ConfirmacaoResolver } from './confirmacao/confirmacao.resolver';

const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroModule' },
  { path: 'esqueceu-senha', loadChildren: './esqueceu-senha/esqueceu-senha.module#EsqueceuSenhaModule' },
  { path: 'confirmacao', component: ConfirmacaoComponent, resolve: {data: ConfirmacaoResolver}},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
