import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { IHome } from 'src/shared/dto';
import { ModalController, LoadingController } from '@ionic/angular';
import { DetalhesComponent } from '../modal/detalhes.component';
import { HomeService } from '../services/home.service';
import { UtilHomeService } from '../services/util.service';
import { CurrentUserService } from 'src/shared/service/currentUser.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public dados: any;
  public menu: any[];
  public tabs: any[];
  public agenda = [];
  public user: any;
  public idAtual: string;

  constructor(public router: Router,
              public storageService: LocalStorageService,
              public route: ActivatedRoute,
              public modalController: ModalController,
              public homeService: HomeService,
              public loadingController: LoadingController,
              public utilService: UtilHomeService,
              public userService: CurrentUserService) {
    this.menu = [
      {label: 'Agendar consulta', icon: 'create', url: 'agendar-consulta'},
      {label: 'Alterar perfil', icon: 'contact', url: 'perfil'},
      {label: 'Consultórios', icon: 'call', url: 'contato'},
    ];

    this.tabs = [
      {label: 'Próximas consultas', id: '1'},
      {label: 'Consultas finalizadas', id: '2'}
    ];
  }

  ngOnInit() {
    this.obterConsultas();
  }

  async obterConsultas() {
    const loading = await this.loadingController.create({
      message: 'Buscando sua agenda',
    });
    await loading.present();
    this.dados = await this.homeService.obterConsultas();
    await loading.dismiss();
    this.obterTabAtual('1');
  }

  async obterTabAtual(id) {
    if (id === '1') {
      this.idAtual = '1';
      this.agenda = await this.utilService.formatarConsultas(this.dados.objeto, 'proximas');
    } else {
      this.idAtual = '2';
      this.agenda = await this.utilService.formatarConsultas(this.dados.objeto, 'anteriores');
    }
  }

  deslogar() {
    this.router.navigate(['auth']);
    localStorage.removeItem('user');
  }

  atualizarLista(event) {
      setTimeout(async () => {
        this.dados = await this.homeService.obterConsultas();
        this.obterTabAtual(this.idAtual);
        event.target.complete();
      }, 2000);
  }

  verAgendaCompleta() {
    this.router.navigate(['agenda-completa']);
  }

  get formatarNome() {
    return this.userService.user.nome.split(' ')[0] || '';
  }

  async modalDetalhes(detalhes) {
      const modal = await this.modalController.create({
        component: DetalhesComponent,
        componentProps: { value: detalhes }
      });
      await modal.present();
      const {data} = await modal.onDidDismiss();
      if (data.result === 'cancelar') {
        this.dados = [];
        const loading = await this.loadingController.create({
          message: 'Atualizando',
        });
        await loading.present();
        this.dados = await this.homeService.obterConsultas();
        this.obterTabAtual(this.idAtual);
        await loading.dismiss();
      }
      console.log( data );
  }
}
