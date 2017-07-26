const bitcore = require('bitcore-lib')
const Networks = bitcore.Networks
var tpk = new bitcore.PrivateKey(bitcore.Networks.testnet);
var pk = new bitcore.PrivateKey(bitcore.Networks.livenet);
key = {
    key: pk,
    wif: pk.toWIF(),
    pub: pk.toPublicKey().toString('hex'),
    address: pk.toAddress().toString()
}
tkey = {
    key: tpk,
    wif: tpk.toWIF(),
    pub: tpk.toPublicKey().toString('hex'),
    address: tpk.toAddress().toString()
}
console.log({mainnet:key,testnet:tkey})