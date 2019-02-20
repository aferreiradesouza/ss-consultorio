import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
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

  constructor(public router: Router,
    public storageService: LocalStorageService,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public homeService: HomeService,
    public loadingController: LoadingController,
    public utilService: UtilHomeService,
    public navController: NavController) {

    this.tabs = [
      { label: 'Próximas consultas', id: '1' },
      { label: 'Consultas finalizadas', id: '2' }
    ];

  }

  ngOnInit() {
    this.obterLista();
  }

  async obterTabAtual(id) {
    if (id === '1') {
      this.agenda = await this.utilService.formatarConsultas(this.dados.objeto, 'proximas');
    } else {
      this.agenda = await this.utilService.formatarConsultas(this.dados.objeto, 'anteriores');
    }
  }

  voltar() {
    this.navController.pop();
  }

  async obterLista() {
    const loading = await this.loadingController.create({
      message: 'Buscando sua agenda',
    });
    await loading.present();
    this.dados = await this.homeService.obterConsultas();
    await loading.dismiss();
    this.obterTabAtual('1');
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
      this.dados = await this.homeService.obterConsultas();
      await loading.dismiss();
    }
  }
}
