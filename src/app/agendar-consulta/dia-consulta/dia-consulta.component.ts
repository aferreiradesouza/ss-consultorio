import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { FormBuilder } from '@angular/forms';
import { Consultorios } from 'src/shared/dto';

@Component({
  selector: 'dia-consulta-page',
  templateUrl: './dia-consulta.page.html',
  styleUrls: ['./dia-consulta.component.scss']
})

export class DiaConsultaComponent implements OnInit {

  public data: Consultorios;
  public medicos: any;
  public medicosSelect: any[];

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService,
    public fb: FormBuilder) {

      this.data = this.sessionStorage.getJson('consultorios');

    }

  ngOnInit() {
    this.obterDatasConsulta();
  }

  async obterDatasConsulta() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    loading.present();
    const especialidade = this.sessionStorage.getJson('agendar-consulta/especialidade').especialidade;
    const lugares = this.sessionStorage.getJson('agendar-consulta/lugares').lugares;
    const medico = this.sessionStorage.getJson('agendar-consulta/medicos').medicos;

    const response = {
      medicos: medico,
      locais: lugares,
      idEspecialidade: especialidade,
      data: new Date()
    };

    const agenda = await this.agendarConsultaService.obterDiasConsulta(response);
    console.log(agenda);
    loading.dismiss();
  }
}
