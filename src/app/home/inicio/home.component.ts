import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { IHome } from 'src/shared/dto';
import { ModalController, LoadingController } from '@ionic/angular';
import { DetalhesComponent } from '../modal/detalhes.component';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public data: IHome;
  public menu: any[];
  public tabs: any[];

  constructor(public router: Router,
              public storageService: LocalStorageService,
              public route: ActivatedRoute,
              public modalController: ModalController,
              public homeService: HomeService,
              public loadingController: LoadingController) {
    this.menu = [
      {label: 'Agendar consulta', icon: 'create', url: 'agendar-consulta'},
      {label: 'Alterar perfil', icon: 'contact', url: 'alterar-perfil'},
      {label: 'Contato', icon: 'contact', url: 'contato'},
    ];

    this.tabs = [
      {label: 'Próximas consultas', id: '1'},
      {label: 'Consultas anteriores', id: '2'}
    ];
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    console.log(this.data.consultas);
  }

  deslogar() {
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }

  atualizarLista(event) {
      setTimeout(async () => {
        this.data.consultas = await this.homeService.obterConsultas();
        event.target.complete();
      }, 2000);
  }

  get formatarNome() {
    return this.data.currentUser.nome.split(' ')[0];
  }

  async modalDetalhes(detalhes) {
      const modal = await this.modalController.create({
        component: DetalhesComponent,
        componentProps: { value: detalhes }
      });
      await modal.present();
      const {data} = await modal.onDidDismiss();
      if (data.result === 'cancelar') {
        this.data.consultas = [];
        const loading = await this.loadingController.create({
          message: 'Atualizando',
        });
        await loading.present();
        this.data.consultas = await this.homeService.obterConsultas();
        await loading.dismiss();
      }
      console.log( data );
  }
}
