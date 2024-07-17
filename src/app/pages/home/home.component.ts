import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { CadastrarLancamentoReceitaFormComponent } from '../../components/cadastrar-lancamento-receita-form/cadastrar-lancamento-receita-form.component';
import { CadastrarLancamentoDespesaFormComponent } from '../../components/cadastrar-lancamento-despesa-form/cadastrar-lancamento-despesa-form.component';
import { DadosHome } from '../../core/model/lancamento/DTO/dados-home';
import { LancamentoServiceService } from './../../core/service/lancamento-service.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ParcelaServiceService } from '../../core/service/parcela-service.service';
import {
  NgxEchartsDirective,
  provideEcharts,
} from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ListagemLancamentoPagarReceber } from '../../core/model/lancamento/DTO/listagem-lancamento-pagar-receber';
import { EditarLancamentoFormComponent } from '../../components/editar-lancamento-form/editar-lancamento-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MdbModalModule,
    CadastrarLancamentoReceitaFormComponent,
    CadastrarLancamentoDespesaFormComponent,
    EditarLancamentoFormComponent,
    NgFor,
    NgIf,
    CommonModule,
    NgxEchartsDirective,
  ],
  providers: [provideEcharts()],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dadosHome = new DadosHome();
  modalRef!: MdbModalRef<any>;

  chartOption: EChartsOption = {};

  constructor(
    private lancamentoService: LancamentoServiceService,
    private modalService: MdbModalService,
  ) {
    this.dadosHome.contasAPagar = [];
    this.dadosHome.contasAPagarAtrasadas = [];
    this.dadosHome.contasAReceber = [];
    this.dadosHome.contasAReceberAtrasadas = [];
    this.dadosHome.maioresGastos = [];

    this.getDadosHome();
  }

  getDadosHome() {
    this.lancamentoService.dadosHomeSaldo().subscribe({
      next: (dadoshomeSaldosBack) => {
        this.dadosHome = dadoshomeSaldosBack;
        this.updateChart();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  pagarDespagar(pagarDespagar: ListagemLancamentoPagarReceber) {
    this.lancamentoService.pagarDespagarLancamento(pagarDespagar).subscribe({
      next: (mensagem) => {
        this.getDadosHome();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateChart() {
    this.chartOption = {
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
          data: this.dadosHome.maioresGastos.map((gasto) => ({
            value: gasto.valor,
            name: `${gasto.nome} - R$${gasto.valor} (${gasto.porcentagem}%)`,
          })),
        },
      ],
    };
  }

  /************************ MODAIS ************************/
  @ViewChild('modalCadastrarReceita')
  modalCadastrarReceita!: TemplateRef<any>;
  abrirModalCadastrarReceita() {
    this.modalRef = this.modalService.open(this.modalCadastrarReceita);
  }

  @ViewChild('modalCadastrarDespesa')
  modalCadastrarDespesa!: TemplateRef<any>;
  abrirModalCadastrarDespesa() {
    this.modalRef = this.modalService.open(this.modalCadastrarDespesa);
  }

  fechaModal() {
    this.modalRef.close();
  }
}
