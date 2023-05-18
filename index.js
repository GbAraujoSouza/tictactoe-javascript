const makePlayer = (marker) => {
  const choseValidCell = (row, column, board) => {
    if (row === undefined || column === undefined) {
      return false;
    }
    // check if cell's already marked
    if (board[row][column] === '') {
      return true;
    }
    return false;
  };

  return { marker, choseValidCell };
};

const gameBoard = (() => {
  const rowLength = 3;
  const columnLength = 3;
  // 3x3 matrix filled with empty string
  const board = new Array(3).fill().map(() => new Array(3).fill(''));

  const displayBoard = () => {
    const cells = document.querySelectorAll('.cell');
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const flatIndex = rowIndex * rowLength + colIndex;
        cells[flatIndex].innerHTML = col === '' ? '' : col;
      });
    });
  };

  const clearBoard = () => {
    // fill the board with empty string
    board.forEach((row, rowIndex) => {
      const resetRow = row.map(() => '');
      board[rowIndex] = resetRow;
    });
    displayBoard();
  };

  const getBoardMatrix = () => board;

  return {
    rowLength,
    columnLength,
    getBoardMatrix,
    clearBoard,
    displayBoard,
  };
})();

const gameLogic = ((boardObj) => {
  let currentPlayer = 1;
  const players = [makePlayer('O'), makePlayer('X')];

  const startGame = () => {
    currentPlayer = 0;
    boardObj.clearBoard();
  };

  const resetGame = () => {
    boardObj.clearBoard();
  };

  const markCell = (row, column, marker, board) => {
    board[row][column] = marker; // eslint-disable-line no-param-reassign
  };

  const gameOver = (() => {
    const { rowLength } = boardObj;
    const boardMatrix = boardObj.getBoardMatrix();
    const winningCells = [];

    const checkGameOver = () => {
      let referenceElement = '';
      // check lines

      // check columns

      // check diagonals
      //   check principal diagonal
      let principalDiagonal = true;
      [[referenceElement]] = boardMatrix;
      for (let i = 0; i < boardMatrix.length; i += 1) {
        winningCells.push(i * rowLength + i);
        if (!boardMatrix[i][i] || boardMatrix[i][i] !== referenceElement) {
          principalDiagonal = !principalDiagonal;
          winningCells.length = 0;
          break;
        }
      }

      //   check secondary diagonal
      let secondaryDiagonal = true;
      if (!principalDiagonal) {
        referenceElement = boardMatrix[0][boardMatrix.length - 1];
        for (let row = 0; row < boardMatrix.length; row += 1) {
          const col = boardMatrix.length - row - 1;
          winningCells.push(row * rowLength + col);
          if (
            !boardMatrix[row][col] ||
            boardMatrix[row][col] !== referenceElement
          ) {
            secondaryDiagonal = !secondaryDiagonal;
            winningCells.length = 0;
            break;
          }
        }
      }

      if (principalDiagonal || secondaryDiagonal) {
        console.log('Game over');
        return true;
      }
      return false;
    };

    const getWinningCells = () => winningCells;

    return {
      checkGameOver,
      getWinningCells,
    };
  })();

  function handleClick(e) {
    const element = e.target;
    const selectedRow = Number.parseInt(
      Math.floor(element.dataset.cell / boardObj.rowLength),
      10,
    );
    const selectedColumn = Number.parseInt(
      element.dataset.cell % boardObj.rowLength,
      10,
    );

    if (
      players[currentPlayer].choseValidCell(
        selectedRow,
        selectedColumn,
        boardObj.getBoardMatrix(),
      )
    ) {
      markCell(
        selectedRow,
        selectedColumn,
        players[currentPlayer].marker,
        boardObj.getBoardMatrix(),
      );
      boardObj.displayBoard();
      currentPlayer = 1 - currentPlayer;
    }
  }

  return {
    startGame,
    resetGame,
    handleClick,
    gameOver,
  };
})(gameBoard); // eslint-disable-line no-use-before-define

const domHandler = (() => {
  // cache DOM elements
  const cells = document.querySelectorAll('.cell');

  const displayWinningPattern = (winningCells) => {
    winningCells.forEach((cellIndex) => {
      const cellElement = document.getElementById(`cell-${cellIndex}`);
      cellElement.classList.add('winning-cell');
    });
  };

  const isGameOver = () => {
    if (gameLogic.gameOver.checkGameOver()) {
      displayWinningPattern(gameLogic.gameOver.getWinningCells());
    }
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', gameLogic.handleClick);
    cell.addEventListener('click', isGameOver);
  });
})();
