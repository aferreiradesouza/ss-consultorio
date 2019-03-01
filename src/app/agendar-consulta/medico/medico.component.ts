import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Consultorios } from 'src/shared/dto';

@Component({
  selector: 'medico-page',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.component.scss']
})

export class MedicoComponent implements OnInit {

  public data: Consultorios;
  public medicos: any;
  public medicosSelect: any[];

  constructor(
    public router: Router,
    public userService: CurrentUserService,
    public sessionStorage: SessionStorageService,
    public navController: NavController,
    public loadingController: LoadingController,
    public utilService: UtilAgendarConsulta,
    public agendarConsultaService: AgendarConsultaService,
    public fb: FormBuilder) {

      this.data = this.sessionStorage.getJson('consultorios');

    }

  ngOnInit() {

    // verificarSession
    if ( this.sessionStorage.has('agendar-consulta/medicos')) {
      this.medicosSelect = this.sessionStorage.getJson('agendar-consulta/medicos').medicos;
    } else {
      this.medicosSelect = [];
    }

    this.obterMedicos();
  }

  selecionarTodos() {
    if (this.medicosSelect.length < this.medicos.length) {
      this.medicosSelect = [];
      this.medicos.forEach(f => {
        this.medicosSelect.push(f.usuario.id);
      });
    } else {
      this.medicosSelect = [];
    }
  }

  async obterMedicos() {
    // tslint:disable-next-line:max-line-length
    this.medicos = await this.utilService.obterMedicos(this.data, this.sessionStorage.getJson('agendar-consulta/especialidade').especialidade);
  }

  public alterarModel(model) {
    if (this.medicosSelect.length === 0) {
      this.medicosSelect.push(model);
    } else {
      let temIgual = false;
      this.medicosSelect.forEach((f, index) => {
        if (f === model) {
          temIgual = true;
          this.medicosSelect.splice(index, 1);
        }
      });
      if (!temIgual) {
        this.medicosSelect.push(model);
      }
    }
  }

  public proximoPasso() {
    this.sessionStorage.setJson('agendar-consulta/medicos', { medicos: this.medicosSelect });
    this.router.navigate(['agendar-consulta', 'lugar']);
  }

  public preencherPasso(id) {
    this.verificarOptions();
    let permitir;
    this.medicosSelect.forEach(f => {
      if (f === id) {
        permitir = true;
      }
    });
    return permitir;
  }

  verificarOptions() {
    this.medicosSelect.forEach((e, index) => {
      let count = 0;
      this.medicos.forEach(f => {
        if (f.idUsuario === e) {
          count += 1;
        }
      });
      if (count === 0) {
        this.medicosSelect.splice(index, 1);
      }
    });
    this.sessionStorage.setJson('agendar-consulta/medicos', { medicos: this.medicosSelect });
  }
}
