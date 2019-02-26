import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'especialidades-page',
  templateUrl: './especialidades.page.html',
  styleUrls: ['./especialidades.component.scss']
})

export class EspecialidadeComponent implements OnInit {

  public formEspecialidades = new FormGroup({
    especialidade: new FormControl('', [Validators.required]),
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
    public fb: FormBuilder) {}

  ngOnInit() {
    this.obterDadosConsultas();
  }

  async obterDadosConsultas() {
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    const consultas = await this.agendarConsultaService.obterConsultorios();
    this.sessionStorage.setJson('consultorios', consultas);

    this.especialidades = await this.utilService.obterEspecialidades(consultas);
    console.log(this.especialidades);
    await loading.dismiss();
  }

  voltar() {
    this.navController.navigateBack('home');
  }
}
