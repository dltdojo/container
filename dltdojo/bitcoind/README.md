## 比特幣節點

比特幣節點實做：

* https://github.com/bitcoin/bitcoin
* https://github.com/bcoin-org
* Bitcoin in Go https://github.com/btcsuite
* paritytech/parity-bitcoin https://github.com/paritytech/parity-bitcoin

### 利用現有 seegno/bitcoind 映像檔

* seegno/bitcoind - Docker Hub  https://hub.docker.com/r/seegno/bitcoind/

#### 啟動節點連接比特幣網路，觀察height，以及一開始預先生成的金鑰。

```
$ pwd
/home/dltdojo/smb/container/dltdojo/bitcoind

$ docker run -it --rm seegno/bitcoind:0.14.2-alpine -printtoconsole

2017-07-21 07:58:10 keypool added key 97, size=97
2017-07-21 07:58:10 keypool added key 98, size=98
2017-07-21 07:58:10 keypool added key 99, size=99
2017-07-21 07:58:10 keypool added key 100, size=100
2017-07-21 07:58:10 keypool added key 101, size=101
2017-07-21 07:58:10 keypool reserve 1
2017-07-21 07:58:10 keypool keep 1

2017-07-21 07:53:18 UpdateTip: new best=0000000035981d26f072cea02a0cb67897b896229b1436e0009cb9c4c20a4ee9 height=271 version=0x00000001 log2_work=40.087485 tx=279 date='2009-01-13 01:25:00' progress=0.000001 cache=0.1MiB(276tx)
2017-07-21 07:53:18 UpdateTip: new best=00000000d4e581b02a90ab3f2f45723aea64f341908a767c33968219b9900ef1 height=272 version=0x00000001 log2_work=40.092779 tx=280 date='2009-01-13 01:37:21' progress=0.000001 cache=0.1MiB(277tx)
^C2017-07-21 07:53:18 tor: Thread interrupt
2017-07-21 07:53:18 torcontrol thread exit

Ctrl+c
```

#### 啟動節點連接比特幣測試網路Testnet，觀察height，注意測試鏈時間。

```
$ docker run -it --rm seegno/bitcoind:0.14.2-alpine -testnet=1 -printtoconsole

2017-07-21 07:56:32 UpdateTip: new best=000000002fbb355416d3cfa66b26cf1a26f33a0539d9583a3834cca6e3c0a552 height=190 version=0x00000001 log2_work=39.577451 tx=191 date='2011-02-03 04:42:42' progress=0.000012 cache=0.0MiB(190tx)
2017-07-21 07:56:32 UpdateTip: new best=00000000ebecc48af6cca0b45ee6669ca576f6bce61c84d1ca3932062b74d62e height=191 version=0x00000001 log2_work=39.584985 tx=192 date='2011-02-03 04:43:40' progress=0.000012 cache=0.0MiB(191tx)
2017-07-21 07:56:32 UpdateTip: new best=000000003eacad27508770feb3a380b77e84a0b3377966c30828b38b633f4a4d height=192 version=0x00000001 log2_work=39.592479 tx=193 date='2011-02-03 04:44:23' progress=0.000013 cache=0.0MiB(192tx)
2017-07-21 07:56:32 tor: Thread interrupt
2017-07-21 07:56:32 torcontrol thread exit

Ctrl+c
```

#### 啟動節點連接比特幣測試網路Regtest，注意不會生成新塊。

```
$ docker run -it --rm seegno/bitcoind:0.14.2-alpine -regtest=1 -printtoconsole

2017-07-21 08:03:10 init message: Starting network threads...
2017-07-21 08:03:10 init message: Done loading
2017-07-21 08:03:10 msghand thread start
2017-07-21 08:03:10 opencon thread start
2017-07-21 08:03:10 addcon thread start
2017-07-21 08:03:10 dnsseed thread start
2017-07-21 08:03:10 Loading addresses from DNS seeds (could take a while)
2017-07-21 08:03:10 0 addresses found from DNS seeds
2017-07-21 08:03:10 dnsseed thread exit
2017-07-21 08:03:10 net thread start

Ctrl+c
```

