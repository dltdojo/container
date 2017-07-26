### 註冊ENS名稱(Rinkeby)

* 以rinkeby鏈練習。
* 主鏈採用競標方式，測試鏈採用先註冊先得模式。
* rinkeby網路完全同步，light node約數十分鐘。
* 金鑰 faucet key 208065a247edbe5df4d86fbdc0171303f23a76961be9f6013850dd2bdc759bbb 
* 地址 faucet address https://rinkeby.etherscan.io/address/0x0BED7ABd61247635c1973eB38474A2516eD1D884
* 發送0.1到本地帳戶做佈署合約之用 https://www.myetherwallet.com/#send-transaction
* http://docs.ens.domains/en/latest/introduction.html?highlight=testnet
* PublicResolver 0xb14fdee4391732ea9d2267054ead2084684c0ad8

```
$ mkdir rinkeby
$ docker-compose up -d
$ cp ensutils-testnet.js rinkeby/
$ docker-compose exec rinkeby bash

bash-4.3# geth attach ipc:/root/.rinkeby/geth.ipc
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.7-stable/linux-amd64/go1.9beta2
 modules: admin:1.0 debug:1.0 eth:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> loadScript('/root/.rinkeby/ensutils-rinkeby.js');
true
> new Date(testRegistrar.expiryTimes(web3.sha3('myname')).toNumber() * 1000)
<Date Wed, 02 Aug 2017 09:14:07 UTC>
> new Date(testRegistrar.expiryTimes(web3.sha3('dltdojo')).toNumber() * 1000)
<Date Thu, 01 Jan 1970 00:00:00 UTC>

> personal.newAccount("pass")
"0xc3d2b0ebde747dc082dba69b05c172733a8a85c7"
> loadScript("/opt/geth/gethload.js")
true
> checkAllBalances()
  eth.accounts[0]:      0xc3d2b0ebde747dc082dba69b05c172733a8a85c7      balance: 0 ether
  Total balance: 0.1 ether

> personal.unlockAccount(eth.accounts[0], "pass", 3000)
> testRegistrar.register(web3.sha3('dltdojo'), eth.accounts[0], {from: eth.accounts[0]})
"0x7aede1d084d8b97281a6eb541073c6abe2c8cedb99b676ab3fea25f644b76e99"

> new Date(testRegistrar.expiryTimes(web3.sha3('dltdojo')).toNumber() * 1000)
<Date Tue, 22 Aug 2017 04:39:50 UTC>

> ens.owner(namehash('dltdojo.test'))
"0xc3d2b0ebde747dc082dba69b05c172733a8a85c7"

> checkAllBalances()
  eth.accounts[0]:      0xc3d2b0ebde747dc082dba69b05c172733a8a85c7      balance: 0.09859804 ether
  Total balance: 0.09859804 ether

```

* ens/quickstart.rst at master · ethereum/ens  https://github.com/ethereum/ens/blob/master/docs/quickstart.rst
* dltdojo/ens: Implementations for registrars and local resolvers for the Ethereum Name Service https://github.com/dltdojo/ens