import { CategoriaServiceService } from './../../core/service/categoria-service.service';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CadastrarCategoriaFormComponent } from '../../components/cadastrar-categoria-form/cadastrar-categoria-form.component';
import { EditarCategoriaFormComponent } from '../../components/editar-categoria-form/editar-categoria-form.component';
import { Categoria } from '../../core/model/categoria';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [NavbarComponent, MdbModalModule, CadastrarCategoriaFormComponent, EditarCategoriaFormComponent],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categoriasReceita: Categoria[] = [];
  categoriasDespesa: Categoria[] = [];

  categoriaService = inject(CategoriaServiceService)

  modalService = inject(MdbModalService)
  modalRef!: MdbModalRef<any>

  constructor() {}

  ngOnInit(): void {
    this.listarCategoriasDeReceita();
    this.listarCategoriasDeDespesa();
  }

  @ViewChild("modalCadastrarCategoria") modalCadastrarCategoria!: TemplateRef<any>
  new(){
    this.modalRef = this.modalService.open(this.modalCadastrarCategoria);
  }

  @ViewChild("modalEditarCategoria") modalEditarCategoria!: TemplateRef<any>
  editar(){
    this.modalRef = this.modalService.open(this.modalEditarCategoria);
  }

  listarCategoriasDeReceita() {
    this.categoriaService.listarCategoriasDeReceita().subscribe({
      next: (listaDeCategoriasDeReceita:Categoria[]) => {
        this.categoriasReceita = listaDeCategoriasDeReceita;
      },
      error: erro => {
        console.error('Erro ao listar categorias de receita', erro);
      }
    });
  }

  listarCategoriasDeDespesa(){
    this.categoriaService.listarCategoriasDeDespesa().subscribe({
      next: listaDeCategoriasDeDespesa => {
        this.categoriasDespesa = listaDeCategoriasDeDespesa;
      },
      error: erro => {
        console.error('Erro ao listar categorias de despesa', erro);
      }
    });
  }


}


