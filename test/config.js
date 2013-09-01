define([], function() {
  window.assert = chai.assert;
  mocha.setup("tdd");

  var listOfTests = [
    "example"
  ];

  require.config({
    paths: {
      jquery: "../src/files/lib/jquery-1.10.2",
      js: "../src/files/js",
      lib: "../src/files/lib"
    }
  });

  // Load tests and then run mocha
  require(listOfTests, function () {
    mocha.options.ignoreLeaks = true;
    mocha.run();
  });

});