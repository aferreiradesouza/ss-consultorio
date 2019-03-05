import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { HomeService } from '../services/home.service';
import { Consultas } from 'src/shared/dto';
import { DetalhesComponent } from '../modal/detalhes.component';
import { UtilHomeService } from '../services/util.service';
import * as moment from 'moment';

@Component({
  selector: 'agenda-completa-page',
  templateUrl: './agenda-completa.page.html',
  styleUrls: ['./agenda-completa.component.scss']
})

export class AgendaCompletaComponent implements OnInit {

  public dados: any;
  public tabs: any[];
  public agenda: any;
  public tentarNovamente = false;
  public nenhumaConsulta = false;
  public idAtual: any;

  constructor(public router: Router,
    public storageService: LocalStorageService,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public homeService: HomeService,
    public loadingController: LoadingController,
    public utilService: UtilHomeService,
    public navController: NavController,
    public toastController: ToastController) {

    this.tabs = [
      { label: 'Próximas consultas', id: '1' },
      { label: 'Consultas finalizadas', id: '2' }
    ];

  }

  ngOnInit() {
    this.obterLista();
  }

  async obterTabAtual(id) {
    if (!this.dados) {
      return;
    }
    if (id === '1') {
      this.idAtual = '1';
      this.agenda = await this.utilService.formatarConsultas(this.dados.objeto, 'proximas');
    } else {
      this.idAtual = '2';
      this.agenda = await this.utilService.formatarConsultas(this.dados.objeto, 'anteriores');
    }
    if (this.agenda.length === 0) {
      this.nenhumaConsulta = true;
    } else {
      this.nenhumaConsulta = false;
    }
  }

  voltar() {
    this.navController.navigateBack('home');
  }

  agendarConsulta() {
    this.router.navigate(['agendar-consulta']);
  }

  tentarNovamenteAction() {
    this.obterLista();
  }

  async obterLista() {
    const loading = await this.loadingController.create({
      message: 'Buscando sua agenda',
    });
    await loading.present();
    try {
      this.dados = await this.homeService.obterConsultas();
      this.tentarNovamente = false;
      this.obterTabAtual('1');
    } catch (err) {
      this.tentarNovamente = true;
      const erro = await this.toastController.create({
        message: 'Algo de errado aconteceu, tente novamente mais tarde',
        color: 'dark',
        showCloseButton: true,
        closeButtonText: 'Entendi'
      });
      erro.present();
    } finally {
      await loading.dismiss();
    }
  }

  async modalDetalhes(detalhes) {
    const modal = await this.modalController.create({
      component: DetalhesComponent,
      componentProps: { value: detalhes }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data.result === 'cancelar') {
      this.dados = [];
      const loading = await this.loadingController.create({
        message: 'Atualizando',
      });
      await loading.present();
      try {
        this.dados = await this.homeService.obterConsultas();
        this.tentarNovamente = false;
        this.obterTabAtual('1');
      } catch (err) {
        this.tentarNovamente = true;
        const erro = await this.toastController.create({
          message: 'Não foi possível atualizar sua lista no momento, tente novamente mais tarde',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      } finally {
        await loading.dismiss();
      }
    }
  }
}
