## Mist 0.9.0 on Windows

### Mist 0.9.0 Windows 10快速完成同步定設置不同地方存放區塊資料

* Mist先啟動light節點節省下載時間
* 下載 geth-windows-amd64-1.6.7 https://geth.ethereum.org/downloads/
* 新增區塊存放資料夾(範例) D:\TEST\Ethereum
* 下載單獨安裝版本 Mist-win64-0-9-0.zip https://github.com/ethereum/mist/releases
* 先啟動geth.exe設定成light模式後再啟動Mist.exe
* 約10分鐘同步完成可發送
* 完成後ctrl+c停掉geth.exe

```
geth.exe -light --datadir "D:\TEST\Ethereum"
```

### geth連上rinkeby網路

* 下載 https://www.rinkeby.io/rinkeby.json
* 啟動geth後再啟用mist
* 完成同步可以收發

```
geth --datadir "D:\TEST\Rinkeby" init rinkeby.json
geth --syncmode=light --networkid=4 --datadir "D:\TEST\Rinkeby" --cache=512 --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303 --rpc --rpcapi="personal,eth,network"
```

mist連上後可收發但設定loadScript('/path/to/ensutils-testnet.js');有問題。
