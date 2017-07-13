## Quick Start

* clique network name: cqnet1

```
$ docker run -it -v dltdojo:/dltdojo dltdojo/clique:1.6.7 ./build.sh cqnet1 4
$ docker-compose up -d
$ docker-compose exec node0 bash  
```

### Step 1: Define your clique netowrk

* clique network name: cqnet1

```
$ docker run -it -v dltdojo:/dltdojo dltdojo/clique:1.6.7 ./build.sh cqnet1 4
=== node0 address ===
ced2379c5fe581dfd71cfa2ddcd5bb6c52ac092f
=== node1 address ===
ffc187a49b7cb4a393554851b73a55d566f4c7dd
=== node2 address ===
a0cba2a4903087d0d411a1b157f4bf986954bd8a
=== node3 address ===
7893c34f37e7d15217537fee3206206b6893ed17
+-----------------------------------------------------------+
| Welcome to puppeth, your Ethereum private network manager |
|                                                           |
| This tool lets you create a new Ethereum network down to  |
| the genesis block, bootnodes, miners and ethstats servers |
| without the hassle that it would normally entail.         |
|                                                           |
| Puppeth uses SSH to dial in to remote servers, and builds |
| its network components out of Docker containers using the |
| docker-compose toolset.                                   |
+-----------------------------------------------------------+

Please specify a network name to administer (no spaces, please)
> cqnet1
Sweet, you can set this via --network=cqnet1 next time!

INFO [07-13|07:22:44] Administering Ethereum network           name=cqnet1
WARN [07-13|07:22:44] No previous configurations found         path=/root/.puppeth/cqnet1

What would you like to do? (default = stats)
 1. Show network stats
 2. Configure new genesis
 3. Track new remote server
 4. Deploy network components
> 2

Which consensus engine to use? (default = clique)
 1. Ethash - proof-of-work
 2. Clique - proof-of-authority
> 2

How many seconds should blocks take? (default = 15)
>

Which accounts are allowed to seal? (mandatory at least one)
> 0xced2379c5fe581dfd71cfa2ddcd5bb6c52ac092f
> 0x

Which accounts should be pre-funded? (advisable at least one)
> 0xced2379c5fe581dfd71cfa2ddcd5bb6c52ac092f
> 0xffc187a49b7cb4a393554851b73a55d566f4c7dd
> 0x


Specify your chain/network ID if you want an explicit one (default = random)
>

Anything fun to embed into the genesis block? (max 32 bytes)
>

What would you like to do? (default = stats)
 1. Show network stats
 2. Save existing genesis
 3. Track new remote server
 4. Deploy network components
> 2

Which file to save the genesis into? (default = cqnet1.json)
>
INFO [07-13|07:23:37] Exported existing genesis block

What would you like to do? (default = stats)
 1. Show network stats
 2. Save existing genesis
 3. Track new remote server
 4. Deploy network components
> ^C/dltdojo/cqnet1
├── cqnet1.json
├── node0
│   ├── UTC--2017-07-13T07-22-02.083293659Z--ced2379c5fe581dfd71cfa2ddcd5bb6c52ac092f
│   └── passfile
├── node1
│   ├── UTC--2017-07-13T07-22-02.827838930Z--ffc187a49b7cb4a393554851b73a55d566f4c7dd
│   └── passfile
├── node2
│   ├── UTC--2017-07-13T07-22-03.574115494Z--a0cba2a4903087d0d411a1b157f4bf986954bd8a
│   └── passfile
└── node3
    ├── UTC--2017-07-13T07-22-04.320455055Z--7893c34f37e7d15217537fee3206206b6893ed17
    └── passfile

4 directories, 9 files
=== cqnet1.json ===
{
  "chainId": 55696,
  "homesteadBlock": 1,
  "eip150Block": 2,
  "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "eip155Block": 3,
  "eip158Block": 3,
  "clique": {
    "period": 15,
    "epoch": 30000
  }
}

```

### Setp2: Start docker containers

```
$ docker-compose up -d
$ docker-compose ps
     Name         Command     State   Ports
-------------------------------------------
clique_node0_1   ./start.sh   Up
clique_node1_1   ./start.sh   Up
clique_node2_1   ./start.sh   Up
clique_node3_1   ./start.sh   Up

$ docker-compose exec node0 bash
bash-4.3# geth attach
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
coinbase: 0xced2379c5fe581dfd71cfa2ddcd5bb6c52ac092f
at block: 2 (Thu, 13 Jul 2017 07:25:36 UTC)
 datadir: /root/.ethereum
 modules: admin:1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> loadScript("/opt/geth/gethload.js")
true
> checkAllBalances();
  eth.accounts[0]:      0xced2379c5fe581dfd71cfa2ddcd5bb6c52ac092f      balance: 9.04625697166532776746648320380374280103671755200316906558262375061821325312e+56 ether
  Total balance: 9.046256971665328e+56 ether
undefined
> admin.peers
[{
    caps: ["eth/63"],
    id: "400caae28c877a4d799ae48d03ad5d51d103cd7be07ad6b88237574f988babcf361d1e2cc034972850997dba3ed534c09883538833259b1ce8434107b240b9aa",
    name: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "172.25.0.3:30303",
      remoteAddress: "172.25.0.2:44254"
    },
    protocols: {
      eth: {
        difficulty: 1,
        head: "0xcb1eebedf7cd3cae078c2807875cd7edcc8df0c726cf0bce3712d39976a049b8",
        version: 63
      }
    }
}, {
    caps: ["eth/63"],
    id: "e96c09e37e63b48d4877d379c7bd19df5622b5f94a7ce4662a23f97e7c87912c2e2c42387c6498e7ac335897c5c8be1c83bbe786fa322e6bc85b484aaa2a0cb8",
    name: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "172.25.0.3:30303",
      remoteAddress: "172.25.0.5:33170"
    },
    protocols: {
      eth: {
        difficulty: 1,
        head: "0xcb1eebedf7cd3cae078c2807875cd7edcc8df0c726cf0bce3712d39976a049b8",
        version: 63
      }
    }
}, {
    caps: ["eth/63"],
    id: "f54f4a29f601cd40a517ebb489f1f9c66c914aa7434350a17770b0bfd3bf8b159d025fe7e5f109634e3c2c81b632371ad3411f5111263dca0facc2a90d2e7ced",
    name: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "172.25.0.3:30303",
      remoteAddress: "172.25.0.4:44232"
    },
    protocols: {
      eth: {
        difficulty: 1,
        head: "0xcb1eebedf7cd3cae078c2807875cd7edcc8df0c726cf0bce3712d39976a049b8",
        version: 63
      }
    }
}]
> eth.blockNumber
5
> exit
```


### Build dltdojo/clique:1.6.7

```
$ docker build -t dltdojo/clique:1.6.7 .
$ docker push dltdojo/clique:1.6.7
```