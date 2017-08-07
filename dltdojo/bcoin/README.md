bcoin-org/bcoin: Javascript bitcoin library for node.js and browsers  https://github.com/bcoin-org/bcoin

* "node": ">=7.6.0"
* docker iamge : dltdojo/bcoin

```
$ docker-compose build
$ dcoker-compose exec bcoin bash
bash-4.3# node -v
v8.1.4
bash-4.3# pwd
/opt/ddj
bash-4.3# node blockchain.js
Adding function rhash() {
  return util.revHex(this.hash('hex'));
} to the blockchain.
{ hash: '27cd82f9baa19ba4f78a0f299406ee8b751184ae5c150297fbcb332fd8d76f11',
  height: -1,
  size: 196,
  virtualSize: 196,
  date: '2017-08-07T05:57:34Z',
  version: '20000000',
  prevBlock: '0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206',
  merkleRoot: '0eaf679868d726c04e55f6318e035b71ba6c259e0a0bf140387945d2ba2f5f70',
  commitmentHash: null,
  ts: 1502085454,
  bits: 545259519,
  nonce: 1,
  txs:
   [ { hash: '0eaf679868d726c04e55f6318e035b71ba6c259e0a0bf140387945d2ba2f5f70',
       witnessHash: '0eaf679868d726c04e55f6318e035b71ba6c259e0a0bf140387945d2ba2f5f70',
       size: 115,
       virtualSize: 115,
       value: '50.0',
       fee: '0.0',
       rate: '0.0',
       minFee: '0.00000115',
       height: -1,
       block: null,
       ts: 0,
       date: null,
       index: 0,
       version: 1,
       flag: 1,
       inputs: [Array],
       outputs: [Array],
       locktime: 0 } ] }
Added block!

```