module.exports = function( source ) {

    const env = process.liveReload ;

    if( !!env.virtualDir ) {

        env.logs.success( 'asset virtual directory give: '  + env.virtualDir );

    } else {

        env.logs.info( 'not virtual directory define' );
    }

    env.logs.info('call asset from: ' + source ) ;

    return env ;
} ;
