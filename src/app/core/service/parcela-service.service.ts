import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PagarDespagarParcela } from '../model/parcela/DTO/pagar-despagar-parcela';
import { Parcela } from '../model/parcela/parcela';

@Injectable({
  providedIn: 'root'
})
export class ParcelaServiceService {

  http = inject(HttpClient)

  API = "http://localhost:8080/economizaja/parcela/";

  private token!: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  pagarDespagarParcela (id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Parcela>(`${this.API}pagarDespagarParcela/${id}`, { headers });
  }
}
