import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IConfirmacao } from 'src/shared/dto';
import { AuthService } from '../service/auth.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'confirmacao-page',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.component.scss']
})

export class ConfirmacaoComponent implements OnInit {

  public data: IConfirmacao;
  public enviado: boolean;
  public loading: boolean;

  constructor(public router: Router,
              public route: ActivatedRoute,
              public authService: AuthService,
              public sessionStorage: SessionStorageService) {
    this.loading = true;
    this.enviado = false;
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    setTimeout(() => {
      this.loading = false;
      this.enviado = true;
      setTimeout(() => {
        console.log('logado!');
      }, 1000 );
    }, 2000 );
  }

  voltar() {
    this.router.navigate(['auth']);
  }
}
