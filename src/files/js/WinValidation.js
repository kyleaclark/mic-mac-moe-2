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

        self.index = 0;
        self.row = 0;
        self.col = 0;
        self.rowGroup = {};
        self.colGroup = {};
        self.player = "";
      }

      function initObjects () {
        self.BoardData = BoardData;
      }

      function setBinds () {
        PubSub.subscribe("validateWinEvent", function (ev, square, player) {
          self.validateWin(square, player);
        });
      }

      initVars();
      initObjects();
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

  /* Get .index */
  WinValidation.prototype.getIndex = function () {
    return this.index;
  };

  /* Get .index */
  WinValidation.prototype.setIndex = function (square) {
    this.index = this.BoardData.getIndexOfSquare(square);
  };

  /* Get .row */
  WinValidation.prototype.getRow = function () {
    return this.row;
  };

  /* Set .row */
  WinValidation.prototype.setRow = function (square) {
    this.row = this.BoardData.getRowOfSquare(square);
  };

  /* Get .col */
  WinValidation.prototype.getCol = function () {
    return this.col;
  };

  /* Set .col */
  WinValidation.prototype.setCol = function (square) {
    this.col = this.BoardData.getColOfSquare(square);
  };

  /* Get .rowGroup */
  WinValidation.prototype.getRowGroup = function () {
    return this.rowGroup;
  };

  /* Set .rowGroup */
  WinValidation.prototype.setRowGroup = function (row) {
    var that = WinValidation;

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
  WinValidation.prototype.setColGroup = function (col) {
    var that = WinValidation;

    this.colGroup = {
      leftOne: col - that.ONE,
      leftTwo: col - that.TWO,
      rightOne: col + that.ONE,
      rightTwo: col + that.TWO
    };
  };

  /* Set .col */
  WinValidation.prototype.getPlayer = function (square) {
    return this.player;
  };

  /* Set .col */
  WinValidation.prototype.setPlayer = function (square) {
    this.player = this.BoardData.getPlayerOfSquare(square);
  };

  /* Get .col */
  WinValidation.prototype.getPlayerOfSquare = function (square) {
    return this.BoardData.getPlayerOfSquare(square);
  };

  /* Get .square */
  WinValidation.prototype.getSquareOfRowCol= function (row, col) {
    return this.BoardData.procureSquareString(row, col);
  };

  WinValidation.prototype.validateWin = function (square, player) {
    var
      row,
      col;

    this.updateValidationVars(square);
    row = this.getRow();
    col = this.getCol();

    if (this.checkVerticalWin(row, col)) {
      this.setWinner(player);
    } else  if (this.checkHorizontalWin(row, col)) {
      this.setWinner(player);
    } else if (this.checkDiagnolWin(row, col)) {
      this.setWinner(player);
    }
    
    return false;
  };

  WinValidation.prototype.updateValidationVars = function (square) {
    /*
    this.player = this.Turn.getTurn();
    this.index = this.Board.getIndexBySquare(square);
    */
    var 
      row = this.getRow(),
      col = this.getCol();

    this.setRow(square);
    this.setCol(square);
    this.setRowGroup(row);
    this.setColGroup(col);
  };

  WinValidation.prototype.isSquarePlayer = function (row, col) {
    var square = this.getSquareOfRowCol(row, col);

    if (this.getPlayerOfSquare(square) === this.getPlayer()) {
      return true;
    }

    return false;
  };

  WinValidation.checkVerticalWin = function (row, col) {
    var 
      rowGroup = this.getRowGroup(),
      colGroup = this.getColGroup();

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