define([
  "jquery",
  "js/utils/Globals",
  "js/utils/PubSub"
], function ($, Globals, PubSub) {
  "use strict";

  function WinValidation(config, BoardData) {
    var
      self = this,
      defaults = {};

    function initGlobals() {
      self.VALIDATE_WIN_EVENT = Globals.VALIDATE_WIN_EVENT;
    }

    function initVars() {
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);

      self.index = 0;
      self.row = 0;
      self.col = 0;
      self.rowGroup = {};
      self.colGroup = {};
      self.player = "";
      self.matrixValues = [];
    }

    function initObjects() {
      self.Class = WinValidation;
      self.BoardData = BoardData;
    }

    function initMatrixValues = function () {
      var 
        that = this.Class,
        matrixMax = that.MATRIX_MAX,
        matrixLength = (matrixMax * matrixMax) - 1,
        index = 0;

      for (index < matrixLength; index++) {
        squareMatrix[index] = null;
      }
    }

    function setBinds() {
      PubSub.subscribe(self.VALIDATE_WIN_EVENT, function (ev, square, player) {
        self.validate(square, player);
      });
    }

    initGlobals();
    initVars();
    initObjects();
    initMatrixValues();
    setBinds();
  }

  (function initStatic() {
    var that = WinValidation;

    // Global constants
    that.FULFILL_WIN_EVENT = Globals.FULFILL_WIN_EVENT;
    that.TOGGLE_TURN_EVENT = Globals.TOGGLE_TURN_EVENT;

    // Constants
    that.MATRIX_MIN = 0;
    that.MATRIX_MAX = 5;
    that.ONE = 1;
    that.TWO = 2;
    that.THREE = 3;

    that.isValidSquare = function (row, col) {
      if (row >= this.MATRIX_MAX || row < this.MATRIX_MIN || col >= this.MATRIX_MAX || col < this.MATRIX_MIN) {
        return false;
      }
    };
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

  /* Set .col */
  WinValidation.prototype.getPlayer = function () {
    return this.player;
  };

  /* Set .col */
  WinValidation.prototype.setPlayer = function (val) {
    this.player = val;
  };

  /* Set .rowGroup */
  WinValidation.prototype.updateRowGroup = function () {
    var 
      that = this.Class,
      row = this.getRow();

    this.rowGroup = {
      oneUp: row - that.ONE,
      twoUp: row - that.TWO,
      threeUp: row - that.THREE,
      oneDown: row + that.ONE,
      twoDown: row + that.TWO,
      threeDown: row + that.THREE
    };
  };

  /* Set .colGroup */
  WinValidation.prototype.updateColGroup = function () {
    var 
      that = this.Class,
      col = this.getCol();

    this.colGroup = {
      oneLeft: col - that.ONE,
      twoLeft: col - that.TWO,
      threeLeft: col - that.THREE,
      oneRight: col + that.ONE,
      twoRight: col + that.TWO,
      threeRight: col + that.THREE
    };
  };

  WinValidation.prototype.updateMatrixValues = function () {
    var
      row = this.getRow(),
      col = this.getCol(),
      player = this.getPlayer(),
      square = row + col;

    this.matrixValues[square] = player;
  };


  /* Get .col
  WinValidation.prototype.getPlayerOfSquare = function (square) {
    return this.BoardData.getPlayerOfSquare(square);
  };

  /* Get .square
  WinValidation.prototype.getSquareOfRowCol = function (row, col) {
    return this.BoardData.getSquareOfRowCol(row, col);
  };
  */

  /* Get .index
  WinValidation.prototype.getIndex = function () {
    return this.index;
  };
  ///

  /* Get .index
  WinValidation.prototype.setIndex = function (square) {
    this.index = this.BoardData.getIndexOfSquare(square);
  };
  */


  WinValidation.prototype.validate = function (square, player) {
    this.updateValidationData(square, player);
    this.manageWinValidation();
  };

  WinValidation.prototype.updateValidationData = function (square, player) {
    // Set row & col
    this.setRow(square);
    this.setCol(square);

    // Set player
    this.setPlayer(player);

    // Update matrixValues
    this.updateMatrixValues();

    // Update rowGroup & colGroup
    this.updateRowGroup();
    this.updateColGroup();
  };

  WinValidation.prototype.manageWinValidation = function (valid) {
    var 
      player = this.getPlayer(),
      winValidationOpts = {
        player: player
      };

    if (this.verifyIsWin()) {
      PubSub.publish(that.FULFILL_WIN_EVENT, [winValidationOpts]);
    } else {
      PubSub.publish(that.TOGGLE_TURN_EVENT, []);
    }
  };

  /* Verify vertical, horizontal, and Diagonal win possibilities */
  WinValidation.prototype.verifyIsWin = function () {
    if (this.verifyVerticalWin()) {
      return true;
    } else if (this.verifyHorizontalWin()) {
      return true;
    } else if (this.verifyDiagonalUpLeftWin()) {
      return true;
    } else if (this.verifyDiagonalUpRightWin()) {
      return true;
    }

    return false;
  };

  WinValidation.prototype.isSquarePlayerMatch = function (row, col) {
    var
      that = this.Class, 
      square = row + col,
      player = this.getPlayer();

    if (that.isSquareValid(row, col) && this.matrixSquareValue[square] === player) {
      return true;
    }

    return false;
  };

  /* Validate procedure subject method to verify vertical win */
  WinValidation.prototype.verifyVerticalWin = function (row, col) {
    var verify = this.isSquarePlayerMatch;

    // Verify win combinations
    // 1 up, 2 down
    // 2 up, 1 down
    // 3 up, 0 down
    // 0 up, 3 down
    
    // -> if : verify 1up
      // -> if : verify 1down && (verify 2down || verify 2up)
      // -> else if : verify 3up && verify 2up
    // -> else if : verify 3down && 2down && 1down

    if (verify(row.oneUp, col)) {
      if (verify(row.oneDown, col) && (verify(row.twoDown, col) || verify(row.twoUp, col))) {
        return true;
      } else if (verify(row.threeUp, col) && verify(row.twoUp, col)) {
        return true;
      }
    } else if (verify(threeDown, col) && verify(twoDown, col) && verify(oneDown, col)) {
      return true;
    }

    return false;
  };

  /* Validate procedure subject method to verify horizontal win */
  WinValidation.prototype.verifyHorizontalWin = function (row, col) {
    var verify = this.isSquarePlayerMatch;

    // Verify win combinations
    // 1 left, 2 right
    // 2 left, 1 right
    // 3 left, 0 right
    // 0 left, 3 right

    // -> if : verify 1left
      // -> if : verify 1right
        // -> if : verify 2right || verify 2left
      // -> else if : verify 3left && verify 2left
    // -> else if : verify 3right && 2right && 1right

    return false;
  };

  /* Validate procedure subject method to verify diagonal up-left win */
  WinValidation.prototype.verifyDiagonalUpLeftWin = function (row, col) {
    var verify = this.isSquarePlayerMatch;

    // Verify win combinations
    // 1 up & 1 left, 2 down & 2 right
    // 2 up & 2 left, 1 down & 1 right
    // 3 up & 3 left, 0 down & 0 right
    // 0 up & 0 left, 3 down & 3 right

    // -> if : (verify 1up && verify 1left)
      // -> if : (verify 1down && verify 1right)
        // -> if : (verify 2down && verify 2right) || (verify 2up && verify 2left)
      // -> else if : (verify 3up && verify 3left) && (verify 2up && verify 2left)
    // -> else if : (verify 3down && verify 3right) && (2down && 2right) && (1down && 1right)

    

    return false;
  };

  /* Validate procedure subject method to verify diagonal up-right win */
  WinValidation.prototype.verifyDiagonalUpRightWin = function (row, col) {
    var verify = this.isSquarePlayerMatch;

    // Verify win combinations
    // 1 up & 1 right, 2 down & 2 left
    // 2 up & 2 right, 1 down & 1 left
    // 3 up & 3 right, 0 down & 0 left
    // 0 up & 0 right, 3 down & 3 left

    // -> if : (verify 1up && verify 1right)
      // -> if : (verify 1down && verify 1left)
        // -> if : (verify 2down && verify 2left) || (verify 2up && verify 2right)
      // -> else if : (verify 3up && verify 3right) && (verify 2up && verify 2right)
    // -> else if : (verify 3down && verify 3left) && (2down && 2left) && (1down && 1left)

    

    return false;
  };

  return WinValidation;

});