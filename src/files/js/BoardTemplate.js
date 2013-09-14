define([
  "jquery",
  "js/Game",
  "js/config/BoardConfig",

  // Does not return useful object
  "underscore"
], function (
  $,
  Game,
  BoardConfig
) {
  "use strict";

  function BoardTemplate (config) {
    var
      self = this,
      defaults = {
        $gameBoard: $("#game-board"),
        $gameBoardTemplate: $("#game-board-template")
      };

    function init () {

      function initConstants () {
        self.boardConfig = BoardConfig;
        self.EMPTY = "";
      }

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);
        self.$gameBoard = self.options.$gameBoard;
        self.$gameBoardTemplate = self.options.$gameBoardTemplate;
      }

      function setBinds () {
        self.$gameBoard.on("generateBoardTemplate", function () {
          self.generateBoardTemplate.apply(self, arguments);
        });
        self.$gameBoard.on("renderEmptyBoard", function () {
          self.renderEmptyBoard.apply(self, arguments);
        });
      }

      initConstants();
      initVars();
    }

    init();
  }

  BoardTemplate.prototype.generateBoardTemplate = function () {
    var 
      self = this,
      renderGameSquare;

    renderGameSquare = (function () {
      var 
        gameBoardTemplate = self.$gameBoardTemplate.html(),
        squareTemplate = _.template(gameBoardTemplate);

      return squareTemplate;
    }());

    _.each(self.boardConfig, function (conf) {
      self.gameBoardSquares += renderGameSquare(conf);
    });
  };
  
  BoardTemplate.prototype.renderEmptyBoard = function () {
    this.$gameBoard.empty().html(this.gameBoardSquares);
  };

  return BoardTemplate;
});
