const
    path = require('path')
    ,fs = require('fs')
;

module.exports = function() {

    // because env var not build before first exec
    return relativeSource => {

        const env = process.liveReload ;

        if( env.virtualDir ) {

            relativeSource = relativeSource.replace( env.virtualDir , '' ) ;
        }

        require('./logs-watch-asset')( relativeSource ) ;

        const absolutePath = path.join( env.clientDir  , env.staticDir , relativeSource ) ;

        const statusWatch = !!fs.existsSync( absolutePath ) ;

        env.watchAssetStatus(
            statusWatch
            ,absolutePath
            ,relativeSource
        ) ;

        return env ;

    } ;

} ;
