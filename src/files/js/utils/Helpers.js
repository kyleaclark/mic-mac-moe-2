define([
  "jquery"
], function ($) {

  var Helpers = {};

  // Helpers

  Helpers.removeClass = function ($el, className) {
    $el.removeClass(className);
  };

  Helpers.addClass = function ($el, className) {
    $el.addClass(className);
  };

  Helpers.updateHtml = function ($el, htmlValue) {
    $el.html(htmlValue);
  };

  return Helpers;
});