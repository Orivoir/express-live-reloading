const
    {assert} = require('chai')
    ,expressLiveRelaodingTest = require('./../express-live-reloading')
;

describe('test `endpoint`' , () => {

    it('should be an function' ,() => {

        assert.isFunction( expressLiveRelaodingTest ) ;

    } ) ;

    const entryPoint = expressLiveRelaodingTest() ;

    it('should return an function' , () => {


        assert.isFunction( entryPoint ) ;
    } ) ;

} ) ;