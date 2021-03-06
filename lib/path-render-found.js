const path = require('path') ;

module.exports = function() {

    // only return fx because env var not exists before first exec

    /**
     * @function pathRenderFound
     * @param {string} pathRender
     * @return void
     * @description attach new watcher file view , call watchers assets files
     */
    return pathRender => {

        const env = process.liveReload ;
        const watcher = env.addWatcher( pathRender ) ;

        env.watchers.push( watcher ) ;

        env.reloadEmitter.emit('success watch' , path.basename( pathRender ) ) ;

        Object.keys( env.assets ).forEach( assetType => (
            env
            .assets[ assetType ]
            .forEach( env.tryAsset )
        ) ) ;

    } ;

} ;
