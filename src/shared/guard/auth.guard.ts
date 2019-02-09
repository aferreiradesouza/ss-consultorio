import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';


@Injectable()
export class GuardService implements CanActivate {

    constructor(public autenticacaoService: AutenticacaoService, private router: Router) { }

    canActivate(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.autenticacaoService.verificarToken().then((response) => {
                if (response) {
                    resolve(true);
                } else {
                    this.router.navigate(['auth']);
                    resolve(false);
                }
            })
            .catch(() => {
                this.router.navigate(['auth']);
                resolve(false);
            });
        });
    }
}
