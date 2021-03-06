require('./../lib/env-vars') ;

const
    {assert,expect} = require('chai')
    ,pathRenderFoundTest = require('./../lib/path-render-found')
;

describe('test `path-render-module`' , () => {

    it('should be an function' , () => {


        assert.isFunction( pathRenderFoundTest ) ;
    } ) ;

    it('should be return an function' , () => {

        assert.isFunction( pathRenderFoundTest() ) ;

    } ) ;

    it('should not \\throw' , () => {

        expect( pathRenderFoundTest( )(__dirname + '\\index.html') ).to.have.not.throw ;

    } ) ;

    it("should closes all watchers" , () => {

        process.liveReload.watchers.forEach(watcher => watcher.close() );

    } ) ;

} ) ;
