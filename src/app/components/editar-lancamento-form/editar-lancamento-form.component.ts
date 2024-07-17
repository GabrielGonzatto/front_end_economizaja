import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { EditarLancamentoDTO } from '../../core/model/lancamento/DTO/editar-lancamento-dto';
import { DadosCategoriaDTO } from '../../core/model/categoria/DTO/dados-categoria-dto';
import { ListagemLancamentoPagarReceber } from '../../core/model/lancamento/DTO/listagem-lancamento-pagar-receber';
import { LancamentosComponent } from '../../pages/lancamentos/lancamentos.component';

@Component({
  selector: 'app-editar-lancamento-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, NgIf],
  templateUrl: './editar-lancamento-form.component.html',
  styleUrl: './editar-lancamento-form.component.css'
})
export class EditarLancamentoFormComponent {
  lancamento = new EditarLancamentoDTO();
  dadosLancamentoEditar = new ListagemLancamentoPagarReceber();
  categorias: DadosCategoriaDTO[] = [];

  constructor (private lancamentoComponent: LancamentosComponent) {
    /*this.dadosLancamentoEditar = lancamentoComponent.getLancamentoEditar();

    console.log(this.dadosLancamentoEditar.descricao)*/
  }

}
