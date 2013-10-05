define([
  "jquery"
], function ($) {
  "use strict";

  /**
  * Publish / Subscribe Pattern Implementation
  */
  
  var
    PubSub = {}, 
    obj = $({});

  PubSub.publish = function () {
    obj.trigger.apply(obj, arguments);
  };

  PubSub.subscribe = function () {
    obj.on.apply(obj, arguments);
  };

  PubSub.unsubscribe = function () {
    obj.off.apply(obj, arguments);
  };

  return PubSub;
});