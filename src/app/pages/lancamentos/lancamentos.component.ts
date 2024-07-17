import { ListagemLancamentoPagarReceber } from './../../core/model/lancamento/DTO/listagem-lancamento-pagar-receber';
import { DataLancamentosConsultaDTO } from './../../core/model/lancamento/DTO/data-lancamentos-consulta-dto';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { CadastrarLancamentoDespesaFormComponent } from '../../components/cadastrar-lancamento-despesa-form/cadastrar-lancamento-despesa-form.component';
import { CadastrarLancamentoReceitaFormComponent } from '../../components/cadastrar-lancamento-receita-form/cadastrar-lancamento-receita-form.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { LancamentoServiceService } from '../../core/service/lancamento-service.service';
import { EditarLancamentoFormComponent } from '../../components/editar-lancamento-form/editar-lancamento-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [
    NavbarComponent,
    MdbModalModule,
    CadastrarLancamentoDespesaFormComponent,
    CadastrarLancamentoReceitaFormComponent,
    EditarLancamentoFormComponent,
    MdbFormsModule,
    FormsModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.css',
})
export class LancamentosComponent {
  modalRef!: MdbModalRef<any>;
  dataLancamentosConsulta = new DataLancamentosConsultaDTO();
  lancamentoEditar = new ListagemLancamentoPagarReceber();
  listagemLancamentos: ListagemLancamentoPagarReceber[] = [];

  constructor(
    private modalService: MdbModalService,
    private lancamentoService: LancamentoServiceService
  ) {
    this.getLancamentosData();
  }

  getLancamentosData() {
    if (
      this.dataLancamentosConsulta.dataLancamentoConsulta != 'dataEspecifica'
    ) {
      this.dataLancamentosConsulta.dataInicial = null;
      this.dataLancamentosConsulta.dataFinal = null;
      this.lancamentoService
        .getLancamentosData(this.dataLancamentosConsulta)
        .subscribe({
          next: (lista) => {
            this.listagemLancamentos = lista;

            this.dataLancamentosConsulta.dataFinal = null;
            this.dataLancamentosConsulta.dataInicial = null;
          },
          error: (erro) => {},
        });
    }

    if (
      this.dataLancamentosConsulta.dataInicial != null &&
      this.dataLancamentosConsulta.dataFinal != null &&
      this.dataLancamentosConsulta.dataLancamentoConsulta == 'dataEspecifica'
    ) {
      this.lancamentoService
        .getLancamentosData(this.dataLancamentosConsulta)
        .subscribe({
          next: (lista) => {
            this.listagemLancamentos = lista;

            this.dataLancamentosConsulta.dataFinal = null;
            this.dataLancamentosConsulta.dataInicial = null;
          },
          error: (erro) => {},
        });
    }
  }

  deletar (lancamento: ListagemLancamentoPagarReceber) {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar o lançamento??',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Não, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.lancamentoService.deletar(lancamento).subscribe({
          next: (mensagem) => {
            this.getLancamentosData();
          },
          error: (erro) => {

          },
        })

        Swal.fire(
          'Deletado!',
          'Seu lançamento foi deletado.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Seu lançamento está seguro :)',
          'error'
        );
      }
    });

  }

  pagarDespagar(pagarDespagar: ListagemLancamentoPagarReceber) {
    this.lancamentoService.pagarDespagarLancamento(pagarDespagar).subscribe({
      next: (mensagem) => {
        this.getLancamentosData();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getLancamentoEditar (): ListagemLancamentoPagarReceber {
    return this.lancamentoEditar;
  }

  /************************ MODAIS ************************/
  @ViewChild('modalCadastrarReceitaLancamentos')
  modalCadastrarReceita!: TemplateRef<any>;
  abrirModalCadastrarReceita() {
    this.modalRef = this.modalService.open(this.modalCadastrarReceita);
  }

  @ViewChild('modalCadastrarDespesaLancamentos')
  modalCadastrarDespesa!: TemplateRef<any>;
  abrirModalCadastrarDespesa() {
    this.modalRef = this.modalService.open(this.modalCadastrarDespesa);
  }

  fechaModal() {
    this.modalRef.close();
  }
}
