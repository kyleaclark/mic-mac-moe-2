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
      that = BoardData,
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

      function initObjects () {
        self.Class = BoardData;
      }

      function prepare () {
        var 
          row,
          col,
          boardSquareObj,
          square;

        for (row = 0; row < self.MATRIX_ROWS; row++) {
          for (col = 0; col < self.MATRIX_COLS; col++) {
            boardSquareObj = that.procureBoardSquareObj(row, col);
            square = boardSquareObj.el;
            self.boardData[square] = boardSquareObj;
          }
        }
      }

      initConstants();
      initVars();
      initObjects()
      prepare();
    }

    init();
  }

  (function initStaticVars () {
    var that = BoardData;

    that.procureBoardSquareObj = function (row, col) {
      var
        index = row + col,
        square = that.procureSquareString(row, col),
        boardSquareObj = {
          index: index,
          row: row,
          col: col,
          el: square,
          player: ""
        };

      return boardSquareObj;
    };

    that.procureSquareString = function (row, col) {
      return "sq-" + row + "-" + col;
    };

  })();

  BoardData.prototype.getIndexOfSquare = function (square) {
    return this.boardData[square].index;
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

  BoardData.prototype.getSquareOfRowCol = function (row, col) {
    var that = this.Class;

    return that.procureSquareString(row, col);
  };

  BoardData.prototype.resetBoardData = function () {
    _.each(this.boardData, function (el, item) {
      // Empty player values from boardData
    });

    //$gameBoard.trigger("renderGameBoardSquares");
  };

  return BoardData;
});
