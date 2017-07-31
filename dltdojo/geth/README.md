## 以太坊節點

以太坊節點實做：

* ethereum/go-ethereum https://github.com/ethereum/go-ethereum
* paritytech/parity https://github.com/paritytech/parity

### 現有 ethereum/client-go 映像檔

* ethereum/client-go - Docker Hub https://hub.docker.com/r/ethereum/client-go/

### 啟動節點連接比以太坊網路

VM環境+Docker可能有時間同步問題

```
$ pwd
/home/dltdojo/smb/container/dltdojo/geth
$ docker run -it --rm ethereum/client-go --fast --cache=512

INFO [07-21|13:25:15] Imported new block headers               count=192 elapsed=968.477ms number=192 hash=723899…123390 ignored=0
INFO [07-21|13:25:15] Imported new block receipts              count=2   elapsed=177.543µs number=2   hash=b495a1…4698c9 ignored=0

```

### 啟動節點連接比以太坊測試網路Rinkeby

```
$ docker run -it --rm -v $(pwd)/rinkeby:/root/.rinkeby dltdojo/geth:1.6.7 ./rinkeby.sh
Ctrl + C
$ tree -h rinkeby
rinkeby
├── [4.0K]  geth
│   ├── [4.0K]  chaindata
│   │   ├── [ 81K]  000001.log
│   │   ├── [  16]  CURRENT
│   │   ├── [   0]  LOCK
│   │   ├── [ 358]  LOG
│   │   └── [  54]  MANIFEST-000000
│   ├── [4.0K]  lightchaindata
│   │   ├── [ 50K]  000002.ldb
│   │   ├── [6.1M]  000003.log
│   │   ├── [  16]  CURRENT
│   │   ├── [   0]  LOCK
│   │   ├── [1.0K]  LOG
│   │   └── [ 218]  MANIFEST-000004
│   ├── [   0]  LOCK
│   ├── [  64]  nodekey
│   └── [4.0K]  nodes
│       ├── [1.8K]  000001.log
│       ├── [  16]  CURRENT
│       ├── [   0]  LOCK
│       ├── [ 434]  LOG
│       └── [  54]  MANIFEST-000000
└── [4.0K]  keystore [error opening dir]

5 directories, 18 files

```

### 啟動節點連接比以太坊dev模式

```
docker-compose up -d geth
docker-compose exec geth bash
geth attach http://localhost:8545
geth attach
```

log

```
$ docker run -d dltdojo/geth:1.6.7
2db8bba32de7062841fc8b658926f03c33eaff3daaf23c6ae07f698ffe334004

$ docker logs 2db8
WARN [07-13|07:08:16] No etherbase set and no accounts found as default
INFO [07-13|07:08:16] Starting peer-to-peer node               instance=Geth/v1.6.7-stable/linux-amd64/go1.9beta2
INFO [07-13|07:08:16] Allocated cache and file handles         database=/root/.ethereum/geth/chaindata cache=128 handles=1024
INFO [07-13|07:08:16] Writing custom genesis block
INFO [07-13|07:08:16] Initialised chain configuration          config="{ChainID: 1337 Homestead: 0 DAO: <nil> DAOSupport: false EIP150: 0 EIP155: 0 EIP158: 0 Metropolis: 9223372036854775807 Engine: ethash}"
WARN [07-13|07:08:16] Ethash used in test mode
WARN [07-13|07:08:16] Upgrading db log bloom bins
INFO [07-13|07:08:16] Bloom-bin upgrade completed              elapsed=57.337µs
INFO [07-13|07:08:16] Initialising Ethereum protocol           versions="[63 62]" network=1
INFO [07-13|07:08:16] Loaded most recent local header          number=0 hash=e5be92…38f3bc td=131072
INFO [07-13|07:08:16] Loaded most recent local full block      number=0 hash=e5be92…38f3bc td=131072
INFO [07-13|07:08:16] Loaded most recent local fast block      number=0 hash=e5be92…38f3bc td=131072
INFO [07-13|07:08:16] Starting P2P networking
INFO [07-13|07:08:16] started whisper v.5.0
INFO [07-13|07:08:16] HTTP endpoint opened: http://127.0.0.1:8545
INFO [07-13|07:08:16] RLPx listener up                         self="enode://2a9014d7f3e0728147ef9cfaa0570f51be22eea0ecbbe1a70860cfa5c533862192c87bee11d215e80f947078b2562836e1650c808e63aa363b14f64441de7272@[::]:41117?discport=0"
INFO [07-13|07:08:16] IPC endpoint opened: /root/.ethereum/geth.ipc

$ docker exec -it 2db8 bash

bash-4.3# geth attach http://localhost:8545
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
 modules: admin:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 web3:1.0

> web3.version
{
  api: "0.18.1",
  ethereum: "0x3f",
  network: "1",
  node: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
  whisper: undefined,
  getEthereum: function(callback),
  getNetwork: function(callback),
  getNode: function(callback),
  getWhisper: function(callback)
}
> exit
```

### step 1

