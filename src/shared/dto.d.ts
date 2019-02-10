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