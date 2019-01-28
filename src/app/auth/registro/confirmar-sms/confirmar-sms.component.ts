import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'confirmar-sms-page',
  templateUrl: './confirmar-sms.page.html',
  styleUrls: ['./confirmar-sms.component.scss']
})

export class ConfirmarSMSComponent implements OnInit {

  constructor(public router: Router, public toastController: ToastController) {}

  ngOnInit() {}

  ir() {
    this.router.navigate(['auth', 'registro', 'conta']);
  }

  voltar() {
    this.router.navigate(['auth', 'registro', 'contato']);
  }

  async reenviar() {
    const toast = await this.toastController.create({
      message: 'SMS enviado novamente.',
      duration: 2000,
      color: 'dark'
    });
    toast.present();
  }
}
