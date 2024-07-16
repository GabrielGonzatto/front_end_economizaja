import { FormsModule } from '@angular/forms';
import { Categoria } from '../../core/model/categoria/categoria';
import { CategoriaComponent } from './../../pages/categoria/categoria.component';
import { Component, inject } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-editar-categoria-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './editar-categoria-form.component.html',
  styleUrl: './editar-categoria-form.component.css'
})
export class EditarCategoriaFormComponent {
  categoriaComponent = inject(CategoriaComponent);

  categoria = new Categoria();

  constructor(){
    this.categoria = this.categoriaComponent.getDadosCategoria();
  }

  editar() {
    this.categoriaComponent.editar(this.categoria)
  }

  desativar(id: number){
    this.categoriaComponent.desativar(id);
  }
}