#### 啟動比特幣節點連接主網路下載區塊存在本機

You can also mount a directory it in a volume under /home/bitcoin/.bitcoin in case you want to access it on the host:
```
$ mkdir data
$ docker run -v ${PWD}/data:/home/bitcoin/.bitcoin -it --rm seegno/bitcoind:0.14.2-alpine -printtoconsole

Ctrl+c

$ sudo tree -h data
data
├── [  37]  banlist.dat
├── [4.0K]  blocks
│   ├── [ 16M]  blk00000.dat
│   ├── [4.0K]  index
│   │   ├── [2.8M]  000003.log
│   │   ├── [  16]  CURRENT
│   │   ├── [   0]  LOCK
│   │   ├── [  57]  LOG
│   │   └── [  50]  MANIFEST-000002
│   └── [1.0M]  rev00000.dat
├── [4.0K]  chainstate
│   ├── [ 13K]  000003.log
│   ├── [  16]  CURRENT
│   ├── [   0]  LOCK
│   ├── [  57]  LOG
│   └── [  50]  MANIFEST-000002
├── [   0]  db.log
├── [   0]  debug.log
├── [ 21K]  fee_estimates.dat
├── [  17]  mempool.dat
├── [125K]  peers.dat
└── [ 92K]  wallet.dat

3 directories, 19 files

```

#### 製作Regtest映像檔，啟動並進入容器產生區塊並轉帳查詢交易值。

