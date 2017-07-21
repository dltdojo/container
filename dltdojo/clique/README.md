## 建立以太坊測試網路(Clique Proof of Authority)

* docker version: 17.06
* docker-compose: 1.8.0
* Clique PoA protocol & Rinkeby PoA testnet · Issue #225 · ethereum/EIPs https://github.com/ethereum/EIPs/issues/225
* kovan-testnet/proposal: Kovan PoA Testnet Proposal https://github.com/kovan-testnet/proposal
* 使用Parity建立Proof-of-Authority (PoA) Ethereum Chain – Taipei Ethereum Meetup – Medium  https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8parity%E5%BB%BA%E7%AB%8Bproof-of-authority-poa-ethereum-chain-c5c1cdd0f21a
* 使用 go-ethereum 1.6 Clique PoA consensus 建立 Private chain (1)  https://medium.com/taipei-ethereum-meetup/%E4%BD%BF%E7%94%A8-go-ethereum-1-6-clique-poa-consensus-%E5%BB%BA%E7%AB%8B-private-chain-1-4d359f28feff

## 選定網路名稱:foonet1

* Network name: foonet1
* Signer: node0

```
$ cd /home/dltdojo/smb
$ mkdir clique
$ cd clique
$ pwd
/home/dltdojo/smb/clique
$ docker pull dltdojo/clique:1.6.7
```

### 產生foonet1網路的創始區塊

```
$ docker run -it -v dltdojo:/dltdojo dltdojo/clique:1.6.7 ./build.sh foonet1 4
=== node0 address ===
5a4fd3bbf395670b099fbe8cdf36575432b4c040
=== node1 address ===
c2520a7a9b710223be7dbc02cf18c82b4ca4abe5
=== node2 address ===
98825c22bf030be8c6eeee6af753ae9799896045
=== node3 address ===
a9dcf47fb8b0c4b76a00dee745b5f6a11d33eda5
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
> foonet1
Sweet, you can set this via --network=foonet1 next time!

INFO [07-13|07:33:46] Administering Ethereum network           name=foonet1
WARN [07-13|07:33:46] No previous configurations found         path=/root/.puppeth/foonet1

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
> 0x5a4fd3bbf395670b099fbe8cdf36575432b4c040
> 0x

Which accounts should be pre-funded? (advisable at least one)
> 0x5a4fd3bbf395670b099fbe8cdf36575432b4c040
> 0xc2520a7a9b710223be7dbc02cf18c82b4ca4abe5
> 0x


Specify your chain/network ID if you want an explicit one (default = random)
>

Anything fun to embed into the genesis block? (max 32 bytes)
> DLTDOJO

What would you like to do? (default = stats)
 1. Show network stats
 2. Save existing genesis
 3. Track new remote server
 4. Deploy network components
> 2

Which file to save the genesis into? (default = foonet1.json)
>
INFO [07-13|07:34:29] Exported existing genesis block

What would you like to do? (default = stats)
 1. Show network stats
 2. Save existing genesis
 3. Track new remote server
 4. Deploy network components
> ^C
/dltdojo/foonet1
├── foonet1.json
├── node0
│   ├── UTC--2017-07-13T07-33-33.584964071Z--5a4fd3bbf395670b099fbe8cdf36575432b4c040
│   └── passfile
├── node1
│   ├── UTC--2017-07-13T07-33-34.325366781Z--c2520a7a9b710223be7dbc02cf18c82b4ca4abe5
│   └── passfile
├── node2
│   ├── UTC--2017-07-13T07-33-35.068764898Z--98825c22bf030be8c6eeee6af753ae9799896045
│   └── passfile
└── node3
    ├── UTC--2017-07-13T07-33-35.813409712Z--a9dcf47fb8b0c4b76a00dee745b5f6a11d33eda5
    └── passfile

4 directories, 9 files
=== foonet1.json ===
{
  "chainId": 25116,
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

### 啟動PoA網路

```
$ curl -o docker-compose.yml https://raw.githubusercontent.com/dltdojo/container/master/dltdojo/clique/docker-compose.yml
$ sed -i.bak -e 's/cqnet1/foonet1/' docker-compose.yml
$ docker-compose up -d
Recreating clique_node0_1
Recreating clique_node1_1
Recreating clique_node3_1
Recreating clique_node2_1

