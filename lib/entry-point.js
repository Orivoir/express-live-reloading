/**
 * @exports Function
 * @return {Function} attach TCP to HTTP server initialize memories store
 * @return {Function} final middleware live reload for express {📦}
 */
module.exports = function() {

    const env = process.liveReload ;

    return function( server , clientDir = null ) {

        if( !!clientDir ) {
            // active local env , give __dirname for active logs dev
            env.devUse = true;
            env.clientDir = clientDir ;
            env.logs.other('dev env is active') ;
        } else {

            env.clientDir = require('./client-dir')() ;
        }

        const io = require('socket.io')( server ) ;

        liveReloadIO = io.of( '/live-reload' );

        liveReloadIO.on('connect' , require('./socket-connect')() ) ;

        return require('./middleware') ;
    } ;

} ;
