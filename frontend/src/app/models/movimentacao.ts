export interface Movimentacao {
  _id?: string;
  descricao: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  valor: number | null;
  data: string;
}
