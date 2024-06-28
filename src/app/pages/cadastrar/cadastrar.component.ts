import { CadastrarClienteDTO } from './../../core/model/cliente/DTO/cadastrar-cliente-dto';
import { Component} from '@angular/core';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
  cadastrarClienteDTO = new CadastrarClienteDTO();


  constructor() {

  }

  cadastrar(){

  }
}
