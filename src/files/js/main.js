define([
  "jquery",
  "js/Game"
], function ($, Game) {
  "use strict";

  window.NS = window.NS || {};

  var NS = window.NS;

  // Main program object
  NS.Main = function Main(config) {
    var
      self = this,
      defaults = {};

    function initVars() {
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
    }

    // Initialize Game object
    self.initGame = function () {
      self.game = new Game();
      self.game.initialize();
      self.game.playNew();
    };

    initVars();
  };

  // Initialize Main program object
  NS.initMain = function () {
    var main = new NS.Main();

    function domReady() {
      main.initGame();
    }

    // Dom Ready
    $(function () {
      domReady();
    });
  };

  // Run main program
  NS.initMain();
});