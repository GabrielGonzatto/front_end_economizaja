import { LoginDTO } from './../../core/model/cliente/DTO/login-dto';
import { Component, inject } from '@angular/core';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ClienteServiceService } from '../../core/service/cliente-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  clienteService = inject(ClienteServiceService);
  app = inject(AppComponent)
  router = inject(Router);

  loginDTO = new LoginDTO();

  private token!: string;
  senha!: string;

  constructor() {
    if (this.app.getToken() != null) {
      this.router.navigate(['/MenuPrincipal']);
    }
  }

  // LOGIN
  login() {
    if (this.loginDTO.email == null || this.senha == null) {
      Swal.fire({
        title: 'Preencha todos os campos',
        icon: 'question',
      });
    } else {
      this.loginDTO.senha = this.app.criptografarString(this.senha);
      this.clienteService.login(this.loginDTO).subscribe({
        next: (resposta) => {
          this.app.salvarToken(resposta.token);
          this.router.navigate(['/MenuPrincipal']).then(() => {
            window.location.reload();
          });
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



}
