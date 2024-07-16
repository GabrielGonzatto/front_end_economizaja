import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CadastrarLancamentoDTO } from '../model/lancamento/DTO/cadastrar-lancamento-dto';
import { Observable } from 'rxjs';
import { DadosHome } from '../model/lancamento/DTO/dados-home';
import { Lancamento } from '../model/lancamento/lancamento';
import { ListagemHomePagarReceber } from '../model/lancamento/DTO/listagem-home-pagar-receber';

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

  dadosHomeSaldo(): Observable<DadosHome>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<DadosHome>(`${this.API}dadosHome`, { headers });
  }

  pagarDespagarLancamento (item: ListagemHomePagarReceber): Observable <ListagemHomePagarReceber> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<ListagemHomePagarReceber>(`${this.API}pagarDespagarLancamento`, item, { headers });
  }
}
