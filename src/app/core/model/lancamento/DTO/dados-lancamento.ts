import { DadosCategoriaDTO } from "../../categoria/DTO/dados-categoria-dto";

export class DadosLancamento {
  id!: number;
  tipo!: string;
  descricao!: string;
  valor!: number;
  data!: Date;
  paga_recebida: boolean = false;
  fixa: boolean = false;
  parcelada: boolean = false;
  numero_de_parcelas: number = 0;
  categoria!: DadosCategoriaDTO;
}
