/**
 * @const {Function} fileListener
 * @description listen events of file emitter
 */
const fileListener = require('./file-listener') ;

/**
 * @exports Function
 * @param {object} reloadEmitter file event emitter
 * @return {Function} socket emitter/listener
 */
module.exports = function( reloadEmitter ) {

    return socket => {

        fileListener( reloadEmitter , socket ) ;

        socket.emit('skip' , {
            scripts: ['/socket.io/socket.io.js' , '/live-reload.js']
            ,styles: []
        } ) ;

        socket.on('assets' , assets => {

            process.liveReload.assets = assets ;
            process.liveReload.done() ;

        } ) ;

    }

} ;