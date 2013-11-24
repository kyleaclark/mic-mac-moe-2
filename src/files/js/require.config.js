var require = {
  paths: {
    jquery: "lib/jquery-2.0.3",
    underscore: "lib/underscore-1.5.1"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    "lib/modernizr.touchevents": {
      exports: "Modernizr"
    }
  }
};

// Disable cache
require.urlArgs = "time=" + new Date().getTime();

// Change base url for non testing env
if (!(/\/test/.test(window.location.pathname))) {
  require.baseUrl = "/";
}