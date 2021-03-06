const
    {expect,assert} = require('chai')
    ,FileEmitter = require('./../lib/file-emitter')
    ,fileEmitterTest = new FileEmitter()
;

describe('test model `FileEmitter`' , () => {

    it('should be an function' , () => {

        assert.isFunction( FileEmitter ) ;

    } ) ;

    it('should extends `EventEmitter`' , () => {

        assert.isFunction( FileEmitter.EventEmitter ) ;

    } ) ;

} ) ;

describe('test instance `FileEmitter`' , () => {

    it('should be build on `EventEmitter`' , () => {

        expect( fileEmitterTest.constructor.name ).equal( 'EventEmitter' ) ;

    } ) ;

    it('should have an `on` (string , Function ) => void' , () => {

        expect( fileEmitterTest ).to.have.property( 'on' ) ;

        assert.isFunction( fileEmitterTest.on ) ;

        assert.isUndefined( fileEmitterTest.on('abc' , () => {}) ) ;

    } ) ;

    it('should have an `notDouble` boolean' , () => {

        expect( fileEmitterTest ).to.have.property( 'notDouble' ) ;

        assert.isBoolean( fileEmitterTest.notDouble );

    } ) ;

    it('setter of `notDouble` should normilize type boolean' , () => {

        fileEmitterTest.notDouble = null ;

        assert.isBoolean( fileEmitterTest.notDouble ) ;

    } ) ;

    it('should reject addevent and return false' , () => {

        fileEmitterTest.notDouble = true;

        assert.isFalse( fileEmitterTest.on('abc' , () => {} ) ) ;

    } ) ;

} ) ;