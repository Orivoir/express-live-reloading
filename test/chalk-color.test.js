const
    {assert,expect} = require('chai')
    ,chalkColorTest = require('./../lib/chalk-color')
;

describe('test `chalk-color` logger dev module' , () => {

    it('should be an object' , () => {

        assert.isObject( chalkColorTest ) ;

    } ) ;

    describe('test `custom` Function' , () => {

        it('should contains `custom` property' , () => {

            expect( chalkColorTest ).to.have.property( 'custom' ) ;

            assert.isFunction( chalkColorTest.custom ) ;

        } ) ;

    } ) ;

    describe('test `error`' , () => {

        it('should contains `error` Function' , () => {

            expect( chalkColorTest ).to.have.property( 'error' ) ;

            assert.isFunction( chalkColorTest.error ) ;

        } ) ;

        it('sould be return void `error` Function' , () => {

            assert.isUndefined( chalkColorTest.error() ) ;
        } ) ;

    } ) ;

    describe('test `success`' , () => {

        it('should contains `success` Function' , () => {

            expect( chalkColorTest ).to.have.property( 'success' ) ;

            assert.isFunction( chalkColorTest.success ) ;

        } ) ;

        it('sould be return void `success` Function' , () => {

            assert.isUndefined( chalkColorTest.success() ) ;
        } ) ;

    } ) ;

    describe('test `warn`' , () => {

        it('should contains `warn`' , () => {

            expect( chalkColorTest ).to.have.property( 'warn' ) ;

            assert.isFunction( chalkColorTest.warn ) ;

        } ) ;


        it('sould be return void `warn` Function' , () => {

            assert.isUndefined( chalkColorTest.warn() ) ;
        } ) ;

    } ) ;

    describe('test `info`' , () => {

        it('should contains `info` Function' , () => {

            expect( chalkColorTest ).to.have.property( 'info' ) ;

            assert.isFunction( chalkColorTest.info ) ;

        } ) ;


        it('sould be return void `info` Function' , () => {

            assert.isUndefined( chalkColorTest.info() ) ;
        } ) ;

    } ) ;

    describe('test `other`' , () => {

        it('should contains `other`' , () => {

            expect( chalkColorTest ).to.have.property( 'other' ) ;

            assert.isFunction( chalkColorTest.other ) ;

        } ) ;


        it('sould be return void `other` Function' , () => {

            assert.isUndefined( chalkColorTest.other() ) ;
        } ) ;

    } ) ;

} ) ;
