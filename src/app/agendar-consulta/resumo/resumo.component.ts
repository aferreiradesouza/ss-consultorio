import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'resumo-page',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.component.scss']
})
export class ResumoComponent implements OnInit {
  public maskTelefone = ['(00) 0000-0000'];
  public maskCelular = ['(00) 00000-0000'];
  public data: any;
  public lugar: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService,
    public toastController: ToastController,
    public alertController: AlertController) {
      this.data = this.sessionStorage.getJson('agendar-consulta/horario');
    }

  async ngOnInit() {
    this.lugar = await this.obterLugares();
    console.log(this.lugar);
  }

  get pegarData() {
    return moment(this.data.dia)
      .utc()
      .format('DD/MM/YYYY');
  }

  async obterLugares() {
    const dados = this.sessionStorage.getJson('consultorios');
    const especialidade = this.sessionStorage.getJson(
      'agendar-consulta/especialidade'
    );
    const medicos = this.sessionStorage.getJson('agendar-consulta/medicos');

    const lugares = await this.utilService.obterLugares(
      dados,
      especialidade.especialidade,
      medicos.medicos
    );

    return lugares.filter(e => e.idConsultorio === this.data.idLocal)[0];
  }

  fechar() {
    sessionStorage.clear();
    this.router.navigate(['home']);
  }

  async criarConsulta() {
    const especialidade = this.sessionStorage.getJson('agendar-consulta/especialidadeObj');

    // FIX ME: idTipoConsulta, observacao, ehEncaixe
    const response = {
      idMedico: this.data.idMedico,
      idLocal: this.data.idLocal,
      idEspecialidade: especialidade.id,
      idTipoConsulta: 0,
      data: this.data.dia,
      hora: this.data.horario,
      observacao: '',
      ehEncaixe: true
    };

    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });

    const alert = await this.alertController.create({
      header: 'Confirmar agendamento',
      message: 'Iremos entrar em contato para confirmar o agendamento',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: async () => {
            await loading.present();
            try {
              const consulta = await this.agendarConsultaService.criarConsulta(response);
              if (consulta.sucesso) {
                const toast = await this.toastController.create({
                  message: 'Consulta criada com sucesso',
                  duration: 3000,
                  color: 'dark'
                });
                toast.present();
                sessionStorage.clear();
                this.router.navigate(['home']);
              } else {
                const toast = await this.toastController.create({
                  message: consulta.mensagens[0] || 'Aconteceu algo de errado',
                  duration: 3000,
                  color: 'dark'
                });
                toast.present();
              }
            } catch (err) {
              const toast = await this.toastController.create({
                message: 'Algo de errado aconteceu, tente novamente mais tarde',
                duration: 3000,
                color: 'dark'
              });
              toast.present();
            } finally {
              loading.dismiss();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
