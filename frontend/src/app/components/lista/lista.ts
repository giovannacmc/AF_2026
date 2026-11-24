import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CORES } from '../../models/categorias';
import { Movimentacao } from '../../models/movimentacao';

@Component({
  selector: 'app-lista',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './lista.html',
  styleUrl: './lista.css',
})
export class Lista {
  @Input() movimentacoes: Movimentacao[] = [];
  @Output() editar = new EventEmitter<Movimentacao>();
  @Output() excluir = new EventEmitter<Movimentacao>();

  cores = CORES;
}
