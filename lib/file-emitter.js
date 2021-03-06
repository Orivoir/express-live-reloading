const EventEmiter = require('events') ;

/**
 * @export class `FileEmitter`
 * @extends EventEmiter
 */
module.exports = class extends EventEmiter {

    constructor(args) {

        super( args ) ;

        this.getListeners = [] ;

        this.notDouble = false;

        this.worker = {} ;
    }

    get notDouble() {

        return this._notDouble ;
    }

    set notDouble( val ) {

        this._notDouble = !!val ;
    }

    isAlreadyExists() {

        const {eventName} = this.worker ;

        return !!this.getListeners.find( listener => (
            listener.eventName === eventName
        ) ) ;
    }

    getListenersByName( eventName ) {

        return this.getListeners.filter( listener => (
            listener.eventName === eventName
        ) ) ;
    }

    removeListener( eventName , cb ) {

        this.getListeners = this.getListeners.filter( listener => listener.eventName !== eventName ) ;

        super.removeListener( eventName , cb ) ;
    }

    /**
     * @method on
     * @surcharge `on` from `EventEmitter` for add checker event already exists
     * @param {string} eventName
     * @param {Function} cb
     */
    on( eventName , cb ) {

        this.worker = {
            eventName: eventName
            ,cb: cb
        } ;

        if( this.notDouble ) {

            if ( this.isAlreadyExists() ) {

                if( !!process.liveReload.devUse ) {
                    process.liveReload.logs.warn( 'reject FileEvent event because already exists with:' + eventName );
                }

                return false;
            }
        }

        this.getListeners.push( { eventName: eventName , cb: cb} ) ;

        super.on( eventName  , cb ) ;
    }


} ;

