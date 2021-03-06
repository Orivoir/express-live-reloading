const fs = require('fs') ;

/**
 * @export Function
 * @return {Function}
 */
module.exports = function() {

    // only return fx because env var not exists before first exec

    /**
     * @function watcherClosesSuccess
     * @summary exec after success free all watchers files \
     * @description exec function status of file view
     */
    return () => {

        const env = process.liveReload ;
        let pathRender = env.path;

        env.logs.info( 'try watch view with: ' + pathRender );

        const statusRender = fs.existsSync( pathRender ) ;

        const method = 'pathRender' + ( statusRender ? '' : 'Not' )  + 'Found' ;

        env[ method ]( pathRender ) ;
    } ;

} ;
