define([
  "jquery",
  "js/Pres"
  /*
  "js/Board",
  "js/Win",
  "js/Turn"
  */
], function (
  $,
  Pres
  /*
  Board,
  Win,
  Turn
  */
) {
  "use strict";  

  function Game (config) {
    var
      self = this,
      defaults = {
        $gameBoard: $("#game-board"),
        $gameWinner: $("#game-winner"),
        $playAgain: $(".btn-play-again")
      };

    function init () {

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);
        self.$gameBoard = self.options.$gameBoard;
        self.$gameWinner = self.options.$gameWinner;
        self.$playAgain = self.options.$playAgain;
        /*
        _board = {
          resetBoardData : NS.board._m.resetBoardData
        };

        _pres = {
          hideWin : NS.pres._m.hideWin
        };

        _storeTurn = {
          init : NS.storeTurn._m.init
        };
        */
      }

      function initObjects () {
        self.pres = new Pres();
        /*
        self.board = new Board();
        self.win = new Win();
        self.turn = new Turn();
        */
      }

      function initGameBoard () {
        
      }

      function setBinds () {
        self.$playAgain.on("click", function () {
          self.resetGame.apply(self, arguments);
        });
      }
  
      initVars();
      initObjects();
      initGameBoard();
      setBinds();
    }

    init();
  }

  Game.prototype.newGame = function () {
    this.pres.renderBoardTemplate();
    this.$gameBoard.trigger("renderBoardTemplate");
  };

  Game.prototype.resetGame = function () {
    /*
    this.board.resetBoardData();
    this.turn.resetTurnData();
    this.$gameWinner.trigger("hidePlayerWins");
    */
    this.newGame();
  }

  return Game;

});