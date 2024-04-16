import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board', // Nome do seletor do componente.
  standalone: true, // Define o componente como autônomo, não requerendo módulo para ser declarado.
  imports: [CommonModule], // Importa CommonModule para usar diretivas comuns do Angular como ngIf, ngFor, etc.
  templateUrl: './board.component.html', // Caminho para o arquivo de template HTML do componente.
  styleUrls: ['./board.component.scss'] // Caminho para os estilos específicos do componente.
})
export class BoardComponent {

  public interacoes = 0
  public calculando = false


  // Inicializa uma matriz representando as células do tabuleiro com status 'normal' e valor 1.
  rows: { event: string, status: string, value: number }[][] = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => ({ event: '', status: 'normal', value: 1 }))
  );

  // Método assíncrono para iniciar a colocação de rainhas no tabuleiro.
  async placeRandomQueen() {
    this.clearBoard(); // Limpa o tabuleiro antes de começar.
    this.interacoes = 0
    this.calculando = true
    let graph = this.initializeGraph(); // Inicializa um grafo para controle das posições seguras.
    let success = await this.placeQueens(graph, 0); // Tenta colocar rainhas recursivamente.
    if (!success) {
      console.log('Nenhuma solução encontrada'); // Loga se não encontrar solução.
    }
    this.calculando = false
  }

  // Inicializa o grafo com todos os valores como 'false', indicando que não há rainhas.
  initializeGraph() {
    let graph = new Array(8).fill(null).map(() => new Array(8).fill(false));
    return graph;
  }

  // Tenta colocar rainhas no tabuleiro de maneira recursiva.
  async placeQueens(graph: any[][], row: number) {
    if (row === 8) { // Base da recursão: todas as rainhas foram colocadas.
      return true;
    }
    for (let col = 0; col < 8; col++) {
      if (this.isSafe(graph, row, col)) { // Verifica se é seguro colocar a rainha.
        graph[row][col] = true; // Marca a posição no grafo.
        this.rows[row][col] = { event: '', status: 'queen', value: -1 }; // Atualiza a visualização.
        this.blink(row, col); // Aciona uma animação de blink.
        await this.delay(100); // Espera por 200ms para visualização.

        if (await this.placeQueens(graph, row + 1)) { // Recursão para a próxima linha.
          this.interacoes += 1
          return true;
        }

        graph[row][col] = false; // Backtrack: remove a rainha se não levar a uma solução.
        this.rows[row][col] = { event: '', status: 'normal', value: 1 }; // Restaura a célula.
      }
      this.interacoes += 1
    }
    return false; // Retorna falso se não conseguir colocar uma rainha em nenhuma coluna desta linha.
  }

  // Verifica se é seguro colocar uma rainha em uma dada posição.
  isSafe(graph: any[][], row: number, col: number): boolean {
    for (let i = 0; i < row; i++) {
        if (graph[i][col]) {
            return false; // Verifica a coluna.
        }
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (graph[i][j]) {
            return false; // Verifica a diagonal principal.
        }
    }

    for (let i = row, j = col; i >= 0 && j < 8; i--, j++) {
        if (graph[i][j]) {
            return false; // Verifica a diagonal secundária.
        }
    }

    return true; // Retorna verdadeiro se a posição for segura.
  }

  // Aciona uma animação de "blink" alterando temporariamente o evento da célula.
  blink(row: number, col: number) {
    this.rows[row][col].event = 'blink';
    console.log("BlinkAt: rol = " + row + " col = " + col)
    setTimeout(() => {
      this.rows[row][col].event = ''; // Remove o evento após 1 segundo.
    }, 100);
  }

  // Função para criar um atraso.
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Limpa o tabuleiro, redefinindo todas as células para o status 'normal'.
  clearBoard() {
    this.rows = this.rows.map(row => row.map(() => ({ event: '', status: 'normal', value: 1 })));
  }
}
