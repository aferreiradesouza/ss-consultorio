export interface IConfirmacao {
    mensagem: string;
    titulo: string;
    action: string;
}

export interface IConfirmarSms {
    usuario: string;
    senha: string;
    action: string;
    nascimento: string;
}

export interface IHome {
    currentUser: any;
    consultas: any;
}

export interface Usuario {
    cpf: string,
    email: string,
    dataNascimento: Date,
    nome: string,
    celular: string,
    telefone: string,
    senha: string
}

export interface Senha {
    usuario: string,
    senha: string,
    codigoSMS: string
}

export interface CodigoSMS {
    cpf: string,
    dataNascimento: string
}

export interface Consultas {
    mensagens: [
        string
    ],
    objeto: [
        {
            id: number,
            idPaciente: number,
            idUsuario: number,
            idConsultorio: number,
            idEspecialidade: number,
            idTipoConsulta: number,
            idStatusConsulta: number,
            data: string,
            hora: string,
            observacao: string,
            ehEncaixe: boolean,
            dataCadastro: string,
            valor: number,
            consultorio: {
                id: number,
                nome: string,
                logradouro: string,
                numero: string,
                complemento: string,
                bairro: string,
                cidade: string,
                estado: string,
                dataCadastro: string,
                dataDesativacao: string,
                ativo: boolean
            },
            especialidade: {
                id: number,
                nome: string,
                descricao: string
            },
            paciente: {
                id: number,
                nome: string,
                cpf: string,
                celular: string,
                telefone: string,
                email: string,
                urlFoto: string,
                cep: string,
                logradouro: string,
                numero: string,
                complemento: string,
                bairro: string,
                cidade: string,
                estado: string,
                dataNascimento: string,
                dataCadastro: string,
                dataDesativacao: string,
                codigoSms: string,
                nuncaConfirmouSms: boolean,
                token: string,
                ativo: boolean
            },
            statusConsulta: {
                id: number,
                nome: string,
                ordem: number,
                codigo: string,
                descricao: string
            },
            tipoConsulta: {
                id: number,
                nome: string,
                descricao: string
            },
            usuario: {
                id: number,
                nome: string,
                cpf: string,
                ehMedico: boolean,
                crm: string,
                celular: string,
                telefone: string,
                email: string,
                urlFoto: string,
                ehAdministrador: boolean,
                dataNascimento: string,
                dataCadastro: string,
                dataDesativacao: string,
                token: string,
                codigoSms: string,
                nuncaConfirmouSms: boolean,
                ativo: boolean
            }
        }
    ],
    autorizado: boolean,
    codigo: string,
    tempoLevado: string,
    sucesso: boolean
}
