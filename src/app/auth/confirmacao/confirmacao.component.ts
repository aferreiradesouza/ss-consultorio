import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IConfirmacao } from 'src/shared/dto';
import { AuthService } from '../service/auth.service';
import { SessionStorageService } from 'src/shared/service/session-storage.service';
import * as moment from 'moment';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { UtilService } from '../service/util.service';

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
              public sessionStorage: SessionStorageService,
              public storageService: LocalStorageService,
              public utilService: UtilService) {
    this.loading = true;
    this.enviado = false;
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    setTimeout(() => {
      this.loading = false;
      this.enviado = true;
      this.utilService.removerSessionStorage(this.data.action);
      setTimeout(() => {
        if (this.storageService.getJson('user')) {
          this.router.navigate(['home']);
        } else {
          console.log('deu merda');
        }
      }, 3000 );
    }, 3000 );
  }

  voltar() {
    this.router.navigate(['auth']);
  }
}
