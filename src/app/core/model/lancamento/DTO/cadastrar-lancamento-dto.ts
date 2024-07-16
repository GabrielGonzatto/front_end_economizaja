export class CadastrarLancamentoDTO {
  tipo!: string;
  descricao!: string;
  valor!: number;
  data!: Date;
  paga_recebida: boolean = false;
  fixa: boolean = false;
  parcelada: boolean = false;
  numero_de_parcelas: number = 0;
  id_categoria!: number;
}
