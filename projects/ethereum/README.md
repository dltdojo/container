## Ethereum Projects 

### ecrecover-example

* This will not work with testrpc https://github.com/sogoiii/ecrecover-example/issues/1

```
$ git clone https://github.com/sogoiii/ecrecover-example.git 
$ cd ecrecover-example
$ npm i
$ testrpc &
$ npm run deploy
$ npm run validate

eth_accounts
eth_sign
address -----> 0x0be09fd154562af5adf66f0fb62ea949067f5519
msg ---------> school bus
hex(msg) ----> 0x7363686f6f6c20627573
sig ---------> 0xa469ecab690267158dda41266212f5623ddcd8ff5e1a58ea6e9fe08179a983e26fdb1e812aace0e62f611adc544b7a7ac517f61c38afa24cabe3e5ab8036f8f001
r -----------> 0xa469ecab690267158dda41266212f5623ddcd8ff5e1a58ea6e9fe08179a983e2
s -----------> 0x6fdb1e812aace0e62f611adc544b7a7ac517f61c38afa24cabe3e5ab8036f8f0
v -----------> 0x01
vd ----------> 1
net_version
eth_call
-----data------
input addr ==> 0x0be09fd154562af5adf66f0fb62ea949067f5519
output addr => 0x0000000000000000000000000000000000000000

$ pkill node
[1]+  Terminated              testrpc
```

geth dev mode

```
$ docker run -p 8545:8545 -d dltdojo/geth:1.6.7 ./testrpc.sh
75335766ef183e04a5ec0fa72f7c934a2d3c05385396475a7b9aa22d91610926

$ docker exec -it 7533 ./attach.sh

Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
coinbase: 0x6c451069bd2fabe18cb72c67f01babddea6ac7f6
at block: 22 (Thu, 20 Jul 2017 14:12:15 UTC)
 datadir: /root/.ethereum
 modules: admin:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 shh:1.0 txpool:1.0 web3:1.0

> checkAllBalances()
  eth.accounts[0]:      0x6c451069bd2fabe18cb72c67f01babddea6ac7f6      balance: 150 ether
  Total balance: 150 ether
undefined
> exit

$ npm run deploy

> ecrecover-example@1.0.0 deploy /home/dltdojo/ugit/ecrecover-example
> truffle compile && truffle migrate --reset

Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  Migrations: 0x40466fde08dd92cc855eeeec8ed2d7c93393611d
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Verifier...
  Verifier: 0x536ebd6c3a1ef94e4a1d48e03cd2d726c992c7a9
Saving successful migration to network...
Saving artifacts...

$ npm run validate

address -----> 0x6c451069bd2fabe18cb72c67f01babddea6ac7f6
msg ---------> school bus
hex(msg) ----> 0x7363686f6f6c20627573
sig ---------> 0xf51f3c4585db299c4f3305a3af30e0d870e837adc7875b158b8885bd69d7e0461bb66d7474e702833e0ba46a6b3ea8888338795d3fa7ddd0070f90b94f4f2b501b
r -----------> 0xf51f3c4585db299c4f3305a3af30e0d870e837adc7875b158b8885bd69d7e046
s -----------> 0x1bb66d7474e702833e0ba46a6b3ea8888338795d3fa7ddd0070f90b94f4f2b50
v -----------> 0x1b
vd ----------> 27
-----data------
input addr ==> 0x6c451069bd2fabe18cb72c67f01babddea6ac7f6
output addr => 0x6c451069bd2fabe18cb72c67f01babddea6ac7f6

$ docker stop 7533
```