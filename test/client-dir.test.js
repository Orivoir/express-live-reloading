const
    {assert} = require('chai')
    ,clientDirTest = require('./../lib/client-dir')
    ,path = require('path')
;

describe('test resolve client dir function' , () => {

    it('should be an Function :-)' , () => {

        assert.isFunction( clientDirTest ) ;

    } ) ;

    it('should be return string' , () => {

        assert.isString( clientDirTest() ) ;

    } ) ;

    // tested with path is absolute
    it.skip('should matcher with: `/c\:(\\|\/)[a-z]+(\\|\/)/i`' , () => {

        assert.isTrue( /c\:(\\|\/)[a-z]+(\\|\/)/i.test( clientDirTest() ) ) ;

    } ) ;

    it('should be an absolute path' , () => {

        assert.isTrue( path.isAbsolute( clientDirTest() ) )

    } ) ;

} ) ;
