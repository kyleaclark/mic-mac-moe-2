define([
  "jquery",
  "js/Game"
], function (
  $,
  Game
) {
  "use strict";

  function Board (config) {
    var
      self = this,
      defaults = {

      };

    function init () {

      function initVars () {
        EMPTY = "";
        MAX_ROWS = 5;
        MAX_COLS = 5;
        MAX = MAX_ROWS * MAX_COLS;
        $gameBoard = $("#game-board");
        /*
        _pres = {
          renderGameBoardSquares : NS.pres._m.renderGameBoardSquares
        };
        */
      }

      function setBoardData () {
        for (i = 0; i < MAX_ROWS; i++) {
          for (j = 0; j < MAX_COLS; j++) {
            squareID = "sq-" + i + "-" + j;
            boardObj = {
              row: i,
              col: j,
              square: squareID,
              player: ""
            };
            boardData.push(boardObj);
          }
        }
      }

      initVars();
      setBoardData();
    }

    init();
  }

  Board.prototype.getIndexOfSquare = function (square) {
    for (i = 0; i < MAX; i++) {
      if (boardData[i].square === square) {
        return i;
      }
    }
    return false;
  };

  Board.prototype.getPlayerBySquare = function (square) {
    index = _m.getIndexBySquare(square);
    return boardData[index].player;
  };

  Board.prototype.getRowByIndex = function (index) {
    return boardData[index].row;
  };

  Board.prototype.getColByIndex = function (index) {
    return boardData[index].col;
  };

  Board.prototype.getPlayerByIndex = function (index) {
    if (boardData[index]) {
      return boardData[index].player;
    }
    return false;
  };

  Board.prototype.getIndexBySquare = function (square) {
    return getIndexOfSquare(square);
  };

  Board.prototype.setPlayerBySquare = function (player, square) {
    index = _m.getIndexBySquare(square);
    boardData[index].player = player;
  };

  Board.prototype.resetBoardData = function (index) {
    for (i = 0; i < MAX; i++) {
      if (boardData[i].player !== EMPTY) {
        boardData[i].player = EMPTY;
        squareID = "#" + boardData[i].square;
      }
    }

    $gameBoard.trigger("renderGameBoardSquares");
  };

  return Board;

});
