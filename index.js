/* eslint-disable quotes */
const makePlayer = (name, marker) => {
  const choseCell = (row, column, board) => {
    // check if cell's already marked
    if (board[row][column] !== -1) {
      return board[row][column];
    }
  };

  return { name, marker, choseCell };
};

const gameBoard = (() => {
  // 3x3 matrix filled with -1
  const board = new Array(3).fill().map(() => new Array(3).fill(-1));

  const clearBoard = () => {
    // fill the board with -1
    board.forEach((row, rowIndex) => {
      const resetRow = row.map(() => -1);
      board[rowIndex] = resetRow; // eslint-disable-line no-param-reassign
    });
  };

  return {
    clearBoard,
  };
})();

const gameLogic = ((board) => {
  const resetGame = () => {
    board.clearBoard();
  };

  return {
    resetGame,
  };
})(gameBoard);
