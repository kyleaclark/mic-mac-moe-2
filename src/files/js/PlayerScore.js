define([
  "jquery",
  "underscore",
  "js/utils/Globals",
  "js/utils/Helpers",
  "js/utils/PubSub"
], function ($, _, Globals, Helpers, PubSub) {
  "use strict";

  /*================================
    Constructor
  ----------------------------------*/

  /**
  * UnbsubscribeForm object constructor
  */

  function PlayerScore(opts) {
    this.constructorOpts = opts;
    this.initOpts();
    this.initMutators();
    this.initVars();
    this.initBinds();
  }

  /*================================
    Static Methods and Properties
  ----------------------------------*/

  (function initStatic() {
    var that = PlayerScore;

    that.UPDATE_SCORE_EVENT = Globals.UPDATE_SCORE_EVENT;

    that.X = "X";
    that.O = "O";
  })();

  /*================================
    Instance Methods and Properties
  ----------------------------------*/

  /**
  * Initialize instance options 
  */

  PlayerScore.prototype.initOpts = function () {
    var instanceOpts;

    instanceOpts = {
      playerScoreTemplateEl: "[data-template='score']",
      playerXDataEl: "[data-score='x']",
      playerODataEl: "[data-score='o']"
    };

    // Instance options
    this.options = $.extend({}, instanceOpts, this.constructorOpts);

    // Instance properties of options
    this.playerScoreTemplateEl = this.options.playerScoreTemplateEl;
    this.playerXDataEl = this.options.playerXDataEl;
    this.playerODataEl = this.options.playerODataEl;
  };

  /**
  * Initialize instance mutator fields
  */

  PlayerScore.prototype.initMutators = function () {
    var self = this;

    this.mutatePlayer = {
      get: function () { return self.player; },
      set: function (val) { self.player = val; }
    };
    this.mutatePlayerScore = {
      get: function () { return self.playerScore; },
      set: function (val) { self.playerScore = val; }
    };
    this.mutatePlayerSEl = {
      get: function () { return self.$playerEl; },
      set: function ($val) { self.$playerEl = $val; }
    };
    this.mutatePlayerXScore = {
      init: (function () { self.playerXScore = 0; })(),
      get: function () { return self.playerXScore; },
      set: function (val) { self.playerXScore += val; }
    };
    this.mutatePlayerOScore = {
      init: (function () { self.playerOScore = 0; })(),
      get: function () { return self.playerOScore; },
      set: function (val) { self.playerOScore += val; }
    };
    this.mutateScoreIncrementValue = {
      get: function () { return self.scoreIncrementValue; },
      set: function (val) { self.scoreIncrementValue = val; }
    };
  };

  /**
  * Initialize instance variables
  */

  PlayerScore.prototype.initVars = function () {
    // Instance property of static Class type
    this.Class = PlayerScore;

    // Instance variables not specific to instance options
    this.$playerScoreTemplateEl = $(this.playerScoreTemplateEl);
    this.$playerXDataEl = $(this.playerXDataEl);
    this.$playerODataEl = $(this.playerODataEl);

    // Init mutator values
    this.mutatePlayerXScore.set(0);
    this.mutatePlayerOScore.set(0);
    this.mutateScoreIncrementValue.set(1);
  };

  /**
  * Initialize instance event binds
  */

  PlayerScore.prototype.initBinds = function () {
    var
      self = this,
      that = this.Class;

    PubSub.subscribe(that.UPDATE_SCORE_EVENT, function (ev, args) {
      self.onUpdateScoreEvent(ev, args);
    });
  };

  PlayerScore.prototype.onUpdateScoreEvent = function (ev, args) {
    this.playerScoreOpts = args;
    this.updateIncrementScore();
    this.updatePlayerData();
    this.generatePlayerScoreTemplate();
    this.renderPlayerScoreTemplate();
  };

  PlayerScore.prototype.updateIncrementScore = function () {
    if (typeof this.playerScoreOpts.incrementValue !== "undefined") {
      this.mutateScoreIncrementValue.set(this.playerScoreOpts.incrementValue);
    }
  };

  PlayerScore.prototype.updatePlayerData = function () {
    var
      that = this.Class,
      scoreIncrementValue = this.mutateScoreIncrementValue.get(),
      player = this.playerScoreOpts.player,
      playerScore,
      $playerEl;

    this.mutatePlayer.set(player);

    if (player === that.X) {
      this.mutatePlayerXScore.set(scoreIncrementValue);
      playerScore = this.mutatePlayerXScore.get();
      $playerEl = this.$playerXDataEl;
    } else {
      this.mutatePlayerOScore.set(scoreIncrementValue);
      playerScore = this.mutatePlayerOScore.get();
      $playerEl = this.$playerODataEl;
    }

    this.mutatePlayerScore.set(playerScore);
    this.mutatePlayerSEl.set($playerEl);
  };

  PlayerScore.prototype.generatePlayerScoreTemplate = function () {
    var
      templateHtml = this.$playerScoreTemplateEl.html(),
      template = _.template(templateHtml),
      templateData;

    templateData = {
      score: this.mutatePlayerScore.get()
    };

    this.playerScoreTemplate = template(templateData);
  };

  PlayerScore.prototype.renderPlayerScoreTemplate = function () {
    Helpers.updateHtml(this.mutatePlayerSEl.get(), this.playerScoreTemplate);
  };

  /**
  * Return Class object
  */

  return PlayerScore;
});