define([
  "jquery",
  "js/Game"
], function (
  $,
  Game
) {
  "use strict";

  function WinValidation (config) {
    var
      self = this,
      defaults = {};

    function init () {

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);
      }

      function initObjects () {
        self.Board = NS.Board;
        self.Turn = NS.Turn;
      }

      initVars();
    }

    init();
  }

  (function initStatic () {
    var that = WinValidation;

    function initVars () {
      that.MATRIX_ROWS = 5;
      that.ONE = 1;
      that.TWO = 2;
    }

    initVars();
  })();

  WinValidation.isSquarePlayer = function (row, col) {
    index = (row * MATRIX_ROWS) + col;

    if (_board.getPlayerByIndex(index) === player) {
      return true;
    }

    return false;
  };

  WinValidation.checkVerticalWin = function (row, col) {
    var
      that = WinValidation,
      isSquarePlayer = that.isSquarePlayer();

    if (isSquarePlayer(row.upOne, col) 
      && (isSquarePlayer(row.upTwo, col) || isSquarePlayer(row.downOne, col))) {
        return true;
    } else if (isSquarePlayer(row.downOne, col) && isSquarePlayer(row.downTwo, col)) {
        return true;
    }

    return false;
  }

  // Check Horizontal Win
  WinValidation.checkHorizontalWin = function (row, col) {
    var
      that = WinValidation,
      isSquarePlayer = that.isSquarePlayer();

    if (isSquarePlayer(row, cols.leftOne) 
      && (isSquarePlayer(row, cols.leftTwo) || isSquarePlayer(row, cols.rightOne))) {
        return true;
    } else if (isSquarePlayer(row, cols.rightOne) && isSquarePlayer(row, cols.rightTwo)) {
        return true;
    }

    return false;
  }

  WinValidation.checkDiagnolWin = function () {
    var that = WinValidation;

    if (that.checkDiagnolUpLeft() || that.checkDiagnolDownLeft() || that.checkDiagnolUpRight() || that.checkDiagnolDownRight()) {
      return true;
    }

    return false;
  };

  WinValidation.checkDiagnolUpLeft = function (row, col) {
    var
      that = WinValidation,
      isSquarePlayer = that.isSquarePlayer();

    if (isSquarePlayer(row.upOne, col.leftOne) 
      && (isSquarePlayer(row.upTwo, col.leftTwo) || isSquarePlayer(row.downOne, col.rightOne))) {
        return true;
    }

    return false;
  };

  WinValidation.checkDiagnolDownLeft = function (row, col) {
    var
      that = WinValidation,
      isSquarePlayer = that.isSquarePlayer();

    if (isSquarePlayer(row.downOne, col.leftOne) 
      && (isSquarePlayer(row.downTwo, col.leftTwo) || isSquarePlayer(row.upOne, col.rightOne)))  {
        return true;
    }

    return false;
  };

  WinValidation.checkDiagnolUpRight = function (row, col) {
    var
      that = WinValidation,
      isSquarePlayer = that.isSquarePlayer();

    if (isSquarePlayer(row.upOne, col.rightOne) 
      && (isSquarePlayer(row.upTwo, col.rightTwo) || isSquarePlayer(row.downOne, col.leftOne))) {
        return true;
    }

    return false;
  };

  WinValidation.checkDiagnolDownRight = function  (row, col) {
    var
      that = WinValidation,
      isSquarePlayer = that.isSquarePlayer();

    if (isSquarePlayer(row.downOne, col.rightOne) 
      && (isSquarePlayer(row.downTwo, col.rightTwo) || isSquarePlayer(row.upOne, col.leftOne)))  {
        return true;
    }

    return false;
  };

  WinValidation.prototype.isWin = function (square) {
    setCheckIsWinVars(square);

    if (checkVerticalWin()) {
      this.setWinner(player);
    } else  if (checkHorizontalWin()) {
      this.setWinner(player);
    } else if (checkDiagnolWin()) {
      this.setWinner(player);
    }
    
    return false;
  };

  WinValidation.prototype.setCheckIsWinVars = function (square) {
    this.player = this.Turn.getTurn();
    this.index = this.Board.getIndexBySquare(square);
    this.row = this.Board.getRowByIndex(index);
    this.col = this.Board.getColByIndex(index);
    this.rows = {
      upOne: this.row - that.ONE,
      upTwo: this.row - TWO,
      downOne: this.row + ONE,
      downTwo: row + TWO
    };
    this.cols = {
      leftOne: col - ONE,
      leftTwo: col - TWO,
      rightOne: col + ONE,
      rightTwo: col + TWO
    };
  };

  WinValidation.prototype.setWinner = function (player) {
    this.$gameWinner.trigger("renderPlayerWins", {"player" : player});
  };

  return WinValidation;

});