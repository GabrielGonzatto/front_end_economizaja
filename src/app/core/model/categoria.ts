export class Categoria {
  id!: number;
  nome!: string;
  tipo!: string;
  ativo!: boolean;

  constructor(nome: string, tipo: string, ativo: boolean, id: number) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.ativo = ativo;
  }
}
