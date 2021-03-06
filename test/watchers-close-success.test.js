const
    {assert,expect} = require('chai')
    ,watcherCloseSuccessTest = require('./../lib/watchers-close.success')
;

describe('test `close watchers success` module' , () => {

    it('should be an function' , () => {

        assert.isFunction( watcherCloseSuccessTest ) ;

    } ) ;

    it('should return an function' , () => {

        assert.isFunction( watcherCloseSuccessTest() ) ;

    } ) ;

    it('should return undefined' , () => {

        assert.isUndefined( watcherCloseSuccessTest()() ) ;

        it('should have hydrate env vars' , () => {

            assert.isObject( process.liveReload ) ;

        } ) ;
    } ) ;

} ) ;