* Accounts, Transactions, Gas, and Block Gas Limits in Ethereum http://hudsonjameson.com/2017-06-27-accounts-transactions-gas-ethereum/
* Ethereum, Gas, Fuel, & Fees – ConsenSys Media https://media.consensys.net/ethereum-gas-fuel-and-fees-3333e17fe1dc

```
personal.newAccount("pass1")
personal.newAccount("pass2")
loadScript("/opt/geth/gethload.js")
miner.start()
checkAllBalances()
personal.unlockAccount(eth.accounts[0], "pass1", 3600)
personal.unlockAccount(eth.accounts[1], "pass2", 3600)
checkAllBalances()
```

log

```
bash-4.3# geth attach
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0

> personal.newAccount("pass1")
"0xdae529561e9b9786083ed833f66ff63c127f77d0"
> personal.newAccount("pass2")
"0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10"
> loadScript("/opt/geth/gethload.js")
true
> miner.start()
null
> checkAllBalances()
  eth.accounts[0]:      0xdae529561e9b9786083ed833f66ff63c127f77d0      balance: 60 ether
  eth.accounts[1]:      0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10      balance: 0 ether
  Total balance: 60 ether
undefined
> personal.unlockAccount(eth.accounts[0], "pass1", 3600)
true
> personal.unlockAccount(eth.accounts[1], "pass2", 3600)
true
> checkAllBalances()
  eth.accounts[0]:      0xdae529561e9b9786083ed833f66ff63c127f77d0      balance: 65 ether
  eth.accounts[1]:      0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10      balance: 0 ether
  Total balance: 65 ether
```

### step 2

* http://web3js.readthedocs.io/en/1.0/web3-utils.html?highlight=unit

```
checkAllBalances()
txid1 = eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value: web3.toWei(2.1, "ether")})
checkAllBalances()
web3.eth.getTransaction(txid1)
web3.eth.getTransactionReceipt(txid1)
web3.eth.gasPrice
txid2 = eth.sendTransaction({from:eth.accounts[1], to:eth.accounts[0], value: web3.toWei(1.1, "ether"), gasPrice: web3.toWei(20,"gwei")})
checkAllBalances()
web3.eth.getTransaction(txid2)
web3.eth.getTransactionReceipt(txid2)
```

#### log

```
> checkAllBalances()
  eth.accounts[0]:      0xdae529561e9b9786083ed833f66ff63c127f77d0      balance: 315 ether
  eth.accounts[1]:      0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10      balance: 0 ether
  Total balance: 315 ether
undefined
> txid1 = eth.sendTransaction({from:eth.accounts[0], to:eth.accounts[1], value: web3.toWei(2.1, "ether")})
"0xb67507666f231cbe41f512a672b4b055c3284d6a28c519928d5cfd0a5d8c8698"
> checkAllBalances()
  eth.accounts[0]:      0xdae529561e9b9786083ed833f66ff63c127f77d0      balance: 325 ether
  eth.accounts[1]:      0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10      balance: 0 ether
  Total balance: 325 ether
undefined
> web3.eth.getTransaction(txid1)
{
  blockHash: "0xa20b247567e09918313bde8aa323fa53fa8eb8b9765e5f6f657169d9209b6f69",
  blockNumber: 66,
  from: "0xdae529561e9b9786083ed833f66ff63c127f77d0",
  gas: 90000,
  gasPrice: 0,
  hash: "0xb67507666f231cbe41f512a672b4b055c3284d6a28c519928d5cfd0a5d8c8698",
  input: "0x",
  nonce: 0,
  r: "0xaed69279789456114cd0573a2643e83ec07a713cbc41327403b8359c14c779d0",
  s: "0x7a83d10514fdea0838ac1ef143aad02a0d726b97ad1d69c9987f3af15b3c4ae2",
  to: "0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10",
  transactionIndex: 0,
  v: "0xa96",
  value: 2100000000000000000
}
> web3.eth.getTransactionReceipt(txid1)
{
  blockHash: "0xa20b247567e09918313bde8aa323fa53fa8eb8b9765e5f6f657169d9209b6f69",
  blockNumber: 66,
  contractAddress: null,
  cumulativeGasUsed: 21000,
  from: "0xdae529561e9b9786083ed833f66ff63c127f77d0",
  gasUsed: 21000,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  root: "0x4093463b2957f2b8a2f7909f36833f7e6e5dd6bd03fc60b0083c23d46194d901",
  to: "0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10",
  transactionHash: "0xb67507666f231cbe41f512a672b4b055c3284d6a28c519928d5cfd0a5d8c8698",
  transactionIndex: 0
}
> web3.eth.gasPrice
0
> txid2 = eth.sendTransaction({from:eth.accounts[1], to:eth.accounts[0], value: web3.toWei(1.1, "ether"), gasPrice: web3.toWei(20,"gwei")})
"0x016efad818c75a1a2593b6b265de2cecde62f7e01f8ddcd5fc469b5bd0a53d8a"
> checkAllBalances()
  eth.accounts[0]:      0xdae529561e9b9786083ed833f66ff63c127f77d0      balance: 402.9 ether
  eth.accounts[1]:      0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10      balance: 2.1 ether
  Total balance: 405 ether
undefined
> web3.eth.getTransaction(txid2)
{
  blockHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  blockNumber: null,
  from: "0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10",
  gas: 90000,
  gasPrice: 20000000000,
  hash: "0x016efad818c75a1a2593b6b265de2cecde62f7e01f8ddcd5fc469b5bd0a53d8a",
  input: "0x",
  nonce: 0,
  r: "0x84151542c3d6ea1c6f55778d24abe7a784c0a781b4a118c628e2bebb4f4f0a8d",
  s: "0x22fc01e78e43858cf5eac663159fd10a4a2625353ee494da4fd538ad8a138",
  to: "0xdae529561e9b9786083ed833f66ff63c127f77d0",
  transactionIndex: 0,
  v: "0xa96",
  value: 1100000000000000000
}
> web3.eth.getTransactionReceipt(txid2)
{
  blockHash: "0xf993f756c5a0b1b1f0e9bab1c8017e91ef80094c4f18c094bcbe2bae5be9d0bf",
  blockNumber: 83,
  contractAddress: null,
  cumulativeGasUsed: 21000,
  from: "0xf3e64a0100d88b6fb2e214effeb3e6250ef76f10",
  gasUsed: 21000,
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  root: "0xbeb16bc5a92eae7a342d4056835b96450edcf63e78f790d768decd94c016afdf",
  to: "0xdae529561e9b9786083ed833f66ff63c127f77d0",
  transactionHash: "0x016efad818c75a1a2593b6b265de2cecde62f7e01f8ddcd5fc469b5bd0a53d8a",
  transactionIndex: 0
}
```

