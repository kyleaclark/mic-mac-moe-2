define([
  "jquery",
  "js/utils/Globals",
  "js/utils/PubSub",
  "js/Game"
], function ($, Globals, PubSub, Game) {
  "use strict";

  /**
  * PlayerTurn class constructor
  */
  function PlayerTurn (config, BoardData, PubSub) {
    var 
      self = this,
      defaults = {
        gameBoard: "game-board",
        resetGame: true
      };

      // Initialize instance
      function init () {

        // Global variables
        function initGlobals () {
          self.CLICK = Globals.CLICK;
          self.winValidationEvent = Globals.validateWinEvent;
        }

        // Instance variables
        function initVars () {
          // Configurations
          self.defaults = defaults;
          self.options = $.extend({}, defaults, config);
          self.gameBoard = self.options.gameBoard;

          // Constants
          self.EMPTY = "";
          self.TURN_INCREMENT = 1;

          // Variables
          self.$boardID = $("#" + self.gameBoard);
          self.playerTurn = "X";
          self.numberOfTurns = 0;
          self.turnSquare = "";
        }

        // Instance objects
        function initObjects () {
          self.BoardData = BoardData;
        }

        // Event binds
        function setBinds () {
          self.$boardID.on(self.CLICK, function (event) {
            self.onClickEvent(event);
          });
        }

        initGlobals();
        initVars();
        initObjects();
        setBinds();
      }

    init();
  }

  (function initStaticVars () {
    var that = PlayerTurn;

    that.PLAYER_X = {
      src: "images/player-x.png",
      alt: "Player X",
    };
    that.PLAYER_O = {
      src: "images/player-o.png",
      alt: "Player O",
    };
    that.X = "X";
    that.O = "O";
  })();

  /**
  * Validate player turn
  */
  PlayerTurn.prototype.validate = function (square) {
    var playerOfSquare = this.BoardData.getPlayerOfSquare(square);

    // Is valid if square is in an empty board square
    if (square !== this.gameBoard && playerOfSquare === this.EMPTY) {
      return true;
    }

    return false;
  }
    
  /**
  * Return value of current playerTurn
  */
  PlayerTurn.prototype.getPlayerTurn = function () {
    return this.playerTurn;
  };

  /**
  * Set value of next player turn (opposite of current player turn)
  */
  PlayerTurn.prototype.setPlayerTurn = function (player) {
    var that = PlayerTurn;

    if (player === that.X) {
      this.playerTurn = that.O;
    } else {
      this.playerTurn = that.X;
    }
  };

  /**
  * Add 1 to value of numberOfTurns
  */
  PlayerTurn.prototype.setNumberOfTurns = function (addTurn) {
    this.numberOfTurns += addTurn;
  };

  /**
  * Get value of numberOfTurns
  */
  PlayerTurn.prototype.getNumberOfTurns = function () {
    return this.numberOfTurns;
  };

  /**
  * Player turn click event handler
  */
  PlayerTurn.prototype.onClickEvent = function (event) {
    var 
      square = event.target.id,
      playerTurn = this.getPlayerTurn();

    if (this.validate(square)) {
      this.render(playerTurn, square);

      if (this.numberOfTurns > 3) {
        PubSub.publish("validateWinEvent");
      }

      this.setPlayerTurn(playerTurn);
      this.setNumberOfTurns(this.TURN_INCREMENT);
    }
  }

  /**
  * Render player turn to dom game board square
  */
  PlayerTurn.prototype.render = function (player, square) {
    var 
      that = PlayerTurn,
      squareId = "#" + square,
      TURN_FADEIN = 300,
      playerEl = "<img>";

    if (player === that.X) {
      $(playerEl, that.PLAYER_X).fadeIn(TURN_FADEIN).appendTo(squareId);
    } else {
      $(playerEl, that.PLAYER_O).fadeIn(TURN_FADEIN).appendTo(squareId);
    }
  };

  return PlayerTurn;
});