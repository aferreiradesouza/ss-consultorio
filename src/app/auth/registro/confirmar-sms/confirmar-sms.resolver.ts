import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IConfirmarSms } from 'src/shared/dto';

@Injectable()
export class ConfirmarSmsResolver implements Resolve<Promise<IConfirmarSms>> {
    constructor() { }

    async resolve(route: ActivatedRouteSnapshot) {

        const usuario = <string>route.queryParams.usuario;
        const senha = <string>route.queryParams.senha;
        const action = <string>route.queryParams.action;
        const nascimento = <string>route.queryParams.nascimento;

        return <IConfirmarSms>{
            usuario: usuario,
            senha: senha,
            action: action,
            nascimento: nascimento
        };
    }
}
