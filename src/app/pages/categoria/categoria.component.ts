import { MaioresGastosMesCategoriaDTO } from './../../core/model/categoria/DTO/maiores-gastos-mes-categoria-dto';
import { CategoriaServiceService } from './../../core/service/categoria-service.service';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { CadastrarCategoriaFormComponent } from '../../components/cadastrar-categoria-form/cadastrar-categoria-form.component';
import { EditarCategoriaFormComponent } from '../../components/editar-categoria-form/editar-categoria-form.component';
import { Categoria } from '../../core/model/categoria/categoria';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { DadosCategoriaDTO } from '../../core/model/categoria/DTO/dados-categoria-dto';
import { CadastrarCategoriaDTO } from '../../core/model/categoria/DTO/cadastrar-categoria-dto';
import Swal from 'sweetalert2';
import { EditarCategoriaDTO } from '../../core/model/categoria/DTO/editar-categoria-dto';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    NavbarComponent,
    MdbModalModule,
    CommonModule,
    CadastrarCategoriaFormComponent,
    EditarCategoriaFormComponent,
    NgFor,
    NgIf,
    CommonModule,
    NgxEchartsDirective,
  ],
  providers: [provideEcharts()],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent {
  categoriaService = inject(CategoriaServiceService);

  modalService = inject(MdbModalService);
  modalRef!: MdbModalRef<any>;

  chartOptionReceita: EChartsOption = {};
  chartOptionDespesa: EChartsOption = {};

  categoriasReceita: DadosCategoriaDTO[] = [];
  categoriasDespesa: DadosCategoriaDTO[] = [];

  maioresGastosMesCategoriaDTO = new MaioresGastosMesCategoriaDTO();

  categoriaEditar = new Categoria();

  constructor() {
    this.listagem();
    this.maioresGastosMesCategoriaDTO.categoriasDespesa = [];
    this.maioresGastosMesCategoriaDTO.categoriasReceita = [];
    this.maioresGastosMesCategorias();

  }

  getDadosCategoria(): Categoria {
    return this.categoriaEditar;
  }

  // Cadastrar Categoria
  cadastrar(categoria: CadastrarCategoriaDTO) {
    this.modalRef.close(this.modalCadastrarCategoria);
    this.categoriaService.cadastrar(categoria).subscribe({
      next: (mensagem) => {
        this.listagem();
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocorreu um erro ao tentar cadastrar uma categoria',
        });
      },
    });
  }

  // Editar Categoria
  editar(categoria: EditarCategoriaDTO) {
    this.modalRef.close(this.modalEditarCategoria);
    this.categoriaService.editar(categoria).subscribe({
      next: (mensagem) => {
        this.listagem();
      },
      error: (erro) => {},
    });
  }

  // Desativar categoria
  desativar(id: number) {
    this.modalRef.close(this.modalEditarCategoria);
    this.categoriaService.desativar(id).subscribe({
      next: (mensagem) => {
        this.listagem();
      },
      error: (erro) => {},
    });
  }

    // Lista as maiores gastos
    maioresGastosMesCategorias() {
      this.categoriaService.maioresGastosMesCategorias().subscribe({
        next: (listaDeMaioresGastosMesCategorias: MaioresGastosMesCategoriaDTO) => {
          this.maioresGastosMesCategoriaDTO = listaDeMaioresGastosMesCategorias;

          this.updateChartDespesa();
          this.updateChartReceita();
        },
        error: (erro) => {
        },
      });
    }

  // Lista as categorias de receita
  listarCategoriasDeReceita() {
    this.categoriaService.listarCategoriasDeReceita().subscribe({
      next: (listaDeCategoriasDeReceita: DadosCategoriaDTO[]) => {
        this.categoriasReceita = listaDeCategoriasDeReceita;
      },
      error: (erro) => {},
    });
  }

  // Lista as categorias de despesa
  listarCategoriasDeDespesa() {
    this.categoriaService.listarCategoriasDeDespesa().subscribe({
      next: (listaDeCategoriasDeDespesa: DadosCategoriaDTO[]) => {
        this.categoriasDespesa = listaDeCategoriasDeDespesa;
      },
      error: (erro) => {},
    });
  }

  listagem() {
    this.listarCategoriasDeReceita();
    this.listarCategoriasDeDespesa();
  }

  updateChartReceita() {
    this.chartOptionReceita = {
      tooltip: {
        trigger: 'item',
      },

      series: [
        {
          type: 'pie',
          radius: ['25%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: this.maioresGastosMesCategoriaDTO.categoriasReceita.map((gasto) => ({
            value: gasto.valor,
            name: `${gasto.nome} - R$${gasto.valor} (${gasto.porcentagem}%)`,
          })),
        },
      ],
    };
  }

  updateChartDespesa() {
    this.chartOptionDespesa = {
      tooltip: {
        trigger: 'item',
      },

      series: [
        {
          type: 'pie',
          radius: ['25%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          labelLine: {
            show: false,
          },
          data: this.maioresGastosMesCategoriaDTO.categoriasDespesa.map((gasto) => ({
            value: gasto.valor,
            name: `${gasto.nome} - R$${gasto.valor} (${gasto.porcentagem}%)`,
          })),
        },
      ],
    };
  }


  /************************ MODAIS ************************/
  // Modal para editar cadastrar
  @ViewChild('modalCadastrarCategoria')
  modalCadastrarCategoria!: TemplateRef<any>;
  new() {
    this.modalRef = this.modalService.open(this.modalCadastrarCategoria);
  }

  // Modal para editar categoria
  @ViewChild('modalEditarCategoria') modalEditarCategoria!: TemplateRef<any>;
  editarModal(id: number, nome: string) {
    this.categoriaEditar.id = id;
    this.categoriaEditar.nome = nome;

    this.modalRef = this.modalService.open(this.modalEditarCategoria);
  }
}
