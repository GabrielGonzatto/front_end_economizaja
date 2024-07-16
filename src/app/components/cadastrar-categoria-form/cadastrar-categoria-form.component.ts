import { CategoriaComponent } from './../../pages/categoria/categoria.component';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CadastrarCategoriaDTO } from '../../core/model/categoria/DTO/cadastrar-categoria-dto';

@Component({
  selector: 'app-cadastrar-categoria-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './cadastrar-categoria-form.component.html',
  styleUrl: './cadastrar-categoria-form.component.css'
})
export class CadastrarCategoriaFormComponent {
  categoriaComponent = inject(CategoriaComponent);

  categoria = new CadastrarCategoriaDTO();

  cadastrar(){
    this.categoriaComponent.cadastrar(this.categoria);
  }
}
