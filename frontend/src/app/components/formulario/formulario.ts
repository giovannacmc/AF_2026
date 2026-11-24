import { Component, EventEmitter, Input, OnChanges, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS_POR_TIPO } from '../../models/categorias';
import { Movimentacao } from '../../models/movimentacao';
import { MovimentacaoService } from '../../services/movimentacao-service';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements OnChanges {
  private service = inject(MovimentacaoService);

  @Input() emEdicao: Movimentacao | null = null;
  @Output() salvo = new EventEmitter();
  @Output() cancelado = new EventEmitter();

  categorias = CATEGORIAS_POR_TIPO;
  movimentacao = signal(this.novaMovimentacao());
  erro = signal('');

  ngOnChanges() {
    if (this.emEdicao) {
      this.movimentacao.set({ ...this.emEdicao, data: this.emEdicao.data.substring(0, 10) });
    }
  }

  novaMovimentacao(): Movimentacao {
    return { descricao: '', tipo: 'despesa', categoria: '', valor: null, data: '' };
  }

  salvar() {
    const dados = this.movimentacao();

    if (dados._id) {
      this.service.atualizar(dados._id, dados).subscribe({
        next: () => this.finalizar(),
        error: () => this.erro.set('Erro ao salvar'),
      });
    } else {
      this.service.criar(dados).subscribe({
        next: () => this.finalizar(),
        error: () => this.erro.set('Erro ao salvar'),
      });
    }
  }

  finalizar() {
    this.limpar();
    this.salvo.emit();
  }

  cancelar() {
    this.limpar();
    this.cancelado.emit();
  }

  limpar() {
    this.movimentacao.set(this.novaMovimentacao());
    this.erro.set('');
  }
}
