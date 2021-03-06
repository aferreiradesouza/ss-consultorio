import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'especialidades-page',
  templateUrl: './especialidades.page.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadeComponent implements OnInit {
  public formEspecialidades = new FormGroup({
    especialidade: new FormControl('', [Validators.required])
  });
  public user: any;
  public especialidades: any;

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService,
    public fb: FormBuilder,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.obterDadosConsultas();
  }

  async obterDadosConsultas() {
    if (this.sessionStorage.getJson('consultorios')) {
      const consultas = this.sessionStorage.getJson('consultorios');
      this.especialidades = await this.utilService.obterEspecialidades(
        consultas
      );
      this.preencherPasso();
    } else {
      const loading = await this.loadingController.create({
        message: 'Carregando...'
      });
      await loading.present();
      try {
        const consultas: any = await this.agendarConsultaService.obterConsultorios();
        if (consultas.sucesso) {
          this.sessionStorage.setJson('consultorios', consultas);

          this.especialidades = await this.utilService.obterEspecialidades(
            consultas
          );
        }
      } catch (err) {
        const toastErro = await this.toastController.create({
          message: 'Algo de errado aconteceu, tente novamente mais tarde.',
          duration: 3000,
          color: 'dark',
          showCloseButton: true,
          closeButtonText: 'Entendi'
        });
        toastErro.present();
      } finally {
        await loading.dismiss();
      }
    }
  }

  voltar() {
    this.navController.navigateBack('home');
  }

  proximoPasso() {
    this.gravar();
    this.router.navigate(['agendar-consulta', 'medico']);
  }

  gravar() {
    this.sessionStorage.remove('agendar-consulta/especialidade');
    this.sessionStorage.remove('agendar-consulta/especialidadeObj');
    this.sessionStorage.setJson(
      'agendar-consulta/especialidade',
      this.formEspecialidades.value
    );
    const obj = this.especialidades.filter(
      e => e.idEspecialidade === this.formEspecialidades.value.especialidade
    )[0].especialidade;
    this.sessionStorage.setJson('agendar-consulta/especialidadeObj', obj);
  }

  preencherPasso() {
    const i = this.sessionStorage.getJson('agendar-consulta/especialidade');

    if (i) {
      this.formEspecialidades.patchValue({
        especialidade: i.especialidade
      });
    }
  }
}
