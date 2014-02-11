mic-mac-moe-2
============

##http://micmacmoejs.com

##Authored Date

August 2013

(last edit: February 2014)

##Overview

Created as a personal application.  Play a web-based game of mic-mac-moe-2 (5x5 grid of tic-tac-toe).

##Technologies

JavaScript

NodeJS

Docpad

Grunt

RequireJS

jQuery

UnderscoreJS

CoffeeScript

Eco

HTML5

CSS3

## Running

First, clone the mic-mac-moe-2 repository, change your directory to the project root, and checkout the desired branch:

```
git clone git@github.com:kyleaclark/mic-mac-moe-2.git
cd mic-mac-moe-2
checkout branch-name-goes-here
```

If you are not using or do not have [NodeJS](http://nodejs.com/) v0.10.17 installed, use or install correct nvm version:

```
nvm use 0.10.17 or nvm install 0.10.17
```


Run npm install:

```
npm install
```


Change directory to plugins/docpad-plugin-concatenation and run npm install:

```
cd plugins/docpad-plugin-concatenation

npm install
```


Change directory back to root:

```
cd ../
```


If you don't have [Grunt](http://gruntjs.com/) installed, install it with the following command:

```
sudo npm install -g grunt
```

Now run the following:

```
grunt run
```
You should see output like the following:

```
Running "exec:run" (exec) task
info: Welcome to DocPad v6.42.3
info: Plugins: cachr, cleanurls, eco, partials
info: Environment: development
info: DocPad listening to http://localhost:9778/ on directory /Users/your_user_name/git/mic-mac-moe-2/out
info: Generating...
info: Generated all n files in n seconds
info: Watching setup starting...
info: Watching setup
info: The action completed successfully
```

If you do not see the above, you may need to install [DocPad](http://docpad.org/) globally. To do so, run the following:

```
npm install -g docpad
docpad run
```

You should see output like the following:

```
info: Welcome to DocPad v6.42.3
info: Plugins: cachr, cleanurls, coffeekup, coffeescript, eco, handlebars, less, navigation, partials, proxy, text
info: Environment: development
info: DocPad listening to http://localhost:9778/ on directory /Users/someuser/git/valcyte/out
info: Generating...
info: Generated all n files in n seconds
info: Watching setup starting...
```

Afterwhich, you can kill DocPad (Ctrl+C) and then simply use `grunt run` as described above.

You should now be able to access the site by going to the following URL:

```
http://localhost:9778/
```

Notice that this URL is also displayed in the console output after executing `grunt run`.


## Other commands

`grunt prepare`: install [Bower](http://bower.io/) packages

`grunt build`: build site (without running server)

`grunt docs`: generate documentation with [groc](https://github.com/nevir/groc)

`grunt deploy`: deploy site to http://valcyte-redesign.cd.meltdev.com

`grunt production`: run site in production mode

`grunt run-server`: run node server

`grunt test`: run [Chai](http://chaijs.com/) tests using [Mocha](http://visionmedia.github.io/mocha/)

