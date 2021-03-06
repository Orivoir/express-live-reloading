const
    {assert} = require('chai')
    ,socketConnectTest = require('./../lib/socket-connect')
    ,serverFactory = require('http').Server( (req,res) => res.end('free HTTP Request') )
    ,socketFactory = require('socket.io')( serverFactory )
;

describe('test `socket-connect`' , () => {

    it('should be an function' , () => {

        assert.isFunction( socketConnectTest ) ;

    } ) ;

    it('should return function' , () => {

        assert.isFunction( socketConnectTest() ) ;
    } ) ;

    it('should return undefined' , () => {

        assert.isUndefined( socketConnectTest()( socketFactory ) ) ;

    } ) ;

} ) ;