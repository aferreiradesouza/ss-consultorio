import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { NgxMaskModule } from 'ngx-mask';
import { HomeComponent } from './inicio/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeResolver } from './inicio/home.resolver';
import { HomeService } from './services/home.service';

@NgModule({
  declarations: [
      HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxMaskModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  providers: [
    SessionStorageService,
    LocalStorageService,
    HomeResolver,
    HomeService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule {}
