import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LancamentoServiceService } from '../../core/service/lancamento-service.service';
import { DataLancamentosConsultaDTO } from '../../core/model/lancamento/DTO/data-lancamentos-consulta-dto';
import { DadosRelatorios } from '../../core/model/lancamento/DTO/dados-relatorios';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [NavbarComponent, NgxEchartsDirective, MdbFormsModule, FormsModule],
  providers: [provideEcharts()],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent {
  dataLancamento = new DataLancamentosConsultaDTO();
  dadosRelatorios = new DadosRelatorios();
  chartOptionReceita: EChartsOption = {};
  chartOptionDespesa: EChartsOption = {};

  constructor(private lancamentoService: LancamentoServiceService) {
    this.dataLancamento.dataLancamentoConsulta = 'mes';

    this.getDadosRelatorios();
  }

  getDadosRelatorios() {
    this.lancamentoService.dadosRelatorios(this.dataLancamento).subscribe({
      next: (dadosRelatorios) => {
        this.dadosRelatorios = dadosRelatorios;
        this.updateChart();
              },
      error: (erro) => {
        console.log(erro);
      },
    });
  }

  atualizaData() {
    this.getDadosRelatorios();
  }

  updateChart() {
    this.chartOptionDespesa = {
      xAxis: {
        type: 'category',
        data: this.dadosRelatorios.despesas.map((depesa) => depesa.data.toString())
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const dataPoint = params[0]; // Supondo que você queira apenas o primeiro ponto
          const value = dataPoint.value;
          const name = `Despesa em ${dataPoint.name}`; // Nome dinâmico baseado na data
          return `${name}: R$ ${value}`;
        }
      },
      series: [
        {
          data: this.dadosRelatorios.despesas.map((despea) => ({
            value: despea.valor,
            name: despea.data.toString() // Aqui você pode definir o nome dinâmico do ponto
          })),
          type: 'line',
          smooth: true,
          symbol: 'circle', // Símbolo do ponto
          symbolSize: 8, // Tamanho do símbolo
          lineStyle: {
            color: 'rgba(255, 99, 132, 1)',
            width: 2,
            type: 'solid'
          },
          itemStyle: {
            color: 'rgba(255, 99, 132, 1)',
          }
        }
      ]
    };

    this.chartOptionReceita = {
      xAxis: {
        type: 'category',
        data: this.dadosRelatorios.receitas.map((receita) => receita.data.toString())
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const dataPoint = params[0]; // Supondo que você queira apenas o primeiro ponto
          const value = dataPoint.value;
          const name = `Receita em ${dataPoint.name}`; // Nome dinâmico baseado na data
          return `${name}: R$ ${value}`;
        }
      },
      series: [
        {
          data: this.dadosRelatorios.receitas.map((receita) => ({
            value: receita.valor,
            name: receita.data.toString() // Aqui você pode definir o nome dinâmico do ponto
          })),
          type: 'line',
          smooth: true,
          symbol: 'circle', // Símbolo do ponto
          symbolSize: 8, // Tamanho do símbolo
          lineStyle: {
            color: 'rgba(54, 162, 235, 1)',
            width: 2,
            type: 'solid'
          },
          itemStyle: {
            color: 'rgba(54, 162, 235, 0.7)' // Cor do item
          }
        }
      ]
    };
  }



}
