* ipfs/ipfs-cluster: Collective pinning and composition for IPFS https://github.com/ipfs/ipfs-cluster
* ipfs-cluster/ipfs-cluster-guide.md at master · ipfs/ipfs-cluster https://github.com/ipfs/ipfs-cluster/blob/master/docs/ipfs-cluster-guide.md

### 啟用 ipfs-cluster 須同 cluster_secret

```
$ docker-compose exec cpeer1 ipfs-cluster-ctl version
0.1.0

$ docker-compose exec cpeer1 cat /data/ipfs-cluster/service.json
 "cluster_secret": "f2ea0f554543aa57c4ff289d4514c2963d97095dd929dfc5a188d13a18a09d5e"

$ docker-compose exec cpeer2 cat /data/ipfs-cluster/service.json
 "cluster_secret": "f2ea0f554543aa57c4ff289d4514c2963d97095dd929dfc5a188d13a18a09d5e"

$ docker-compose exec cpeer1 ipfs-cluster-ctl id
QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW | 0 peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/ipfs/QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW
    - /ip4/192.168.80.5/tcp/9096/ipfs/QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW
  > IPFS: QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c
    - /ip4/121.254.90.62/tcp/1028/ipfs/QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c
    - /ip4/127.0.0.1/tcp/4001/ipfs/QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c
    - /ip4/192.168.80.5/tcp/4001/ipfs/QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c

$ docker-compose exec cpeer2 ipfs-cluster-ctl id
QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU | 0 peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
    - /ip4/192.168.80.4/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
  > IPFS: QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/121.254.90.62/tcp/1032/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/127.0.0.1/tcp/4001/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/192.168.80.4/tcp/4001/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
```
### 加入peer
```
$ docker-compose exec cpeer1 ipfs-cluster-ctl peers add /ip4/192.168.80.4/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU | 1 peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
    - /ip4/192.168.80.4/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
  > IPFS: QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/121.254.90.62/tcp/1032/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/127.0.0.1/tcp/4001/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/192.168.80.4/tcp/4001/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q

$ docker-compose exec cpeer2 ipfs-cluster-ctl peers ls
QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU | 1 peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
    - /ip4/192.168.80.4/tcp/9096/ipfs/QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU
  > IPFS: QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/121.254.90.62/tcp/1032/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/127.0.0.1/tcp/4001/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
    - /ip4/192.168.80.4/tcp/4001/ipfs/QmcuqAkSXqSnmSaRAodXgWaZMVd1eFtfa2FNmo7DmG3w4Q
QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW | 1 peers
  > Addresses:
    - /ip4/127.0.0.1/tcp/9096/ipfs/QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW
    - /ip4/192.168.80.5/tcp/9096/ipfs/QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW
  > IPFS: QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c
    - /ip4/121.254.90.62/tcp/1028/ipfs/QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c
    - /ip4/127.0.0.1/tcp/4001/ipfs/QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c
    - /ip4/192.168.80.5/tcp/4001/ipfs/QmXNTFQ3ZstviA86a2Vkikiz9peUy6UEvb7xo6qrX8Ea8c

```

### 寫入ipfs

```
$ docker-compose exec node1 bash
bash-4.3# echo "node1: IPFS cluster " | ipfs add -q
Qmes96cv8eux5idzMBwRhwgoe7pW1ghMa6idemYCtXWM2q
bash-4.3# exit
exit
```

### 檔案 pin add 加入 cluster 散布到節點
```
$ docker-compose exec cpeer1 ipfs-cluster-ctl pin ls
$ docker-compose exec cpeer1 ipfs-cluster-ctl pin add Qmes96cv8eux5idzMBwRhwgoe7pW1ghMa6idemYCtXWM2q
Qmes96cv8eux5idzMBwRhwgoe7pW1ghMa6idemYCtXWM2q :
    > Peer QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW : PINNED | 2017-08-02T01:42:40Z
    > Peer QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU : PINNED | 2017-08-02T01:42:40Z

$ docker-compose exec cpeer ipfs-cluster-ctl pin ls
Qmes96cv8eux5idzMBwRhwgoe7pW1ghMa6idemYCtXWM2q | Allocations: [everywhere]

$ docker-compose exec cpeer ipfs-cluster-ctl status Qmes96cv8eux5idzMBwRhwgoe7pW1ghMa6idemYCtXWM2q
Qmes96cv8eux5idzMBwRhwgoe7pW1ghMa6idemYCtXWM2q :
    > Peer QmYVrKSDvqVuL9mNt8TTNLMVxheejZK7tU88WKLDhoPjuW : PINNED | 2017-08-02T01:42:40Z
    > Peer QmcGyasB5iawzSS1zc96vQbPWFPVdUBdSFCSjGuJH1srHU : PINNED | 2017-08-02T01:42:40Z

```
### stop all containers

```
$ docker-compose stop
```