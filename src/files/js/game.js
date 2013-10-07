define([
  "jquery",
  "js/utils/Globals",
  "js/BoardTemplate",
  "js/BoardData",
  "js/WinValidation",
  "js/PlayerTurn"
], function ($, Globals, BoardTemplate, BoardData, WinValidation, PlayerTurn) {
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

      function initGlobals () {
        self.CLICK = Globals.CLICK;
      }

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);
        self.$gameBoard = self.options.$gameBoard;
        self.$gameWinner = self.options.$gameWinner;
        self.$playAgain = self.options.$playAgain;
      }

      function initObjects () {
        self.boardTemplate = new BoardTemplate();
        self.boardData = new BoardData();
        self.winValidation = new WinValidation({}, self.boardData);
        self.playerTurn = new PlayerTurn({}, self.boardData);
      }

      function initGameBoard () {
        //self.boardData.resetBoardData();
      }

      function setBinds () {
        self.$playAgain.on(self.CLICK, function () {
          self.resetGame.apply(self, arguments);
        });
      }
  
      initGlobals();
      initVars();
      initObjects();
      initGameBoard();
      setBinds();
    }

    init();
  }

  Game.prototype.prepare = function () {
    this.boardTemplate.generate();
  };

  Game.prototype.startNew = function () {
    /*
    this.board.resetBoardData();
    this.turn.resetTurnData();
    this.$gameWinner.trigger("hidePlayerWins");
    */
    this.boardTemplate.render();
  }

  return Game;

});