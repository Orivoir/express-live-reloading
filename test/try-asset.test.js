require('./../lib/env-vars') ;

const
    {assert,expect} = require('chai')
    ,tryAssetTest = require('./../lib/try-asset')
;

describe('test `try-asset` module' , () => {

    it('should be an function' , () => {

        assert.isFunction( tryAssetTest ) ;

    } ) ;

    it('should be return an function' , () => {

        assert.isFunction( tryAssetTest() )

    } ) ;

    it('should throw' , () => {

        const fxThrow = () => tryAssetTest()('/index.css') ;

        expect( fxThrow ).to.throw() ;

    } ) ;

    it.skip('should be free watchers files' , () => {

        process.liveReload.watchers.forEach( watcher => watcher.close() ) ;

    } ) ;

} ) ;