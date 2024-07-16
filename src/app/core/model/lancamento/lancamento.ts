import { Categoria } from "../categoria/categoria";
import { Cliente } from "../cliente/cliente";
import { Parcela } from "../parcela/parcela";

export class Lancamento {
  id!: Number;
  tipo!: String;
  descricao!: String;
  valor!: Number;
  data!: Date;
  paga_recebida!: Boolean;
  fixa!: Boolean;
  parcelada!: Boolean;
  numero_de_parcelas!: Number;
  ativo!: Boolean;

  categoria!: Categoria;
  cliente!: Cliente;
  parcelas!: Parcela[];

}
