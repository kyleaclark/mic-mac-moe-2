define([
  "jquery",
  "underscore",
  "js/utils/Globals",
  "js/utils/PubSub"
], function ($, _, Globals, PubSub) {
  "use strict";

  /**
  * WinFulfillment class constructor
  */
  function WinFulfillment(config) {
    var
      self = this,
      that = WinFulfillment,
      defaults = {};

    // Instance variables
    function initVars() {
      // Configurations
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
    }

    // Instance objects
    function initObjects() {
      self.Class = that;
      self.PubSub = PubSub;
    }

    // Event binds
    function setBinds() {
      PubSub.subscribe(self.Class.FULFILL_WIN_EVENT, function (ev, args) {
        self.onFulfillWinEvent(ev, args);
      });
    }

    initVars();
    initObjects();
    setBinds();
  }

  (function initStaticVars() {
    var that = WinFulfillment;

    that.FULFILL_WIN_EVENT = Globals.FULFILL_WIN_EVENT;
  })();

  WinFulfillment.prototype.onFulfillWinEvent = function (ev, args) {
    this.renderWinnerOpts = args;
    this.renderWinner();
  };

  WinFulfillment.prototype.renderWinner = function () {
    var
      renderPlayerWins,
      playerWins,
      $winTemplate = $("#win-template"),
      $gameWinner = $("#game-winner");

    renderPlayerWins = (function () {
      var
        winTemplate = $winTemplate.html(),
        playerWinsTemplate = _.template(winTemplate);

      return playerWinsTemplate;
    }());

    playerWins = renderPlayerWins(this.renderWinnerOpts);
    $gameWinner.prepend(playerWins);

    setTimeout(function () {
      $("#overlay").show();
      $gameWinner.fadeIn(500);
    }, 300);
  };

  return WinFulfillment;
});