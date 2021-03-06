/**
 * @module chalk-color
 *
 * debug env contains methods logs color custom for debuging with <3 and nodejs
 */
const
    isDev = () => !!process.liveReload.devUse
    ,chalk = require('chalk')
    ,error = text => isDev() ? console.log( 'log.error ->',chalk.bgHex("#e74c3c" ).bold( text ) ) : undefined
    ,success = text => isDev() ? console.log( 'log.success ->',chalk.bgHex('#27ae60').rgb(42,42,42).bold(text) ) : undefined
    ,warn = text => isDev() ? console.log( 'log.warn ->',chalk.bgHex('#f1c40f').rgb( 40,40,40 ).bold(text) ) : undefined
    ,info = text => isDev() ? console.log( 'log.info ->',chalk.bgHex('#2980b9').rgb( 5,5,5 ).bold(text) ) : undefined
    ,other = text => isDev() ? console.log( 'log.other ->',chalk.bgHex( '#8e44ad' ).bold( text ) ) : undefined
;

/**
 * @exports {obejct}
 * @description methods logger colors type for debug env
 */
module.exports= {

    custom: chalk
    ,error: error
    ,success: success
    ,warn: warn
    ,info: info
    ,other: other
} ;
