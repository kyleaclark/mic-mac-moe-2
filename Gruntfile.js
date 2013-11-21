module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Client JS install via bower
    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    node_version: {
      options: {
        alwaysInstall: true
      }
    },

    requirejs: {
      compile: {
        options: {
          name: "js/main",
          baseUrl: "src/files",
          mainConfigFile: "src/files/js/require.config.js",
          include: ["src/files/lib/require.js"],
          out: "src/files/js/output.js"
        }
      }
    },

    mocha: {
      index: [ "test/index.html" ]
    },

    exec: {
      run: {
        cmd: "./node_modules/.bin/docpad run"
      },

      runServer: {
        cmd: "node server"
      },

      buildSite: {
        cmd: "./node_modules/.bin/docpad generate --env=production"
      },

      production: {
        cmd: "./node_modules/.bin/docpad run --env=production"
      }
    }

  });

  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-mocha");
  grunt.loadNpmTasks("grunt-node-version");
  grunt.loadNpmTasks("grunt-dependency-installer");

  grunt.registerTask("prepare", ["bower:install", "dependency_installer"]);
  grunt.registerTask("build", ["node_version","prepare", "requirejs:compile", "exec:buildSite"]);
  grunt.registerTask("test", ["mocha"]);
  grunt.registerTask("run", ["node_version","exec:run"]);
  grunt.registerTask("production", ["node_version","exec:production"]);
  grunt.registerTask("run-server", ["exec:runServer"]);

};
