import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { NavController, LoadingController } from '@ionic/angular';
import { UtilAgendarConsulta } from '../services/util.service';
import { AgendarConsultaService } from '../services/agendar-consulta.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'medico-page',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.component.scss']
})

export class MedicoComponent implements OnInit {

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
    this.obterMedicos();
  }

  obterMedicos() {
    console.log(':)');
  }
}
