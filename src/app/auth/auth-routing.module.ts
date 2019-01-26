import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './inicio/auth.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';

const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
