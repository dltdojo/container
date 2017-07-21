## 比特幣測試網路

### 啟動第一個節點

* http://DEVIP:12750/

```
$ pwd
/home/dltdojo/smb/container/dltdojo/bitcoin-net
$ docker-compose up -d btcboot
$ docker-compose exec --user bitcoin btcboot bitcoin-cli getinfo
{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 191.49990960,
  "blocks": 104,
  "timeoffset": 0,
  "connections": 0,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500627176,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

```

### 啟動第二個節點觀察連線數

* http://DEVIP:12751/

```
$ docker-compose up -d node1
Creating bitcoinnet_node1_1
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                                                 NAMES
ef8073406eb8        dltdojo/abe         "/entrypoint.sh /t..."   24 seconds ago      Up 24 seconds       8332-8333/tcp, 18332-18333/tcp, 18444/tcp, 0.0.0.0:12750->12750/tcp   bitcoinnet_btcboot_1
73590bca4888        dltdojo/abe         "/entrypoint.sh /s..."   9 minutes ago       Up 3 seconds        8332-8333/tcp, 18332-18333/tcp, 18444/tcp, 0.0.0.0:12751->12750/tcp   bitcoinnet_node1_1

$ docker-compose exec --user bitcoin node1 bitcoin-cli getinfo

{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 0.00000000,
  "blocks": 104,
  "timeoffset": 0,
  "connections": 1,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500627400,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

```

### 啟動第三個節點並觀察連線數

* http://DEVIP:12752/

```
$ docker-compose up -d node2
Creating bitcoinnet_node2_1
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                                                                 NAMES
a1dd204a47b6        dltdojo/abe         "/entrypoint.sh /s..."   7 seconds ago        Up 6 seconds        8332-8333/tcp, 18332-18333/tcp, 18444/tcp, 0.0.0.0:12752->12750/tcp   bitcoinnet_node2_1
ef8073406eb8        dltdojo/abe         "/entrypoint.sh /t..."   About a minute ago   Up About a minute   8332-8333/tcp, 18332-18333/tcp, 18444/tcp, 0.0.0.0:12750->12750/tcp   bitcoinnet_btcboot_1
73590bca4888        dltdojo/abe         "/entrypoint.sh /s..."   10 minutes ago       Up About a minute   8332-8333/tcp, 18332-18333/tcp, 18444/tcp, 0.0.0.0:12751->12750/tcp   bitcoinnet_node1_1

$ docker-compose exec --user bitcoin node2 bitcoin-cli getinfo
{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 0.00000000,
  "blocks": 104,
  "timeoffset": 0,
  "connections": 1,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500628036,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

$ docker-compose exec --user bitcoin btcboot bitcoin-cli getinfo
{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 191.49990960,
  "blocks": 104,
  "timeoffset": 0,
  "connections": 2,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500627946,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

$ docker-compose exec --user bitcoin btcboot bitcoin-cli getpeerinfo
[
  {
    "id": 2,
    "addr": "172.27.0.3:37522",
    "services": "000000000000000d",
    "relaytxes": true,
    "lastsend": 1500628086,
    "lastrecv": 1500628086,
    "bytessent": 36026,
    "bytesrecv": 6519,
    "conntime": 1500627966,
    "timeoffset": 0,
    "pingtime": 0.000229,
    "minping": 0.000229,
    "version": 70015,
    "subver": "/Satoshi:0.14.2/",
    "inbound": true,
    "addnode": false,
    "startingheight": 0,
    "banscore": 0,
    "synced_headers": -1,
    "synced_blocks": -1,
    "inflight": [
    ],
    "whitelisted": false,
    "bytessent_per_msg": {
      "block": 26540,
      "feefilter": 32,
      "getheaders": 637,
      "headers": 8449,
      "ping": 64,
      "pong": 64,
      "sendcmpct": 66,
      "sendheaders": 24,
      "verack": 24,
      "version": 126
    },
    "bytesrecv_per_msg": {
      "feefilter": 32,
      "getaddr": 24,
      "getdata": 5969,
      "getheaders": 93,
      "ping": 64,
      "pong": 64,
      "sendcmpct": 99,
      "sendheaders": 24,
      "verack": 24,
      "version": 126
    }
  },
  {
    "id": 5,
    "addr": "172.27.0.4:38458",
    "services": "000000000000000d",
    "relaytxes": true,
    "lastsend": 1500628037,
    "lastrecv": 1500628037,
    "bytessent": 35962,
    "bytesrecv": 6455,
    "conntime": 1500628037,
    "timeoffset": 0,
    "pingtime": 0.001047,
    "minping": 0.001047,
    "version": 70015,
    "subver": "/Satoshi:0.14.2/",
    "inbound": true,
    "addnode": false,
    "startingheight": 0,
    "banscore": 0,
    "synced_headers": -1,
    "synced_blocks": -1,
    "inflight": [
    ],
    "whitelisted": false,
    "bytessent_per_msg": {
      "block": 26540,
      "feefilter": 32,
      "getheaders": 637,
      "headers": 8449,
      "ping": 32,
      "pong": 32,
      "sendcmpct": 66,
      "sendheaders": 24,
      "verack": 24,
      "version": 126
    },
    "bytesrecv_per_msg": {
      "feefilter": 32,
      "getaddr": 24,
      "getdata": 5969,
      "getheaders": 93,
      "ping": 32,
      "pong": 32,
      "sendcmpct": 99,
      "sendheaders": 24,
      "verack": 24,
      "version": 126
    }
  }
]

```

### 取得不同節點錢包地址並轉帳

* http://DEVIP:12750/
* http://DEVIP:12751/
* http://DEVIP:12752/

```
$ docker-compose exec --user bitcoin node1 bitcoin-cli getnewaddress
n27ecBbpdxHddjoq7thkiYK1dCtzgeGGbf

$ docker-compose exec --user bitcoin node2 bitcoin-cli getnewaddress
mwHncbRo2Mi24D8woJvGdva1HMAViASUvA

$ docker-compose exec --user bitcoin btcboot bitcoin-cli sendtoaddress n27ecBbpdxHddjoq7thkiYK1dCtzgeGGbf 10.99
d22caf45008f93e511d8903c925f1830a54c2353917332df286fbd282e832602

$ docker-compose exec --user bitcoin btcboot bitcoin-cli sendtoaddress mwHncbRo2Mi24D8woJvGdva1HMAViASUvA 10.88
4a6dbb24ad805b4bf68eaf4bb88c0d2e1a3f370c3ffcd5c84cc31b3919eb1302

$ docker-compose exec --user bitcoin btcboot bitcoin-cli generate 2
```

### 停止所有容器

```
$ docker-compose stop
```