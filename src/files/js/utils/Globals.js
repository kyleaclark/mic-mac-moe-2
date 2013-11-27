define([
  "jquery",
  "lib/modernizr.touchevents"
], function ($, Modernizr) {

  var Globals = {};

  // Helpers
  Globals.CLICK = Modernizr.touch ? "touchend" : "click";

  // Events
  Globals.SET_TURN_EVENT = "setTurnEvent";
  Globals.TOGGLE_TURN_EVENT = "toggleTurnEvent";
  Globals.VALIDATE_WIN_EVENT = "validateWinEvent";
  Globals.FULFILL_WIN_EVENT = "fulfillWinEvent";
  Globals.UPDATE_SCORE_EVENT = "updateScoreEvent";

  return Globals;
});