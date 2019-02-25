import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './inicio/home.component';
import { GuardService } from 'src/shared/guard/auth.guard';
import { AgendaCompletaComponent } from './agenda-completa/agenda-completa.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'agenda-completa', component: AgendaCompletaComponent }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {}
