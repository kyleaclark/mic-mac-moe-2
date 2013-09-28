define([
  "jquery",
  "js/BoardTemplate",
  "js/BoardData",
  "js/WinValidation",
  "js/PlayerTurn",

  // Does not return useful object
  "lib/modernizr.touchevents"
  /*
  "js/Win",
  "js/Turn"
  */
], function ($, BoardTemplate, BoardData, WinValidation, PlayerTurn
  /*
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
        self.boardTemplate = new BoardTemplate();
        self.boardData = new BoardData();
        self.winValidation = new WinValidation();
        self.playerTurn = new PlayerTurn({}, self.boardData);
      }

      function initGameBoard () {
        //self.boardData.resetBoardData();
      }

      function setBinds () {
        self.$playAgain.on("click", function () {
          self.resetGame.apply(self, arguments);
        });
      }

      function createGlobalSelf () {
        //NS.Game = self;
      }
  
      initVars();
      initObjects();
      initGameBoard();
      setBinds();
      createGlobalSelf();
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