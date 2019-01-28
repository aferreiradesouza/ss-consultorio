import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosComponent } from './dados/dados.component';
import { ConfirmarSMSComponent } from './confirmar-sms/confirmar-sms.component';
import { NovaSenhaComponent } from './nova-senha/nova-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'dados', pathMatch: 'full'},
  { path: 'dados', component: DadosComponent},
  { path: 'confirmar-sms', component: ConfirmarSMSComponent},
  { path: 'nova-senha', component: NovaSenhaComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class EsqueceuSenhaRoutingModule {}
