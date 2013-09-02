
/**
* Store the current player turn value 
*/
MMM.storeTurn = (function () {
  var 
    /** 
    * Local variables
    */
    turn,
    numberOfTurns,

    /**
    * Local object to expose public methods
    */
    _m;

  /**
  * Local initialize
  */
  function initialize () {
    setGlobalVars();

    function setGlobalVars() {
      turn = "X",
      numberOfTurns = 0;
    }
  }
  
  /**
  * Public methods
  */
  _m = {
    get: function () {
      return turn;
    },

    set: function (resetTurn) {
      turn = resetTurn;
      numberOfTurns += 1;
    },

    getNumberOfTurns: function () {
      return numberOfTurns;
    },

    init: function () {
      initialize();
    }
  };

  /**
  * Expose public methods
  */
  return {
    _m : _m
  };

}());

/**
* Handle player turn 
*/
MMM.handleTurn = (function (square) {
  var 
    /** 
    * Public namespace copy
    */
    NS = MMM,

    /**
    * Local object copies of public module methods
    */
    _game,
    _board,
    _storeTurn,
    _pres,
    _win,

    /**
    * Local object to expose local methods publically
    */
    _m,

    /**
    * Local variables
    */
    X,
    O,
    GAME_BOARD,
    RESET_GAME,
    $boardID,
    square,
    player;

  /**
  * Local initialize
  */
  function initialize () {
    setPublicMethodCopies();
    setGlobalVars();

    function setPublicMethodCopies () {
      _game = {
        newGame : NS.game._m.newGame,
        setWinner : NS.game._m.setWinner
      };

      _board = {
        getPlayerBySquare : NS.board._m.getPlayerBySquare,
        setPlayerBySquare : NS.board._m.setPlayerBySquare,
        resetBoardData : NS.board._m.resetBoardData
      };

      _storeTurn = {
        get : NS.storeTurn._m.get,
        set : NS.storeTurn._m.set,
        getNumberOfTurns : NS.storeTurn._m.getNumberOfTurns
      };
      
      _pres = {
        renderTurn : NS.pres._m.renderTurn,
        renderWin : NS.pres._m.renderWin,
        hideWin : NS.pres._m.hideWin
      };

      _win = {
        isWin : NS.win._m.isWin
      };
    }

    function setGlobalVars() {
      X = "X";
      O = "O";
      GAME_BOARD = "game-board";
      $boardID = $("#" + GAME_BOARD);
      RESET_GAME = true;
    }
  }

  /** 
  * Private methods 
  */
  function updatePlayerTurn () {
    if (player === X) {
      _storeTurn.set(O);
    } else {
      _storeTurn.set(X);
    }
  }

  function bindUpdatePlayerEvent () {
    // when modStoreTurn player is changed
  }

  function handleTurnClickEvent (event) {
    square = event.target.id;

    if (isTurnValid()) {
      player = _storeTurn.get();
      _pres.renderTurn(player, square);
      _board.setPlayerBySquare(player, square);

      // Check for win after 5 turns when a win is possible
      if (_storeTurn.getNumberOfTurns() > 3 && _win.isWin(square)) {
        _game.setWinner(player);
      }

      updatePlayerTurn();
    }

    function isTurnValid () {
      if (square !== GAME_BOARD && _board.getPlayerBySquare(square) === "") {
        return true;
      }
      return false;
    }
  }

  /** 
  * Public methods 
  */ 
  _m = {
    bindTurnClickEvent: function () {
      $boardID.on("click", function(event) {
        handleTurnClickEvent(event);
      });
    },

    init: function (square) {
      initialize();
      _m.bindTurnClickEvent();
    }
  };

  /**
  * Expose public methods
  */
  return {
    _m : _m,
  };
  
}());
