import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Formulario } from './components/formulario/formulario';
import { Grafico } from './components/grafico/grafico';
import { Lista } from './components/lista/lista';
import { CATEGORIAS } from './models/categorias';
import { Movimentacao } from './models/movimentacao';
import { MovimentacaoService } from './services/movimentacao-service';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, Formulario, Grafico, Lista],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private service = inject(MovimentacaoService);

  categorias = CATEGORIAS;
  movimentacoes = signal<Movimentacao[]>([]);
  emEdicao = signal<Movimentacao | null>(null);
  filtro = signal('');
  erro = signal('');

  receitas = computed(() => this.somar('receita'));
  despesas = computed(() => this.somar('despesa'));
  saldo = computed(() => this.receitas() - this.despesas());

  filtradas = computed(() => {
    if (this.filtro() === '') {
      return this.movimentacoes();
    }
    return this.movimentacoes().filter((m) => m.categoria === this.filtro());
  });

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe({
      next: (dados) => {
        this.movimentacoes.set(dados);
        this.erro.set('');
      },
      error: () => this.erro.set('Erro ao conectar com a API'),
    });
  }

  aoSalvar() {
    this.emEdicao.set(null);
    this.carregar();
  }

  excluir(movimentacao: Movimentacao) {
    this.service.excluir(movimentacao._id!).subscribe({
      next: () => this.carregar(),
      error: () => this.erro.set('Erro ao excluir'),
    });
  }

  somar(tipo: string) {
    let total = 0;
    for (const m of this.movimentacoes()) {
      if (m.tipo === tipo) {
        total += m.valor!;
      }
    }
    return total;
  }
}
