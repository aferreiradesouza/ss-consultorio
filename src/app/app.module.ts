import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { AutenticacaoService } from 'src/shared/service/autenticacao.service';
import { TokenService } from 'src/shared/service/token.service';
import { GuardService } from 'src/shared/guard/auth.guard';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { PerfilModule } from './perfil/perfil.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HomeModule, PerfilModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AuthModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TokenService,
    AutenticacaoService,
    GuardService,
    CurrentUserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
