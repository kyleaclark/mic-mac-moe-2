define([
  "jquery",
  "underscore",
  "js/utils/Globals",
  "js/utils/PubSub"
], function ($, _, Globals, PubSub) {
  "use strict";

  /**
  * WinFulfillment class constructor
  */
  function WinFulfillment(config) {
    var
      self = this,
      that = WinFulfillment,
      defaults = {
        overlayEl: "#overlay",
        winnerTemplateEl: "[data-template='winner']",
        winnerModal: "[data-modal='winner']"
      };

    // Instance variables
    function initVars() {
      // Configurations
      self.defaults = defaults;
      self.options = $.extend({}, defaults, config);
      self.overlayEl = self.options.overlayEl;
      self.winnerTemplateEl = self.options.winnerTemplateEl;
      self.winnerModal = self.options.winnerModal;

      self.$overlayEl = $(self.overlayEl);
      self.$winnerTemplateEl = $(self.winnerTemplateEl);
      self.$winnerModal = $(self.winnerModal);
      self.playerWinnerEl = "#player-winner";
    }

    // Instance objects
    function initObjects() {
      self.Class = that;
      self.PubSub = PubSub;
    }

    // Event binds
    function setBinds() {
      PubSub.subscribe(self.Class.FULFILL_WIN_EVENT, function (ev, args) {
        self.onFulfillWinEvent(ev, args);
      });
    }

    initVars();
    initObjects();
    setBinds();
  }

  (function initStaticVars() {
    var that = WinFulfillment;

    that.FULFILL_WIN_EVENT = Globals.FULFILL_WIN_EVENT;
    that.UPDATE_SCORE_EVENT = Globals.UPDATE_SCORE_EVENT;
  })();

  WinFulfillment.prototype.onFulfillWinEvent = function (ev, args) {
    var that = this.Class;

    this.winnerOpts = args;
    this.generateWinnerTemplate(this.winnerOpts);
    this.showWinnerModal();
    console.log("publish", that.UPDATE_SCORE_EVENT);
    PubSub.publish(that.UPDATE_SCORE_EVENT, [this.winnerOpts]);
  };

  WinFulfillment.prototype.generateWinnerTemplate = function (templateData) {
    var
      templateHtml = this.$winnerTemplateEl.html(),
      template = _.template(templateHtml);

    this.winnerTemplate = template(templateData);
  };

  WinFulfillment.prototype.showWinnerModal = function () {
    var self = this;

    this.$winnerModal.prepend(this.winnerTemplate);

    setTimeout(function () {
      self.$overlayEl.show();
      self.$winnerModal.fadeIn(500);
    }, 300);

    this.$playerWinnerEl = $(this.playerWinnerEl);
  };

  WinFulfillment.prototype.hideWinnerModal = function () {
    var self = this;

    this.$overlayEl.hide();
    this.$winnerModal.fadeOut(250, function () {
      self.$playerWinnerEl.empty().remove();
    });
  };

  return WinFulfillment;
});