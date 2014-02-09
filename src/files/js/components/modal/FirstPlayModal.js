define([
  "jquery",
  "js/utils/Globals"
], function ($, Globals) {
  "use strict";

  /**
  * FirstPlayModal class constructor
  */
  function FirstPlayModal(config) {
    var
      self = this,
      that = FirstPlayModal,
      defaults = {
        overlayEl: "#overlay",
        modalEl: "[data-modal='firstPlay']",
        hideEl: "[data-game='firstPlay']"
      };

    function initGlobals() {
      self.CLICK = Globals.CLICK;
    }

    // Instance variables
    function initVars() {
      // Configurations
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
      self.overlayEl = self.options.overlayEl;
      self.modalEl = self.options.modalEl;
      self.hideEl = self.options.hideEl;

      self.$overlayEl = $(self.overlayEl);
      self.$modalEl = $(self.modalEl);
      self.$hideEl = $(self.hideEl);
    }

    // Instance objects
    function initObjects() {
      self.Class = that;
    }

    // Event binds
    function setBinds() {
      self.$hideEl.on(self.CLICK, function () {
        self.hide();
      });
    }

    initGlobals();
    initVars();
    initObjects();
    setBinds();
  }

  FirstPlayModal.prototype.show = function () {
    this.$overlayEl.show();
    this.$modalEl.show();
  };

  FirstPlayModal.prototype.hide = function () {
    this.$overlayEl.hide();
    this.$modalEl.fadeOut(50);
  };

  return FirstPlayModal;
});