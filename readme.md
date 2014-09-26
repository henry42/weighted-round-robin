Weighted Round Robin
==========

A simple weighted round robin load balance module.
Algorithm is similar to Nginx.

##Install:

    npm install weighted-round-robin

##Usage:
Example:

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

###peers.add( object )

returns `id` for the peers, notice that the object will be modified, you'd better clone it if you want to keep the original value.

###peers.get()

returns a peer according to the algorithm.

###peers.reset()

reset all peers' chance. 

###peers.each( fn , context )

iterates over all peers, the `fn` is bound to the `context` object.

###peers.remove( key )

remove the peer.

###peers.remove( fn )

remove the peer when the `fn` returns `true`. 

###peers.size()

return the size of the peers.