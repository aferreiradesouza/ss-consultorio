import { Injectable } from '@angular/core';
import { Consultorios } from 'src/shared/dto';

@Injectable()

export class UtilAgendarConsulta {

    constructor() {}

    async obterEspecialidades(data: Consultorios) {
        const especialidades = data.objeto.map(e => {
            return {
                idEspecialidade: e.idEspecialidade,
                especialidade: e.especialidade
            };
        });

        const newData = [];

        especialidades.forEach(e => {
            if (newData.length === 0) {
                newData.push(e);
            } else {
                let count = 0;
                newData.forEach(f => {
                    if (f.idEspecialidade === e.idEspecialidade) {
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
