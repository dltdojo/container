// Merkle tree - Wikipedia https://en.wikipedia.org/wiki/Merkle_tree
// Mastering Bitcoin http://chimera.labs.oreilly.com/books/1234000001802/ch07.html#merkle_trees
// Tierion/merkle-tools: Tools for creating Merkle trees, generating merkle proofs, and verification of merkle proofs. https://github.com/Tierion/merkle-tools
const MerkleTools = require('merkle-tools')
const ethUtil = require('ethereumjs-util')
const Tx = require('ethereumjs-tx')
const Account = require('ethereumjs-account')
const Trie = require('merkle-patricia-tree')
const rlp = ethUtil.rlp
const BN = require('bn.js')
// curl "https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true" -o block0x10d4f.json
const ethBlockJsonRpc = require('./block0x10d4f.json')

function merkleStringArray(treeOptions, stringArray) {
    var merkleTools = new MerkleTools(treeOptions)
    merkleTools.addLeaves(stringArray, true)
    var doubleHash = false
    merkleTools.makeTree(doubleHash)
    return {
        hashType: treeOptions.hashType,
        doubleHash: doubleHash,
        merkleroot: merkleTools.getMerkleRoot().toString('hex'),
        proofs: toProofs(merkleTools, stringArray)
    }
}

function toProofs(merkleTools, targetArray) {
    return targetArray.map((e, i, a) => {
        var proof = merkleTools.getProof(i)
        return { target: e, proof: proof }
    })
}

function hexEndianReverse(targetHex) {
    return targetHex.match(/.{2}/g).reverse().join('')
}

// Glossary | Merkle Root http://learnmeabitcoin.com/glossary/merkle-root
// Could SPV Support a Billion Bitcoin Users? Sizing up a Scaling Claim - CoinDesk https://www.coindesk.com/spv-support-billion-bitcoin-users-sizing-scaling-claim/
// jorgezaccaro/merkle-bitcoin: Bitcoin-style merkle root generation. https://github.com/jorgezaccaro/merkle-bitcoin
// Endianess https://en.bitcoin.it/wiki/Block_hashing_algorithm
function bitcoinMerkleRoot(txidArray) {
    var merkleTools = new MerkleTools({ hashType: 'SHA256' })
    var doubleHash = true
    var targetArray = txidArray.map((e, i, a) => {
        return hexEndianReverse(e)
    })
    merkleTools.addLeaves(targetArray)
    merkleTools.makeBTCTree(doubleHash)
    return {
        merkleroot: hexEndianReverse(merkleTools.getMerkleRoot().toString('hex')),
        proofs: toProofs(merkleTools, targetArray)
    }
}

// 
// Block #1 https://blockchain.info/block/00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048
// Merkle Root 0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098
// txid 0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098
var btcHeight1 = bitcoinMerkleRoot(['0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098'])


// TEST CASE: 4 txs in Bitcoin Block #100000 https://blockchain.info/block/000000000003ba27aa200b1cecaad478d2b00432346c3f1f3986da1afd33e506
// Merkle Root f3e94742aca4b5ef85488dc37c06c3282295ffec960994b2c0d5ac2a25a95766
var btcHeight100000 = bitcoinMerkleRoot(['8c14f0db3df150123e6f3dbbf30f8b955a8249b62ac1d1ff16284aefa3d06d87',
    'fff2525b8931402dd09222c50775608f75787bd2b87e56995a7bdd30f79702c4', '6359f0868171b1d194cbee1af2f16ea598ae8fad666d9b012c8ed2b79a236ec4', 'e9a66845e05d5abc0ad04ec80f774a7e585c6e8db975962d069a522137b80c1d'])


// Merkling in Ethereum - Ethereum Blog https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/
// Patricia Tree · ethereum/wiki Wiki https://github.com/ethereum/wiki/wiki/Patricia-Tree
// Merkle Patricia Tree (MPT) 树详解 - 风之舞555 - 博客园 http://www.cnblogs.com/fengzhiwu/p/5584809.html
// stateRoot(Merkle Patricia Trie), transactionsRoot(Merkle tree), receiptsRoot (Merkle tree)
// Radix tree - Wikipedia https://en.wikipedia.org/wiki/Radix_tree
// There is one global state trie, and it updates over time. In it, a path is always: sha3(ethereumAddress) and a value is always: rlp(ethereumAccount). 
// More specifically an ethereum account is a 4 item array of [nonce,balance,storageRoot,codeHash].
//
// blockchain - Ethereum block architecture - Ethereum Stack Exchange https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture/
// ethereumjs/merkle-patricia-tree: https://github.com/ethereumjs/merkle-patricia-tree
// eth-proof https://www.npmjs.com/package/eth-proof
// Exploring Ethereum's state trie with Node.js https://wanderer.github.io/ethereum/nodejs/code/2014/05/21/using-ethereums-tries-with-node/
// https://github.com/ethereumjs/ethereumjs-block/blob/master/index.js

