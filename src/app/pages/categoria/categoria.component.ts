import { CategoriaServiceService } from './../../core/service/categoria-service.service';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {MdbModalModule, MdbModalRef, MdbModalService,} from 'mdb-angular-ui-kit/modal';
import { CadastrarCategoriaFormComponent } from '../../components/cadastrar-categoria-form/cadastrar-categoria-form.component';
import { EditarCategoriaFormComponent } from '../../components/editar-categoria-form/editar-categoria-form.component';
import { Categoria } from '../../core/model/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    NavbarComponent,
    MdbModalModule,
    CommonModule,
    CadastrarCategoriaFormComponent,
    EditarCategoriaFormComponent,
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})

export class CategoriaComponent {
  categoriaService = inject(CategoriaServiceService);

  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  categoriasReceita: Categoria[] = [];
  categoriasDespesa: Categoria[] = [];

  constructor() {
    this.listarCategoriasDeReceita();
    this.listarCategoriasDeDespesa();
  }

  // Modal para editar cadastrar
  @ViewChild('modalCadastrarCategoria')
  modalCadastrarCategoria!: TemplateRef<any>;
  new() {
    this.modalRef = this.modalService.open(this.modalCadastrarCategoria);
  }

  // Modal para editar categoria
  @ViewChild('modalEditarCategoria') modalEditarCategoria!: TemplateRef<any>;
  editar() {
    this.modalRef = this.modalService.open(this.modalEditarCategoria);
  }

  // Cadastrar Categoria
  cadastrar(categoria:Categoria){
    this.categoriaService.cadastrar(categoria).subscribe({
      next: mensagem => {
        this.listarCategoriasDeReceita();
        this.listarCategoriasDeDespesa();

        this.modalRef.close(this.modalCadastrarCategoria)
        // fechar modal
      },
      error: (error: any) => {
        alert('Categoria NÃO cadastrado com sucesso');
        console.error(error);
      }
    });
  }

  // Lista as categorias de receita
  listarCategoriasDeReceita() {
    this.categoriaService.listarCategoriasDeReceita().subscribe({
      next: (listaDeCategoriasDeReceita: Categoria[]) => {
        this.categoriasReceita = listaDeCategoriasDeReceita;
      },
      error: (erro) => {
        console.error('Erro ao listar categorias de receita', erro);
      },
    });
  }

  // Lista as categorias de despesa
  listarCategoriasDeDespesa() {
    this.categoriaService.listarCategoriasDeDespesa().subscribe({
      next: (listaDeCategoriasDeDespesa) => {
        this.categoriasDespesa = listaDeCategoriasDeDespesa;
      },
      error: (erro) => {
        console.error('Erro ao listar categorias de despesa', erro);
      },
    });
  }
}
