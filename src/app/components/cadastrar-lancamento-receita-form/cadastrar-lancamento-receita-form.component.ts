import { LancamentoServiceService } from './../../core/service/lancamento-service.service';
import { Component} from '@angular/core';
import { CategoriaServiceService } from '../../core/service/categoria-service.service';
import { DadosCategoriaDTO } from '../../core/model/categoria/DTO/dados-categoria-dto';
import { CadastrarLancamentoDTO } from '../../core/model/lancamento/DTO/cadastrar-lancamento-dto';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HomeComponent } from '../../pages/home/home.component';
import Swal from 'sweetalert2';
import { LancamentosComponent } from '../../pages/lancamentos/lancamentos.component';


@Component({
  selector: 'app-cadastrar-lancamento-receita-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, NgFor, NgxMaskDirective, NgxMaskPipe, NgIf],
  providers:[provideNgxMask()],
  templateUrl: './cadastrar-lancamento-receita-form.component.html',
  styleUrl: './cadastrar-lancamento-receita-form.component.css'
})
export class CadastrarLancamentoReceitaFormComponent {
  receita = new CadastrarLancamentoDTO()
  categorias: DadosCategoriaDTO[] = [];

  valorParcela = 0;

  constructor(private categoriaService: CategoriaServiceService, private lancamentoService: LancamentoServiceService){
    this.listarCategoriasDeReceita()
  }

  cadastrar() {
    this.receita.tipo = 'receita';

    if (this.receita.descricao == null || this.receita.valor == null || this.receita.data == null || this.receita.id_categoria == null) {
      Swal.fire({
        title: 'Preencha todos os campos corretamente',
        icon: 'question',
        toast: true,
        position: 'top-end',
      });
    } else {
      this.lancamentoService.cadastrar(this.receita).subscribe({
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

  listarCategoriasDeReceita (){
    this.categoriaService.listarCategoriasDeReceita().subscribe({
      next: (listaCategoirasDeReceita) => {
        this.categorias = listaCategoirasDeReceita;
        console.log(this.categorias, listaCategoirasDeReceita);
      },
      error: (error) => {
      },
    })
  }

  mudaValorCheckBox (checkbox: string) {
    if (checkbox === 'fixa' && this.receita.fixa) {
      this.receita.parcelada = false;
    }
    if (checkbox === 'parcelado' && this.receita.parcelada) {
      this.receita.fixa = false;
    }
  }

  calculaValorParcela (){
    if (this.receita.valor != null && this.receita.numero_de_parcelas != null) {
      this.valorParcela = this.receita.valor / this.receita.numero_de_parcelas;
    }
  }
}
