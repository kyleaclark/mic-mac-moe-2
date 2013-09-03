define([
  "jquery",
  "js/game",
  "js/pres",
  "js/board",
  "js/win",
  "js/turn"
], function (
  $,
  Game,
  Pres,
  Board,
  Win,
  Turn
) {
  "use strict";

  /**
  * Application Namespace
  */
  window.MMM = window.MMM || { };

  /**
  * App Init & Reset
  */
  MMM.app = (function (NS) {
    var
      /**
      * Local object to expose public methods
      */
      _m;

    /** 
    * Public methods
    */
    _m = {
      init: function () {
        NS.game._m.init();
        NS.pres._m.init();
        NS.board._m.init();
        NS.win._m.init();
        NS.storeTurn._m.init()
        NS.handleTurn._m.init();
        
        NS.game._m.newGame();
        console.log("init'd!");
      }
    };

    /**
    * Expose public methods
    */
    return {
      _m : _m
    };
  
  }(MMM));

});