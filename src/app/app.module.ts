import { NgModule, ErrorHandler } from '@angular/core';
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
import { SplashComponent } from './splashscreen/splash.component';
import { AgendarConsultaModule } from './agendar-consulta/agendar-consulta.module';
import { GlobalErrorHandler } from 'src/shared/globalErrorHandler';

@NgModule({
  declarations: [AppComponent, SplashComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HomeModule,
    PerfilModule,
    AgendarConsultaModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
