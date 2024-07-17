import { DataLancamentosConsultaDTO } from './../model/lancamento/DTO/data-lancamentos-consulta-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CadastrarLancamentoDTO } from '../model/lancamento/DTO/cadastrar-lancamento-dto';
import { Observable } from 'rxjs';
import { DadosHome } from '../model/lancamento/DTO/dados-home';
import { ListagemLancamentoPagarReceber } from '../model/lancamento/DTO/listagem-lancamento-pagar-receber';
import { DadosRelatorios } from '../model/lancamento/DTO/dados-relatorios';

@Injectable({
  providedIn: 'root'
})
export class LancamentoServiceService {
  http = inject(HttpClient)

  API = "http://localhost:8080/economizaja/lancamento/";

  private token!: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  cadastrar(lancamento: CadastrarLancamentoDTO): Observable <CadastrarLancamentoDTO> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<CadastrarLancamentoDTO>(`${this.API}cadastrar`, lancamento, { headers });
  }

  deletar(lancamento: ListagemLancamentoPagarReceber): Observable <ListagemLancamentoPagarReceber> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<ListagemLancamentoPagarReceber>(`${this.API}deletar`, lancamento, { headers });
  }

  dadosHomeSaldo(): Observable<DadosHome>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<DadosHome>(`${this.API}dadosHome`, { headers });
  }

  dadosRelatorios(dataLancamento: DataLancamentosConsultaDTO): Observable <DadosRelatorios> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<DadosRelatorios>(`${this.API}dadosRelatorios`, dataLancamento, { headers });
  }

  getLancamentosData(dataLancamento: DataLancamentosConsultaDTO): Observable <ListagemLancamentoPagarReceber[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<ListagemLancamentoPagarReceber[]>(`${this.API}getLancamentosData`, dataLancamento, { headers });
  }

  pagarDespagarLancamento (item: ListagemLancamentoPagarReceber): Observable <ListagemLancamentoPagarReceber> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<ListagemLancamentoPagarReceber>(`${this.API}pagarDespagarLancamento`, item, { headers });
  }
}
