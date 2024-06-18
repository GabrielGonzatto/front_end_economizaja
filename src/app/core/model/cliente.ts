export enum ClienteRole {
  CLIENTE = 'cliente',
}

export class Cliente {
  id!: number;
  primeiro_nome!: string;
  segundo_nome!: string;
  cpf!: string;
  email!: string;
  senha!: string;
  role!: ClienteRole;

  constructor(){}

}
