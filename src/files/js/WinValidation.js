define([
  "jquery",
  "js/utils/Globals",
  "js/utils/PubSub",
  "js/Game"
], function ($, Globals, PubSub, Game) {
  "use strict";

  function WinValidation (config, BoardData) {
    var
      self = this,
      defaults = {};

    function init () {

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);

        self.row = 0;
        self.col = 0;
        self.rowGroup = {};
        self.colGroup = {};
      }

      function initObjects () {
        self.BoardData = BoardData;
      }

      function initObjectMethods () {
        self.getRowOfSquare = self.BoardData.getRowOfSquare;
        self.getColOfSquare = self.BoardData.getColOfSquare;
      }

      function setBinds () {
        PubSub.subscribe("validateWinEvent", function (ev, square, player) {
          self.validateWin(square, player);
        });
      }

      initVars();
      setBinds();
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

  /**
  * Instance - Getters & Setters
  */

  /* Get .row */
  WinValidation.prototype.getRow = function () {
    return this.row;
  };

  /* Set .row */
  WinValidation.prototype.setRow = function (square) {
    this.row = this.getRowOfSquare(square);
  };

  /* Get .col */
  WinValidation.prototype.getCol = function () {
    return this.col;
  };

  /* Set .col */
  WinValidation.prototype.setCol = function (square) {
    this.col = this.getColOfSquare(square);
  };

  /* Get .rowGroup */
  WinValidation.prototype.getRowGroup = function () {
    return this.rowGroup;
  };

  /* Set .rowGroup */
  WinValidation.prototype.setRowGroup = function () {
    var 
      that = WinValidation,
      row = this.getRow();

    this.rowGroup = {
      upOne: row - that.ONE,
      upTwo: row - that.TWO,
      downOne: row + that.ONE,
      downTwo: row + that.TWO
    };
  };

  /* Get .colGroup */
  WinValidation.prototype.getColGroup = function () {
    return this.colGroup;
  };

  /* Set .colGroup */
  WinValidation.prototype.setColGroup = function () {
    var 
      that = WinValidation,
      col = this.getCol();

    this.colGroup = {
      leftOne: col - that.ONE,
      leftTwo: col - that.TWO,
      rightOne: col + that.ONE,
      rightTwo: col + that.TWO
    };
  };

  WinValidation.prototype.validateWin = function (square, player) {
    this.updateValidationVars();

    if (checkVerticalWin(row, col)) {
      this.setWinner(player);
    } else  if (checkHorizontalWin(row, col)) {
      this.setWinner(player);
    } else if (checkDiagnolWin(row, col)) {
      this.setWinner(player);
    }
    
    return false;
  };

  WinValidation.prototype.updateValidationVars = function (square) {
    /*
    this.player = this.Turn.getTurn();
    this.index = this.Board.getIndexBySquare(square);
    */
    this.setRow(square);
    this.setCol(square);
    this.setRowGroup();
    this.setColGroup();
  };

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

  WinValidation.prototype.setWinner = function (player) {
    this.$gameWinner.trigger("renderPlayerWins", {"player" : player});
  };

  return WinValidation;

});