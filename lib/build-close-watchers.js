/**
 * @export Function build array[ Promise ]
 */
module.exports = function() {

    const env = process.liveReload ;

    return env.watchers.map( watcher => watcher.close() ) ;

} ;
