## Ethereum 區塊瀏覽器

* carsenk/explorer: Ethereum Block Explorer (ETHExplorer V2) - https://github.com/carsenk/explorer
* http://DEVIP:8000/
* 修改 docker-compose.yml裡 start.sh 192.168.2.106 成為 start.sh DEVIP
* carsenk/explorer非使用資料庫而直接使用web3查節點，導致生成區塊過快網頁容易停滯現象

### 啟動區塊瀏覽器 carsenk/explorer

```
$ docker-compose build
$ docker-compose up -d
```

### 新增交易

```
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
> var receiver = eth.accounts[1];
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

### 停止區塊瀏覽器 carsenk/explorer

```
$ docker-compose stop
```