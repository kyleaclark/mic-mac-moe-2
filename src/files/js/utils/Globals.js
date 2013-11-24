define([
  "jquery",
  "lib/modernizr.touchevents"
], function ($, Modernizr) {

  var Globals = {};

  // Helpers
  Globals.CLICK = Modernizr.touch ? "touchend" : "click";

  // Events
  Globals.SET_TURN_EVENT = "setTurnEvent";
  Globals.VALIDATE_WIN_EVENT = "validateWinEvent";
  Globals.FULFILL_WIN_EVENT = "fulfillWinEvent";

  return Globals;
});