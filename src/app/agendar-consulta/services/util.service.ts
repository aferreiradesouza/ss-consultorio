import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()

export class UtilAgendarConsulta {

    constructor() { }

    async obterEspecialidades(data: any) {
        const especialidades = [];
        data.objeto.forEach(element => {
            element.usuariosConsultoriosEspecialidades.forEach(ele => {
                especialidades.push(ele);
            });
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

    async obterMedicos(data: any, idEspecialidade: number) {
        // tslint:disable-next-line: max-line-length
        const usuario = data.objeto.filter(e => e.usuariosConsultoriosEspecialidades.map(f => f.idEspecialidade).indexOf(idEspecialidade) > -1);

        const newData: any[] = [];

        usuario.forEach(e => {
            if (e.usuariosConsultoriosEspecialidades.map(f => f.idEspecialidade).indexOf(idEspecialidade) > -1) {
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

    async obterLugares(data: any, idEspecialidade: number, idMedicos: any[]) {
        // tslint:disable-next-line: max-line-length
        const lugar = data.objeto.filter(e => e.usuariosConsultoriosEspecialidades.map(f => f.idEspecialidade).indexOf(idEspecialidade) > -1 && idMedicos.indexOf(e.idUsuario) > -1);

        let newData: any[] = [];
        newData = this.getUnique(lugar, 'idConsultorio');

        return newData;
    }

    async obterDiasDisponiveis(data: any) {
        const newData = [];
        data.objeto.forEach(element => {
            const dias = element.dataHorarios.map(e => {
                return {
                    data: e.data,
                    horario: e.horario,
                    idLocal: e.idLocal,
                    local: e.local,
                    dia: moment(e.data).utc().format('DD')
                };
            });

            dias.forEach(e => {
                if (newData.length === 0) {
                    newData.push(e);
                } else {
                    let count = 0;
                    newData.forEach(f => {
                        if (f.data === e.data) {
                            count += 1;
                        }
                    });
                    if (count === 0) {
                        newData.push(e);
                    }
                }
            });
        });

        return newData;
    }

    async obterMedicosDaDataSelecionada(dados: any, dataSelecionada: any, ) {
        const dataFormatada = moment(dataSelecionada.dataCompleta).utc().format('YYYY-MM-DD');

        const newData = [];

        dados.objeto.forEach(f => {
            f.dataHorarios.forEach(e => {
                if (e.data === dataFormatada) {
                    if (newData.length === 0) {
                        newData.push(f);
                    } else {
                        let count = 0;
                        newData.forEach(d => {
                            if (d === f) {
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

        return newData;
    }

    formatterMes(mes) {
        let mesFormatado;
        switch (mes) {
            case 0:
                mesFormatado = { nome: 'Janeiro', abreviado: 'Jan' };
                break;
            case 1:
                mesFormatado = { nome: 'Fevereiro', abreviado: 'Fev' };
                break;
            case 2:
                mesFormatado = { nome: 'Março', abreviado: 'Mar' };
                break;
            case 3:
                mesFormatado = { nome: 'Abril', abreviado: 'Abr' };
                break;
            case 4:
                mesFormatado = { nome: 'Maio', abreviado: 'Mai' };
                break;
            case 5:
                mesFormatado = { nome: 'Junho', abreviado: 'Jun' };
                break;
            case 6:
                mesFormatado = { nome: 'Julho', abreviado: 'Jul' };
                break;
            case 7:
                mesFormatado = { nome: 'Agosto', abreviado: 'Ago' };
                break;
            case 8:
                mesFormatado = { nome: 'Setembro', abreviado: 'Set' };
                break;
            case 9:
                mesFormatado = { nome: 'Outubro', abreviado: 'Out' };
                break;
            case 10:
                mesFormatado = { nome: 'Novembro', abreviado: 'Nov' };
                break;
            case 11:
                mesFormatado = { nome: 'Dezembro', abreviado: 'Dez' };
                break;
        }
        return mesFormatado;
    }

    formatterData(data) {
        let dataFormatada;
        switch (data) {
            case 0:
                dataFormatada = 'Domingo';
                break;
            case 1:
                dataFormatada = 'Segunda-feira';
                break;
            case 2:
                dataFormatada = 'Terça-feira';
                break;
            case 3:
                dataFormatada = 'Quarta-feira';
                break;
            case 4:
                dataFormatada = 'Quinta-feira';
                break;
            case 5:
                dataFormatada = 'Sexta-feira';
                break;
            case 6:
                dataFormatada = 'Sábado';
                break;
        }
        return dataFormatada;
    }

    pegarMesDatas(mes) {
        let dias;
        switch (mes) {
            case 0:
                dias = 31;
                break;
            case 1:
                dias = 28;
                break;
            case 2:
                dias = 31;
                break;
            case 3:
                dias = 30;
                break;
            case 4:
                dias = 31;
                break;
            case 5:
                dias = 30;
                break;
            case 6:
                dias = 31;
                break;
            case 7:
                dias = 31;
                break;
            case 8:
                dias = 30;
                break;
            case 9:
                dias = 31;
                break;
            case 10:
                dias = 30;
                break;
            case 11:
                dias = 31;
                break;
        }
        return dias;
    }

    public getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    obterDiasSemana() {
        return ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    }

    formaterLugares(medicos, dataEscolhida) {
        dataEscolhida = moment(dataEscolhida).utc().format('YYYY-MM-DD');

        medicos.forEach(f => {
            const newData = [];
            f.dataHorarios = f.dataHorarios.filter(e => moment(e.data).utc().format('YYYY-MM-DD') === dataEscolhida);
            if (f.dataHorarios.length > 0) {
                f.dataHorarios.forEach(e => {
                    if (newData.length === 0) {
                        const obj = { local: e.local, idLocal: e.idLocal, urlFoto: e.urlFoto, horarios: [{horario: e.horario}] };
                        newData.push(obj);
                    } else {
                        let count = 0;
                        newData.forEach(d => {
                            if (e.idLocal === d.idLocal) {
                                count += 1;
                            }
                        });
                        if (count > 0) {
                            newData.forEach(d => {
                                if (e.idLocal === d.idLocal) {
                                    d.horarios.push({horario: e.horario});
                                }
                            });
                        } else {
                            const obj = { local: e.local, idLocal: e.idLocal, urlFoto: e.urlFoto, horarios: [{horario: e.horario}] };
                            newData.push(obj);
                        }
                    }
                });
            }
            f.locais = newData;
        });

        return medicos;
    }
}
