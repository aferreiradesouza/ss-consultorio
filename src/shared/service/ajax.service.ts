import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { timeout } from 'rxjs/operators';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  constructor(
    private http: HttpClient,
    public storageService: LocalStorageService
  ) {}

  public async get<T>(
    url: string,
    params: { [param: string]: string | string[] } = {}
  ) {
    const token =
      this.storageService.getJson('user') != null
        ? this.storageService.getJson('user').token
        : '111';
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: 'bearer ' + token
    };

    return this.http
      .get<T>(url, { params, headers })
      .pipe(timeout(15000))
      .toPromise()
      .catch(error => {
       reject(error);
      });
  }
  public async post<T>(url: string, body: any = {}) {
    const token =
      this.storageService.getJson('user') != null
        ? this.storageService.getJson('user').token
        : '111';
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'bearer ' + token
      }
    };

    return this.http
      .post<T>(url, body, options)
      .pipe(timeout(15000))
      .toPromise()
      .catch(error => {
        reject(error);
      });
  }

  public async put<T>(url: string, body: any = {}) {
    const token =
      this.storageService.getJson('user') != null
        ? this.storageService.getJson('user').token
        : '111';
    const options = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'bearer ' + token
      }
    };

    return this.http
      .put<T>(url, body, options)
      .pipe(timeout(15000))
      .toPromise()
      .catch(error => {
        reject(error);
      });
  }
}
