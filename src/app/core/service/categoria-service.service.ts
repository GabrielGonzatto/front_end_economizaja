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

  listarCategoriasDeReceita(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API+"receita")
  }

  listarCategoriasDeDespesa(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.API+"despesa")
  }
}
