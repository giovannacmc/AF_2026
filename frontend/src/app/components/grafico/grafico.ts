import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { CATEGORIAS_POR_TIPO, CORES } from '../../models/categorias';
import { Movimentacao } from '../../models/movimentacao';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.html',
  styleUrl: './grafico.css',
})
export class Grafico implements OnChanges {
  @Input() movimentacoes: Movimentacao[] = [];
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  grafico?: Chart;

  ngOnChanges() {
    const categorias = CATEGORIAS_POR_TIPO.despesa;
    const totais = categorias.map((categoria) => this.somar(categoria));
    const cores = categorias.map((categoria) => CORES[categoria]);

    this.grafico?.destroy();
    this.grafico = new Chart(this.canvas.nativeElement, {
      type: 'pie',
      data: {
        labels: categorias,
        datasets: [{ data: totais, backgroundColor: cores }],
      },
    });
  }

  somar(categoria: string) {
    let total = 0;
    for (const m of this.movimentacoes) {
      if (m.tipo === 'despesa' && m.categoria === categoria) {
        total += m.valor!;
      }
    }
    return total;
  }
}
