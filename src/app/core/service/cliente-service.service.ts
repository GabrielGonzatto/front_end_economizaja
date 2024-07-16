import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Cliente } from '../model/cliente/cliente';
import { Observable } from 'rxjs';
import { LoginDTO } from '../model/cliente/DTO/login-dto';
import { RespostaLogin } from '../model/cliente/DTO/resposta-login';
import { CadastrarClienteDTO } from '../model/cliente/DTO/cadastrar-cliente-dto';
import { DadosClienteDTO } from '../model/cliente/DTO/dados-cliente-dto';
import { EditarClienteDTO } from '../model/cliente/DTO/editar-cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

  http = inject(HttpClient)

  API = "http://localhost:8080/economizaja/auth/";

  private token!: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  cadastrar (cliente: CadastrarClienteDTO): Observable<CadastrarClienteDTO> {
      return this.http.post<Cliente>(this.API + 'cadastrar', cliente)
  }

  editar (cliente: EditarClienteDTO): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.put<any>(`${this.API}editar`, cliente, { headers });
  }

  login (cliente:LoginDTO): Observable<RespostaLogin> {
    return this.http.post<RespostaLogin>(this.API + 'login', cliente)
  }

  listarDadosCliente (): Observable<DadosClienteDTO> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<DadosClienteDTO>(`${this.API}listarDadosCliente`, { headers });
  }
}
