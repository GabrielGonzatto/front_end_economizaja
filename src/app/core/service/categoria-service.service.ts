import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CadastrarCategoriaDTO } from '../model/categoria/DTO/cadastrar-categoria-dto';
import { DadosCategoriaDTO } from '../model/categoria/DTO/dados-categoria-dto';
import { EditarCategoriaDTO } from '../model/categoria/DTO/editar-categoria-dto';
import { MaioresGastosMesCategoriaDTO } from '../model/categoria/DTO/maiores-gastos-mes-categoria-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
  http = inject(HttpClient)

  API = "http://localhost:8080/economizaja/categoria/";

  private token!: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  cadastrar(categoria: CadastrarCategoriaDTO): Observable<CadastrarCategoriaDTO> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<CadastrarCategoriaDTO>(`${this.API}cadastrar`, categoria, { headers });
  }

  editar(categoria: EditarCategoriaDTO): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<any>(`${this.API}`, categoria, { headers });
  }

  desativar(id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<any>(`${this.API}desativar/${id}`, { headers });
  }

  maioresGastosMesCategorias (): Observable<MaioresGastosMesCategoriaDTO> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<MaioresGastosMesCategoriaDTO>(`${this.API}maioresGastosMesCategorias`, { headers });
  }

  listarCategoriasDeReceita(): Observable<DadosCategoriaDTO[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<DadosCategoriaDTO[]>(`${this.API}receita`, { headers });
  }

  listarCategoriasDeDespesa(): Observable<DadosCategoriaDTO[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<DadosCategoriaDTO[]>(`${this.API}despesa`, { headers });
  }
}
