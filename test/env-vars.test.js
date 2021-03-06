const
    {expect,assert} = require('chai')
;

require('./../lib/env-vars') ;

describe('test contains env variables' , () => {

    it('should be contains an property `liveReload`' , () => {

        expect( process ).to.have.property('liveReload') ;

    } ) ;

    const {liveReload} = process ;

    describe('liveReload property test' , () => {

        describe('test reloadEmitter' , () => {

            it('should contains an property `reloadEmitter`' , () => {


                expect( liveReload ).to.have.property('reloadEmitter') ;

            } ) ;

            it('should be an object `reloadEmitter` ' , () => {

                assert.isObject( liveReload.reloadEmitter ) ;

            } ) ;

        } ) ;

        describe('test `devUse`' , () => {

            it('should contains an property `devUse`' , () => {

                expect( liveReload ).to.have.property('devUse') ;

            } ) ;

            it('should be an boolean `devUse`' , () => {

                assert.isBoolean( liveReload.devUse ) ;

            } ) ;

            it('should transform value in boolean from setter' , () => {

                liveReload.devUse = null ;

                assert.isBoolean( liveReload.devUse ) ;

            } ) ;

        } ) ;

        describe('test `logs`' , () => {

            // now define to start exec with refactoring
            it.skip('should not be defined' , () => {

                expect( liveReload ).to.have.not.property( 'logs' ) ;

            } ) ;

            it('should defined' , () => {

                expect( liveReload ).to.have.property( 'logs' ) ;
            } ) ;

            it('should be an object' , () => {

                assert.isObject( liveReload.logs ) ;

            } ) ;

        } ) ;

        describe('test `clientDir`' , () => {

            it('should contains an property `clientDir`' , () => {

                expect( liveReload ).to.have.property('clientDir') ;

            } ) ;

            it.skip('should be null `clientDir`' , () => {

                assert.isNull( liveReload.clientDir ) ;

            } ) ;

            it('should \\throw TypeError' , () => {

                try {

                    liveReload.clientDir = 42;

                    throw 'have not throw TypeError' ;
                } catch( TypeError ) {
                    // ok!
                }

            } ) ;

        } ) ;

        describe('test `path`' , () => {

            it('should be contains an property `path`' , () => {

                expect( liveReload ).to.have.property('path') ;

            } ) ;

            it('should be null `path`' , () => {

                assert.isNull( liveReload.path ) ;

            } ) ;

            it('should \\throw TypeError' , () => {

                try {

                    liveReload.path = 42;

                    throw 'have not throw TypeError' ;
                } catch( TypeError ) {
                    // ok!
                }

            } ) ;

        } ) ;

        /**
         * @todo test setter property
         */
        describe('test `viewDir`' , () => {

            it('should be contains an property `viewsDir`' , () => {

                expect( liveReload ).to.have.property('viewsDir') ;

            } ) ;

            it('should be null `viewsDir`' , () => {

                assert.isNull( liveReload.viewsDir ) ;

            } ) ;

            it('should \\throw TypeError' , () => {

                try {

                    liveReload.viewsDir = 42 ;
                    throw 'have not throw TypeError' ;

                } catch( TypeError ) {
                    // ok !
                }

            } ) ;

        } ) ;

        describe('test `virtualDir`' , () => {

            it('should be contains an property `virtualDir`' , () => {

                expect( liveReload ).to.have.property('virtualDir') ;

            } ) ;

            it('should be an string `viewDir`' , () => {

                assert.isString( liveReload.virtualDir ) ;

            } ) ;

            it('should \\throw TypeError' , () => {

                try {

                    liveReload.virtualDir = 42 ;
                    throw 'have not throw TypeError' ;

                } catch( TypeError ) {
                    // ok !
                }

            } ) ;

        } ) ;

        describe('test `staticDir`' , () => {

            it('should be contains an property `staticDir`' , () => {

                expect( liveReload ).to.have.property('staticDir') ;

            } ) ;

            it('should be an string `staticDir`' , () => {

                assert.isString( liveReload.staticDir ) ;

            } ) ;

            it('should \\throw TypeError' , () => {

                try {

                    liveReload.staticDir = 42 ;
                    throw 'have not throw TypeError' ;

                } catch( TypeError ) {
                    // ok !
                }

            } ) ;

        } ) ;


        describe('test `assets`' , () => {

            it('should contains an property `assets`' , () => {

                expect( liveReload ).to.have.property('assets') ;

            } ) ;

            it('should be an object `assets`' , () => {

                assert.isObject( liveReload.assets ) ;

            } ) ;

            it('should be have two properties with empty array values' , () => {

                expect( liveReload.assets ).to.have.property('scripts') ;
                expect( liveReload.assets ).to.have.property('styles') ;

                assert.isArray( liveReload.assets.scripts ) ;
                assert.isArray( liveReload.assets.styles ) ;

                expect( liveReload.assets.styles ).to.lengthOf( 0 ) ;
                expect( liveReload.assets.scripts ).to.lengthOf( 0 ) ;

            }  ) ;

        } ) ;

        describe('test `watchers`' , () => {

            it('should contains an property `asset` with empty array' , () => {

                expect( liveReload ).to.have.property( 'watchers' ) ;

                assert.isArray( liveReload.watchers ) ;

                expect( liveReload.watchers ).to.lengthOf( 0 ) ;

            } ) ;

        } ) ;

        describe('test `lastReq`' , () => {

            it('sould contains `lastReq` property' , () => {

                expect( liveReload ).to.have.property( 'lastReq' ) ;

                assert.isNull( liveReload.lastReq ) ;

            } ) ;

        } ) ;

        /**
         * @todo re-factoring `done` method :'(
         */
        describe('test `done`' , () => {

            it('should contains an attribute `done`' , () => {

                expect( liveReload ).to.have.property( 'done' ) ;

            } ) ;

            it('should be an method `done`' , () => {

                assert.isFunction( liveReload.done ) ;

            } ) ;

            it('should be return void' , () => {

                assert.isUndefined( liveReload.done() ) ;

            } ) ;

        } ) ;

    } ) ;

} );