```
$ docker-compose build
$ docker-compose up -d
$ docker ps
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS              PORTS                                       NAMES
e7472883bd34        dltdojo/bitcoind:1.4.2   "/entrypoint.sh bi..."   55 seconds ago      Up 8 seconds        8332-8333/tcp, 18332-18333/tcp, 18444/tcp   bitcoind_bitcoind_1

$ docker-compose exec --user bitcoin bitcoind sh
/ $ bitcoin-cli getinfo
{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 0.00000000,
  "blocks": 0,
  "timeoffset": 0,
  "connections": 0,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500625349,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

/ $ bitcoin-cli generate 101

/ $ bitcoin-cli getinfo
{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 50.00000000,
  "blocks": 101,
  "timeoffset": 0,
  "connections": 0,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500625349,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

/ $ bitcoin-cli sendtoaddress mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou 10.00
6b7cf6dcf533a48be35a92ee43d3a20dba67dc08ba0d076ea95ed8f7de241dbf
/ $ bitcoin-cli getinfo
{
  "version": 140200,
  "protocolversion": 70015,
  "walletversion": 130000,
  "balance": 39.99996160,
  "blocks": 101,
  "timeoffset": 0,
  "connections": 0,
  "proxy": "",
  "difficulty": 4.656542373906925e-10,
  "testnet": false,
  "keypoololdest": 1500625349,
  "keypoolsize": 100,
  "paytxfee": 0.00000000,
  "relayfee": 0.00001000,
  "errors": ""
}

/ $ TXID=6b7cf6dcf533a48be35a92ee43d3a20dba67dc08ba0d076ea95ed8f7de241dbf
/ $ bitcoin-cli getrawtransaction $TXID 1
{
  "hex": "02000000016bed0d9c75799e3912868f282973ec557ce3c5009a6b2b4cc3c21479e975b7190000000048473044022044a9268e26ee9fcef25c2735a4c8a965d8605f02f0d2e6adf7e10d198230a5c50220079e35b03d373e49b6487ffc68fa3dbd1b87fdaf073260a0bf965b687ae2c53201feffffff0200ca9a3b000000001976a914a57414e5ffae9ef5074bacbe10a320bb2614e1f388ac00196bee000000001976a9142b9f2b59c617917dc178c7a2acf19db0f4d214fe88ac65000000",
  "txid": "6b7cf6dcf533a48be35a92ee43d3a20dba67dc08ba0d076ea95ed8f7de241dbf",
  "hash": "6b7cf6dcf533a48be35a92ee43d3a20dba67dc08ba0d076ea95ed8f7de241dbf",
  "size": 191,
  "vsize": 191,
  "version": 2,
  "locktime": 101,
  "vin": [
    {
      "txid": "19b775e97914c2c34c2b6b9a00c5e37c55ec7329288f8612399e79759c0ded6b",
      "vout": 0,
      "scriptSig": {
        "asm": "3044022044a9268e26ee9fcef25c2735a4c8a965d8605f02f0d2e6adf7e10d198230a5c50220079e35b03d373e49b6487ffc68fa3dbd1b87fdaf073260a0bf965b687ae2c532[ALL]",
        "hex": "473044022044a9268e26ee9fcef25c2735a4c8a965d8605f02f0d2e6adf7e10d198230a5c50220079e35b03d373e49b6487ffc68fa3dbd1b87fdaf073260a0bf965b687ae2c53201"
      },
      "sequence": 4294967294
    }
  ],
  "vout": [
    {
      "value": 10.00000000,
      "n": 0,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 a57414e5ffae9ef5074bacbe10a320bb2614e1f3 OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a914a57414e5ffae9ef5074bacbe10a320bb2614e1f388ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou"
        ]
      }
    },
    {
      "value": 39.99996160,
      "n": 1,
      "scriptPubKey": {
        "asm": "OP_DUP OP_HASH160 2b9f2b59c617917dc178c7a2acf19db0f4d214fe OP_EQUALVERIFY OP_CHECKSIG",
        "hex": "76a9142b9f2b59c617917dc178c7a2acf19db0f4d214fe88ac",
        "reqSigs": 1,
        "type": "pubkeyhash",
        "addresses": [
          "mjVc2aixtBQFfHbT7TwxT1KG5FLz3pef2t"
        ]
      }
    }
  ]
}

/ $ bitcoin-cli gettransaction $TXID
{
  "amount": -10.00000000,
  "fee": -0.00003840,
  "confirmations": 0,
  "trusted": true,
  "txid": "6b7cf6dcf533a48be35a92ee43d3a20dba67dc08ba0d076ea95ed8f7de241dbf",
  "walletconflicts": [
  ],
  "time": 1500625711,
  "timereceived": 1500625711,
  "bip125-replaceable": "no",
  "details": [
    {
      "account": "",
      "address": "mvbnrCX3bg1cDRUu8pkecrvP6vQkSLDSou",
      "category": "send",
      "amount": -10.00000000,
      "vout": 0,
      "fee": -0.00003840,
      "abandoned": false
    }
  ],
  "hex": "02000000016bed0d9c75799e3912868f282973ec557ce3c5009a6b2b4cc3c21479e975b7190000000048473044022044a9268e26ee9fcef25c2735a4c8a965d8605f02f0d2e6adf7e10d198230a5c50220079e35b03d373e49b6487ffc68fa3dbd1b87fdaf073260a0bf965b687ae2c53201feffffff0200ca9a3b000000001976a914a57414e5ffae9ef5074bacbe10a320bb2614e1f388ac00196bee000000001976a9142b9f2b59c617917dc178c7a2acf19db0f4d214fe88ac65000000"
}

/ $ bitcoin-cli getnewaddress
mzvubqbwXXWEZVAmZ7EVKrYJu8D1azm8py

/ $ exit

$ docker-compose stop
Stopping bitcoind_bitcoind_1 ... done
```

### 利用現有 uphold/litecoind 映像檔連接Litecoin網路

* uphold/litecoind - Docker Hub https://hub.docker.com/r/uphold/litecoind/

```
$ docker run --rm -it uphold/litecoind  -printtoconsole -rpcpassword=bar -rpcuser=foo

UpdateTip: new best=495753d8f73a52fb0fe6d88b89f12ed3701939676f61352f06708b666882dfdc  height=47  log2_work=25.584985  tx=48  date=2011-10-13 03:03:10 progress=0.000002  cache=47
UpdateTip: new best=638f1be6872614e416ddeeac084ad425974f66a0372f61d125fe0baa653d8caa  height=48  log2_work=25.614732  tx=49  date=2011-10-13 03:03:15 progress=0.000002  cache=48

Ctrl+c
```

