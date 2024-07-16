import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { CadastrarLancamentoDespesaFormComponent } from '../../components/cadastrar-lancamento-despesa-form/cadastrar-lancamento-despesa-form.component';
import { CadastrarLancamentoReceitaFormComponent } from '../../components/cadastrar-lancamento-receita-form/cadastrar-lancamento-receita-form.component';

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  imports: [NavbarComponent, MdbModalModule, CadastrarLancamentoDespesaFormComponent, CadastrarLancamentoReceitaFormComponent],
  templateUrl: './lancamentos.component.html',
  styleUrl: './lancamentos.component.css'
})
export class LancamentosComponent {
  modalRef!: MdbModalRef<any>

  constructor (private modalService: MdbModalService) {

  }


  /************************ MODAIS ************************/
  @ViewChild('modalCadastrarReceitaLancamentos')
  modalCadastrarReceita!: TemplateRef<any>
  abrirModalCadastrarReceita () {
    this.modalRef = this.modalService.open(this.modalCadastrarReceita);
  }

  @ViewChild('modalCadastrarDespesaLancamentos')
  modalCadastrarDespesa!: TemplateRef<any>
  abrirModalCadastrarDespesa () {
    this.modalRef = this.modalService.open(this.modalCadastrarDespesa)
  }

  fechaModal() {
    this.modalRef.close();
  }
}
