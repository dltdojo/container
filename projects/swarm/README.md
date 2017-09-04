* Running a private swarm http://swarm-guide.readthedocs.io/en/latest/runninganode.html#running-a-private-swarm

### start a private swarm net
```
$ docker-compose build
$ docker-compose up -d
$ docker-compose ps
     Name         Command    State   Ports
------------------------------------------
swarm_snode1_1   /start.sh   Up
swarm_snode2_1   /start.sh   Up

$ docker-compose exec snode1 cat /tmp/enode
"enode://f5d25253eedb82a255240e2d94580a9924b701a874f189dd36f2a8bfcb9b82da933c81261941adeeca5a93dfdba695a05ea7cab8beea689fa8e692af6d953d11@192.168.96.3:30399"

$ docker-compose exec snode2 cat /tmp/enode
"enode://714231069c5d8c45bb03395298f581438b790fc678bb5cef517e35fbd92a339af27af2720d09429607b546b369fa2cb5a03f458dc9003c7b030e293ff48a12ad@192.168.96.2:30399"
```

### swarm info

```
$ docker-compose exec snode1 geth --exec "bzz.info" attach /tmp/BZZ/bzzd.ipc
{
  Branches: 128,
  BucketSize: 4,
  BzzKey: "0x27c9a3f53d2fcebf2ebff783a6cb48bc38d7291ba35be6d08f181af2b0af1938",
  CacheCapacity: 5000,
  CallInterval: 3000000000,
  ChunkDbPath: "/tmp/BZZ/swarm/bzz-147646b84b6b8c5d0cee51e03a0b0bb6f672da6e/chunks",
  ConnRetryExp: 2,
  ContractAbi: "[{\"constant\":false,\"inputs\":[],\"name\":\"kill\",\"outputs\":[],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"sent\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"beneficiary\",\"type\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\"},{\"name\":\"sig_v\",\"type\":\"uint8\"},{\"name\":\"sig_r\",\"type\":\"bytes32\"},{\"name\":\"sig_s\",\"type\":\"bytes32\"}],\"name\":\"cash\",\"outputs\":[],\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"deadbeat\",\"type\":\"address\"}],\"name\":\"Overdraft\",\"type\":\"event\"}]",
  ContractCode: "0x606060405260008054600160a060020a031916331790556101ff806100246000396000f3606060405260e060020a600035046341c0e1b581146100315780637bf786f814610059578063fbf788d614610071575b005b61002f60005433600160a060020a03908116911614156100bd57600054600160a060020a0316ff5b6100ab60043560016020526000908152604090205481565b61002f600435602435604435606435608435600160a060020a03851660009081526001602052604081205485116100bf575b505050505050565b60408051918252519081900360200190f35b565b50604080516c0100000000000000000000000030600160a060020a0390811682028352881602601482015260288101869052815190819003604801812080825260ff861660208381019190915282840186905260608301859052925190926001926080818101939182900301816000866161da5a03f11561000257505060405151600054600160a060020a0390811691161461015a576100a3565b600160a060020a038681166000908152600160205260409020543090911631908603106101b357604060008181208790559051600160a060020a0388169190819081818181818881f1935050505015156100a357610002565b60005460408051600160a060020a03929092168252517f2250e2993c15843b32621c89447cc589ee7a9f049c026986e545d3c2c0c6f9789181900360200190a185600160a060020a0316ff",
  DbCapacity: 5000000,
  EnsRoot: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
  Hash: "SHA3",
  InitialRetryInterval: 42000000,
  KadDbPath: "/tmp/BZZ/swarm/bzz-147646b84b6b8c5d0cee51e03a0b0bb6f672da6e/bzz-peers.json",
  KeyBufferSize: 1024,
  ListenAddr: "127.0.0.1",
  MaxIdleInterval: 42000000000,
  MaxProx: 8,
  NetworkId: 322,
  Path: "/tmp/BZZ/swarm/bzz-147646b84b6b8c5d0cee51e03a0b0bb6f672da6e",
  Port: "8500",
  ProxBinSize: 2,
  PublicKey: "0x0453fe022ac3a9e30ee1b22c44ad2e91b871cc31453488ab17880783cd085dc53559c03ac5345f2a3a46e038b7ae203accdad149b8ba611e8d38e8cfbb48ad702d",
  PurgeInterval: 151200000000000,
  Radius: 0,
  RequestDbBatchSize: 512,
  RequestDbPath: "/tmp/BZZ/swarm/bzz-147646b84b6b8c5d0cee51e03a0b0bb6f672da6e/requests",
  Swap: {
    AutoCashInterval: 300000000000,
    AutoCashThreshold: 50000000000000,
    AutoDepositBuffer: 100000000000000,
    AutoDepositInterval: 300000000000,
    AutoDepositThreshold: 50000000000000,
    Beneficiary: "0x147646b84b6b8c5d0cee51e03a0b0bb6f672da6e",
    BuyAt: 20000000000,
    Contract: "0x0000000000000000000000000000000000000000",
    DropAt: 10000,
    PayAt: 100,
    PublicKey: "0x0453fe022ac3a9e30ee1b22c44ad2e91b871cc31453488ab17880783cd085dc53559c03ac5345f2a3a46e038b7ae203accdad149b8ba611e8d38e8cfbb48ad702d",
    SellAt: 20000000000
  },
  SyncBatchSize: 128,
  SyncBufferSize: 128,
  SyncCacheSize: 1024,
  SyncModes: [true, true, true, true, false],
  SyncPriorities: [2, 1, 1, 0, 0]
}

$ docker-compose exec snode2 geth --exec "bzz.info" attach /tmp/BZZ/bzzd.ipc
{
  Branches: 128,
  BucketSize: 4,
  BzzKey: "0x34f47686ad6bfb24f1cced525b9aaa5da9555e554c260e4ff34f59171fbf841a",
  CacheCapacity: 5000,
  CallInterval: 3000000000,
  ChunkDbPath: "/tmp/BZZ/swarm/bzz-1f27d7f8a0928bfe0a79b4329ee22a355725ca02/chunks",
  ConnRetryExp: 2,
  ContractAbi: "[{\"constant\":false,\"inputs\":[],\"name\":\"kill\",\"outputs\":[],\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"sent\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"beneficiary\",\"type\":\"address\"},{\"name\":\"amount\",\"type\":\"uint256\"},{\"name\":\"sig_v\",\"type\":\"uint8\"},{\"name\":\"sig_r\",\"type\":\"bytes32\"},{\"name\":\"sig_s\",\"type\":\"bytes32\"}],\"name\":\"cash\",\"outputs\":[],\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"deadbeat\",\"type\":\"address\"}],\"name\":\"Overdraft\",\"type\":\"event\"}]",
  ContractCode: "0x606060405260008054600160a060020a031916331790556101ff806100246000396000f3606060405260e060020a600035046341c0e1b581146100315780637bf786f814610059578063fbf788d614610071575b005b61002f60005433600160a060020a03908116911614156100bd57600054600160a060020a0316ff5b6100ab60043560016020526000908152604090205481565b61002f600435602435604435606435608435600160a060020a03851660009081526001602052604081205485116100bf575b505050505050565b60408051918252519081900360200190f35b565b50604080516c0100000000000000000000000030600160a060020a0390811682028352881602601482015260288101869052815190819003604801812080825260ff861660208381019190915282840186905260608301859052925190926001926080818101939182900301816000866161da5a03f11561000257505060405151600054600160a060020a0390811691161461015a576100a3565b600160a060020a038681166000908152600160205260409020543090911631908603106101b357604060008181208790559051600160a060020a0388169190819081818181818881f1935050505015156100a357610002565b60005460408051600160a060020a03929092168252517f2250e2993c15843b32621c89447cc589ee7a9f049c026986e545d3c2c0c6f9789181900360200190a185600160a060020a0316ff",
  DbCapacity: 5000000,
  EnsRoot: "0x112234455c3a32fd11230c42e7bccd4a84e02010",
  Hash: "SHA3",
  InitialRetryInterval: 42000000,
  KadDbPath: "/tmp/BZZ/swarm/bzz-1f27d7f8a0928bfe0a79b4329ee22a355725ca02/bzz-peers.json",
  KeyBufferSize: 1024,
  ListenAddr: "127.0.0.1",
  MaxIdleInterval: 42000000000,
  MaxProx: 8,
  NetworkId: 322,
  Path: "/tmp/BZZ/swarm/bzz-1f27d7f8a0928bfe0a79b4329ee22a355725ca02",
  Port: "8500",
  ProxBinSize: 2,
  PublicKey: "0x04e7189108e2dd761dc9e0ef094ebab412b1e4c1e4ec9358b3d1c02fcf6a91b4524a9d9eb34fa26060088dc8291c8b94bf283e240c871f22bd0ec571e70464308f",
  PurgeInterval: 151200000000000,
  Radius: 0,
  RequestDbBatchSize: 512,
  RequestDbPath: "/tmp/BZZ/swarm/bzz-1f27d7f8a0928bfe0a79b4329ee22a355725ca02/requests",
  Swap: {
    AutoCashInterval: 300000000000,
    AutoCashThreshold: 50000000000000,
    AutoDepositBuffer: 100000000000000,
    AutoDepositInterval: 300000000000,
    AutoDepositThreshold: 50000000000000,
    Beneficiary: "0x1f27d7f8a0928bfe0a79b4329ee22a355725ca02",
    BuyAt: 20000000000,
    Contract: "0x0000000000000000000000000000000000000000",
    DropAt: 10000,
    PayAt: 100,
    PublicKey: "0x04e7189108e2dd761dc9e0ef094ebab412b1e4c1e4ec9358b3d1c02fcf6a91b4524a9d9eb34fa26060088dc8291c8b94bf283e240c871f22bd0ec571e70464308f",
    SellAt: 20000000000
  },
  SyncBatchSize: 128,
  SyncBufferSize: 128,
  SyncCacheSize: 1024,
  SyncModes: [true, true, true, true, false],
  SyncPriorities: [2, 1, 1, 0, 0]
}

```

