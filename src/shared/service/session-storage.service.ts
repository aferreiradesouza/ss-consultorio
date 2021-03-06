import { Injectable } from '@angular/core';

type StorageKey =   'registro/conta'
                    | 'registro/perfil'
                    | 'registro/contato'
                    | 'registro/codigo-sms'
                    | 'esqueceu-senha/dados'
                    | 'esqueceu-senha/codigo-sms'
                    | 'esqueceu-senha/senha-nova'
                    | 'consultorios'
                    | 'agendar-consulta/especialidade'
                    | 'agendar-consulta/especialidadeObj'
                    | 'agendar-consulta/medicos'
                    | 'agendar-consulta/lugares'
                    | 'agendar-consulta/data-consulta'
                    | 'agendar-consulta/horario';

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
