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
bash-4.3# 

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

bash-4.3# geth attach
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0

> personal.newAccount("pass")
"0x00c497c6e1ca8bafbcbed433c8fe297f4abe2168"
> miner.start()
null
> loadScript("/opt/geth/gethload.js")
true
> checkAllBalances()
  eth.accounts[0]:      0x00c497c6e1ca8bafbcbed433c8fe297f4abe2168      balance: 220 ether
  Total balance: 220 ether
```

###  預先建置帳戶、開啟挖礦以及解鎖的dev節點並新增帳戶轉帳

```
$ pwd
/home/dltdojo/smb/container/dltdojo/geth
$ docker-compose up -d
$ docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS                    NAMES
bb906667dd26        dltdojo/geth:1.6.7   "./testrpc.sh"      2 seconds ago       Up 2 seconds        0.0.0.0:8545->8545/tcp   geth_geth_1

$ docker-compose exec geth bash
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