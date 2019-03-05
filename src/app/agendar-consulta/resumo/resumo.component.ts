import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'resumo-page',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.component.scss']
})

export class ResumoComponent implements OnInit {

  public data: any;
  public lugar: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService) {
      this.data = this.sessionStorage.getJson('agendar-consulta/horario');
    }

  async ngOnInit() {
    this.lugar = await this.obterLugares();
    console.log(this.lugar);
  }

  get pegarData() {
    return moment(this.data.dia).utc().format('DD/MM/YYYY');
  }

  async obterLugares() {
    const dados = this.sessionStorage.getJson('consultorios');
    const especialidade = this.sessionStorage.getJson('agendar-consulta/especialidade');
    const medicos = this.sessionStorage.getJson('agendar-consulta/medicos');

    const lugares = await this.utilService.obterLugares(dados, especialidade.especialidade, medicos.medicos);

    return lugares.filter(e => e.idConsultorio === this.data.idLocal)[0];
  }
}
