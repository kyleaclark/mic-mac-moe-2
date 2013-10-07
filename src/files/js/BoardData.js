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
      }

      function prepare () {
        var 
          boardSquareObj,
          index,
          square,
          i,
          j;

        for (i = 0; i < self.MATRIX_ROWS; i++) {
          for (j = 0; j < self.MATRIX_COLS; j++) {
            index = i+j;
            square = "sq-" + i + "-" + j;
            boardSquareObj = {
              index: index,
              row: i,
              col: j,
              el: square,
              player: ""
            };
            self.boardData[square] = boardSquareObj;
          }
        }
      }

      initConstants();
      initVars();
      prepare();
    }

    init();
  }

  BoardData.prototype.getIndexOfSquare = function (square) {
    return this.boardData[square].index;
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

  BoardData.prototype.getPlayerOfSquare = function (square) {
    return this.boardData[square].player;
  };

  BoardData.prototype.setPlayerOfSquare = function (square, player) {
    this.boardData[square].player = player;
  };

  BoardData.prototype.getRowOfSquare = function (square) {
    return this.boardData[square].row;
  };

  BoardData.prototype.getColOfSquare = function (square) {
    return this.boardData[square].col;
  };

  BoardData.prototype.resetBoardData = function () {
    _.each(this.boardData, function (el, item) {
      // Empty player values from boardData
    });

    //$gameBoard.trigger("renderGameBoardSquares");
  };

  return BoardData;
});
