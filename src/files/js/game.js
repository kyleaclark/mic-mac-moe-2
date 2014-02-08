define([
  "jquery",
  "js/utils/Globals",
  "js/BoardTemplate",
  "js/BoardData",
  "js/WinFulfillment",
  "js/WinValidation",
  "js/PlayerTurn",
  "js/PlayerScore"
], function ($, Globals, BoardTemplate, BoardData, WinFulfillment, WinValidation, PlayerTurn, PlayerScore) {
  "use strict";

  function Game(config) {
    var
      self = this,
      defaults = {
        $gameBoard: $("#game-board"),
        $gameWinner: $("[data-modal='winner']"),
        $playAgain: $("[data-game='playAgain']")
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
      self.PlayerScore = new PlayerScore();
    }

    function setBinds() {
      self.$playAgain.on(self.CLICK, function () {
        self.playAgain();
      });
    }
  
    initGlobals();
    initVars();
    initObjects();
    setBinds();
  }

  Game.prototype.initialize = function () {
    if (this.boardTemplate.$gameBoard.length > 0) {
      this.boardTemplate.generate();
    }
  };

  Game.prototype.playNew = function () {
    this.boardTemplate.render();
  };

  Game.prototype.playAgain = function () {
    this.boardData.reset();
    this.playerTurn.reset();
    this.winValidation.reset();
    this.winFulfillment.hideWinnerModal();
    this.playNew();
  };

  return Game;

});