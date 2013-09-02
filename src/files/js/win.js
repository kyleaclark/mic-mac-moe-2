
/* Track to see if latest player turn wins the game */
MMM.win = (function () {
  var 
    /** 
    * Public namespace copy
    */
    NS = MMM,

    /**
    * Local object copies of public module methods
    */
    _board = {},
    _storeTurn = {},

    /**
    * Local object to expose public methods
    */
    _m,

    /**
    * Local constants
    */
    MATRIX_ROWS,
    ONE,
    TWO,

    /**
    * Local variables
    */
    player,
    index,
    row,
    col,
    rows,
    cols;

  /**
  * Local initialize
  */
  function initialize () {
    setPublicMethodCopies();
    setGlobalVars();

    function setPublicMethodCopies () {
      _board = {
        getPlayerByIndex : NS.board._m.getPlayerByIndex,
        getIndexBySquare : NS.board._m.getIndexBySquare,
        getRowByIndex : NS.board._m.getRowByIndex,
        getColByIndex : NS.board._m.getColByIndex
      };

      _storeTurn = {
        get : NS.storeTurn._m.get
      };
    }

    function setGlobalVars () {
      MATRIX_ROWS = 5;
      ONE = 1;
      TWO = 2;
    }
  }
  
  /**
  * Private methods
  */
  function setCheckIsWinVars (square) {
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
    
  }

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
