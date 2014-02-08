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

    function initObjects() {
      self.Class = WinValidation;
      self.BoardData = BoardData;
    }

    function setBinds() {
      PubSub.subscribe(self.VALIDATE_WIN_EVENT, function (ev, square, player) {
        self.validate(square, player);
      });
    }

    initGlobals();
    initObjects();
    setBinds();
    console.log(this);
    this.init();
  }

  (function initStatic() {
    var that = WinValidation;

    // Global constants
    that.FULFILL_WIN_EVENT = Globals.FULFILL_WIN_EVENT;
    that.TOGGLE_TURN_EVENT = Globals.TOGGLE_TURN_EVENT;

    // Constants
    that.MATRIX_MIN = 0;
    that.MATRIX_MAX = 5;
    that.MIN_TURNS_TO_WIN = 7;
    that.ONE = 1;
    that.TWO = 2;
    that.THREE = 3;

    that.isValidSquare = function (row, col) {
      if (row < that.MATRIX_MAX || row >= that.MATRIX_MIN || col < that.MATRIX_MAX || col >= that.MATRIX_MIN) {
        return true;
      }

      return false;
    };

    that.calculateSquareIndex = function (row, col) {
      return (row * that.MATRIX_MAX) + col;
    };

    that.publishFulfillWinEvent = function (player) {
      var winValidationOpts = {
        player: player
      };

      PubSub.publish(that.FULFILL_WIN_EVENT, [winValidationOpts]);
    };

    that.publishToggleTurnEvent = function () {
      PubSub.publish(that.TOGGLE_TURN_EVENT, []);
    };
  })();

  /**
  * Instance - Getters & Setters
  */

  /* Get .player */
  WinValidation.prototype.getPlayer = function () {
    return this.player;
  };

  /* Set .player */
  WinValidation.prototype.setPlayer = function (val) {
    this.player = val;
  };

  /* Get .row */
  WinValidation.prototype.getRow = function () {
    return this.row;
  };

  /* Set .row */
  WinValidation.prototype.setRow = function (squareEl) {
    console.log("this : ", this);
    this.row = this.BoardData.getRowOfSquare(squareEl);
  };

  /* Get .col */
  WinValidation.prototype.getCol = function () {
    return this.col;
  };

  /* Set .col */
  WinValidation.prototype.setCol = function (squareEl) {
    this.col = this.BoardData.getColOfSquare(squareEl);
  };

  /* Get .index */
  WinValidation.prototype.getSquareIndex = function () {
    return this.squareIndex;
  };

  /* Get .index */
  WinValidation.prototype.setSquareIndex = function (squareEl) {
    this.squareIndex = this.BoardData.getIndexOfSquare(squareEl);
  };

  /* Get .rowGroup */
  WinValidation.prototype.getRowGroup = function () {
    return this.rowGroup;
  };

  /* Get .colGroup */
  WinValidation.prototype.getColGroup = function () {
    return this.colGroup;
  };

  /* Update .rowGroup */
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

  /* Update .colGroup */
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
      that = this.Class,
      player = this.getPlayer(),
      squareIndex = this.getSquareIndex();

    this.matrixValues[squareIndex] = player;
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

  WinValidation.prototype.init = function () {
    var self = this;

    function initVars() {
      self.row = 0;
      self.col = 0;
      self.squareIndex = 0;
      self.rowGroup = {};
      self.colGroup = {};
      self.player = "";
      self.numOfTurns = 0;
      self.matrixValues = [];
    }

    function initMatrixValues() {
      var 
        that = self.Class,
        matrixMax = that.MATRIX_MAX,
        matrixLength = (matrixMax * matrixMax) - 1,
        index = 0;

      for (; index < matrixLength; index++) {
        self.matrixValues[index] = null;
      }
    }

    initVars();
    initMatrixValues();
  };

  WinValidation.prototype.validate = function (squareEl, player) {
    var that = this.Class;

    this.updateValidationData(squareEl, player);

    if (this.numOfTurns >= that.MIN_TURNS_TO_WIN) {
      this.manageWinValidation();
    } else {
      that.publishToggleTurnEvent();
    }
  };

  WinValidation.prototype.updateValidationData = function (squareEl, player) {
    // Increase number of turns
    this.numOfTurns += 1;

    // Set row & col
    this.setRow(squareEl);
    this.setCol(squareEl);

    // Set squareIndex
    this.setSquareIndex(squareEl);

    // Set player
    this.setPlayer(player);

    // Update matrixValues
    this.updateMatrixValues();

    // Update rowGroup & colGroup
    this.updateRowGroup();
    this.updateColGroup();
  };

  WinValidation.prototype.manageWinValidation = function () {
    var 
      that = this.Class,
      player = this.getPlayer();
      
    if (this.verifyIsWin()) {
      that.publishFulfillWinEvent(player);
    } else {
      that.publishToggleTurnEvent();
    }
  };

  /* Verify vertical, horizontal, and Diagonal win possibilities */
  WinValidation.prototype.verifyIsWin = function () {
    var
      row = this.getRow(),
      col = this.getCol(),
      rowGroup = this.getRowGroup(),
      colGroup = this.getColGroup();

    if (this.verifyVerticalWin(rowGroup, col)) {
      return true;
    } else if (this.verifyHorizontalWin(row, colGroup)) {
      return true;
    } else if (this.verifyDiagonalUpLeftWin(rowGroup, colGroup)) {
      return true;
    } else if (this.verifyDiagonalUpRightWin(rowGroup, colGroup)) {
      return true;
    }

    return false;
  };

  WinValidation.prototype.isSquarePlayerMatch = function (row, col) {
    var
      that = this.Class, 
      squareIndex = that.calculateSquareIndex(row, col),
      player = this.getPlayer();

    console.log(row, col, that.isValidSquare(row, col));
    console.log(squareIndex, this.matrixValues[squareIndex], player);

    if (that.isValidSquare(row, col) && this.matrixValues[squareIndex] === player) {
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

    if (verify.call(this, row.oneUp, col)) {
      console.log("oneUp");
      if (verify.call(this, row.oneDown, col) && (verify.call(this, row.twoDown, col) || verify.call(this, row.twoUp, col))) {
        return true;
      } else if (verify.call(this, row.threeUp, col) && verify.call(this, row.twoUp, col)) {
        return true;
      }
    } else if (verify.call(this, row.threeDown, col) && verify.call(this, row.twoDown, col) && verify.call(this, row.oneDown, col)) {
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

  WinValidation.prototype.reset = function () {
    this.init();
  };

  return WinValidation;

});