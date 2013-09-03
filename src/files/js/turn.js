define([
  "jquery",
  "js/Game"
], function (
  $,
  Game
) {
  "use strict";

  function Turn (config) {
    var 
      self = this,
      defaults = {
        gameBoard: "game-board";
        resetGame: true;
      };

      function init () {

        function initVars () {
          self.defaults = defaults;
          self.options = $.extend({}, defaults, config);
          self.gameBoard = self.options.gameBoard;
          self.$boardID = $("#" + gameBoard);
          self.playerTurn = "";
          self.numberOfTurns = 0;
          self.turnSquare = "";
          /*
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
          */
        }

        function setBinds () {
          self.$boardID.on("click", function (event) {
            handleTurnEvent(event);
          });
        }

        initVars();
        setBinds();
      }

    init();
  }

  (function initStaticVars () {
    var that = Turn;

    that.X = "X";
    that.O = "O";
  })();

  Turn.isValid = function () {
    if (square !== GAME_BOARD && _board.getPlayerBySquare(square) === "") {
      return true;
    }
    return false;
  }
    
  Turn.prototype.getTurn = function () {
    return this.playerTurn;
  };

  Turn.prototype.setTurn = function (player) {
    this.playerTurn = player;
    this.numberOfTurns += 1;
  };

  Turn.prototype.getNumberOfTurns = function () {
    return this.numberOfTurns;
  };

  Turn.prototype.handleTurnEvent = function (event) {
    this.turnSquare = event.target.id;

    if (this.isTurnValid()) {
      /* REFACTOR !
      _pres.renderTurn(player, square);
      _board.setPlayerBySquare(player, square);
      */

      // Check for win after 5 turns when a win is possible
      /* REFACTOR !
      if (_storeTurn.getNumberOfTurns() > 3 && _win.isWin(square)) {
        _game.setWinner(player);
      }
      */

      this.numberOfTurns += 1;
    }
  }

  return Turn;

});