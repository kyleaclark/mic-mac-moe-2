define([
  "jquery",
  "js/Game",

  "underscore"
], function (
  $,
  Game
) {
  "use strict";

  function BoardData (config) {
    var
      self = this,
      defaults = {};

    function init () {

      function initConstants () {
        self.MATRIX_ROWS = 5;
        self.MATRIX_COLS = 5;
        self.BOARD_SQUARES = self.MATRIX_ROWS * self.MATRIX_COLS;
        self.EMPTY = "";
      }

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);

        // Self-contained variables
        self.boardElems = "";
        self.boardData = [];
        /*
        _pres = {
          renderGameBoardSquares : NS.pres._m.renderGameBoardSquares
        };
        */
      }

      function prepare () {
        var 
          boardSquareObj,
          index,
          squareEl,
          i,
          j;

        for (i = 0; i < self.MATRIX_ROWS; i++) {
          for (j = 0; j < self.MATRIX_COLS; j++) {
            index = i+j;
            squareEl = "sq-" + i + "-" + j;
            boardSquareObj = {
              index: index,
              row: i,
              col: j,
              el: squareEl,
              player: ""
            };
            self.boardData[squareEl] = boardSquareObj;
          }
        }
      }

      initConstants();
      initVars();
      prepare();
    }

    init();
  }

  BoardData.prototype.getIndexOfSquare = function (squareEl) {
    return this.boardData[squareEl].index;
    /*
    for (i = 0; i < MAX; i++) {
      if (this.boardData[i].square === square) {
        return i;
      }
    }
    return false;
    */
    //index = (row * MATRIX_ROWS) + col;
  };

  BoardData.prototype.getPlayerOfSquare = function (squareEl) {
    return thisboardData[squareEl].player;
  };

  BoardData.prototype.getRowOfSquare = function (squareEl) {
    return boardData[squareEl].row;
  };

  BoardData.prototype.getColOfSquare = function (squareEl) {
    return boardData[squareEl].col;
  };

  /*
  Board.prototype.getPlayerByIndex = function (index) {
    if (boardData[index]) {
      return boardData[index].player;
    }
    return false;
  };

  Board.prototype.getRowByIndex = function (index) {
    return boardData[index].row;
  };

  Board.prototype.getColByIndex = function (index) {
    return boardData[index].col;
  };
  */

  BoardData.prototype.setPlayerBySquare = function (squareEl, player) {
    this.boardData[squareEl].player = player;
  };

  BoardData.prototype.resetBoardData = function () {
    _.each(this.boardData, function (el, item) {
      // Empty player values from boardData
    });

    //$gameBoard.trigger("renderGameBoardSquares");
  };

  return BoardData;
});
