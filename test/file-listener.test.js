const
    {assert,expect} = require('chai')
    ,fileListenerTest = require('./../lib/file-listener')
    ,server = require('http').Server( (req,res) => res.end('free HTTP Request') )
    ,socketFactory = require('socket.io')( server )
    ,emitterFactory = new ( require('events') )()
;

describe('test `file-listener` module' , () => {

    it('should be an function' , () => {

         assert.isFunction( fileListenerTest ) ;
    } ) ;

    it('should return void' , () => {

        assert.isUndefined(fileListenerTest( emitterFactory , socketFactory )) ;

    } ) ;


    it('should have attach 3 listeners on emitter' , () => {

        expect( Object.keys(emitterFactory._events) ).to.have.lengthOf( 3 ) ;

    } ) ;

    it('should be attach `reload` listener' , () => {

        assert.isTrue( Object.keys(emitterFactory._events).includes('reload') )
    } ) ;

    it('should be attach `success watch` listener' , () => {


        assert.isTrue( Object.keys(emitterFactory._events).includes( 'success watch' ) )
    } ) ;

    it('should be attach `fail watch` listener' , () => {

        assert.isTrue( Object.keys(emitterFactory._events).includes( 'fail watch' ))
    } ) ;

} ) ;