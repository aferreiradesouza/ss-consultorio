import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class CurrentUserService {

    constructor(public localService: LocalStorageService) {}

    public get user() {
        return this.localService.getJson('user');
    }
}
