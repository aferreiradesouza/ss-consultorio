import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { IHome } from 'src/shared/dto';
import { ModalController } from '@ionic/angular';
import { DetalhesComponent } from '../modal/detalhes.component';

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
              public modalController: ModalController) {
    this.menu = [
      {label: 'Agendar consulta', icon: 'create', url: 'agendar-consulta'},
      {label: 'Cancelar consulta', icon: 'close-circle', url: 'cancelar-consulta'},
      {label: 'Alterar perfil', icon: 'contact', url: 'alterar-perfil'},
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

  async modalDetalhes(detalhes) {
      const modal = await this.modalController.create({
        component: DetalhesComponent,
        componentProps: { value: detalhes }
      });
      return await modal.present();
  }
}
