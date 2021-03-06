module.exports = function( pathRender ) {

    if(typeof pathRender !== 'string' ) {
        // socket immediately re emit after re start server
        // on last channel but not new HTTP request listen

        process.liveReload.logs.success( 're start server detect auto reload on last TCP channel again open' );

        // server re start detect and synchronize client with an reload
        process.liveReload.reloadEmitter.emit('reload') ;

    } else {
        // path render not exists/not found

        process.liveReload.logs.error('render :' + pathRender + ' not found') ;

        throw 'please check you call method `liveReload` in you response middleware render not found';
    }
}