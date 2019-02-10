import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IConfirmacao } from 'src/shared/dto';

@Injectable()
export class ConfirmacaoResolver implements Resolve<Promise<IConfirmacao>> {
    constructor() { }

    async resolve(route: ActivatedRouteSnapshot) {

        const mensagem = <string>route.queryParams.mensagem;
        const titulo = <string>route.queryParams.titulo;
        const action = <string>route.queryParams.action;

        return <IConfirmacao>{
            mensagem: mensagem,
            titulo: titulo,
            action: action
        };
    }
}
