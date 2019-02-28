import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from 'src/shared/guard/auth.guard';
import { SplashComponent } from './splashscreen/splash.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'splash/:url', component: SplashComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule'},
  { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilModule' },
  { path: 'contato', loadChildren: './contato/contato.module#ContatoModule' },
  { path: 'agendar-consulta', loadChildren: './agendar-consulta/agendar-consulta.module#AgendarConsultaModule' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
