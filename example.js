'use strict';

var Peers = require('./Peers');

var peers = new Peers();


var first = peers.add({
  server:"192.168.1.1:80",
  weight:90
});

peers.add({
  server:"192.168.1.2:80",
  weight:10
});

peers.add({
  server:"192.168.1.3:80",
  weight:10
});

peers.add({
  server:"192.168.1.4:80",
  weight:10
});

peers.add({
  server:"192.168.1.5:80",
  weight:10
});

peers.add({
  server:"192.168.1.6:80",
  weight:10
});

peers.add({
  server:"192.168.1.7:80",
  weight:10
});



for(var i = 0; i < 20 ; i++ ){
  console.info(peers.get().server);
}

peers.remove(first);

peers.remove(function(peer){
	return peer.server === '192.168.1.6:80';
});

console.info("-------");

for(var i = 0; i < 50 ; i++ ){
  console.info(peers.get().server);
}
