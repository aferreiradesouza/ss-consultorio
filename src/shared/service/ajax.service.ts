import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AjaxService {

    constructor(
        private http: HttpClient,
        public storageService: LocalStorageService
    ) { }

    public async get<T>(url: string, params: { [param: string]: string | string[] } = {}) {
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'bearer ' + this.storageService.getJson('user').token ? this.storageService.getJson('user').token : '111'
        };
        return this.http.get<T>(url, { params, headers }).toPromise();
    }
    public async post<T>(url: string, body: any = {}) {

        const options = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        };

        return this.http.post<T>(url, body, options).toPromise();
    }
}
