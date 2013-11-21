/*define([
  "jquery",
  "underscore",
  "js/Game"
], function ($, _, Game) {
  "use strict";

  function Pres(config) {
    var
      self = this,
      defaults = {
        
        $winTemplate: $("#win-template"),
        $gameBoard: $("#game-board"),
        $gameWinner: $("#game-winner"),
        $winner: $("#game-winner")
      };

    function initVars() {
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
      
      self.$winTemplate = self.options.$winTemplate;
      self.$gameBoard = self.options.$gameBoard;
      self.$gameWinner = self.options.$gameWinner;
      self.$winner = self.options.$winner;
      self.playerWins = "";
    }

    function setBinds() {
      
      self.$gameWinner.on("hidePlayerWins", function () {
        self.hideWinEvent.apply(self, arguments);
      });
      self.$gameWinner.on("renderPlayerWins", function (e, opts) {
        self.renderWinEvent.apply(self, arguments);
      });
    }

    initVars();
    setBinds();
  }

  (function initStatic() {
    var that = Pres;

    function initVars() {
      that.PLAYER_X = {
        src: "img/player-x.png",
        alt: "Player X",
      };
      that.PLAYER_O = {
        src: "img/player-o.png",
        alt: "Player O",
      };
      that.X = "X";
      that.WINNER_FADEIN = 800;
      that.TURN_FADEIN = 300;
    }

    function initMethods() {

      that.renderTurn = function (player, id) {
        var sq = "#" + id;

        if (player === X) {
          $("<img>", that.PLAYER_X).fadeIn(that.TURN_FADEIN).appendTo(sq);
        } else {
          $("<img>", that.PLAYER_O).fadeIn(that.TURN_FADEIN).appendTo(sq);
        }
      };

    }

    initVars();
    initMethods();
  })();

  Pres.prototype.renderWinEvent = function (e, opts) {
    /* REFACTOR !
    var renderPlayerWins = (function () {
      var 
        winTemplate = $winTemplate.html();
        playerWinsTemplate = _.template(winTemplate);

      return playerWinsTemplate;
    }());

    playerWins = renderPlayerWins(opts);
    $gameWinner.prepend(playerWins);

    setTimeout(function () {
      $("#overlay").show();
      $gameWinner.fadeIn(WINNER_FADEIN);
    }, TURN_FADEIN);
    
    console.log("refactor");
  };

  Pres.prototype.hideWinEvent = function () {
    $("#overlay").hide();
    this.$gameWinner.children("h1").remove();
    this.$gameWinner.hide();
  };

  return Pres;

});*/