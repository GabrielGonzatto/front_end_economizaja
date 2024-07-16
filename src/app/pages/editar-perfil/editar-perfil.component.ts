import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EditarClienteDTO } from '../../core/model/cliente/DTO/editar-cliente-dto';
import { AppComponent } from '../../app.component';
import { ClienteServiceService } from '../../core/service/cliente-service.service';
import { DadosClienteDTO } from '../../core/model/cliente/DTO/dados-cliente-dto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [NavbarComponent, MdbFormsModule, FormsModule, NgxMaskDirective, NgxMaskPipe, AppComponent],
  providers:[provideNgxMask()],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  cliente = new EditarClienteDTO();

  senha!: string;
  nova_senha!: string;

  constructor (private appComponent: AppComponent, private clienteService: ClienteServiceService) {
    this.listarDadosCliente()
  }

  editar () {
    this.cliente.senha = this.appComponent.criptografarString(this.senha);
    if (this.nova_senha == null) {
      this.cliente.nova_senha = this.appComponent.criptografarString(this.senha);
    }
    else {
      this.cliente.nova_senha = this.appComponent.criptografarString(this.nova_senha);
    }

    this.clienteService.editar(this.cliente).subscribe({
      next: (mensagem) => {
        this.listarDadosCliente()
        this.senha = "";
        this.nova_senha = "";

        Swal.fire({
          icon: 'success',
          title: "Perfil editado com sucesso",
        });
      },
      error: (erro) => {
        Swal.fire({
          icon: 'error',
          title: "Senha incorreta",
        });
      }
    })
  }

  deletarPerfil () {

  }

  listarDadosCliente () {
    this.clienteService.listarDadosCliente().subscribe({
      next: (dadoCliente: DadosClienteDTO) => {
        this.cliente.primeiro_nome = dadoCliente.primeiro_nome;
        this.cliente.segundo_nome = dadoCliente.segundo_nome;
        this.cliente.cpf = dadoCliente.cpf;
        this.cliente.email = dadoCliente.email;
      },
      error: (erro) => {
      },
    });
  }
}
