import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  http = inject(HttpClient)

  API = "localhost:8080/economizaja/auth/";

  constructor() {}

  cadastrar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API +'cadastrar', cliente)
  }
}
