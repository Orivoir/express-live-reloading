const pathResolver = require('path') ;

module.exports = function( absolutePath ) {

    const env = process.liveReload ;

    env.logs.error('asset not found from:' + absolutePath ) ;

    env.reloadEmitter.emit('fail watch' , pathResolver.basename(absolutePath) ) ;

} ;
