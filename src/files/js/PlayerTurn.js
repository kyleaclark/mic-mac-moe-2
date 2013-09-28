define([
  "jquery",
  "js/Game"
], function (
  $,
  Game
) {
  "use strict";

  /**
  * PlayerTurn class constructor
  */
  function PlayerTurn (config, BoardData) {
    var 
      self = this,
      defaults = {
        gameBoard: "game-board",
        resetGame: true
      };

      // Initialize instance
      function init () {

        // Global constants
        function initConstants () {
          var NS = window.NS;
          NS.CLICK = window.NS.CLICK;
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
          self.$boardID.on(NS.CLICK, function (event) {
            self.onClickEvent(event);
          });
        }

        initConstants();
        initVars();
        initObjects();
        setBinds();
      }

    init();
  }

  /**
  * Validate player turn
  */
  PlayerTurn.prototype.validate = function (square) {
    console.log("square : ", square);
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
  * Set value of next playerTurn
  */
  PlayerTurn.prototype.setPlayerTurn = function (player) {
    this.playerTurn = player;
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
      //this.Pres.renderTurn(player, square);
      //this.Board.setPlayerBySquare(player, square);

      if (this.numberOfTurns > 3) {
        //this.Validate.isWin(square);
      }

      this.setNumberOfTurns(this.TURN_INCREMENT);
    }
  }

  /**
  * Render player turn to dom game board square
  */
  PlayerTurn.prototype.render = function (player, square) {
    var 
      TURN_FADEIN = 300,
      playerEl = "<img>";

    $(playerEl, player).fadeIn(TURN_FADEIN).appendTo(square);
  };

  return PlayerTurn;

});