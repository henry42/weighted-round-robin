Weighted Round Robin
==========

A simple weighted round robin load balance module.
Algorithm is similar to Nginx.

Usage:

    var Peers = require('weighted-round-robin');

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

    // many more


    for(var i = 0; i < 20 ; i++ ){
      console.info(peers.get().host);
    }
