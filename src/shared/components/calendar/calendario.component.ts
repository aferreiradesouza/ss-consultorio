import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.component.scss']
})

export class CalendarComponent implements OnInit {

  public diasNoMes: any[];
  public diasMesPassado: any[];
  public codMesAtual: number;
  public mesAtual: string;
  public anoAtual: number;
  public dataSelecionada: any;

  constructor(public router: Router) {}

  ngOnInit() {
    const dataAtual = new Date();
    this.codMesAtual = new Date().getMonth();
    this.mesAtual = this.formatterMes(this.codMesAtual).nome;
    this.anoAtual = new Date().getFullYear();
    this.criarCalendario(dataAtual);
  }


  criarCalendario(data) {
    this.diasMesPassado = [];
    this.diasNoMes = [];
    const primeiraDataMes = this.obterDataMes(data);
    const totalDiasMesPassado = this.obterDiasMesPassado(data);

    for (let o = totalDiasMesPassado - (primeiraDataMes - 1); o <= totalDiasMesPassado; o++) {
      this.diasMesPassado.push(o);
    }

    for (let i = 1; i <= this.pegarMesDatas(data.getMonth()); i++) {
      const objtCalendario = {
        dia: i,
        codDiaSemana: new Date(this.anoAtual, this.codMesAtual, i).getDay(),
        codMes: new Date(this.anoAtual, this.codMesAtual, i).getMonth(),
        dataCompleta: new Date(this.anoAtual, this.codMesAtual, i),
      };
      this.diasNoMes.push(objtCalendario);
    }

    console.log(this.diasNoMes);
  }

  obterDiasMesPassado(data) {
    return this.pegarMesDatas(data.getMonth() === 0 ? 11 : data.getMonth() - 1);
  }

  obterDataMes(data) {
    return new Date(data.getFullYear(), data.getMonth(), 1).getDay();
  }

  updateMes(novoMes) {
    this.mesAtual = this.formatterMes(novoMes).nome;
  }

  selecionarData(data) {
    this.dataSelecionada = data;
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

  formatterMes(mes) {
    let mesFormatado;
    switch (mes) {
      case 0:
        mesFormatado = {nome: 'Janeiro', abreviado: 'Jan'};
        break;
      case 1:
        mesFormatado = {nome: 'Fevereiro', abreviado: 'Fev'};
        break;
      case 2:
        mesFormatado = {nome: 'Março', abreviado: 'Mar'};
        break;
      case 3:
        mesFormatado = {nome: 'Abril', abreviado: 'Abr'};
        break;
      case 4:
        mesFormatado = {nome: 'Maio', abreviado: 'Mai'};
        break;
      case 5:
        mesFormatado = {nome: 'Junho', abreviado: 'Jun'};
        break;
      case 6:
        mesFormatado = {nome: 'Julho', abreviado: 'Jul'};
        break;
      case 7:
        mesFormatado = {nome: 'Agosto', abreviado: 'Ago'};
        break;
      case 8:
        mesFormatado = {nome: 'Setembro', abreviado: 'Set'};
        break;
      case 9:
        mesFormatado = {nome: 'Outubro', abreviado: 'Out'};
        break;
      case 10:
        mesFormatado = {nome: 'Novembro', abreviado: 'Nov'};
        break;
      case 11:
        mesFormatado = {nome: 'Dezembro', abreviado: 'Dez'};
        break;
    }
    return mesFormatado;
  }

  alterarMes(tipo) {
    if (tipo === 'next') {
      if (this.codMesAtual === 11) {
        this.codMesAtual = 0;
        this.anoAtual += 1;
      } else {
        this.codMesAtual += 1;
      }
    } else {
      if (this.codMesAtual === 0) {
        this.codMesAtual = 11;
        this.anoAtual -= 1;
      } else {
        this.codMesAtual -= 1;
      }
    }
    this.updateMes(this.codMesAtual);
    this.criarCalendario(new Date(this.anoAtual, this.codMesAtual, 1));
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


}
