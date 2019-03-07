import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: any) {
    console.log('Erro', error);
    // TODO: LOGAR ERRO PARA VERIFICAR SE É BUG!

    throw error;
  }
}
