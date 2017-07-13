## Build a Ethereum Clique Private Testnet in 5 Min

* docker version: 17.06
* docker-compose: 1.8.0

## Quick Start (Name:foonet1)

* Network name: foonet1
* Signer: node0

```
$ docker pull dltdojo/clique:1.6.7
$ docker run -it -v dltdojo:/dltdojo dltdojo/clique:1.6.7 ./build.sh foonet1 4
$ curl -o docker-compose.yml https://raw.githubusercontent.com/y12studio/dltdojo/master/docker/clique/docker-compose.yml
$ sed -i.bak -e 's/cqnet1/foonet1/' docker-compose.yml
$ docker-compose up -d
```

### Build a dltdojo volume for foonet1

```
$ docker pull dltdojo/clique:1.6.7
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
> ^C/dltdojo/foonet1
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

### Let docker-compose up

```
$ curl -o docker-compose.yml https://raw.githubusercontent.com/y12studio/dltdojo/master/docker/clique/docker-compose.yml -o docker-compose.yml
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
$ docker-compose exec node0 bash
  #  ./info.sh foonet1
  # geth attach
  > admin.peers
  > eth.blockNumber
  > loadScript("/opt/geth/gethload.js")
  > checkAllBalances();
  > personal.unlockAccount("<ACCOUNT0>")
  > eth.sendTransaction({from:"<ACCOUNT0>", to:"<ACCOUNT2>", value: web3.toWei(99, "ether")})

$ docker-compose exec node2 bash
  # geth attach
  > admin.peers
  > eth.blockNumber
  > loadScript("/opt/geth/gethload.js")
  > checkAllBalances()
    eth.accounts[0]:      0x29b1bb318a23f40fc891fda44d4023fb4344e09a      balance: 99.88 ether
     Total balance: 99.88 ether

```

### Stop all containers

```
$ docker-compose stop
$ docker-compose rm
```