$ docker-compose ps
     Name         Command     State   Ports
-------------------------------------------
clique_node0_1   ./start.sh   Up
clique_node1_1   ./start.sh   Up
clique_node2_1   ./start.sh   Up
clique_node3_1   ./start.sh   Up

$ docker-compose logs node0
$ docker-compose logs node1
```

### 查詢連線節點

```
$ docker-compose exec node0 geth --exec 'admin.peers' attach

[{
    caps: ["eth/63"],
    id: "75fdb40896a08229422bfe5fdf24865428aeef3092c3767af407c9728f656951739a4cf70699d7bb4b09dcf030b94aa555a6eb45fdc25781e49b8e17150b5ae4",
    name: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "172.30.0.5:30303",
      remoteAddress: "172.30.0.3:42000"
    },
    protocols: {
      eth: {
        difficulty: 1,
        head: "0xf4908a87d00ba44210e9db58b474b815da2fdf7a0ad941ce0eed39aa75c83e7a",
        version: 63
      }
    }
}, {
    caps: ["eth/63"],
    id: "7658149f141283c16890260cc6bc49fb1e34c319db691cf73577474403d6003f98fadd27757c70ae7673fbd129837a9cc1a105fa925b0193481238a7806860ae",
    name: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "172.30.0.5:30303",
      remoteAddress: "172.30.0.2:49146"
    },
    protocols: {
      eth: {
        difficulty: 1,
        head: "0xf4908a87d00ba44210e9db58b474b815da2fdf7a0ad941ce0eed39aa75c83e7a",
        version: 63
      }
    }
}, {
    caps: ["eth/63"],
    id: "b8e8a29487ffeb9804775930c2703ccb3edd55dd8c72f97de5ee8e95e084caeb7f796def9f46168e478185162276f299396a8c1d84a27e9310b30a7a353253e0",
    name: "Geth/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "172.30.0.5:30303",
      remoteAddress: "172.30.0.4:48006"
    },
    protocols: {
      eth: {
        difficulty: 1,
        head: "0xf4908a87d00ba44210e9db58b474b815da2fdf7a0ad941ce0eed39aa75c83e7a",
        version: 63
      }
    }
}]


```

### 查詢每個節點帳戶轉帳

```

$ docker-compose exec node0 geth --exec 'eth.accounts[0]' attach
"0x8a4cb22c7a6911d71b0f20fff374cd1861a12dee"

$ docker-compose exec node1 geth --exec 'eth.accounts[0]' attach
"0xb06969fadb4b75417dcf288f1dacbb858b66fef2"

$ docker-compose exec node2 geth --exec 'eth.accounts[0]' attach
"0xb4e7c204f112828d6b6b04b7e0d88480568daa77"

$ docker-compose exec node3 geth --exec 'eth.accounts[0]' attach
"0xb410d65544b6f3717a59aadac2f0b124cf56a7fa"
```

### node0轉帳node2

node0與node1在創始塊有預先分配ether，適合用來轉出。

```
$ docker-compose exec node0 bash
  bash-4.3# cat /dltdojo/foonet1/node0/passfile ; echo
  bash-4.3# MDFiYTQ3MTljODBi
  bash-4.3#  ./info.sh foonet1
  bash-4.3# geth attach
  > admin.peers
  > eth.blockNumber
  > loadScript("/opt/geth/gethload.js")
  > checkAllBalances();
  > personal.unlockAccount(eth.accounts[0])
  > Passphrase: MDFiYTQ3MTljODBi
  > true
  > var toaddr="0xb4e7c204f112828d6b6b04b7e0d88480568daa77"
  > eth.sendTransaction({from:eth.accounts[0], to:toaddr, value: web3.toWei(99.88, "ether")})
  "0xa8807328c755e242e439dd22fbca17a648e7979ae3a9c8480082101cc053d17a"
  > exit
  bash-4.3# exit
  exit


$ docker-compose exec node2 bash
  # geth attach
  > admin.peers
  > eth.blockNumber
  > loadScript("/opt/geth/gethload.js")
  > checkAllBalances()
    eth.accounts[0]:      0x29b1bb318a23f40fc891fda44d4023fb4344e09a      balance: 99.88 ether
     Total balance: 99.88 ether

```

### 停止所有容器關掉網路

```
$ docker-compose stop
$ docker-compose rm
```