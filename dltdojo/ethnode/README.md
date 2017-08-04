### dltdojo/ethnode

```
$ docker build -t dltdojo/ethnode:6.a.2 .

$ docker-compose up -d ethnode2
Creating ethnode_ethnode2_1
$ docker-compose exec ethnode2 bash
bash-4.3# geth attach
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
coinbase: 0x531cf383db443f246fd094c578a72f7a12903af7
at block: 2 (Fri, 04 Aug 2017 05:20:21 UTC)
 datadir: /root/.ethereum
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0
> web3.version
{
  api: "0.18.1",
  ethereum: "0x3f",
  network: "1",
  node: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
  whisper: "5.0",
  getEthereum: function(callback),
  getNetwork: function(callback),
  getNode: function(callback),
  getWhisper: function(callback)
}
> eth.accounts
["0x531cf383db443f246fd094c578a72f7a12903af7"]
> exit

bash-4.3# node
> var Web3 = require('web3');
> var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> web3.version
'1.0.0-beta.15'
> web3.currentProvider
HttpProvider { host: 'http://localhost:8545', timeout: 0, connected: false }
> web3.eth.getAccounts().then(console.log)
Promise {
  _bitField: 0,
  _fulfillmentHandler0: undefined,
  _rejectionHandler0: undefined,
  _promise0: undefined,
  _receiver0: undefined }
> [ '0x531CF383DB443f246FD094c578a72f7a12903AF7' ]
> web3.eth.
web3.eth.__defineGetter__          web3.eth.__defineSetter__
web3.eth.__lookupGetter__          web3.eth.__lookupSetter__
web3.eth.__proto__                 web3.eth.constructor
web3.eth.hasOwnProperty            web3.eth.isPrototypeOf
web3.eth.propertyIsEnumerable      web3.eth.toLocaleString
web3.eth.toString                  web3.eth.valueOf

web3.eth.defaultAccount            web3.eth.defaultBlock

web3.eth.BatchRequest              web3.eth.Contract
web3.eth.Iban                      web3.eth._provider
web3.eth._requestManager           web3.eth.abi
web3.eth.accounts                  web3.eth.call
web3.eth.clearSubscriptions        web3.eth.compile
web3.eth.currentProvider           web3.eth.estimateGas
web3.eth.extend                    web3.eth.getAccounts
web3.eth.getBalance                web3.eth.getBlock
web3.eth.getBlockNumber            web3.eth.getBlockTransactionCount
web3.eth.getBlockUncleCount        web3.eth.getCode
web3.eth.getCoinbase               web3.eth.getCompilers
web3.eth.getGasPrice               web3.eth.getHashrate
web3.eth.getPastLogs               web3.eth.getProtocolVersion
web3.eth.getStorageAt              web3.eth.getTransaction
web3.eth.getTransactionCount       web3.eth.getTransactionFromBlock
web3.eth.getTransactionReceipt     web3.eth.getUncle
web3.eth.getWork                   web3.eth.givenProvider
web3.eth.isMining                  web3.eth.isSyncing
web3.eth.net                       web3.eth.personal
web3.eth.providers                 web3.eth.sendSignedTransaction
web3.eth.sendTransaction           web3.eth.setProvider
web3.eth.sign                      web3.eth.signTransaction
web3.eth.submitWork                web3.eth.subscribe

> .exit

$ docker-compose stop

```
### push image
```
$ docker push dltdojo/ethnode:6.a.2
```

* Create full Ethereum wallet, keypair and address https://kobl.one/blog/create-full-ethereum-keypair-and-address/
* ethereumjs/keythereum: Create, import and export Ethereum keys https://github.com/ethereumjs/keythereum
* ethereumjs/ethereumjs-util: A collection of utility functions for Ethereum https://github.com/ethereumjs/ethereumjs-util
* ConsenSys/eth-lightwallet: Lightweight JS Wallet for Node and the browser  https://github.com/ConsenSys/eth-lightwallet
* trufflesuite/truffle: The most popular Ethereum development framework https://github.com/trufflesuite/truffle
* ethereumjs/testrpc: Fast Ethereum RPC client for testing and development https://github.com/ethereumjs/testrpc
* ethereum/web3.js: Ethereum JavaScript API https://github.com/ethereum/web3.js/
