const
    {assert,expect} = require('chai')
    ,watchersCloseFailTest = require('./../lib/watchers-close-fail')
;

describe('test module `fail close watchers`' , () => {

    it('should be an function' , () => {

        assert.isFunction(watchersCloseFailTest) ;

    } ) ;

    it('should \\throw' , () => {

        const fxThrow = () => watchersCloseFailTest() ;

        expect( fxThrow ).to.have.throw() ;

    } ) ;

} ) ;