function ethTransactionsRoot() {
    var transactionsRoot = ethBlockJsonRpc.result.transactionsRoot
    var transactions = ethBlockJsonRpc.result.transactions
    //console.log(transactionsRoot)
    //console.log(transactions)
    var txTrie = new Trie()

    // tx.serialize()
    // https://github.com/ethereumjs/ethereumjs-tx/blob/master/index.js#L107
    // https://github.com/ethereumjs/ethereumjs-util/blob/master/index.js#L573
    // rlp.encode(self.raw)

    // [English] RLP · ethereum/wiki Wiki https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-RLP
    // The string "dog" = [ 0x83, 'd', 'o', 'g' ]
    // The list [ "cat", "dog" ] = [ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]
    // The empty string ('null') = [ 0x80 ]
    // The empty list = [ 0xc0 ]

    // Transactions Trie
    // path : rlp(transactionIndex). transactionIndex is its index within the block it's mined.
    transactions.forEach((raw, i, a) => {
        var tx = new Tx(raw)
        txTrie.put(rlp.encode(i), tx.serialize())
    })
    // console.log(txTrie.root.toString('hex'))
    // blockchain - Relationship between Transaction Trie and Receipts Trie - Ethereum Stack Exchange https://ethereum.stackexchange.com/questions/5888/relationship-between-transaction-trie-and-receipts-trie
    return {
        transactionsRoot: transactionsRoot,
        transactions: transactions,
        txtrieroot: txTrie.root.toString('hex')
    }
}

// blockchain - Ethereum block architecture - Ethereum Stack Exchange https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture/757
// path : sha3(ethereumAddress)
// value : rlp(ethereumAccount)
// ethereumAccount = [nonce,balance,storageRoot,codeHash]
function ethStateRoot() {
    var stateTrie = new Trie()
    var privKey1 = Buffer.from('0000000000000000000000000000000000000000000000000000000000000001', 'hex')
    var privKey2 = Buffer.from('0000000000000000000000000000000000000000000000000000000000000002', 'hex')
    var address1 = ethUtil.privateToAddress(privKey1)
    var address2 = ethUtil.privateToAddress(privKey2)

    var account1 = new Account()
    account1.balance = '0xf00000000000000001'
    var account2 = new Account()
    account2.balance = '0xf00000000000000002'
    stateTrie.put(address1, account1.serialize(), (err, val) => {
        stateTrie.put(address2, account2.serialize(), (err, val) => {
            readStateTrie(stateTrie, address1)
            readStateTrie(stateTrie, address2)
            console.log('stateTrie root: ', stateTrie.root.toString('hex'))
        })
    })
    return {
        account1: account1,
        account2: account2,
        address1: address1.toString('hex'),
        address2: address2.toString('hex')
    }
}

function readStateTrie(stateTrie, address) {
    stateTrie.get(address, (err, val) => {
        if (err) {
            console.log(err)
            return
        }
        var account = new Account(val)
        console.log(account.toJSON())
    })
}

var msha1 = merkleStringArray({ hashType: 'SHA1' }, ['a', 'b', 'c', 'd'])
var msha256 = merkleStringArray({ hashType: 'SHA256' }, ['a', 'b', 'c', 'd'])
var msha3_256 = merkleStringArray({ hashType: 'SHA3-256' }, ['a', 'b', 'c', 'd'])

var ethStateRoot = ethStateRoot()

var result = {
    msha1: msha1,
    msha256: msha256,
    msha3_256: msha3_256,
    btc1: btcHeight1,
    btc100000: btcHeight100000,
    ethTxRoot: ethTransactionsRoot(),
    ethStateRoot: ethStateRoot
}

console.log(JSON.stringify(result, null, 2))

// 
// fabric/protocol-spec.md at master · hyperledger-archives/fabric https://github.com/hyperledger-archives/fabric/blob/master/docs/protocol-spec.md#321-blockchain
// 