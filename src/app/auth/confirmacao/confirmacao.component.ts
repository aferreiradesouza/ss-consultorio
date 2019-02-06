import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IConfirmacao } from 'src/shared/dto';

@Component({
  selector: 'confirmacao-page',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.component.scss']
})

export class ConfirmacaoComponent implements OnInit {

  public data: IConfirmacao;
  public enviado: boolean;
  public loading: boolean;

  constructor(public router: Router, public route: ActivatedRoute) {
    this.loading = true;
    this.enviado = false;
  }

  ngOnInit() {
    this.data = this.route.snapshot.data['data'];
    this.chamar();
  }

  chamar() {
    this.loading = true;
    this.enviado = false;
    setTimeout(() => {
      this.loading = false;
      if (this.random > 50) {
        this.enviado = true;
      } else {
        this.enviado = false;
      }
    }, 2000 );
  }

  voltar() {
    this.router.navigate(['auth']);
  }

  public get random() {
    const random = Math.random() * 100;
    return random;
  }
}
