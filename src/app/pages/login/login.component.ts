import { LoginDTO } from './../../core/model/cliente/DTO/login-dto';
import { Component, inject } from '@angular/core';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ClienteServiceService } from '../../core/service/cliente-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  clienteService = inject(ClienteServiceService);
  router = inject(Router);

  loginDTO = new LoginDTO();

  private token!: string;
  private tokenKey = 'token';

  constructor() {
    if (this.getToken() != null) {
      this.router.navigate(['/MenuPrincipal']);
    }
  }

  login() {
    if (this.loginDTO.email == null || this.loginDTO.senha == null) {
      Swal.fire({
        title: 'Preencha todos os campos',
        icon: 'question',
      });
    } else {
      this.clienteService.login(this.loginDTO).subscribe({
        next: (resposta) => {
          this.salvarToken(resposta.token);
          this.router.navigate(['/MenuPrincipal']);
        },
        error: (error: any) => {
          Swal.fire({
            icon: "error",
            title: "Email ou senha incorretos",
            footer: '<a href="/cadastrar">Não possui conta? Clique aqui</a>'
          });
        },
      });
    }
  }

  salvarToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
