import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { FormBuilder } from '@angular/forms';
import { Consultorios } from 'src/shared/dto';
import * as moment from 'moment';

@Component({
  selector: 'dia-consulta-page',
  templateUrl: './dia-consulta.page.html',
  styleUrls: ['./dia-consulta.component.scss']
})
export class DiaConsultaComponent implements OnInit {
  public data: Consultorios;
  public diasDisponiveis: any;
  public dia: any;
  public mesAtual: any;
  public anoAtual: any;
  public codMesAtual: any;
  public diasMesPassado: any;
  public diasNoMes: any;
  public dataSelecionada: any;
  public diasSemana: any;
  public permitirMesAnterior: any;
  public listaMedicos: any;
  public agenda: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService,
    public fb: FormBuilder,
    public toastController: ToastController
  ) {
    this.data = this.sessionStorage.getJson('consultorios');
    this.diasSemana = this.utilService.obterDiasSemana();
  }

  ngOnInit() {
    this.obterDatasConsulta(new Date());
  }

  async obterDatasConsulta(data) {
    this.dia = data;
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    loading.present();
    const especialidade = this.sessionStorage.getJson(
      'agendar-consulta/especialidade'
    ).especialidade;
    const lugares = this.sessionStorage.getJson('agendar-consulta/lugares')
      .lugares;
    const medico = this.sessionStorage.getJson('agendar-consulta/medicos')
      .medicos;

    const response = {
      medicos: medico,
      locais: lugares,
      idEspecialidade: especialidade,
      data: data
    };

    try {
      this.agenda = await this.agendarConsultaService.obterDiasConsulta(response);
      this.diasDisponiveis = await this.utilService.obterDiasDisponiveis(
        this.agenda
      );
      this.criarCalendario(data);
    } catch (err) {
      const toastErro = await this.toastController.create({
        message: 'Algo de errado aconteceu, tente novamente mais tarde',
        duration: 3000,
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'Entendi'
      });
      toastErro.present();
    } finally {
      loading.dismiss();
    }
  }

  mudarMes(data) {
    this.obterDatasConsulta(data);
  }

  criarCalendario(data) {
    this.mesAtual = this.utilService.formatterMes(data.getMonth()).nome;
    this.anoAtual = data.getFullYear();
    this.codMesAtual = data.getMonth();

    this.diasMesPassado = [];
    this.diasNoMes = [];
    const primeiraDataMes = this.obterDataMes(data);
    const totalDiasMesPassado = this.obterDiasMesPassado(data);

    for (
      let o = totalDiasMesPassado - (primeiraDataMes - 1);
      o <= totalDiasMesPassado;
      o++
    ) {
      this.diasMesPassado.push(o);
    }

    for (let i = 1; i <= this.utilService.pegarMesDatas(data.getMonth()); i++) {
      const objtCalendario = {
        dia: i,
        codDiaSemana: new Date(this.anoAtual, this.codMesAtual, i).getDay(),
        codMes: new Date(this.anoAtual, this.codMesAtual, i).getMonth(),
        dataCompleta: new Date(this.anoAtual, this.codMesAtual, i)
      };
      this.diasNoMes.push(objtCalendario);
    }

    this.verificarDiasDisponiveis(this.diasNoMes);
    this.verificarMesAtual();
  }

  verificarMesAtual() {
    const diaAtual = moment(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    ).format('DD/MM/YYYY');
    const dia = moment(new Date(this.anoAtual, this.codMesAtual - 1, 1)).format(
      'DD/MM/YYYY'
    );

    if (dia < diaAtual) {
      this.permitirMesAnterior = false;
    } else {
      this.permitirMesAnterior = true;
    }
  }

  obterDiasMesPassado(data) {
    return this.utilService.pegarMesDatas(
      data.getMonth() === 0 ? 11 : data.getMonth() - 1
    );
  }

  obterDataMes(data) {
    return new Date(data.getFullYear(), data.getMonth(), 1).getDay();
  }

  async alterarMes(tipo) {
    if (tipo === 'next') {
      if (this.codMesAtual === 11) {
        this.codMesAtual = 0;
        this.anoAtual += 1;
      } else {
        this.codMesAtual += 1;
      }
    } else {
      if (this.codMesAtual === 0) {
        this.codMesAtual = 11;
        this.anoAtual -= 1;
      } else {
        this.codMesAtual -= 1;
      }
    }
    this.updateMes(this.codMesAtual);
    this.obterDatasConsulta(new Date(this.anoAtual, this.codMesAtual, 1));
  }

  verificarDiasDisponiveis(dias) {
    const diaHoje = new Date(2019, 4, 1);
    dias.forEach(f => {
      let count = 0;
      this.diasDisponiveis.forEach(e => {
        if (f.dia === parseInt(e.dia, 10)) {
          count += 1;
        }
      });
      f.disponivel = count > 0 ? true : false;
    });
  }

  async selecionarData(data) {
    if (!data.disponivel) {
      return;
    }

    setTimeout(() => {
      window.document
        .getElementsByClassName('wrapper')[0]
        .scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
    }, 200);

    this.dataSelecionada = data;
    this.listaMedicos = await this.utilService.obterMedicosDaDataSelecionada(
      this.agenda,
      this.dataSelecionada
    );
  }

  updateMes(novoMes) {
    this.mesAtual = this.utilService.formatterMes(novoMes).nome;
  }

  proximoPasso() {
    this.dataSelecionada.medicos = this.listaMedicos;

    this.sessionStorage.setJson(
      'agendar-consulta/data-consulta',
      this.dataSelecionada
    );
    this.sessionStorage.setJson(
      'agendar-consulta/data-consulta',
      this.dataSelecionada
    );
    this.router.navigate(['agendar-consulta', 'consultorio']);
  }

  fechar() {
    sessionStorage.clear();
    this.navController.navigateBack('home');
  }
}
