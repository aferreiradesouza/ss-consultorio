import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialidadeComponent } from './especialidades/especialidades.component';
import { MedicoComponent } from './medico/medico.component';
import { LugarComponent } from './lugar/lugar.component';
import { DiaConsultaComponent } from './dia-consulta/dia-consulta.component';
import { ConsultorioComponent } from './consultorio/consultorio.component';
import { ResumoComponent } from './resumo/resumo.component';

const routes: Routes = [
  { path: '', redirectTo: 'especialidade', pathMatch: 'full'},
  { path: 'especialidade', component: EspecialidadeComponent},
  { path: 'medico', component: MedicoComponent},
  { path: 'lugar', component: LugarComponent},
  { path: 'dia-consulta', component: DiaConsultaComponent},
  { path: 'consultorio', component: ConsultorioComponent},
  { path: 'resumo', component: ResumoComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AgendarConsultaRoutingModule {}
