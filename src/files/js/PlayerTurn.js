define([
  "jquery",
  "js/utils/Globals",
  "js/utils/Helpers",
  "js/utils/PubSub"
], function ($, Globals, Helpers, PubSub) {
  "use strict";

  /**
  * PlayerTurn class constructor
  */
  function PlayerTurn(config, BoardData) {
    var
      self = this,
      that = PlayerTurn,
      defaults = {
        gameBoardEl: "game-board",
        playerXDataEl: "[data-player='x']",
        playerODataEl: "[data-player='o']"
      };

    // Global variables
    function initGlobals() {
      self.CLICK = Globals.CLICK;
      self.SET_TURN_EVENT = Globals.SET_TURN_EVENT;
      self.VALIDATE_WIN_EVENT = Globals.VALIDATE_WIN_EVENT;
    }

    // Instance variables
    function initVars() {
      // Configurations
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
      self.gameBoardEl = self.options.gameBoardEl;
      self.playerXDataEl = self.options.playerXDataEl;
      self.playerODataEl = self.options.playerODataEl;

      // Constants
      self.EMPTY = "";
      self.TURN_INCREMENT = 1;

      // Variables
      self.$boardID = $("#" + self.gameBoardEl);
      self.$playerXDataEl = $(self.playerXDataEl);
      self.$playerODataEl = $(self.playerODataEl);
      self.player = that.DEFAULT_PLAYER;
      self.numberOfTurns = 0;
      self.turnSquare = "";
    }

    // Instance objects
    function initObjects() {
      self.Class = that;
      self.BoardData = BoardData;
    }

    // Event binds
    function setBinds() {
      self.$boardID.on(self.CLICK, function (event) {
        self.onClickEvent(event);
      });

      PubSub.subscribe(that.TOGGLE_TURN_EVENT, function (ev) {
        self.toggleActivePlayer();
      });
    }

    initGlobals();
    initVars();
    initObjects();
    setBinds();
  }

  (function initStaticVars() {
    var that = PlayerTurn;

    that.TOGGLE_TURN_EVENT = Globals.TOGGLE_TURN_EVENT;

    that.PLAYER_X = {
      src: "images/player-x.png",
      alt: "Player X",
      class: "game-board-x"
    };
    that.PLAYER_O = {
      src: "images/player-o.png",
      alt: "Player O",
      class: "game-board-o"
    };
    that.X = "X";
    that.O = "O";
    that.DEFAULT_PLAYER = that.X;
  })();

  /**
  * Validate player turn
  */
  PlayerTurn.prototype.validate = function (square) {
    var playerOfSquare = this.getPlayerOfSquare(square);

    // Is valid if square is in an empty board square
    if (square !== this.gameBoardEl && playerOfSquare === this.EMPTY) {
      return true;
    }

    return false;
  };
    
  /**
  * Return value of current player turn
  */
  PlayerTurn.prototype.getPlayer = function () {
    return this.player;
  };


  /**
  * Set value of current player turn
  */
  PlayerTurn.prototype.setPlayer = function (val) {
    this.player = val;
  };

  /**
  * Get player value of square
  */
  PlayerTurn.prototype.getPlayerOfSquare = function (square) {
    return this.BoardData.getPlayerOfSquare(square);
  };

  /**
  * Set player value of square
  */
  PlayerTurn.prototype.setPlayerOfSquare = function (square) {
    var player = this.getPlayer();

    this.BoardData.setPlayerOfSquare(player, square);
  };

  /**
  * Add 1 to value of numberOfTurns
  */
  PlayerTurn.prototype.setNumberOfTurns = function (val) {
    this.numberOfTurns += val;
  };

  /**
  * Get value of numberOfTurns
  */
  PlayerTurn.prototype.getNumberOfTurns = function () {
    return this.numberOfTurns;
  };

  /**
  * Update value of next player turn (opposite of current player turn)
  */
  PlayerTurn.prototype.toggleActivePlayer = function () {
    var 
      that = this.Class,
      player = this.getPlayer(),
      activeClass = "active";

    if (player === that.X) {
      Helpers.removeClass(this.$playerXDataEl, activeClass);
      Helpers.addClass(this.$playerODataEl, activeClass);
      this.setPlayer(that.O);
    } else {
      Helpers.removeClass(this.$playerODataEl, activeClass);
      Helpers.addClass(this.$playerXDataEl, activeClass);
      this.setPlayer(that.X);
    }
  };

  /**
  * Player turn click event handler
  */
  PlayerTurn.prototype.onClickEvent = function (event) {
    var
      square = event.target.id,
      player = this.getPlayer();

    console.log(square);

    if (this.validate(square)) {
      this.render(player, square);
      this.setPlayerOfSquare(square);
      
      if (this.numberOfTurns > 3) {
        PubSub.publish(this.VALIDATE_WIN_EVENT, [square, player]);
      } else {
        this.toggleActivePlayer();
      }

      this.setNumberOfTurns(this.TURN_INCREMENT);
      PubSub.publish(this.SET_TURN_EVENT, [player, square]);
    }
  };

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

  /**
  * Reset turn data
  */
  PlayerTurn.prototype.reset = function () {
    var 
      that = this.Class,
      currentPlayer = this.getPlayer();

    if (currentPlayer !== that.DEFAULT_PLAYER) {
      this.toggleActivePlayer();
    }
  };

  return PlayerTurn;
});