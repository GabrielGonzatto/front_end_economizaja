import { DadosLancamento } from "../../lancamento/DTO/dados-lancamento";

export class DadosParcela {
  id!: number;
  valor!: number;
  paga_recebida!: boolean
  data!: Date;
  contador!: number;
  lancamento!: DadosLancamento;
}
