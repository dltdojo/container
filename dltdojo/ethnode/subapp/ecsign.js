const ethUtils = require('ethereumjs-util')
const secp256k1 = require('secp256k1')
// ethUtils https://github.com/ethereumjs/ethereumjs-util
// secp256k1 https://github.com/cryptocoinjs/secp256k1-node


var result = {
    url: "https://github.com/dltdojo/container/tree/master/dltdojo/ethnode/subapp"
}

console.log(JSON.stringify(result, null, 2))

// 
// only low-S signatures https://github.com/hyperledger/fabric/blob/master/bccsp/sw/ecdsa.go#L39