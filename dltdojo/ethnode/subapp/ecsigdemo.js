const ethUtils = require('ethereumjs-util')
const secp256k1 = require('secp256k1')
// ethUtils https://github.com/ethereumjs/ethereumjs-util
// secp256k1 https://github.com/cryptocoinjs/secp256k1-node


function secp256k1(){
// get the public key in a compressed format
 var privKey = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001','hex')
const pubKey = secp256k1.publicKeyCreate(privKey)
return {
    privateKey: privKey.toString('hex'),
    publicKeyL pubKey.toString('hex')
}
}

var result = {
    url: "https://github.com/dltdojo/container/tree/master/dltdojo/ethnode/subapp"
}

console.log(JSON.stringify(result, null, 2))

// 
// only low-S signatures https://github.com/hyperledger/fabric/blob/master/bccsp/sw/ecdsa.go#L39