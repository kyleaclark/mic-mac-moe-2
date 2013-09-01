var
  path = require("path"),
  fs = require("fs" ),
  CSON = require("cson");

var
  root = path.normalize(__dirname + "../../../" ),
  src = root + "src/",
  outPath = root + "out/"

var
  config = CSON.parseFileSync( root+"docpad.coffee" ),
  filesNotToDelete = {
    "js/app.js":true,
    "css/app.css":true
  };


function removeFile( files, filePath ) {

  var
    fileName = files.pop(),
    fullPath = outPath + filePath;

  if( fileName ) {

    if( filesNotToDelete[filePath+fileName] ) {
      removeFile( files, filePath );
      return;
    }

   // console.log("removing " + fileName + " form the our folder");
    fs.unlink(  fullPath +  fileName, function( err ) {
      if( err ) {
        console.log( "removing "+ fullPath + fileName + " failed" );
        throw err;
      }
     // console.log("removed " + fileName + " from the out folder");
      removeFile( files, filePath );
    } );
  }
}


function removeFilesFromOut( folderName ) {

  var folderPath = outPath + folderName + "/";

  fs.readdir( folderPath, function( err, files ){

    if( err ) {
      throw new err;
    }

    var
      fileTotal = files.length,
      checkCount = 0,
      _files = [];

    files.forEach( function( file, index ) {

      fs.stat( folderPath + file, function( err, stat ) {

        if( stat.isDirectory() ) {
          removeFilesFromOut( folderName + "/" + file );
        } else if( stat.isFile() ) {
          _files.push(file);
        }

        checkCount++;
        if( checkCount===fileTotal ) {
          removeFile( _files, folderName + "/" );
        }

      });

    } );

  } );
}


if( config.plugins &&
    config.plugins.concatenation &&
    config.plugins.concatenation.filesNotToDelete &&
    config.plugins.concatenation.filesNotToDelete.length ) {

  config.plugins.concatenation.filesNotToDelete.forEach( function( fileName ) {
    filesNotToDelete[fileName] = true;
  } );

}

removeFilesFromOut("js");
removeFilesFromOut("lib");
removeFilesFromOut("css");








