import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './inicio/home.component';
import { GuardService } from 'src/shared/guard/auth.guard';
import { HomeResolver } from './inicio/home.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, resolve: {data: HomeResolver}, runGuardsAndResolvers: 'always', canActivate: [GuardService]},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {}
