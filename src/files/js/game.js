define([
  "jquery",
  "js/utils/Globals",
  "js/BoardTemplate",
  "js/BoardData",
  "js/WinFulfillment",
  "js/WinValidation",
  "js/PlayerTurn"
], function ($, Globals, BoardTemplate, BoardData, WinFulfillment, WinValidation, PlayerTurn) {
  "use strict";

  function Game(config) {
    var
      self = this,
      defaults = {
        $gameBoard: $("#game-board"),
        $gameWinner: $("#game-winner"),
        $playAgain: $(".btn-play-again")
      };

    function initGlobals() {
      self.CLICK = Globals.CLICK;
    }

    function initVars() {
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
      self.$gameBoard = self.options.$gameBoard;
      self.$gameWinner = self.options.$gameWinner;
      self.$playAgain = self.options.$playAgain;
    }

    function initObjects() {
      self.boardTemplate = new BoardTemplate();
      self.boardData = new BoardData();
      self.winFulfillment = new WinFulfillment();
      self.winValidation = new WinValidation({}, self.boardData);
      self.playerTurn = new PlayerTurn({}, self.boardData);
    }

    function initGameBoard() {
      //self.boardData.resetBoardData();
    }

    function setBinds() {
      self.$playAgain.on(self.CLICK, function () {
        self.playAgain();
      });
    }
  
    initGlobals();
    initVars();
    initObjects();
    initGameBoard();
    setBinds();
  }

  Game.prototype.initialize = function () {
    this.boardTemplate.generate();
  };

  Game.prototype.playNew = function () {
    /*
    this.board.resetBoardData();
    this.turn.resetTurnData();
    this.$gameWinner.trigger("hidePlayerWins");
    */
    this.boardTemplate.render();
  };

  Game.prototype.playAgain = function () {
    $("#overlay").hide();
    $("#game-winner").fadeOut(500);
    this.playNew();
  };

  return Game;

});