module.exports = function() {

    const FileEmitter = require('./file-emitter') ;

    const fileEmit = new FileEmitter() ;

    // accept double attach event because file-listener.js free all listeners to call
    // fileEmit.notDouble = true ;

    return fileEmit ;
} ;
