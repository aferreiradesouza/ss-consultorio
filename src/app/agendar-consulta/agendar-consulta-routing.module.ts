import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadeComponent } from './especialidades/especialidades.component';

const routes: Routes = [
  { path: '', redirectTo: 'especialidade', pathMatch: 'full'},
  { path: 'especialidade', component: EspecialidadeComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AgendarConsultaRoutingModule {}
