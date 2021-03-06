/**
 * @exports Function listen event emit from file emmiter and emit this event to socket
 */
module.exports = function fileListener( reloadEmitter , socket ) {

    reloadEmitter.removeAllListeners() ;

    reloadEmitter.on('reload' , () => socket.emit('reload') ) ;
    reloadEmitter.on('success watch' , path => socket.emit('success watch' , path ) ) ;
    reloadEmitter.on('fail watch' , path => socket.emit('fail watch' , path ) ) ;
} ;
