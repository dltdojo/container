const bcoin = require('bcoin').set('regtest');
// Start up a blockchain, mempool, and miner using in-memory
// databases (stored in a red-black tree instead of on-disk).
var chain = new bcoin.chain({ db: 'memory' });
var mempool = new bcoin.mempool({ chain: chain });
var miner = new bcoin.miner({ chain: chain, mempool: mempool });

function generate() {
  // Open the miner (initialize the databases, etc).
  // Miner will implicitly call `open` on chain and mempool.
  miner.open().then(function () {
    // Create a Cpu miner job
    return miner.createJob();
  }).then(function (job) {
    // Mine the block on the worker pool (use mine() for the master process)
    return job.mineAsync();
  }).then(function (block) {
    // Add the block to the chain
    console.log('Adding %s to the blockchain.', block.rhash);
    console.log(block);
    return chain.add(block);
  }).then(function () {
    console.log('Added block!');
  });
}

generate()