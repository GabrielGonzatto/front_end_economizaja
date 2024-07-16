import { MaioresGastosMesHomeDTO } from "../../categoria/DTO/maiores-gastos-mes-home-dto";
import { DadosParcela } from "../../parcela/DTO/dados-parcela";
import { DadosLancamento } from "./dados-lancamento";
import { ListagemHomePagarReceber } from "./listagem-home-pagar-receber";

export class DadosHome {
  nome!: string;
  saldoGeral!: number;
  receitaMensal!: number;
  despesaMensal!: number;

  contasAPagar!: ListagemHomePagarReceber[]
  contasAPagarAtrasadas!: ListagemHomePagarReceber[]

  contasAReceber!: ListagemHomePagarReceber[]
  contasAReceberAtrasadas!: ListagemHomePagarReceber[]

  maioresGastos!: MaioresGastosMesHomeDTO[];
}

