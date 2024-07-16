import { LancamentoServiceService } from './../../core/service/lancamento-service.service';
import { CategoriaServiceService } from './../../core/service/categoria-service.service';
import { DadosCategoriaDTO } from './../../core/model/categoria/DTO/dados-categoria-dto';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';
import { CadastrarLancamentoDTO } from '../../core/model/lancamento/DTO/cadastrar-lancamento-dto';

@Component({
  selector: 'app-cadastrar-lancamento-despesa-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, NgFor, NgIf, NgxMaskDirective, NgxMaskPipe],
  providers:[provideNgxMask()],
  templateUrl: './cadastrar-lancamento-despesa-form.component.html',
  styleUrl: './cadastrar-lancamento-despesa-form.component.css'
})
export class CadastrarLancamentoDespesaFormComponent {
  despesa = new CadastrarLancamentoDTO();
  categorias: DadosCategoriaDTO[] = [];

  valorParcela = 0;

  constructor (private categoriaService: CategoriaServiceService, private lancamentoService: LancamentoServiceService) {
    this.listarCategoriasDeDespesa();
  }

  cadastrar() {
    this.despesa.tipo = 'despesa';

    if (this.despesa.descricao == null || this.despesa.valor == null || this.despesa.data == null || this.despesa.id_categoria == null) {
      Swal.fire({
        title: 'Preencha todos os campos corretamente',
        icon: 'question',
        toast: true,
        position: 'top-end',
      });
    } else {
      this.lancamentoService.cadastrar(this.despesa).subscribe({
        next: (mensagem) => {
          Swal.fire({
            title: 'Lançamento cadastrado com sucesso',
            icon: 'success',
            toast: true,
            position: 'top-end',
          });
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }

  listarCategoriasDeDespesa (){
    this.categoriaService.listarCategoriasDeDespesa().subscribe({
      next: (listaCategoirasDeDespesa) => {
        this.categorias = listaCategoirasDeDespesa;
      },
      error: (error) => {
      },
    })
  }

  mudaValorCheckBox (checkbox: string) {
    if (checkbox === 'fixa' && this.despesa.fixa) {
      this.despesa.parcelada = false;
    }
    if (checkbox === 'parcelado' && this.despesa.parcelada) {
      this.despesa.fixa = false;
    }
  }

  calculaValorParcela (){
    if (this.despesa.valor != null && this.despesa.numero_de_parcelas != null) {
      this.valorParcela = this.despesa.valor / this.despesa.numero_de_parcelas;
    }
  }
}
