// bitpay/bitcore-lib: A pure and powerful JavaScript Bitcoin library https://github.com/bitpay/bitcore-lib
const bitcore = require('bitcore-lib')

// Pay-to-script-hash (P2SH) http://chimera.labs.oreilly.com/books/1234000001802/ch05.html#p2sh
// https://en.bitcoin.it/wiki/Pay_to_script_hash
// https://github.com/bitpay/bitcore-lib/blob/master/lib/script/script.js
function bitcoinP2SH() {
    // 3 OP_ADD 5 OP_EQUAL
    var redeemScript = new bitcore.Script()
    redeemScript.add('OP_3')
        .add("OP_ADD")
        .add('OP_5')
        .add("OP_EQUAL")
    var outScript = redeemScript.toScriptHashOut()
    var p2shAddress = outScript.toAddress()
    var unlockScript = new bitcore.Script()
    unlockScript.add('OP_2')
    return {
        verify: bitcore.Script.Interpreter().verify(unlockScript, redeemScript),
        unlockScriptAsm: unlockScript.toASM(),
        redeemScriptAsm: redeemScript.toASM(),
        outScriptAsm: outScript.toASM(),
        p2sh: p2shAddress,
        address: p2shAddress.toString()
    }
}

// Bitcore Playground https://bitcore.io/playground/#/multisig
// development - How will multisig addresses work? - Bitcoin Stack Exchange https://bitcoin.stackexchange.com/questions/6100/how-will-multisig-addresses-work
// Bitcoin multisig the hard way: Understanding raw P2SH multisig transactions http://www.soroushjp.com/2014/12/20/bitcoin-multisig-the-hard-way-understanding-raw-multisignature-bitcoin-transactions/
function bitcoinMultiSig() {
    var PrivateKey = bitcore.PrivateKey
    var Script = bitcore.Script
    var Address = bitcore.Address
    var privateKeys = [new PrivateKey(), new PrivateKey(), new PrivateKey()]
    var publicKeys = privateKeys.map((key) => { return key.toPublicKey() })
    var addresses = privateKeys.map((key) => { return key.toAddress() })
    var requiredSignatures = 2
    var address = new Address(publicKeys, requiredSignatures)
    var script =  new Script(address)
    // OP_HASH160 <20-byte hash of redeem script> OP_EQUAL
    var redeemScript = Script.buildMultisigOut(publicKeys, requiredSignatures)
    // 2 PK1 PK2 PK3 3 OP_CHECKMULTISIG
    return {
        p2sh: address,
        script: script.toASM(),
        redeemScript: redeemScript.toASM(),
        multiSigAddr: address.toString(),
        privateKeys: privateKeys,
        publicKeys: publicKeys,
        addresses: addresses
    }
}

var result = {
    url: "https://github.com/dltdojo/container/tree/master/dltdojo/ethnode/subapp",
    bitcoinMultiSig: bitcoinMultiSig(),
    bitcoinP2SH: bitcoinP2SH()
}

console.log(JSON.stringify(result, null, 2))

//  contract design - How can I create a multisignature address on Ethereum? - Ethereum Stack Exchange
//  https://ethereum.stackexchange.com/questions/6/how-can-i-create-a-multisignature-address-on-ethereum