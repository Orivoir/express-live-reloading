const chokidar = require('chokidar') ;

module.exports = function( path2watch ) {

    const watcher = chokidar.watch( path2watch ) ;
    const {reloadEmitter} = process.liveReload ;

    watcher
        .on('change' , () => reloadEmitter.emit('reload') )
        .on('unlink' , () => reloadEmitter.emit('reload') )
    ;

    return watcher ;
} ;
