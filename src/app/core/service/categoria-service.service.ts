import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Categoria } from '../model/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServiceService {
  http = inject(HttpClient)

  API = "http://localhost:8080/economizaja/categoria/";

  constructor() { }

  cadastrar(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(this.API +'cadastrar', categoria)
  }

  listarCategoriasDeReceita(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API+"receita")
  }

  listarCategoriasDeDespesa(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API+"despesa")
  }
}
