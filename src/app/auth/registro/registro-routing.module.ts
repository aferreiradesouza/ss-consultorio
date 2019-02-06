import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './conta/conta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ContatoComponent } from './contato/contato.component';
import { ConfirmarCelularComponent } from './confirmar-celular/confirmar-celular.component';
import { ConfirmarSMSComponent } from './confirmar-sms/confirmar-sms.component';

const routes: Routes = [
  { path: '', redirectTo: 'conta', pathMatch: 'full'},
  { path: 'conta', component: ContaComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'confirmar-celular', component: ConfirmarCelularComponent},
  { path: 'confirmar-sms', component: ConfirmarSMSComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class RegistroRoutingModule {}
