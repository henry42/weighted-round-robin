'use strict';

(function(){
  var Peers = function(){
    this._peerMap = {};
    this._length = 0;
  };

  Peers.prototype.size = function(){
    return this._length;
  };


  Peers.prototype.add = function(peer){
    if( !peer || !peer.server )
      return false;

    var key = peer.server;

    if( !( key in this._peerMap ) ){
      this._length++;
    }

    this._peerMap[key] = this.reset({
      server : peer.server,
      down : peer.down === true,
      weight : peer.weight || 1
    });
  };


  Peers.prototype.remove = function(peer){
    if( !peer || !peer.server )
      return false;

    var key = peer.server;

    if( key in this._peerMap ){
      delete this._peerMap[key];
      this._length--;
      return true;
    }

    return false;
  };

  Peers.prototype.reset = function(peer){
    if( peer instanceof Array ){
      peer.map( Peers.reset , Peers )
      return;
    };

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

      if( peer.down )
        continue;


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
