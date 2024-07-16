import { Router } from '@angular/router';
import { CadastrarClienteDTO } from './../../core/model/cliente/DTO/cadastrar-cliente-dto';
import { Component, inject } from '@angular/core';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ClienteServiceService } from '../../core/service/cliente-service.service';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers:[provideNgxMask()],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css',
})
export class CadastrarComponent {
  clienteService = inject(ClienteServiceService);
  router = inject(Router);
  app = inject(AppComponent);

  cadastrarClienteDTO = new CadastrarClienteDTO();
  senha!: string;

  cadastrar() {
    if (
      this.cadastrarClienteDTO.primeiro_nome == null ||
      this.cadastrarClienteDTO.segundo_nome == null ||
      this.cadastrarClienteDTO.cpf == null ||
      this.cadastrarClienteDTO.email == null ||
      this.senha == null
    ) {
      Swal.fire({
        icon: 'question',
        title: 'Preencha todos os campos',
      });
    } else {
      this.cadastrarClienteDTO.senha = this.app.criptografarString(this.senha)
      this.clienteService.cadastrar(this.cadastrarClienteDTO).subscribe({
        next: (resposta) => {
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Ocorreu algum erro',
          });
        },
      });
    }
  }


}
