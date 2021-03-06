document.addEventListener('DOMContentLoaded' , () => {

    if( !(io instanceof Function) ) {
        throw 'io not exists' ;
    }

    const socket = io('/live-reload') ;

    let hostname = document.location.host ;
    let skip = null ;

    const extractDns = source => (
        source.split('://')[1].split('/')[0]
    ) ;

    const checkSend = (source,sourceRelative,type) => {

        const ext = type === 'style' ? 'css':'js';
        const minifiedRegexp = new RegExp('\.(min|(pre-)?prod|dist)\.'+ext+'$') ;

        return !(
            !source ||
            extractDns( source ) !== hostname ||
            skip[type+'s'].includes( sourceRelative ) ||
            minifiedRegexp.test( sourceRelative )
        ) ;

    } ;

    /**
     * emit asset 2 server
     */
    const done = function() {

        const styles = [ ...document.querySelectorAll('link') ].filter( style => (

            checkSend( style.href , style.getAttribute('href') , 'style' )

        ) ).map( style => style.getAttribute('href') ) ;

        const scripts = [ ...document.querySelectorAll('script') ].filter( script => (
            checkSend( script.src , script.getAttribute('src') ,  'script' )
        ) ).map( script => script.getAttribute('src') ) ;

        socket.emit('assets' , {
            styles: styles
            ,scripts: scripts
        } ) ;
    } ;

    socket.on('skip' , assetsSkip => {

        skip = assetsSkip ;

        done() ;
    } ) ;

    socket.on('connect' , () => {

        Toolbar.onReloadStatus( true ) ;
        console.info('%c[live reload] on' , `color:green;background:rgb(0,0,25);padding: 3px 5px;` );

    } ) ;

    socket.on('disconnect' , () => {

        Toolbar.onReloadStatus( false ) ;

        console.warn('%c[live reload] off' , `color:red;background:rgb(0,0,25);padding: 3px 5px;` );

    } ) ;

    socket.on('reload' , () => document.location.reload() ) ;

    socket.on('success watch' , path => {

        Toolbar.onWatch.success( path ) ;

        console.info( path , ' --watched with success' )
    } ) ;

    socket.on('fail watch' , path => {

        Toolbar.onWatch.fail( path ) ;

        console.warn( path , ' fail watch' ) ;
    } ) ;

    socket.on('toolbar show' , status => {

        if( status ) {
            Toolbar.inject(/* 🐱‍👤 */) ;
        } else{
            console.info('you can show an toolbar status for live reloading from you `server.js` use: `liveReload.toolbar( true )` \nand inside you view call `<link rel="stylesheet" href="/toolbar-live-reload.css">` ');
        }

    } ) ;

    /**
     * @constant Toolbar view component state `live reloading` **server app**
     */
    const Toolbar = {

        /**
         * @var {?Node} entryPoint parent node of inject in the **DOM**
         */
        entryPoint: document.querySelector('body') ,

        /**
         * @var {?Node} wrap
         * @description contains **parent node** of render or **null** then *first render* not `inject`
         */
        _wrap: null,
        get wrap() {
            return this._wrap ;
        } ,
        set wrap( val ) {

            this._wrap = ( val instanceof Node ) ? val: null;

            if( !this._wrap ) {
                throw new TypeError('wrap render for Toolbar must be an Node') ;
            }

        } ,

        /**
         * @var {object} state **local state data**
         * @description **default** and **current** `local state` of **Toolbar** component
         */
        state: {
            /**
             * @var {boolean} TCP
             * @description **state** of TCP/IP channel of **server app**
             */
            TCP: null,

            /**
             * @var {array[object<string,boolean>]} files **local state data**
             * @description **state** of files watch
             */
            files: [
                /**
                 * *e.g* :
                 * {
                 *   path: "/views/index.html" ,
                 *   status: true
                 * }
                 */
            ]
        } ,

        /**
         * @method nodeNameBlock
         * @param {string|Node} block
         * @return {string} string
         * @description found parent nodename of string HTML
         */
        nodeNameBlock( block ) {

            if( typeof block !== 'string' && !(block instanceof Node) ) {

                throw new TypeError('arg1 of nodeNameBlock must be an string or an Node') ;

            } else if( block instanceof Node ) {

                return block.nodeName ; // :-)
            }

            const open = block.indexOf('<') ;
            const close = block.indexOf('>') ;

            return block.slice( open + 1 , close ).trim().toLocaleLowerCase() ;
        } ,

        /**
         * @var {string} nodeNameStateView
         * @description nodename parent node of `stateView` **attribute**
         */
        get nodeNameStateView() {

            const {stateView} = this ;

            return this.nodeNameBlock( stateView ) ;
        } ,

        /**
         * @var stateView prototype block view of `state local`
         * @description spec of `render` and default render
         */
        stateView: `
            <section>
                <h2>
                    Live Reloading status
                    <small
                        data-state
                        data-state-key="TCP"
                        data-state-type="boolean"
                    >
                        unknow
                    </small>
                </h2>

                <ul
                    data-prototype='<li> <span data-state data-state-key="path" data-state-type="string"></span> <span data-state data-state-key="status" data-state-type="boolean"></span></li>'

                    data-state
                    data-state-key="files"
                    data-state-type="array[]"
                    data-state-builder="data-prototype"
                >
                </ul>

                <p>
                    develop by
                    <a href="https://orivoir.github.io/profil-reactjs">Gaborieau.S</a>
                    with ❤️ for open source
                </p>
            </section>
        `,

        /**
         * @method setState
         * @param {object} newState diff `locale state`
         * @description upgrade view after change `locale state`
         */
        setState( newState ) {

            const {state} = this ; // current state

            Object.keys( newState ).forEach( attr => (
                // secure affect new local state not exists not erease
                state[ attr ] = newState[ attr ]
            ) ) ;

            this.state = state ;

            if( !this.wrap ) {

                // component not render change local upgrade render reject
                return;
            }

            this.upgradeRender() ;
        } ,

        buildBlock( block ) {

            const nodeName = this.nodeNameBlock( block ) ;

            block = block.replace( `<${nodeName}>` , '' ) ;

            const close = block.lastIndexOf(`</${nodeName}>`) ;

            block = block.slice( 0 , close ) ;

            const wrap = document.createElement( nodeName ) ;

            wrap.innerHTML = block ;

            return wrap ;
        } ,

        /**
         * @var {object} update
         * @description contains methods update DOM associate with `local state`
         */
        get update() {

            const self = this ;

            return {

                /**
                 * @method TCP
                 * @param {boolean} status
                 * @param {Node} node
                 * @return {void} void
                 * @description update node DOM with new `local state` value `status`
                 */
                TCP( status , node ) {

                    if( !(node instanceof Node) ) {

                        throw new TypeError('node update of TCP updater must be an node') ;
                    }

                    node.textContent = ( !!status ) ? 'on': 'off' ;

                    if( !status ) {

                        node.classList.remove('toolbar-express-live-reloading-status-tcp-on') ;
                        node.classList.add('toolbar-express-live-reloading-status-tcp-off') ;

                        node.parentNode.classList.remove('toolbar-express-live-reloading-status-tcp-on') ;
                        node.parentNode.classList.add('toolbar-express-live-reloading-status-tcp-off') ;
                    } else {

                        node.classList.add('toolbar-express-live-reloading-status-tcp-on') ;
                        node.classList.remove('toolbar-express-live-reloading-status-tcp-off') ;

                        node.parentNode.classList.add('toolbar-express-live-reloading-status-tcp-on') ;
                        node.parentNode.classList.remove('toolbar-express-live-reloading-status-tcp-off') ;
                    }
                } ,

                /**
                 * @method files
                 * @param {array} list
                 * @param {Node} node
                 * @return {void} void
                 * @description build items list **files** of `local state`
                 */
                files( list , node ) {

                    if( !(node instanceof Node) ) {

                        throw new TypeError('node update of files updater must be an node') ;
                    }

                    const attrProto = node.getAttribute('data-state-builder') ;
                    const proto = node.getAttribute( attrProto ) ;

                    const wrap = self.buildBlock( proto ) ;

                    list.forEach( file => {

                        this.file( wrap , file ) ;

                        node.appendChild( wrap  ) ;

                    } ) ;

                } ,

                /**
                 * @method file
                 * @param {node} wrap
                 * @param {array} file
                 * @return {void} void
                 * @description build **one** item list **files** of `local state`
                 */
                file( wrap , file ) {

                    const statesWrap = wrap.querySelectorAll('[data-state]') ;

                    statesWrap.forEach( stateWrap => {

                        const associate = stateWrap.getAttribute('data-state-key') ;
                        const typeWrap = stateWrap.getAttribute( 'data-state-type' ) ;

                        if(typeof file[ associate ] === typeWrap ) {

                            this.fileState( {
                                stateValue: file[associate],
                                stateNode: stateWrap
                            } ) ;


                        } else {

                            throw new ReferenceError( `state file ${associate} is not recognize` ) ;
                        }

                    } ) ;
                } ,

                /**
                 * @method fileState
                 * @param {object} param0
                 * @return {void} void
                 * @description update DOM for **one** file item with new `local state`
                 */
                fileState( { stateValue , stateNode } ) {

                    stateNode.textContent = ( typeof stateValue === 'string' ) ? stateValue : ( !!stateValue ) ? 'success' : 'fail' ;

                    if( typeof stateValue === 'boolean' ) {

                        if( stateValue ) {

                            stateNode.classList.add('toolbar-express-live-reloading-status-file-success') ;
                            stateNode.classList.remove('toolbar-express-live-reloading-status-file-fail') ;
                        } else {

                            stateNode.classList.remove('toolbar-express-live-reloading-status-file-success') ;
                            stateNode.classList.add('toolbar-express-live-reloading-status-file-fail') ;
                        }
                    }
                }

            } ;
        } ,

        /**
         * @method upgradeRender
         * @description update `wrap` render for match view with an new `local state`
         */
        upgradeRender() {

            const {
                wrap ,
                state
            } = this ;

            const statesDOM = wrap.querySelectorAll('[data-state]') ;

            [...statesDOM].forEach( stateDOM => {

                const associate = stateDOM.getAttribute('data-state-key') ;

                if( this.update[ associate ] instanceof Function )
                    this.update[ associate ]( state[ associate ] , stateDOM ) ;
                else {
                    // sub state of current state
                    // throw new ReferenceError(`state local "${associate}" is not recognize`) ;
                }

            } ) ;

        } ,

        /**
         * @method onReloadStatus
         * @param {boolean} status state channel TCP/IP of **server app** `live reloading`
         * @description receveid state liveReload and upgrade view
         */
        onReloadStatus( status ) {

            this.setState( {
                TCP: !!status
            } ) ;

        } ,

        /**
         * @var {object} onWatch
         * @description contains `methods` status watch file
         */
        get onWatch() {

            const {state} = this;
            const self = this ;

            return {

                /**
                 * @method fail receveid notif fail watch file
                 * @param {string} path absolute path file fail watch
                 * @description receveid state watch file and upgrade view
                 */
                fail( path ) {

                    self.setState({
                        files: [ ...state.files , {
                            path: path ,
                            status: false
                        } ]
                    }) ;

                } ,

                /**
                 * @method success receveid success watch file
                 * @param {string} path relative path file success watch
                 * @description receveid state watch file and upgrade view
                 */
                success( path ) {

                    self.setState({
                        files: [ ...state.files , {
                            path: path ,
                            status: true
                        } ]
                    }) ;
                }

            } ;
        } ,

        /**
         * @method inject `endpoint` **Toolbar** component
         * @return {void} void
         * @description inject default toolbar view component in the DOM
         */
        inject() {

            const {
                stateView // spec render and default render
                ,entryPoint // parent node of render
            } = this;

            if( entryPoint instanceof Node ) {

                const wrap = this.buildBlock( stateView ) ;

                wrap.id = 'toolbar-express-live-reloading' ;

                this.wrap = wrap ;

                entryPoint.appendChild( wrap ) ;

            } else {

                throw new TypeError('parent node render for Toolbar component not exists') ;
            }
        }

    } ;

} ) ;
