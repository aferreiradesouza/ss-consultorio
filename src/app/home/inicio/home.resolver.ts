import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { IHome } from 'src/shared/dto';
import { CurrentUserService } from 'src/shared/service/currentUser.service';

@Injectable()
export class HomeResolver implements Resolve<Promise<IHome>> {
    constructor( public userService: CurrentUserService) { }

    async resolve(route: ActivatedRouteSnapshot) {

        const user = this.userService.user;

        return <IHome>{
            currentUser: user
        };
    }
}
