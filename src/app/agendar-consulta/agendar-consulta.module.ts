import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/shared/components/components.module';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { NgxMaskModule } from 'ngx-mask';
import { AgendarConsultaRoutingModule } from './agendar-consulta-routing.module';
import { EspecialidadeComponent } from './especialidades/especialidades.component';
import { AgendarConsultaService } from './services/agendar-consulta.service';
import { UtilAgendarConsulta } from './services/util.service';
import { MedicoComponent } from './medico/medico.component';
import { LugarComponent } from './lugar/lugar.component';
import { DiaConsultaComponent } from './dia-consulta/dia-consulta.component';
import { ConsultorioComponent } from './consultorio/consultorio.component';
import { ResumoComponent } from './resumo/resumo.component';

@NgModule({
  declarations: [
    EspecialidadeComponent,
    MedicoComponent,
    LugarComponent,
    DiaConsultaComponent,
    ConsultorioComponent,
    ResumoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    NgxMaskModule,
    ReactiveFormsModule,
    AgendarConsultaRoutingModule,
  ],
  providers: [
    SessionStorageService,
    LocalStorageService,
    AgendarConsultaService,
    UtilAgendarConsulta
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AgendarConsultaModule {}
