module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),


    requirejs: {
      compileJS: {
        options: {
          name: "js/main",
          baseUrl: "src/files",
          mainConfigFile: "src/files/js/require.config.js",
          include: ["test/lib/requirejs/require.js"],
          out: "src/files/js/app.js"
        }
      },
      compileCss: {
        options: {
          cssIn: "out/css/all.css",
          out: "out/css/app.css"
        }
      }
    },

    mocha: {
      index: [ 'test/index.html' ]
    },

    connect: {
      server: {
        options: {
          port: 10113,
          base: 'out'
        }
      }
    },

    exec: {

      run: {
        cmd: './node_modules/.bin/docpad run'
      },

      runServer: {
        cmd: 'node server'
      },

      buildSite: {
        cmd: './node_modules/.bin/docpad generate --env=production'
      },

      deploy: {
        options: {
          timeout: 60000
        },
      	cmd: 'cadmium-commit grunt_deploy <%= pkg.proxy %>'
      },

      production: {
        cmd: './node_modules/.bin/docpad server --env=production'
      },

      prepare: {
        cmd: './node_modules/.bin/bower install'
      },

      clean: {
        //cmd: 'echo "removing node_modules" && rm -rf node_modules && rm -rf out && rm -rf src/files/lib/bower'
        cmd: function() {

          var command = "echo removing node_modules...";
          command += "&& rm -rf node_modules ";
          command += "&& echo removed node_modeules";
          command += "&& echo removing out...";
          command += "&& rm -rf out ";
          command += "&& echo removed out";
          return command;

        }
      }

    },

    groc: {
      options: {
        out: 'docs/'
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-groc');
  grunt.loadNpmTasks('grunt-node-version');

  grunt.registerTask('prepare', ['exec:prepare']);
  grunt.registerTask('clean', ['exec:clean']);
  grunt.registerTask('build', ['node_version', 'prepare', 'exec:buildSite', 'requirejs:compileJS', 'requirejs:compileCss' ]);
  grunt.registerTask('docs', ['groc']);
  grunt.registerTask('run', ['node_version', 'exec:run']);
  grunt.registerTask('production', ['node_version', "build", "exec:production"]);
  grunt.registerTask('deploy', ['node_version', 'exec:deploy']);
  grunt.registerTask('run-server', ['exec:runServer']);
  grunt.registerTask('test', ['node_version', 'build', 'connect', 'mocha']);
};
