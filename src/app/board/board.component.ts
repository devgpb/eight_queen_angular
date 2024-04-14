import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  // Inicializa todas as células com 1, que representam marcadores amarelos
  rows: number[][] = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 1));

  placeRandomQueen() {
    // Encontrar posições disponíveis onde não há rainhas ou caminhos de ataque
    let stackReset = 0;

    const availablePositions: { i: number; j: number }[] = [];
    this.rows.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 1) { // Verifica apenas células com marcadores amarelos
          availablePositions.push({ i, j });
        }
      });
    });

    if (availablePositions.length === 0) {
      this.clearBoard()
      return;
    }

    // Escolher uma posição aleatória das disponíveis
    const position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    this.updateAttackPaths(position.i, position.j);
  }

  updateAttackPaths(row: number, col: number) {
    // Atualiza as linhas, colunas e diagonais antes de colocar a rainha
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // Se está na mesma linha, coluna ou diagonal, incrementa o contador de ataque
        if (i === row || j === col || Math.abs(row - i) === Math.abs(col - j)) {
          this.rows[i][j] = 2; // Marcador verde para células atacadas
        }
      }
    }

    // Marca a posição da rainha por último para evitar sobrescrita pelos incrementos
    this.rows[row][col] = -1;
  }

  clearBoard() {
    this.rows = this.rows.map(row => row.map(() => 1)); // Reset para marcadores amarelos
  }
}
