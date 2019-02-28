import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  AfterViewChecked,
  DoCheck
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import * as moment from 'moment';
import { ModalController, NavController } from '@ionic/angular';
import { LocalStorageService } from 'src/shared/service/local-storage.service';
import { AutenticacaoService } from 'src/shared/service/autenticacao.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'splash-page',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  public user: any;
  private exibiu = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public userService: CurrentUserService,
    public modalController: ModalController,
    public storageService: LocalStorageService,
    public navController: NavController,
    public autenticacaoService: AutenticacaoService,
    location: PlatformLocation
  ) {
    location.onPopState(() => {
      this.exibiu = false;
    });
  }

  verificar() {
    if (!this.exibiu) {
      this.exibiu = true;
      this.ngOnInit();
    }

    return false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.autenticacaoService
        .verificarToken()
        .then(response => {
          if (response) {
            this.router.navigate([params.get('url')]);
          } else {
            this.router.navigate(['auth']);
          }
        })
        .catch(() => {
          this.router.navigate(['auth']);
        });
    });
  }
}
