export const CORES: Record<string, string> = {
  Salário: '#008300',
  'Renda extra': '#6250d6',
  Alimentação: '#2a78d6',
  Moradia: '#eb6834',
  Transporte: '#1baf7a',
  Lazer: '#eda100',
  Saúde: '#e87ba4',
  Outros: '#7a7974',
};

export const CATEGORIAS = Object.keys(CORES);

export const CATEGORIAS_POR_TIPO = {
  receita: ['Salário', 'Renda extra', 'Outros'],
  despesa: ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Saúde', 'Outros'],
};
