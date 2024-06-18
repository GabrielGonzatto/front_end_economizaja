import { Cliente } from '../../core/model/cliente';
import { Component, inject } from '@angular/core';
import { ClienteServiceService } from '../../core/service/cliente-service.service';
import { FormsModule } from '@angular/forms'; // Importe FormsModule aqui

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  clienteService = inject(ClienteServiceService)

  cliente = new Cliente();

  cadastrar(cliente: Cliente){
    this.clienteService.cadastrar(cliente).subscribe({
      next: mensagem => {
        alert('Usuário cadastrado com sucesso');
      },
      error: (error: any) => {
        alert('Usuário NÃO cadastrado com sucesso');
        console.error('Erro ao buscar desenvolvedores:', error);
      }
    });
  }
}
