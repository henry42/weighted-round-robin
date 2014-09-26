'use strict';

(function(){

    var _uniqueId = 1;

    function uniqueId(){
        return 'peer_' + (_uniqueId++);
    }

    var Peers = function(){
        this._peerMap = {};
        this._length = 0;
    };

    Peers.prototype.size = function(){
        return this._length;
    };


    Peers.prototype.add = function(peer){
        if( !peer )
            return false;

        var key = "id" in peer ? peer["id"] :  ( peer.id = uniqueId() );

        if( !( key in this._peerMap ) ){
            this._length++;
        }

        this._peerMap[key] = this._reset(peer);

        return key;
    };


    Peers.prototype.remove = function( key ){


        if( typeof key === 'function'){

            this.each( function( peer ){
                if( key( peer ) === true ){
                    this.remove( peer.id );
                }
            },this);

            return;
        }

        if( key in this._peerMap ){
            delete this._peerMap[key];
            this._length--;
        }
    };


    Peers.prototype.each = function( fn , context ){
        for( var _key in this._peerMap ){
            fn.call( context , this._peerMap[_key] )
        }
    };

    Peers.prototype.reset = function(){
        this.each( function( peer ){
            this._reset( peer )
        },this);
    };

    Peers.prototype._reset = function(peer){
        if( peer instanceof Array ){
            peer.map( Peers._reset , Peers )
            return;
        };

        peer.weight = peer.weight || 10;
        peer.currentWeight = peer.weight;
        peer.effectiveWeight = peer.weight;

        return peer;
    };


    Peers.prototype.get = function(){

        var bestPeer,peer,peerKey;

        if( this._length === 0 )
            return null;

        if( this._length === 1 ){
            for( peerKey in this._peerMap )
                break;
            return this._peerMap[peerKey];
        }

        var totalEffectiveWeight = 0;

        for( peerKey in this._peerMap ){
            peer = this._peerMap[peerKey];

            totalEffectiveWeight += peer.effectiveWeight;
            peer.currentWeight += peer.effectiveWeight;

            if( peer.effectiveWeight < peer.weight )
                peer.effectiveWeight++;

            if( !bestPeer || bestPeer.currentWeight < peer.currentWeight )
                bestPeer = peer;

        }

        if( bestPeer )
            bestPeer.currentWeight -= totalEffectiveWeight;

        return bestPeer;
    }

    module.exports = Peers;
})();
