Weighted Round Robin
==========

A simple weighted round robin load balance module.
Algorithm is similar to Nginx.

Install:

    npm install weighted-round-robin

Usage:

    var Peers = require('weighted-round-robin');

    var peers = new Peers();

    peers.add({
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

    // many more


    for(var i = 0; i < 20 ; i++ ){
      console.info(peers.get().server);
    }
