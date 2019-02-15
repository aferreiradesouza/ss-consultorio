import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'detalhes-page',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.component.scss']
})

export class DetalhesComponent implements OnInit {

  @Input() value: any;

  constructor(public router: Router,
              public modalController: ModalController,
              public storageService: LocalStorageService,
              public route: ActivatedRoute,
              public alertController: AlertController,
              public homeService: HomeService,
              public toastController: ToastController,
              public loadingController: LoadingController) {
  }

  ngOnInit() {
  }

  public formaterName(name) {
    const regex = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}?)/;
    return name.match(regex)[0];
  }

  public formaterData(data) {
    return moment(data).format('DD/MM/YYYY');
  }

  close() {
    this.modalController.dismiss();
  }

  async cancelarConsulta() {
    const loading = await this.loadingController.create({
      message: 'Enviando',
    });
    const alert = await this.alertController.create({
      header: 'Cancelar consulta',
      message: 'Você realmente deseja cancelar essa consulta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: async () => {
            await loading.present();
            const cancelamento = await this.homeService.cancelarConsulta(this.value.id);
            loading.dismiss();
            const toast = await this.toastController.create({
              message: cancelamento.mensagens[0],
              duration: 3000,
              color: 'dark'
            });
            if (cancelamento.sucesso) {
              toast.present();
              this.close();
            } else {
              toast.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
