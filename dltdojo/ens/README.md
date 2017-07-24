### 如何註冊ENS測試名稱在Rinkeby鏈上

* 等網路完全同步，light node也要數十分鐘。

```
$ mkdir rinkeby
$ docker run -it --rm -v $(pwd)/rinkeby:/root/.rinkeby dltdojo/geth:1.6.7 ./rinkeby.sh
$ 
```

* ens/quickstart.rst at master · ethereum/ens  https://github.com/ethereum/ens/blob/master/docs/quickstart.rst
* dltdojo/ens: Implementations for registrars and local resolvers for the Ethereum Name Service https://github.com/dltdojo/ens