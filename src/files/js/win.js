define([
  "jquery",
  "js/Game"
], function (
  $,
  Game
) {
  "use strict";

  function Win () {


  }

  (function initStatic () {
    var that = Win;

    function initVars () {
      that.MATRIX_ROWS = 5;
      that.ONE = 1;
      that.TWO = 2;
    }

    initVars();
  })();

  Game.prototype.setWinner = function (player) {
    this.$gameWinner.trigger("renderPlayerWins", {"player" : player});
  };
    
    Win.prototype.setCheckIsWinVars = function (square) {
      player = _storeTurn.get();
      index = _board.getIndexBySquare(square);
      row = _board.getRowByIndex(index);
      col = _board.getColByIndex(index);
      rows = {
        upOne: row - ONE,
        upTwo: row - TWO,
        downOne: row + ONE,
        downTwo: row + TWO
      };
      cols = {
        leftOne: col - ONE,
        leftTwo: col - TWO,
        rightOne: col + ONE,
        rightTwo: col + TWO
      };
    };

    function isSquarePlayer (row, col) {
      index = (row * MATRIX_ROWS) + col;

      if (_board.getPlayerByIndex(index) === player) {
        return true;
      }

      return false;
    }

    function checkVerticalWin () {
      if (isSquarePlayer(rows.upOne, col) 
        && (isSquarePlayer(rows.upTwo, col) || isSquarePlayer(rows.downOne, col))) {
          return true;
      } else if (isSquarePlayer(rows.downOne, col) && isSquarePlayer(rows.downTwo, col)) {
          return true;
      }

      return false;
    }

    // Check Horizontal Win
    function checkHorizontalWin () {
      if (isSquarePlayer(row, cols.leftOne) 
        && (isSquarePlayer(row, cols.leftTwo) || isSquarePlayer(row, cols.rightOne))) {
          return true;
      } else if (isSquarePlayer(row, cols.rightOne) && isSquarePlayer(row, cols.rightTwo)) {
          return true;
      }

      return false;
    }

    function checkDiagnolWin () {
      if (checkDiagnolUpLeft() || checkDiagnolDownLeft() || checkDiagnolUpRight() || checkDiagnolDownRight()) {
        return true;
      }

      return false;

      function checkDiagnolUpLeft () {
        if (isSquarePlayer(rows.upOne, cols.leftOne) 
          && (isSquarePlayer(rows.upTwo, cols.leftTwo) || isSquarePlayer(rows.downOne, cols.rightOne))) {
            return true;
        }

        return false;
      }

      function checkDiagnolDownLeft () {
        if (isSquarePlayer(rows.downOne, cols.leftOne) 
          && (isSquarePlayer(rows.downTwo, cols.leftTwo) || isSquarePlayer(rows.upOne, cols.rightOne)))  {
            return true;
        }

        return false;
      }

      function checkDiagnolUpRight () {
        if (isSquarePlayer(rows.upOne, cols.rightOne) 
          && (isSquarePlayer(rows.upTwo, cols.rightTwo) || isSquarePlayer(rows.downOne, cols.leftOne))) {
            return true;
        }

        return false;
      }

      function checkDiagnolDownRight () {
        if (isSquarePlayer(rows.downOne, cols.rightOne) 
          && (isSquarePlayer(rows.downTwo, cols.rightTwo) || isSquarePlayer(rows.upOne, cols.leftOne)))  {
            return true;
        }

        return false;
      }
       
    }

    _m = {
      isWin: function (square) {
        setCheckIsWinVars(square);

        if (checkVerticalWin()) {
          return true;
        } else  if (checkHorizontalWin()) {
          return true;
        } else if (checkDiagnolWin()) {
          return true;
        }
        return false;
      },

      init: function() {
        initialize();
      }
    };

    return {
      _m : _m
    };

  }());

});