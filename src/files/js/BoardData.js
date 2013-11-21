define([
  "jquery",
  "underscore",
  "js/utils/Globals",
  "js/utils/PubSub"
], function ($, _, Globals, PubSub) {
  "use strict";

  function BoardData(config) {
    var
      self = this,
      that = BoardData,
      defaults = {};

    function initGlobals() {
      
    }

    function initConstants() {
      self.MATRIX_ROWS = 5;
      self.MATRIX_COLS = 5;
      self.BOARD_SQUARES = self.MATRIX_ROWS * self.MATRIX_COLS;
      self.EMPTY = "";
    }

    function initVars() {
      // Options
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);

      // Variables
      self.boardElems = "";
      self.boardData = [];
    }

    function initObjects() {
      self.Class = BoardData;
      self.PubSub = PubSub;
    }

    /*function setBinds() {
      self.PubSub.subscribe(that.SET_TURN_EVENT, function (ev, player, square) {
        self.setPlayerOfSquare(player, square);
      });
    }*/

    function prepare() {
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

    initGlobals();
    initConstants();
    initVars();
    initObjects();
    prepare();
  }

  (function initStatic() {
    var that = BoardData;

    that.SET_TURN_EVENT = Globals.SET_TURN_EVENT;

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

  BoardData.prototype.setPlayerOfSquare = function (player, square) {
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
    /*_.each(this.boardData, function (el, item) {
      // Empty player values from boardData
    });*/

    //$gameBoard.trigger("renderGameBoardSquares");
  };

  return BoardData;
});
