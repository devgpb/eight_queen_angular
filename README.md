# Informações Úteis para Lidar com o Projeto

Este documento fornece orientações gerais para você continuar o projeto. Abaixo estão detalhes sobre a estrutura de código e dicas sobre como você pode efetivamente fazer alterações e melhorias.

## Estrutura do Projeto

### Componentes

- **Componente Board:** 
  - **Localização:** `board.component.html`
  - **Descrição:** Toda a lógica do projeto está concentrada neste componente.
  - **Estilos:** Os estilos relacionados ao tabuleiro são definidos especificamente dentro deste componente para modularidade.

- **Componente App:**
  - **Localização:** `app-component`
  - **Descrição:** Usado para importar o componente Board e definir estilos globais.
  - **Dica:** Tente manter os estilos globais definidos aqui e estilos específicos do tabuleiro no componente Board.

### Arquivos Detalhados

#### `board.component.html`

- **.cell:** Define uma célula individual no tabuleiro. As classes `black` e `white` são usadas para colorir as células com base em sua posição.
- **Animação:** 
  - Linha 9: Contém uma `div` que executa uma animação de piscar em azul, usada para indicar análise pelo computador.
  - Linha 12: Marcadores amarelos indicam o valor inicial de uma célula livre.
  - Linha 14: Marcadores para células que podem ser atacadas por uma rainha.

**Nota:** Todos os três marcadores estão atualmente desativados devido a mudanças na lógica. A renderização é controlada por valores no objeto correspondente dentro da matriz no TypeScript. Por exemplo, se o parâmetro `status` for igual a 'queen', uma rainha será marcada.

#### `board.component.ts`

- **Comentários:** Todo o código está comentado para facilitar a compreensão.
- **Execução:** A velocidade de execução do código é limitada pelo `await this.delay(200)` dentro da função `placeQueens`.

**Atenção:** Ao alterar a duração da animação de `blink`, ajuste o `setTimeout` no método `blink` conforme mostrado abaixo:

```typescript
blink(row: number, col: number) {
    this.rows[row][col].event = 'blink';
    setTimeout(() => {
        this.rows[row][col].event = ''; // Remove o evento após 1 segundo.
    }, 1000); // Ajuste este valor conforme necessário
}
```

### Melhorias Visuais E Testes
- **Prioridades:**
  - Focar primeiro em estilizar os aspectos básicos e realizar testes em dispositivos móveis.
  - Em seguida, em fazer os indicadores funcionarem ou desenvolva seus próprios indicadores.

**Dicas adicionais:** O projeto já está funcional, mas seria ideal adicionar mais animações e indicadores para melhorar a interatividade e a experiência do usuário.

