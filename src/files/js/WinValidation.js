define([
  "jquery",
  "js/utils/Globals",
  "js/utils/PubSub"
], function ($, Globals, PubSub) {
  "use strict";

  function WinValidation (config, BoardData) {
    var
      self = this,
      defaults = {};

    function init () {

      function initGlobals () {
        self.VALIDATE_WIN_EVENT = Globals.VALIDATE_WIN_EVENT;
      }

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
        self.Class = WinValidation;
        self.BoardData = BoardData;
      }

      function setBinds () {
        PubSub.subscribe(self.VALIDATE_WIN_EVENT, function (ev, square, player) {
          self.validate(square, player);
        });
      }

      initGlobals();
      initVars();
      initObjects();
      setBinds();
    }

    init();
  }

  (function initStatic () {
    var that = WinValidation;

    // Constants
    that.MATRIX_ROWS = 5;
    that.ONE = 1;
    that.TWO = 2;

    /* Validate win possibility procedures */
    that.validateProcedure = function (row, col, rowGroup, colGroup) {
      var
        self = that.validateProcedure,
        sub = self;

      /* Verify vertical, horizontal, and Diagonal win possibilities */
      sub.verify = function () {
        //if (sub.verifyVerticalWin.call(this, rowGroup, col)) {
          //return true;
        if (sub.verifyHorizontalWin.call(this, row, colGroup)) {
          console.log("verify horizontal");
          return true;
        } /*else if (sub.verifyDiagonalWin.call(this, rowGroup, colGroup)) {
          return true;
        }*/

        return false;
      };

      sub.verifyValidSquare = function (row, col) {
        if (row === that.MATRIX_ROWS || col === that.MATRIX_ROWS) {
          return false;
        } else if (row < 0 || col < 0) {
          return false;
        }

        return true;
      };

      sub.verifyPlayerMatch = function (row, col) {
        var square;

        if (!self.verifyValidSquare(row, col)) {
          return false;
        }

        square = this.getSquareOfRowCol(row, col);

        console.log("square : ", square, " - ", this.getPlayerOfSquare(square), " - ", this.getPlayer());

        if (this.getPlayerOfSquare.call(this, square) === this.getPlayer()) {
          console.log("true");
          return true;
        }

        console.log("false");

        return false;
      };

      /* Validate procedure subject method to verify vertical win */
      sub.verifyVerticalWin = function (row, col) {
        var verifyPlayerMatch = self.verifyPlayerMatch;

        if (verifyPlayerMatch.call(this, row.upOne, col)
          && (verifyPlayerMatch.call(this, row.upTwo, col) || verifyPlayerMatch.call(this, row.downOne, col))) {
            return true;
        } else if (verifyPlayerMatch.call(this, row.downOne, col) && verifyPlayerMatch.call(this, row.downTwo, col)) {
            return true;
        }

        return false;
      };

      /* Validate procedure subject method to verify horizontal win */
      sub.verifyHorizontalWin = function (row, col) {
        var verifyPlayerMatch = self.verifyPlayerMatch;

        console.log("ROW : ", row, " COL : ", col);

        if (verifyPlayerMatch.call(this, row, col.leftOne) 
          && (verifyPlayerMatch.call(this, row, col.leftTwo) || verifyPlayerMatch.call(this, row, col.rightOne))) {
            return true;
        } else if (verifyPlayerMatch.call(this, row, col.rightOne) && verifyPlayerMatch.call(this, row, col.rightTwo)) {
            return true;
        }

        return false;
      };

      /* Validate procedure subject method to verify diagonal win */
      sub.verifyDiagonalWin = function (row, col) {
       var verifyPlayerMatch = self.verifyPlayerMatch;

        if (self.verifyDiagonalUpLeft(row, col) || self.verifyDiagonalDownLeft(row, col) 
          || self.verifyDiagonalUpRight(row, col) || self.verifyDiagonalDownRight(row, col)) {
            return true;
        }

        return false;
      };

      /* Validate procedure subject method to verify diagonal up-left win */
      sub.verifyDiagonalUpLeft = function (row, col) {
        var verifyPlayerMatch = self.verifyPlayerMatch;

        if (verifyPlayerMatch.call(this, row.upOne, col.leftOne) 
          && (verifyPlayerMatch.call(this, row.upTwo, col.leftTwo) || verifyPlayerMatch.call(this, row.downOne, col.rightOne))) {
            return true;
        }

        return false;
      };

      /* Validate procedure subject method to verify diagonal down-left win */
      sub.verifyDiagonalDownLeft = function (row, col) {
        var verifyPlayerMatch = self.verifyPlayerMatch;

        if (verifyPlayerMatch.call(this, row.downOne, col.leftOne) 
          && (verifyPlayerMatch.call(this, row.downTwo, col.leftTwo) || verifyPlayerMatch.call(this, row.upOne, col.rightOne)))  {
            return true;
        }

        return false;
      };

      /* Validate procedure subject method to verify diagonal up-right win */
      sub.verifyDiagonalUpRight = function (row, col) {
        var verifyPlayerMatch = self.verifyPlayerMatch;

        if (verifyPlayerMatch.call(this, row.upOne, col.rightOne) 
          && (verifyPlayerMatch.call(this, row.upTwo, col.rightTwo) || verifyPlayerMatch.call(this, row.downOne, col.leftOne))) {
            return true;
        }

        return false;
      };

      /* Validate procedure subject method to verify diagonal down-right win */
      sub.verifyDiagonalDownRight = function  (row, col) {
        var verifyPlayerMatch = self.verifyPlayerMatch;

        if (verifyPlayerMatch.call(this, row.downOne, col.rightOne) 
          && (verifyPlayerMatch.call(this, row.downTwo, col.rightTwo) || verifyPlayerMatch.call(this, row.upOne, col.leftOne)))  {
            return true;
        }

        return false;
      };

      return self.verify.call(this);
    };

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
    var that = this.Class;

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
    var that = this.Class;

    this.colGroup = {
      leftOne: col - that.ONE,
      leftTwo: col - that.TWO,
      rightOne: col + that.ONE,
      rightTwo: col + that.TWO
    };
  };

  /* Set .col */
  WinValidation.prototype.getPlayer = function () {
    return this.player;
  };

  /* Set .col */
  WinValidation.prototype.setPlayer = function (val) {
    this.player = val;
  };

  /* Get .col */
  WinValidation.prototype.getPlayerOfSquare = function (square) {
    return this.BoardData.getPlayerOfSquare.call(this.BoardData, square);
  };

  /* Get .square */
  WinValidation.prototype.getSquareOfRowCol = function (row, col) {
    return this.BoardData.getSquareOfRowCol(row, col);
  };

  WinValidation.prototype.validate = function (square, player) {
    var
      that = this.Class,
      row,
      col,
      rowGroup,
      colGroup;

    // Set row & col
    this.setRow(square);
    this.setCol(square);

    // Get row & col
    row = this.getRow();
    col = this.getCol();

    // Set rowGroup & colGroup
    this.setRowGroup(row);
    this.setColGroup(col);

    // Get rowGroup & colGroup
    rowGroup = this.getRowGroup();
    colGroup = this.getColGroup();

    // Set player
    this.setPlayer(player);

    // Run validate procedure and if valid win, return true
    if (that.validateProcedure.call(this, row, col, rowGroup, colGroup)) {
      console.log("publish player winner");
    }
    
    return false;
  };

  /* TODO: Move to a separate class
  WinValidation.prototype.setWinner = function (player) {
    this.$gameWinner.trigger("renderPlayerWins", {"player" : player});
  };
  */

  return WinValidation;

});