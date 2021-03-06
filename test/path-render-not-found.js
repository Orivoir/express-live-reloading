require('./../lib/env-vars') ;

const
    {assert,expect} = require('chai')
    ,pathRenderNotFoundTest = require('./../lib/path-render-not-found')
;

describe('test `path-render-not-found` module' , () => {

    it('should be an function' , () => {

        assert.isFunction( pathRenderNotFoundTest ) ;

    } ) ;

    it('should be \\throw' , () => {

        const fxThrow = () => pathRenderNotFoundTest( __dirname ) ;

        expect( fxThrow ).to.throw() ;

    } ) ;

    it('should be not \\throw' , () => {

        expect( pathRenderNotFoundTest( undefined ) ).to.have.not.throw ;

    } ) ;


} ) ;