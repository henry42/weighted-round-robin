'use strict';

var Peers = require('./Peers');

var peers = new Peers();


peers.add({
  host:"192.168.1.1",
  port:"80",
  weight:90
});

peers.add({
  host:"192.168.1.2",
  port:"80",
  weight:10
});

peers.add({
  host:"192.168.1.3",
  port:"80",
  weight:10
});

peers.add({
  host:"192.168.1.4",
  port:"80",
  weight:10
});

peers.add({
  host:"192.168.1.5",
  port:"80",
  weight:10
});

peers.add({
  host:"192.168.1.6",
  port:"80",
  weight:10
});

peers.add({
  host:"192.168.1.7",
  port:"80",
  weight:10
});



for(var i = 0; i < 20 ; i++ ){
  console.info(peers.get().host);
}

peers.remove({host:"192.168.1.1",port:"80"});

console.info("-------");

for(var i = 0; i < 50 ; i++ ){
  console.info(peers.get().host);
}
