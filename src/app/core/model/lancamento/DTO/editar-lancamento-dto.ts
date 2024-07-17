import { DadosCategoriaDTO } from "../../categoria/DTO/dados-categoria-dto";

export class EditarLancamentoDTO {
  id!: Number;
  descricao!: String;
  valor!: Number;
  data!: Date;
  numero_de_parcelas!: number;
  categoria!: DadosCategoriaDTO[];
}
