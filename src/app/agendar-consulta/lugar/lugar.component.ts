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
  selector: 'lugar-page',
  templateUrl: './lugar.page.html',
  styleUrls: ['./lugar.component.scss']
})

export class LugarComponent implements OnInit {

  public data: Consultorios;
  public lugares: any;
  public lugaresSelect: any;

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

      if (this.sessionStorage.has('agendar-consulta/lugares')) {
        this.lugaresSelect = this.sessionStorage.getJson('agendar-consulta/lugares').lugares;
      } else {
        this.lugaresSelect = [];
      }

    }

  async ngOnInit() {

    // verificarSession

    await this.obterLugares();
  }

  async obterLugares() {
    const especialidade = this.sessionStorage.getJson('agendar-consulta/especialidade').especialidade;
    const medicos = this.sessionStorage.getJson('agendar-consulta/medicos').medicos;
    this.lugares = await this.utilService.obterLugares(this.data, especialidade, medicos);
  }

  selecionarTodos() {
    if (this.lugaresSelect.length < this.lugares.length) {
      this.lugaresSelect = [];
      this.lugares.forEach(f => {
        this.lugaresSelect.push(f.consultorio.id);
      });
    } else {
      this.lugaresSelect = [];
    }
  }

  public selectModel(model) {
    if (this.lugaresSelect.length === 0) {
      this.lugaresSelect.push(model);
    } else {
      let temIgual = false;
      this.lugaresSelect.forEach((f, index) => {
        if (f === model) {
          temIgual = true;
          this.lugaresSelect.splice(index, 1);
        }
      });
      if (!temIgual) {
        this.lugaresSelect.push(model);
      }
    }
  }

  public proximoPasso() {
    this.sessionStorage.setJson('agendar-consulta/lugares', { lugares: this.lugaresSelect });
    this.router.navigate(['agendar-consulta', 'dia-consulta']);
  }

  public preencherPasso(id) {
    this.verificarOptions();
    let permitir;
    this.lugaresSelect.forEach(f => {
      if (f === id) {
        permitir = true;
      }
    });
    return permitir;
  }

  verificarOptions() {
    this.lugaresSelect.forEach((e, index) => {
      let count = 0;
      this.lugares.forEach(f => {
        if (f.idConsultorio === e) {
          count += 1;
        }
      });
      if (count === 0) {
        this.lugaresSelect.splice(index, 1);
      }
    });
    this.sessionStorage.setJson('agendar-consulta/lugares', { lugares: this.lugaresSelect });
  }
}
