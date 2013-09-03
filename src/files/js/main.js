define([
  "jquery",
  "js/Game"
], function (
  $,
  Game
) {
  "use strict";

  window.NS = window.NS || {};

  (function Main () {
    var NS = window.NS;

    function init () {
      var game;

      $(function () {
        NS.game = new Game();
        game = NS.game;

        game.$gameBoard.trigger("generateBoardTemplate");
        game.$gameBoard.trigger("renderEmptyBoard");
      });

    }

    init();
  })();

});