/**
 * @exports Function resolve path root web directory from current path
 */
module.exports = function() {

    let found = false ;
    const sep = __dirname.indexOf('/') !== -1 ? "/": "\\";

    return __dirname.split( sep ).filter( ressource => {

        if( found ) return false;

        if( /node_modules/.test( ressource ) ) {

            found = true;
            return false;
        }

        return true;

    } ).join( sep ) ;

} ;
