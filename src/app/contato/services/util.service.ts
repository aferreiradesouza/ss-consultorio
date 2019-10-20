import { Injectable } from '@angular/core';

@Injectable()

export class UtilContatoService {

    constructor() {}

    formatar(consultorios: any[]) {
        consultorios = consultorios.map(e => {
            return {
                idConsultorio: e.idConsultorio,
                consultorio: e.consultorio
            };
        });
        const newData = [];

        consultorios.forEach(e => {
            if (newData.length === 0) {
                newData.push(e);
            } else {
                let count = 0;
                newData.forEach(f => {
                    if (f.idConsultorio === e.idConsultorio) {
                        count += 1;
                    }
                });
                if (count === 0) {
                    newData.push(e);
                }
            }
        });


        return newData;
    }
}
