define([
  "jquery",
  "js/Game"
], function ($, Game) {
  "use strict";

  var NS = window.NS || {};

  // Main program object on window
  NS.Main = function Main (config) {
    var 
      self = this,
      defaults = {};

    function init () {

      function initVars () {
        self.defaults = defaults;
        self.options = $.extend({}, defaults, config);
      }

      initVars();
    }

    init();

    // Initialize Game object
    self.initGame = function () {
      self.game = new Game();
    };
  };

  // Initialize Main program object
  NS.initMain = function () {
    var main = new NS.Main();

    function domReady () {
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