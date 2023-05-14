/* eslint-disable quotes */
const gameBoard = (() => {
  // 3x3 matrix filled with -1
  const board = new Array(3).fill().map(() => new Array(3).fill(-1));

  return {
    board,
  };
})();

const gameLogic = (() => {
  const clearBoard = (board) => {
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
