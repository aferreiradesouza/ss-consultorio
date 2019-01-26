import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './inicio/auth.component';
import { LoginComponent } from './login/login.component';
import { EsqueceuSenhaComponent } from './esqueceu-senha/esqueceu-senha.component';

const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroModule' },
  { path: 'esqueceu-senha', component: EsqueceuSenhaComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule {}
