module.exports = (BasePlugin) ->

  # Define Plugin
  class Concatenation extends BasePlugin
    
    # Plugin name
    name: "concatenation"


    constructor: ->
      super

    contatenateJS: (callback)->

      #JS contactenation
      {spawn} = require 'child_process'

      proc = spawn 'node', [
        __dirname + "/r.js",
        '-o',
        'mainConfigFile=src/files/js/require.config.js',
        'include=requireLib',
        'paths.requireLib=' + __dirname + '/require',
        'out=out/js/app.js',
        'wrap.start=(function(){',
        'wrap.end= require(["js/main"]); })();',
        'baseUrl=src/files/',
        'name=js/main'
      ]
      proc.stdout.on 'data', (data) -> 
        console.log data.toString()
        if data.toString().indexOf('Error:') isnt -1
          process.exit 1
      proc.stderr.on 'data', (data) -> process.stderr.write(data)
      proc.on 'exit', (status) ->
        callback?()


    concatenateCSS: (callback)->

      {spawn} = require 'child_process'

      proc = spawn 'node', [
        __dirname + "/r.js",
        '-o',
        'cssIn=out/css/all.css',
        'out=out/css/app.css'
      ]
      proc.stdout.on 'data', (data) -> 
        console.log data.toString()
        if data.toString().indexOf('Error:') isnt -1
          process.exit 1
      proc.stderr.on 'data', (data) -> process.stderr.write(data.toString())
      proc.on 'exit', (status) ->
        callback?()


    populateCollections: (opts, next)->

      docpad = @docpad
      scripts = docpad.getBlock "scripts"
      styles = docpad.getBlock "styles"

      if docpad.getEnvironment() is "production"
        scripts.add "/js/app.js"
        styles.add "/css/app.css"
      else
        scripts
          .add( "/js/require.config.js", defer: false )
          .add( "//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js", defer: false )
          .add """
                (function(){
                  require(['js/main']);
                })();
               """,
               defer: false

        styles.add "/css/all.css"

      next()


    generateAfter: (opts, next) ->

      docpad = @docpad
      return next() if docpad.getEnvironment() isnt "production"

      _this = @
      @contatenateJS ->
        _this.concatenateCSS next
