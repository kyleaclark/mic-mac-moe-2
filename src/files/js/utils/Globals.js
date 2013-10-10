define([
  "jquery",

  // These do not return useful objects
  "lib/modernizr.touchevents"
], function ($) {

  var Globals = {};

  // Helpers
  Globals.CLICK = Modernizr.touch ? "touchend" : "click";

  // Events
  Globals.SET_TURN_EVENT = "setTurnEvent";
  Globals.VALIDATE_WIN_EVENT = "validateWinEvent";

  return Globals;
});