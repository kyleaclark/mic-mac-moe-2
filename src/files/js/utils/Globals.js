define([
  "jquery",

  // These do not return useful objects
  "lib/modernizr.touchevents"
], function ($) {

  var Globals = {};

  // Helpers
  Globals.CLICK = Modernizr.touch ? "touchend" : "click";

  // Values
  Globals.validateWinEvent = "validateWinEvent";

  return Globals;
});