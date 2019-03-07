import {
  Component,
  OnInit,
  AfterContentChecked,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import {
  ModalController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { DetalhesComponent } from '../modal/detalhes.component';
import { HomeService } from '../services/home.service';
import { UtilHomeService } from '../services/util.service';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('homeElement') homeElement: ElementRef;
  public dados: any;
  public menu: any[];
  public tabs: any[];
  public agenda = [];
  public user: any;
  public idAtual: string;
  public tentarNovamente = false;
  public nenhumaConsulta = false;

  constructor(
    public router: Router,
    public storageService: LocalStorageService,
    public route: ActivatedRoute,
    public modalController: ModalController,
    public homeService: HomeService,
    public loadingController: LoadingController,
    public utilService: UtilHomeService,
    public userService: CurrentUserService,
    public toastController: ToastController
  ) {
    this.menu = [
      { label: 'Agendar consulta', icon: 'create', url: 'agendar-consulta' },
      { label: 'Alterar perfil', icon: 'contact', url: 'perfil' },
      { label: 'Consultórios', icon: 'business', url: 'contato' }
    ];

    this.tabs = [
      { label: 'Próximas consultas', id: '1' },
      { label: 'Consultas finalizadas', id: '2' }
    ];
  }

  verificar() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          if (this.router.url === '/home/reload') {
            console.log('reload');
            this.obterConsultas();
          }
        }
      });
    }, options);

    observer.observe(this.homeElement.nativeElement);
  }

  ngOnInit() {
    if (this.router.url !== '/home/reload') {
      this.obterConsultas();
    }

    this.verificar();
  }

  async obterConsultas() {
    const loading = await this.loadingController.create({
      message: 'Buscando sua agenda'
    });
    await loading.present();
    try {
      this.dados = await this.homeService.obterConsultas();

      if (this.dados !== undefined) {
        this.tentarNovamente = false;
        this.obterTabAtual('1');
      }
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

  async obterTabAtual(id) {
    if (id === '1') {
      this.idAtual = '1';
      this.agenda = await this.utilService.formatarConsultas(
        this.dados.objeto,
        'proximas'
      );
    } else {
      this.idAtual = '2';
      this.agenda = await this.utilService.formatarConsultas(
        this.dados.objeto,
        'anteriores'
      );
    }
    if (this.agenda.length === 0) {
      this.nenhumaConsulta = true;
    } else {
      this.nenhumaConsulta = false;
    }
  }

  agendarConsulta() {
    this.router.navigate(['agendar-consulta']);
  }

  deslogar() {
    this.router.navigate(['auth']);
    sessionStorage.clear();
    localStorage.clear();
  }

  atualizarLista(event) {
    setTimeout(async () => {
      try {
        this.tentarNovamente = false;
        this.dados = await this.homeService.obterConsultas();
        this.obterTabAtual(this.idAtual);
        event.target.complete();
      } catch (err) {
        this.tentarNovamente = true;
        const erro = await this.toastController.create({
          message:
            'Não foi possível atualizar sua lista no momento, tente novamente mais tarde',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
        event.target.complete();
      }
    }, 2000);
  }

  verAgendaCompleta() {
    this.router.navigate(['agenda-completa']);
  }

  get formatarNome() {
    if (this.userService.user != null) {
      return this.userService.user.nome.split(' ')[0] || '';
    } else {
      return '';
    }
  }

  tentarNovamenteAction() {
    this.obterConsultas();
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
        message: 'Atualizando'
      });
      await loading.present();
      try {
        this.dados = await this.homeService.obterConsultas();
        this.tentarNovamente = false;
        this.obterTabAtual(this.idAtual);
      } catch (err) {
        this.tentarNovamente = true;
        const erro = await this.toastController.create({
          message:
            'Não foi possível atualizar sua lista no momento, tente novamente mais tarde',
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        erro.present();
      } finally {
        await loading.dismiss();
      }
    }
    console.log(data);
  }
}
