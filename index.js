const makePlayer = (marker) => {
  const choseValidCell = (row, column, board) => {
    if (row === undefined || column === undefined) {
      return false;
    }
    // check if cell's already marked
    if (board[row][column] === -1) {
      return true;
    }
    return false;
  };

  return { marker, choseValidCell };
};

const gameBoard = (() => {
  const rowLength = 3;
  const columnLength = 3;
  // 3x3 matrix filled with -1
  const board = new Array(3).fill().map(() => new Array(3).fill(-1));

  const clearBoard = () => {
    // fill the board with -1
    board.forEach((row, rowIndex) => {
      const resetRow = row.map(() => -1);
      board[rowIndex] = resetRow;
    });
  };

  const getBoardMatrix = () => board;

  const displayBoard = () => {
    const cells = document.querySelectorAll('.cell');
    board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const flatIndex = rowIndex * rowLength + colIndex;
        // console.log(cells[flatIndex]);
        cells[flatIndex].innerHTML = col === -1 ? '' : col;
      });
    });
  };

  return {
    rowLength,
    columnLength,
    getBoardMatrix,
    clearBoard,
    displayBoard,
  };
})();

const gameLogic = ((boardObj, domHandler) => {
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

  const checkGameOver = () => {
    // check if game is over
  };

  const getWinningCells = (board) => {
    // return an array of the indexes of winning lines
  };

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
    checkGameOver,
    getWinningCells,
  };
})(gameBoard, domHandler); // eslint-disable-line no-use-before-define

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
    if (gameLogic.checkGameOver()) {
      displayWinningPattern(gameLogic.getWinningCells());
    }
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', gameLogic.handleClick);
    cell.addEventListener('click', isGameOver);
  });
})();
