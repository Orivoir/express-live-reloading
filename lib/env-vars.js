const
    fs = require('fs')
    ,path  = require('path')
;

process.liveReload = {

    reloadEmitter: require('./reload-emitter')()

    ,logs: require('./chalk-color')

    ,_devUse: false
    ,get devUse() {

        return this._devUse ;
    }
    ,set devUse(val) {

        this._devUse = !!val;
    }

    ,_clientDir: null
    ,get clientDir() {

        return this._clientDir ;
    }
    ,set clientDir( val ) {

        clientDir = val;
        this._clientDir = val;

        if( typeof clientDir !== "string" ) {

            throw new TypeError('clientDir should be an string') ;
        }
    }

    ,_path: null
    ,get path() {

        return this._path;
    }
    ,set path( val ) {

        if( !!this.viewsDir ) {

            val = path.join(this.viewsDir , val  ) ;
        }

        this.logs.info( 'path render : ' + val );

        if( typeof val === 'string' ) {

            if( !path.isAbsolute( val ) ) {

                val = path.join( clientDir  , val ) ;
            }

            if( fs.existsSync( val ) ) {

                this._path = val ;

            } else {

                console.log('live reload path render directory not found with: ' , val ) ;
                throw 'please check you call method `liveReload`' ;
            }

        } else {

            throw new TypeError('path should be an string') ;
        }

    }

    ,_viewsDir: null
    ,get viewsDir() {

        return this._viewsDir;
    }
    ,set viewsDir( val ) {

        if( typeof val === 'string' ) {

            const absolutePath = path.join( clientDir , val ) ;

            if( fs.existsSync( absolutePath ) ) {

                this._viewsDir = val ;

            } else {

                console.log( 'live reload views directory not found with: ' , absolutePath );
                throw 'please check you call method `views`' ;

            }

        } else {
            throw new TypeError('views directory bust be an string value , please go read README.md');
        }
    }

    ,_virtualDir: ""
    ,get virtualDir() {

        return this._virtualDir ;
    }
    ,set virtualDir( val ) {

        this._virtualDir = typeof val === 'string' ? val: null;

        if( !this._virtualDir ) {
            throw new TypeError('live reaload argument error for virtual directory please go read README.md') ;
        }
    }

    ,_staticDir: ""
    ,get staticDir() {
        return this._staticDir ;
    }
    ,set staticDir( val ) {

        if( typeof val === 'string' ) {

            const absolutePath = path.join( clientDir , val ) ;

            if( fs.existsSync( absolutePath ) ) {

                this._staticDir = val ;

            } else {
                // path not found
                console.log("live reloading static path not found with : " , absolutePath );
                throw "please check you call of method `static`";
            }

        } else{
            // path not an string
            throw new TypeError("static directory bust be an string please check you call of method `static`");
        }
    }

    ,assets: {
        scripts: []
        ,styles: []
    }
    ,watchers: []
    ,lastReq: null

    ,toolbar: false

    ,pathRenderNotFound: require('./path-render-not-found')

    ,pathRenderFound: require('./path-render-found')()

    ,addWatcher: require('./add-watcher')

    ,buildCloseWatchers: require('./build-close-watchers'),

    /**
     * @method watchAssetStatus receveid status watch asset and call finaly executer
     * @param {boolean} success status watch asset
     * @param {string} absolutePath path of asset
     * @param {string} relativeSource relative path ( from root web project client ) asset
     */
    watchAssetStatus( success, absolutePath, relativeSource ) {

        const caller = './watch-asset-' + ( success ? 'success' : 'fail' ) ;

        require( caller )( absolutePath , relativeSource ) ;

        return this ;
    } ,

    watcherClosesSuccess: require('./watchers-close.success')()
    ,watcherClosesFail: require('./watchers-close-fail')

    ,tryAsset: require('./try-asset')()

    ,done() {

        Promise
            .all( this.buildCloseWatchers() )
            .then( this.watcherClosesSuccess )
            .catch( this.watcherClosesFail )
        ;

    }

} ;
