import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IHome } from 'src/shared/dto';
import { CurrentUserService } from 'src/shared/service/currentUser.service';
import { HomeService } from '../services/home.service';
import { UtilHomeService } from '../services/util.service';

@Injectable()
export class HomeResolver implements Resolve<Promise<IHome>> {
    constructor( public userService: CurrentUserService, public homeService: HomeService, public utilService: UtilHomeService) { }

    async resolve(route: ActivatedRouteSnapshot) {

        const user = this.userService.user;
        const consultas = await this.homeService.obterConsultas();
        const proximasConsultas = this.utilService.formatarConsultas(consultas.objeto, 'proximas');

        return <IHome>{
            currentUser: user,
            consultas: consultas
        };
    }
}
