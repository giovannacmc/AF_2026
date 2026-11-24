import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Movimentacao } from '../models/movimentacao';

@Service()
export class MovimentacaoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/movimentacoes';

  listar() {
    return this.http.get<Movimentacao[]>(this.url);
  }

  criar(movimentacao: Movimentacao) {
    return this.http.post<Movimentacao>(this.url, movimentacao);
  }

  atualizar(id: string, movimentacao: Movimentacao) {
    return this.http.put<Movimentacao>(this.url + '/' + id, movimentacao);
  }

  excluir(id: string) {
    return this.http.delete(this.url + '/' + id);
  }
}
