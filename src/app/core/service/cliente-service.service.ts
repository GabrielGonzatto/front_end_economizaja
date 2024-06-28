import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../model/cliente/cliente';
import { Observable } from 'rxjs';
import { LoginDTO } from '../model/cliente/DTO/login-dto';
import { RespostaLogin } from '../model/cliente/DTO/resposta-login';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  http = inject(HttpClient)

  API = "http://localhost:8080/economizaja/auth/";

  constructor() {}

  cadastrar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.API + 'cadastrar', cliente)
  }

  login(cliente:LoginDTO): Observable<RespostaLogin> {
    return this.http.post<RespostaLogin>(this.API + 'login', cliente)
  }
}
