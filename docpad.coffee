# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON

module.exports =

  useCustomErrors: true
  prompts: false
  checkVersion: false

  # =================================
  # Template Data
  # These are variables that will be accessible via our templates
  # To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

  templateData:
    # Global site settings
    site:

      # The production url of our website
      url: "http://micmacmoejs.com"

      # The default title of our website
      title: "Mic-Mac-Moe"

      # The website description (for SEO)
      description: """
        JavaScript Application
        """

      # The website keywords (for SEO) separated by commas
      keywords: """
        javascript, jquery
        """

      # 404 page we want to use as default
      errorPage: "404.html"
  
  collections:
    
    pages: ->
      # Set default layout
      @getCollection("html").on "add", (model) ->
        model.setMetaDefaults({layout:"default"})

  events:

    renderBefore: ({collection})->
      if docpad.getEnvironment() isnt "production"
        collection.each (item)->
          item.set("dynamic", true) if item.get "isLayout"
          item.set("dynamic", true) if item.get "isDocument"
          item.set("dynamic", true) if item.get "isPartial"

  plugins:

    jshint:
      ignorePaths: ["lib"]
      ignoreFiles: ["js/app.js"]

    nodesass:
      environments:
        development:
          debugInfo: "normal"
          renderUnderscoreStylesheets: true
