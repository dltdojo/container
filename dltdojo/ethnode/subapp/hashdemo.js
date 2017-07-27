const ethUtils = require('ethereumjs-util')
const bitcore = require('bitcore-lib')
const Base58 = bitcore.encoding.Base58
const PrivateKey = bitcore.PrivateKey
const BN = bitcore.crypto.BN
const sha3_256 = require('js-sha3').sha3_256;
// https://github.com/ethereumjs/ethereumjs-util
const msg = 'abc'

function calcHash256() {
    // OP_HASH256 https://en.bitcoin.it/wiki/Script
    // https://en.bitcoin.it/wiki/Genesis_block
    // https://bitcoin.stackexchange.com/questions/11076/test-cases-for-hash-algorithm-anywhere
    const GenesisBlockHeaderHex = '0100000000000000000000000000000000000000000000000000000000000000000000003BA3EDFD7A7B12B27AC72C3E67768F617FC81BC3888A51323A9FB8AA4B1E5E4A29AB5F49FFFF001D1DAC2B7C'
    // printed in little-endian
    // GetHash() = 0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
    // https://blockchain.info/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
    var hash256 = ethUtils.sha256(ethUtils.sha256(Buffer.from(GenesisBlockHeaderHex, 'hex')))
    return { msg: GenesisBlockHeaderHex, hash: hash256.toString('hex') }
}

function calcHash160() {
    // hash160(d) = RIPEMD-160(SHA-256(d)) Bytes and hashes http://davidederosa.com/basic-blockchain-programming/bytes-and-hashes/
    // OP_HASH160 Script - Bitcoin Wiki https://en.bitcoin.it/wiki/Script
    // LBC::Server https://lbc.cryptoguru.org/about
    // address = [Version Byte (1)][Hash 160 (20)][Checksum (4)] https://bitcoin.stackexchange.com/questions/50876/difference-between-public-bitcoin-address-and-hash-160-address
    // saracen/bitcoin-all-key-generator: directory.io without the latency https://github.com/saracen/bitcoin-all-key-generator
    // 0000000000000000000000000000000000000000000000000000000000000001 1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm 1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH
    // 0000000000000000000000000000000000000000000000000000000000000002 1LagHJk2FyCV2VzrNHVqg3gYG4TSYwDV4m  1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP
    // 0000000000000000000000000000000000000000000000000000000000000003 1NZUP3JAc9JkmbvmoTv7nVgZGtyJjirKV1 1CUNEBjYrCn2y1SdiUMohaKUi4wpP326Lb
    // Base58Check encoding - Bitcoin Wiki https://en.bitcoin.it/wiki/Base58Check_encoding
    // https://github.com/bitpay/bitcore-lib/blob/master/test/encoding/base58.js

    var ppk = new PrivateKey(new BN(1))
    var ppkpub = ppk.toPublicKey().toString()
    var address = ppk.toAddress().toString()
    var hash160 = ethUtils.ripemd160(ethUtils.sha256(Buffer.from(ppkpub, 'hex'))).toString('hex')
    return {
        privateKey: ppk.toString(),
        publicKey: ppk.toPublicKey().toString(),
        hash: hash160.toString('hex'),
        address: address,
        base58decode: Base58.decode(address).toString('hex')
    }
}

function calcKeccakEthAddress(){
    
    // accounts - How are ethereum addresses generated? - Ethereum Stack Exchange https://ethereum.stackexchange.com/questions/3542/how-are-ethereum-addresses-generated
    // Private Key: A randomly selected positive integer (represented as a byte array of length 32 in big-endian form) in the range [1, secp256k1n − 1].
    // Take the Keccak-256 hash of the public key.
    // Take the last 40 characters / 20 bytes of this public key (Keccak-256). 
    var privKey = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001','hex')
    var pubKey = ethUtils.privateToPublic(privKey)
    var keccak256 = ethUtils.sha3(pubKey)
    var address = ethUtils.publicToAddress(pubKey)
    // Rename/alias sha3 to minimize confusion with SHA-3 standard · Issue #59 https://github.com/ethereum/EIPs/issues/59
    // capitals-based checksum
    // https://ethereum.stackexchange.com/questions/267/why-dont-ethereum-addresses-have-checksums
    // https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js#L440
    return {
        privateKey: privKey.toString('hex'),
        publicKey: pubKey.toString('hex'),
        keccak256: keccak256.toString('hex'),
        address: address.toString('hex'),
        checksumAddress: ethUtils.toChecksumAddress(address.toString('hex'))
    }
}

// https://zh.wikipedia.org/wiki/SHA-3
// https://www.di-mgt.com.au/sha_testvectors.html

// SHA-256	ba7816bf 8f01cfea 414140de 5dae2223 b00361a3 96177a9c b410ff61 f20015ad
// SHA-3-256	3a985da74fe225b2 045c172d6bd390bd 855f086e3e9d525b 46bfe24511431532

// The RIPEMD-160 page http://homes.esat.kuleuven.be/~bosselae/ripemd160.html
// RIPMD160 	8eb208f7e05d987a9b044a8e98c6b087f15a0bfc

var result = {
    url: "https://github.com/dltdojo/container/tree/master/dltdojo/ethnode/subapp",
    sha256: { msg: msg, hash: ethUtils.sha256(msg).toString('hex') },
    ripmd160: { msg: msg, hash: ethUtils.ripemd160(msg).toString('hex') },
    keccak256: { msg: msg, hash: ethUtils.sha3(msg).toString('hex') },
    sha3_256: { msg: msg, hash: sha3_256(msg) },
    hash256: calcHash256(),
    hash160: calcHash160(),
    ethaddress:calcKeccakEthAddress()
}

console.log(JSON.stringify(result, null, 2))
