MMM.game = (function () {
	var
		/** 
	  * Public namespace copy
	  */
	  NS = MMM,

	  /**
    * Local object copies of public module methods
    */
    _board,
    _pres,
    _storeTurn,

    /**
    * Local object to expose public methods
    */
    _m,

    /**
    * Local variables
    */
    $gameBoard,
    $gameWinner,
    $playAgain,
    RESET_GAME;

  /**
  * Local initialize
  */
  function initialize () {
  	setupPublicMethodCopies();
    setGlobalVars();
    bindEvents();

  	/**
  	* Public method dependencies 
  	*/
  	function setupPublicMethodCopies () {
  		_board = {
  			resetBoardData : NS.board._m.resetBoardData
  		};

      _pres = {
        hideWin : NS.pres._m.hideWin
      };

  		_storeTurn = {
  			init : NS.storeTurn._m.init
  		};
  	}

    function setGlobalVars () {
      $gameBoard = $("#game-board");
      $gameWinner = $("#game-winner");
      $playAgain = $(".btn-play-again");
      RESET_GAME = true;
    }

    function bindEvents () {
      _m.playAgainEvent();
    }
 	}

   /**
   * Public methods
   */
   _m = {
    newGame : function (reset) {
      if (reset) {
        _board.resetBoardData();
        _storeTurn.init();
        $gameWinner.trigger("hidePlayerWins");
      }

      $gameBoard.trigger("renderGameBoardSquares");
    },

    playAgainEvent : function () {
      $playAgain.on("click", function () {
        _m.newGame(RESET_GAME);
      });
    },

    setWinner : function (player) {
      /**
      * Potential refactor to track and store multiple winners 
      */
      $gameWinner.trigger("renderPlayerWins", {"player" : player});
    },

   	init : function () {
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