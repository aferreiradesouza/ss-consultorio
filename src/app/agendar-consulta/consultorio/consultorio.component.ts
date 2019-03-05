import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'consultorio-page',
  templateUrl: './consultorio.page.html',
  styleUrls: ['./consultorio.component.scss']
})

export class ConsultorioComponent implements OnInit {

  public data: any;
  public itens: any;
  public horarioSelecionado = null;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService,
    public fb: FormBuilder) {
      this.data = this.sessionStorage.getJson('agendar-consulta/data-consulta');
    }

  async ngOnInit() {
    this.itens = await this.utilService.formaterLugares(this.data.medicos, this.data.dataCompleta);
  }

  salvarSelect(horario) {
    if (horario) {
      this.horarioSelecionado = horario;
      this.sessionStorage.setJson('agendar-consulta/horario', horario);
    } else {
      this.horarioSelecionado = horario;
    }
  }

  proximoPasso() {
    this.router.navigate(['agendar-consulta', 'resumo']);
  }

  fechar() {
    sessionStorage.clear();
    this.router.navigate(['home']);
  }

}
