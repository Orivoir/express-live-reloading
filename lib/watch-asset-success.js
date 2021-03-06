module.exports = function( absolutePath , relativeSource ) {

    const env = process.liveReload ;

    const watcherAsset = env.addWatcher( absolutePath ) ;

    env.watchers.push( watcherAsset ) ;

    env.logs.success( 'asset watch from' + relativeSource ) ;

    env.reloadEmitter.emit('success watch' , relativeSource ) ;

    return env;
} ;
