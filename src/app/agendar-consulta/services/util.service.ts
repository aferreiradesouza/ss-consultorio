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

    async obterMedicos(data: Consultorios, idEspecialidade: number) {
        const usuario = data.objeto.map(e => {
            return {
                idUsuario: e.idUsuario,
                usuario: e.usuario,
                idEspecialidade: e.idEspecialidade
            };
        });

        const newData: any[] = [];

        usuario.forEach(e => {
            if (e.idEspecialidade === idEspecialidade) {
                if (newData.length === 0) {
                    newData.push(e);
                } else {
                    let count = 0;
                    newData.forEach(f => {
                        if (f.idUsuario === e.idUsuario) {
                            count += 1;
                        }
                    });
                    if (count === 0) {
                        newData.push(e);
                    }
                }
            }
        });

        return newData;
    }

    async obterLugares(data: Consultorios, idEspecialidade: number, idMedicos: any[]) {
        console.log(data);
        let lugar = data.objeto.map(e => {
            return {
                idUsuario: e.idUsuario,
                consultorio: e.consultorio,
                idEspecialidade: e.idEspecialidade,
                idConsultorio: e.idConsultorio
            };
        });

        const newData: any[] = [];

        lugar = lugar.filter(f => f.idEspecialidade === idEspecialidade);

        lugar.forEach(f => {
            idMedicos.forEach(id => {
                if (f.idUsuario === id) {
                    if (newData.length === 0) {
                        newData.push(f);
                    } else {
                        let count = 0;
                        newData.forEach(e => {
                            if (e.idConsultorio === f.idConsultorio) {
                                count += 1;
                            }
                        });
                        if (count === 0) {
                            newData.push(f);
                        }
                    }
                }
            });
        });

        console.log(newData);
        return newData;
    }
}
