define([
  "jquery",
  "underscore",
  "js/Game",
  "js/config/BoardConfig",
], function ($, _, Game, BoardConfig) {
  "use strict";

  function BoardTemplate(config) {
    var
      self = this,
      defaults = {
        $gameBoard: $("#game-board"),
        $gameBoardTemplate: $("[data-template='gameBoard']")
      };

    function initConstants() {
      self.EMPTY = "";
    }

    function initVars() {
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
      self.$gameBoard = self.options.$gameBoard;
      self.$gameBoardTemplate = self.options.$gameBoardTemplate;

      self.gameBoardSquares = "";
    }

    function initObjects() {
      self.boardConfig = BoardConfig;
    }

    initConstants();
    initObjects();
    initVars();
  }

  BoardTemplate.prototype.generate = function () {
    var
      self = this,
      renderGameSquare;

    renderGameSquare = (function () {
      var
        gameBoardTemplate = self.$gameBoardTemplate.html(),
        squareTemplate = _.template(gameBoardTemplate);

      return squareTemplate;
    }());

    _.each(this.boardConfig, function (conf) {
      self.gameBoardSquares += renderGameSquare(conf);
    });
  };
  
  BoardTemplate.prototype.render = function () {
    this.$gameBoard.empty().html(this.gameBoardSquares);
  };

  return BoardTemplate;
});
