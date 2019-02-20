import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { timer } from 'rxjs';

@Component({
  selector: 'editar-page',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.component.scss']
})

export class EditarComponent implements OnInit {

  @Input() title: any;
  @Input() label: any;
  @Input() action: any;

  constructor(public router: Router,
              public modalController: ModalController,
              public storageService: LocalStorageService,
              public route: ActivatedRoute,
              public alertController: AlertController,
              public toastController: ToastController,
              public loadingController: LoadingController) {
  }

  ngOnInit() {
    console.log(this.label, this.action, this.title);
  }

  close() {
    this.modalController.dismiss({
      'result': 'fechar'
    });
  }

  async editar() {
    const toast = await this.toastController.create({
      message: 'Foi',
      duration: 3000,
      color: 'dark'
    });
    toast.present();
  }

}