### Smart Contract

* Remix http://ethereum.github.io/browser-solidity
* compilation - How to compile Solidity contracts with Geth v1.6? - Ethereum Stack Exchange  https://ethereum.stackexchange.com/questions/15435/how-to-compile-solidity-contracts-with-geth-v1-6
* https://alanbuxton.wordpress.com/2017/07/19/first-steps-with-ethereum-private-networks-and-smart-contracts-on-ubuntu-16-04/
* browser solidity url http://<DEVIP>:8080/
* SimpleStorage.sol
* Contract - Environment - Web3 Provider - http://<DEVIP>:8545
* create - set - get

```
docker-compose exec geth bash
solcjs --bin SimpleStorage.sol
cat SimpleStorage.sol:SimpleStorage.bin
solcjs --abi SimpleStorage.sol
cat SimpleStorage.sol:SimpleStorage.abi
docker-compose up -d solidity
```

log

```
bash-4.3# solcjs --bin SimpleStorage.sol
bash-4.3# ls
SimpleStorage.sol                    rinkeby.sh
SimpleStorage.sol:SimpleStorage.bin  start.sh
attach.sh                            testaccount.sh
gethload.js                          testrpc.sh
rinkeby.json
bash-4.3# cat SimpleStorage.sol:SimpleStorage.bin
6060604052341561000f57600080fd5b5b60ce8061001e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b11460475780636d4ce63c146067575b600080fd5b3415605157600080fd5b60656004808035906020019091905050608d565b005b3415607157600080fd5b60776098565b6040518082815260200191505060405180910390f35b806000819055505b50565b6000805490505b905600a165627a7a72305820f193eebe489f95754bfd999cb56f1dbccd2347709a2ca4819643b8305cb433c10029
bash-4.3# solcjs --abi SimpleStorage.sol
bash-4.3# cat SimpleStorage.sol:SimpleStorage.abi
[{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}]

```

###  預先建置帳戶、開啟挖礦以及解鎖的dev節點並新增帳戶轉帳

* testrpc.sh
* Contract - Environment - Web3 Provider - http://<DEVIP>:8545

```
$ pwd
/home/dltdojo/smb/container/dltdojo/geth
$ docker-compose stop
$ docker-compose up -d solidity
$ docker-compose up -d testrpc
$ docker-compose exec testrpc bash
bash-4.3# ./attach.sh
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
coinbase: 0xe525a0dfb03399215833b8449989b74804277496
at block: 50 (Fri, 21 Jul 2017 13:52:20 UTC)
 datadir: /root/.ethereum
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0

> checkAllBalances()
  eth.accounts[0]:      0xe525a0dfb03399215833b8449989b74804277496      balance: 305 ether
  Total balance: 305 ether
undefined
> web3.personal.newAccount("alice");
"0xafb2d945bd0696f8b849fdf467b1529b9ed12557"
> var sender = eth.accounts[0];
undefined
>  var receiver = eth.accounts[1];
undefined
> var amount = web3.toWei(2.1, "ether")
undefined
> eth.sendTransaction({from:sender, to:receiver, value: amount})
"0x3525a21d748022560bf0cd719d58dbba217bba812f6a3da2bb2177e7111c502c"
> checkAllBalances()
  eth.accounts[0]:      0xe525a0dfb03399215833b8449989b74804277496      balance: 967.9 ether
  eth.accounts[1]:      0xafb2d945bd0696f8b849fdf467b1529b9ed12557      balance: 2.1 ether
  Total balance: 970 ether
undefined
> exit
bash-4.3# exit
exit
```