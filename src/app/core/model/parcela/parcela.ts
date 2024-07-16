import { Lancamento } from './../lancamento/lancamento';
export class Parcela {
  id!: Number;
  paga_recebida!: Boolean;
  data!: Date;
  contador!: Number;
  ativo!: Boolean;

  Lancamento!: Lancamento;
}
