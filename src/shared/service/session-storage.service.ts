import { Injectable } from '@angular/core';

type StorageKey = 'user' | 'usid' | 'auth' | 'broker-list';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    constructor() { }

    public has(key: StorageKey): boolean {
        return key in sessionStorage;
    }

    public get(key: StorageKey): string {
        return sessionStorage.getItem(key);
    }

    public getJson(key: StorageKey): any {
        return JSON.parse(this.get(key));
    }

    public set(key: StorageKey, value: string) {
        sessionStorage.setItem(key, value);
    }

    public setJson(key: StorageKey, value: any) {
        this.set(key, JSON.stringify(value));
    }

    public remove(key: string) {
        sessionStorage.removeItem(key);
    }
}