### addPeer(enode1) in snode2
```
$ docker-compose exec snode2 bash
bash-4.3# geth attach /tmp/BZZ/bzzd.ipc
Welcome to the Geth JavaScript console!

instance: swarm/v1.6.7-stable/linux-amd64/go1.9beta2
 modules: admin:1.0 bzz:1.0 chequebook:1.0 debug:1.0 rpc:1.0 swarmfs:1.0 web3:1.0

> admin.addPeer("enode://f5d25253eedb82a255240e2d94580a9924b701a874f189dd36f2a8bfcb9b82da933c81261941adeeca5a93dfdba695a05ea7cab8beea689fa8e692af6d953d11@192.168.96.3:30399")
true
> admin.peers
[{
    caps: ["bzz/0"],
    id: "f5d25253eedb82a255240e2d94580a9924b701a874f189dd36f2a8bfcb9b82da933c81261941adeeca5a93dfdba695a05ea7cab8beea689fa8e692af6d953d11",
    name: "swarm/v1.6.7-stable/linux-amd64/go1.9beta2",
    network: {
      localAddress: "192.168.96.2:33370",
      remoteAddress: "192.168.96.3:30399"
    },
    protocols: {
      bzz: "unknown"
    }
}]
> exit
```
### swarm up file in snode2
```
bash-4.3# echo 'hello swarm' > hello.txt
bash-4.3# swarm up hello.txt
4e214de0969088ff2acc6ef70ea825cf201fa2c72650d6ed363734378eb033c8
bash-4.3# curl -s http://localhost:8500/bzz:/4e214de0969088ff2acc6ef70ea825cf201fa2c72650d6ed363734378eb033c8
hello swarm
bash-4.3# exit
exit
```
### read file in snode1
```
$ docker-compose exec snode1 curl -s http://localhost:8500/bzz:/4e214de0969088ff2acc6ef70ea825cf201fa2c72650d6ed363734378eb033c8
hello swarm
```

### stop all containers
```
$ docker-compose stop
Stopping swarm_snode1_1 ... done
Stopping swarm_snode2_1 ... done
```

### build docker image

```
$ docker build -t dltdojo/swarmnet:1.6.7 .
```