import { MaioresGastosMesHomeDTO } from "../../categoria/DTO/maiores-gastos-mes-home-dto";
import { ListagemLancamentoPagarReceber } from "./listagem-lancamento-pagar-receber";

export class DadosHome {
  nome!: string;
  saldoGeral!: number;
  receitaMensal!: number;
  despesaMensal!: number;

  contasAPagar!: ListagemLancamentoPagarReceber[]
  contasAPagarAtrasadas!: ListagemLancamentoPagarReceber[]

  contasAReceber!: ListagemLancamentoPagarReceber[]
  contasAReceberAtrasadas!: ListagemLancamentoPagarReceber[]

  maioresGastos!: MaioresGastosMesHomeDTO[];
}

